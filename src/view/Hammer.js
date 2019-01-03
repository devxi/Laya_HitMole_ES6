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
    }

    stop () {
        Laya.Mouse.show();
        Laya.stage.offAll();
    }

    onServerSayHammerMove (pos) {
         this.pos(pos.x, pos.y);
    }

    onMouseMove () {
        this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        LayaApp.socket.emit("hammerMove",{
            x : Laya.stage.mouseX,
            y : Laya.stage.mouseY
        });
    }

    onMouseDown () {
        this.hit.play(0, false);
        //移动端点击时也应该移动锤子
        this.onMouseMove();
    }

}