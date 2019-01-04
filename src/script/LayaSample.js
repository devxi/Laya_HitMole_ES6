// var WebGL = laya.webgl.WebGL;
// Laya.init(600, 400, WebGL);

class LayaApp {
    constructor () {
        //初始化引擎
        const WebGL = laya.webgl.WebGL;
        Laya.init(800, 600, WebGL);
        //设置版本控制类型为使用文件名映射的方式
        // Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION
        // //加载版本信息文件
        // Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.beginLoad))
        // 设置stage属性
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignW = Laya.Stage.ALIGN_CENTER;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.bgColor = "#ffffff";
        this.beginLoad();
    }


    // 加载资源
    beginLoad() { 
        console.log("LayaApp - 正在加载资源...");
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    // 加载完成回调
    onLoaded() {
        console.log("LayaApp - 资源加载完毕");
        if (!LayaApp.socket) {
            var addr = "ws://localhost:8888";
            addr = "ws://47.105.147.240:8888/"
            LayaApp.socket = io.connect(addr);
        }
        LayaApp.socket.on('connect', this.onConnected);
    }

    onConnected () {
        console.log("LayaApp - socket连接成功 onConnected")
        // 启动游戏界面
        if (!LayaApp.gameStartView) {
            LayaApp.gameStartView = new GameStartView()
            Laya.stage.addChild(LayaApp.gameStartView)
        }
    }
}

new LayaApp();