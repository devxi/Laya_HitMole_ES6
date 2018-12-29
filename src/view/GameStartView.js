class GameStartView extends ui.GameStartUI {
	constructor() {
		super();

		//开始游戏按钮事件
		this.startBtn.on(Laya.Event.CLICK, this, this.onStartGame);
	}

	onStartGame () {
		console.log("GameStartView - 点击了开始游戏");
		//跳转到游戏界面
		this.removeSelf();
		if (!LayaApp.gameView) {
			LayaApp.gameView = new GameView();
		}
		Laya.stage.addChild(LayaApp.gameView);
		LayaApp.gameView.gameStart();
	}
}