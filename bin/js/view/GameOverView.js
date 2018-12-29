class GameOverView extends  ui.GameOverUI{
    constructor (score) {
        super();
        this.restartBtn.on(Laya.Event.CLICK, this, this.onRestart);
        this.score = score;
        this.showScore();
    }

    onRestart () {
        this.removeSelf();
        if (!LayaApp.gameView) {
            LayaApp.gameView = new GameView();
        }
        LayaApp.gameView.gameStart();
    }

    showScore () {
        var data = {}
        var temp = this.score;
        for (let i = 9; i >= 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10)};
            temp /= 10;
        }
        this.scoreImg.dataSource = data;
    }
}