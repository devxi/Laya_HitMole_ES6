class Hammer extends ui.HammerUI {
    constructor  () { 
        super(); 
    }
    start () {
        //隐藏鼠标
        Laya.Mouse.hide();
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    }

    stop () {
        Laya.Mouse.show();
        Laya.stage.offAll();
    }

    onMouseMove () {
        this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    onMouseDown () {
        this.hit.play(0, false);
    }

}