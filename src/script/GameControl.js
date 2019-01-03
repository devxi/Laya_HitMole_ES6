class GameControl {
    constructor () {
        this.players = [];
    }

    ready () {
        LayaApp.socket.on('selfJoinGame', (player) => {
            this.onSelfJoin(player);
        }); 
        LayaApp.socket.on('playerJoinGame', (player) => {
            this.onPlayerJoinGame(player);
        })
        LayaApp.socket.on('otherHammerMove', (data) => {
            this.onOtherHammerMove(data);
        });
        LayaApp.socket.on("otherHammerHit", (data) => {
            this.onOtherHammerHit(data);
        });
        LayaApp.socket.on('playerLeave', (data) => {
            this.onPlayerLeave(data);
        });
        LayaApp.socket.emit('ready');
    }

    /*
    当自己加入时调用
    */
    onSelfJoin(player) {
        LayaApp.gameStartView.removeSelf();
		Laya.stage.addChild(LayaApp.gameView);
        const playId = player.id;
        this.me = new Player(playId);
        this.players.push(this.me );
        if (!this.Hammer) {
            this.Hammer = this.me.hammer;
            Laya.stage.addChild(this.Hammer);
        }
        this.gameStart();
    }

    /*
    当其他玩家加入时调用
    */
    onPlayerJoinGame(player) {
        console.log('GameControl - onPlayerJoinGame :', player);
        const playId = player.id;
        var player = new Player(playId);
        Laya.stage.addChild(player.hammer);
        this.players.push(player);
    }

    onOtherHammerMove (data) {
        const playerId = data.id;
        const pos = data.pos;
        this.players.forEach((player) => {
            if (playerId === player.id) {
                player.hammer.onServerSayHammerMove(pos)
            }
        });
    }

    onOtherHammerHit(data) {
        const playerId = data.id;
        this.players.forEach((player) => {
            if (playerId === player.id) {
                player.hammer.onServerSayHammerHit()
            }
        });
    }

    onPlayerLeave(data) {
        console.log('onPlayerLeave 玩家离开游戏：', data);
        const playerId = data.id;
        for(let i = 0; i < this.players.length; i++ ) {
            var player = this.players[i];
            if (playerId == player.id) {
                player.hammer.removeSelf();
                this.players.splice(i, 1);
            }
        }
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
        // this.mole =  new Mole(aMoleBox, 21, this.hitCallBack);

        var moleBox;
        var data = {};

        for (let i = 0; i < this.moleNum; i++) {
            moleBox = this.gameView.getChildByName("item" + i);
            this.moles.push(new Mole(moleBox, 20, this.hitCallBack, i));
            data["item" + i] = { index : 0 };
        }

        this.Hammer.start();

        this.gameView.scoreNum.dataSource = data;
        LayaApp.socket.on('showMole', (data) => {
            this.showMole(data);
        });
       LayaApp.socket.on('hit', (data) => {
           const index = data.index;
           const playerId = data.playerId;
           this.moles[index].serverSayHit();
       });
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
        // console.log("updateScorceUI:", this.score)
        var data = {}
        var temp = this.score;
        for (let i = 9; i >= 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10)};
            temp /= 10;
        }
        this.gameView.scoreNum.dataSource = data;
    }

    isShow () {
        this.gameView.timeBar.value -= (1 / 1000);
        if (this.gameView.timeBar.value <= 0) {
            this.gameOver();
            return;
        }

        var count = Math.floor(Math.random() * 4)
        count = count == 0 ? 1 : count;
        var array = new Array(8)
         .fill(0)
         .map((v,i)=>i+1)
         .sort(()=>0.5 - Math.random())
         .filter((v,i)=>i<count);

        array.forEach(function(element) {
            this.moles[element].show();
        }, this);

        console.log(count, array);
    }

    showMole (data) {
        const index = data.index;
        const type = data.type;
        if (index >= 0 && index < this.moleNum) {
            this.moles[index].show(type);
        } else {
            console.log('moleId is Invaild !!!');
        }
    }
}