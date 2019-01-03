class Mole {
    constructor (mole, downY, hitCallBack, index) {
        this.mole = mole;
        this.downY = downY;
        this.hitCallBack = hitCallBack;
        this.normalState = this.mole.getChildByName("normal");
        this.hitState = this.mole.getChildByName("hit");
        this.upY = this.normalState.y;
        this.scoreImg = this.mole.getChildByName("score");;
        this.scoreY = this.scoreImg.y;
        this.normalState.on(Laya.Event.CLICK, this, this.hit);
        this.count = 0;
        this.socket = LayaApp.socket;
        this.index = index;
        this.reset();
    }

    reset () {
        // console.log('Mole - 重置地鼠');
        this.isActive = false;
        this.isShow = false;
        this.isHit = false;
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.scoreImg.visible = false;
    }

    show (type) {
        if (this.isActive) {
             //地鼠正在跳出，直接return，不要反复调用
             return;
        }
        this.type = type;// Math.random() <= 0.5 ? 1 : 2;
        this.normalState.skin = "comp/mouse_normal_" + this.type + ".png";
        this.hitState.skin = "comp/mouse_hit_" + this.type + ".png";
        this.scoreImg.skin = "comp/score_" + this.type + ".png";
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
        // console.log('Mole - 地鼠跳出来完毕');
        if (this.isShow && !this.isHit) {
            Laya.timer.once(2000, this, this.hide);
        }
    }

    hide () {
        // console.log('Mole - 地鼠即将进洞');
        if (this.isShow && !this.isHit) {
            this.isShow = false;
            Laya.Tween.to(this.normalState,{y:this.downY},
            								300,
            								Laya.Ease.backIn,
            								Laya.Handler.create(this,this.reset));
        }  
    }

    hit () {
         if (this.isActive) {
            LayaApp.socket.emit('hit', this.index);
         } 
    }

    serverSayHit () {
        if (this.isActive){
            this.normalState.visible = false;
            this.hitState.visible =true;
            this.isHit = true;
            this.isShow = false;
            Laya.timer.clear(this, this.hide);
            Laya.timer.once(1000, this, this.reset);
            this.hitCallBack.runWith(this.type);
            this.showScore();
        }
    }

    showScore () {
        // console.log('Mole - showScore');
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