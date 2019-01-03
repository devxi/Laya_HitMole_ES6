class Hammer extends ui.HammerUI {
    constructor  () { 
        super(); 
    }
    start () {
        //隐藏鼠标
        Laya.Mouse.hide();
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        LayaApp.socket.on("hammerMove", (pos) => {
            this.onServerSayHammerMove(pos);
        });
        LayaApp.socket.on("hammerHit", () => {
            this.onServerSayHammerHit();
        });
    }

    stop () {
        Laya.Mouse.show();
        Laya.stage.off();
    }

    onMouseMove () {
        this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        const data = { id : LayaApp.gameControl.me.id, pos : {
            x : Laya.stage.mouseX,
            y : Laya.stage.mouseY
        }}
        LayaApp.socket.emit("otherHammerMove", data);
    }

    onMouseDown () {

        this.hit.play(0, false);
        //移动端点击时也应该移动锤子
        this.onMouseMove();
        const data = { id : LayaApp.gameControl.me.id}
        LayaApp.socket.emit("otherHammerHit", data);
    }

    onServerSayHammerMove (pos) {
         this.pos(pos.x, pos.y);
    }

    onServerSayHammerHit () {
        this.hit.play(0, false);
    }

}