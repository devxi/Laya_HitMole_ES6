class Mole {
    constructor (mole, downY, hitCallBack) {
        this.mole = mole;
        this.downY = downY;
        this.hitCallBack = hitCallBack;
        this.normalState = this.mole.getChildByName("normal");
        this.hitState = this.mole.getChildByName("hit");
        this.upY = this.normalState.y;
        this.scoreImg = this.mole.getChildByName("score");;
        this.scoreY = this.scoreImg.y;
        this.normalState.on(Laya.Event.CLICK, this, this.hit);
        this.reset();
    }

    reset () {
        this.isActive = false;
        this.isShow = false;
        this.isHit = false;
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.type = Math.random() <= 0.5 ? 1 : 2;
        this.normalState.skin = "comp/mouse_normal_" + this.type + ".png";
        this.hitState.skin = "comp/mouse_hit_" + this.type + ".png";
        this.scoreImg.skin = "comp/score_" + this.type + ".png";
        this.scoreImg.visible = false;
    }

    show () {
        console.log('Mole - show');
        this.isActive = true;
        this.isShow = true;
        this.normalState.y = this.downY;
        this.normalState.visible = true;
        this.hitState.visible = false;
        Laya.Tween.to(this.normalState, 
                     {y:this.upY}, 
                     500, 
                     Laya.Ease.backInOut, 
                     Laya.Handler.create(this, this.showComplete));
    }

    showComplete () {
        console.log('Mole - showComplete');
        if (this.isShow && !this.isHit) {
            Laya.timer.once(2000, this, this.hide);
        }
    }

    hide() {
        if (this.isShow && !this.isHit) {
            this.isShow = false;
            Laya.Tween.to(this.normalState,{y:this.downY},
            								300,
            								Laya.Ease.backIn,
            								Laya.Handler.create(this,this.reset));
        } 
    }

    hit () {
        console.log('Mole - hit');
        if (this.isShow && !this.isHit) {
            this.isHit = true;
            this.isShow = false;
            Laya.timer.clear(this, this.hide);
            this.normalState.visible = false;
            this.hitState.visible =true;
            Laya.timer.once(500, this, this.reset);
            this.hitCallBack.runWith(this.type);
            this.showScore();
        }
    }

    showScore () {
        console.log('Mole - showScore');
        this.scoreImg.visible = true;
        this.scoreImg.y = this.scoreY + 30;
        this.scoreImg.scale(0, 0);
        Laya.Tween.to(this.scoreImg, 
                     {y: this.scoreY, scaleX: 1, 
                     scaleY:1},
                     300,
                     Laya.Ease.backOut);
    }

}