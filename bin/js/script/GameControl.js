class GameControl {
    constructor () {

    }

    gameStart() {
        console.log("GameControl  - 游戏开始");
        this.moles = [];
        this.moleNum = 9;
        this.score = 0;
        this.gameView = LayaApp.gameView;
        this.gameView.timeBar.value = 1; 
        var aMoleBox = this.gameView.getChildByName("item0");
        this.hitCallBack = Laya.Handler.create(this, this.setScore, null, false);
        this.mole =  new Mole(aMoleBox, 21, this.hitCallBack);

        var moleBox;
        var data = {};

        for (let i = 0; i < this.moleNum; i++) {
            moleBox = this.gameView.getChildByName("item" + i);
            this.moles.push(new Mole(moleBox, 20, this.hitCallBack));
            data["item" + i] = { index : 0 };
        }
        
        if (!this.Hammer) {
            this.Hammer = new Hammer();
            Laya.stage.addChild(this.Hammer);
        }

        this.Hammer.start();

        this.gameView.scoreNum.dataSource = data;
        Laya.timer.loop(1000, this, this.isShow);
    }

    gameOver() {
        Laya.timer.clear(this, this.isShow);
        if (!LayaApp.gameOverView) {
            LayaApp.gameOverView = new GameOverView(this.score);
        }
        Laya.stage.removeSelf();
        Laya.stage.addChild(LayaApp.gameOverView);
        LayaApp.gameOverView.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        this.Hammer.stop();
    }

    setScore (type) {
        this.score += type == 1 ? -100 : 100;
        if (this.score <= 0) { this.score = 0; }
        this.updateScorceUI();
    }

    updateScorceUI () {
        console.log("updateScorceUI:", this.score)
        var data = {}
        var temp = this.score;
        for (let i = 9; i >= 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10)};
            temp /= 10;
        }
        this.gameView.scoreNum.dataSource = data;
    }

    isShow () {
        this.gameView.timeBar.value -= (1 / 10);
        if (this.gameView.timeBar.value <= 0) {
            this.gameOver();
            return;
        }
        var index = Math.floor(Math.random() * this.moleNum);
        this.moles[index].show();
    }
}