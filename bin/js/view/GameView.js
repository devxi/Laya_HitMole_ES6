class GameView extends ui.GameUI {
	constructor () {
		super();
		if (!LayaApp.gameView) {
			LayaApp.gameView = this;
		}
	}

	gameStart () {
		if (!LayaApp.gameView) {
			LayaApp.gameView = this;
		}

		if (!LayaApp.gameControl) {
			LayaApp.gameControl = new GameControl();
		}
		LayaApp.gameControl.gameStart();
	}
}