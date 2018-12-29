var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.scoreNum=null;
		    this.timeBar=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Box","props":{"y":35,"x":11,"var":"scoreNum"},"child":[{"type":"Clip","props":{"skin":"comp/clip_number.png","name":"item0","clipX":10}},{"type":"Clip","props":{"y":0,"x":19,"skin":"comp/clip_number.png","name":"item1","clipX":10}},{"type":"Clip","props":{"y":0,"x":38,"skin":"comp/clip_number.png","name":"item2","clipX":10}},{"type":"Clip","props":{"y":0,"x":57,"skin":"comp/clip_number.png","name":"item3","clipX":10}},{"type":"Clip","props":{"y":0,"x":76,"skin":"comp/clip_number.png","name":"item4","clipX":10}},{"type":"Clip","props":{"y":0,"x":95,"skin":"comp/clip_number.png","name":"item5","clipX":10}},{"type":"Clip","props":{"y":0,"x":114,"skin":"comp/clip_number.png","name":"item6","clipX":10}},{"type":"Clip","props":{"y":0,"x":133,"skin":"comp/clip_number.png","name":"item7","clipX":10}},{"type":"Clip","props":{"y":0,"x":152,"skin":"comp/clip_number.png","name":"item8","clipX":10}},{"type":"Clip","props":{"y":0,"x":171,"skin":"comp/clip_number.png","name":"item9","clipX":10}}]},{"type":"Image","props":{"y":25,"x":25,"skin":"comp/back.png"}},{"type":"Box","props":{"y":198,"x":156,"name":"item0"},"child":[{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-2,"x":3,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":80,"x":0,"skin":"comp/mask-01.png"}},{"type":"Image","props":{"y":-11,"x":16,"skin":"comp/score_1.png","name":"score"}}]},{"type":"Box","props":{"y":198,"x":346,"name":"item1"},"child":[{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":80,"x":0,"skin":"comp/mask-02.png"}},{"type":"Image","props":{"y":-11,"x":22,"skin":"comp/score_1.png","name":"score"}}]},{"type":"Box","props":{"y":206,"x":545,"name":"item2"},"child":[{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":80,"skin":"comp/mask-03.png"}},{"type":"Image","props":{"y":-11,"x":21,"skin":"comp/score_1.png","name":"score"}}]},{"type":"Box","props":{"y":290,"x":129,"name":"item3"},"child":[{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":1,"x":18,"skin":"comp/score_1.png","name":"score"}},{"type":"Image","props":{"y":80,"skin":"comp/mask-04.png"}}]},{"type":"Box","props":{"y":292,"x":349,"name":"item4"},"child":[{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-10,"x":21,"skin":"comp/score_1.png","name":"score"}},{"type":"Image","props":{"y":80,"skin":"comp/mask-05.png"}}]},{"type":"Box","props":{"y":289,"x":547,"name":"item5"},"child":[{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-5,"x":22,"skin":"comp/score_1.png","name":"score"}},{"type":"Image","props":{"y":80,"skin":"comp/mask-06.png"}}]},{"type":"Box","props":{"y":387,"x":124,"name":"item6"},"child":[{"type":"Image","props":{"y":0,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-10,"x":13,"skin":"comp/score_1.png","name":"score"}},{"type":"Image","props":{"y":74,"x":-4,"skin":"comp/mask-07.png"}}]},{"type":"Box","props":{"y":395,"x":348,"name":"item7"},"child":[{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":-1,"x":14,"skin":"comp/score_1.png","name":"score"}},{"type":"Image","props":{"y":80,"skin":"comp/mask-08.png"}}]},{"type":"Box","props":{"y":391,"x":563,"name":"item8"},"child":[{"type":"Image","props":{"y":-2,"x":2,"skin":"comp/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":9,"x":4,"skin":"comp/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":80,"x":0,"skin":"comp/mask-09.png"}},{"type":"Image","props":{"y":-4,"x":20,"skin":"comp/score_1.png","name":"score"}}]},{"type":"ProgressBar","props":{"y":6,"x":8,"var":"timeBar","value":1,"skin":"comp/progress_time.png"}}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.restartBtn=null;
		    this.scoreImg=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"Dialog","props":{"y":200,"x":300,"width":600,"height":400,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/overBg.png","sizeGrid":"17,16,19,14","height":400,"anchorY":0,"anchorX":0}},{"type":"Button","props":{"y":242,"x":211,"var":"restartBtn","stateNum":2,"skin":"comp/btn_restart.png"}},{"type":"Image","props":{"y":112,"x":30,"skin":"comp/total Score.png"}},{"type":"Box","props":{"y":148,"x":258,"var":"scoreImg"},"child":[{"type":"Clip","props":{"skin":"comp/clip_number.png","name":"item0","clipX":10}},{"type":"Clip","props":{"y":0,"x":19,"skin":"comp/clip_number.png","name":"item1","clipX":10}},{"type":"Clip","props":{"y":0,"x":38,"skin":"comp/clip_number.png","name":"item2","clipX":10}},{"type":"Clip","props":{"y":0,"x":57,"skin":"comp/clip_number.png","name":"item3","clipX":10}},{"type":"Clip","props":{"y":0,"x":76,"skin":"comp/clip_number.png","name":"item4","clipX":10}},{"type":"Clip","props":{"y":0,"x":95,"skin":"comp/clip_number.png","name":"item5","clipX":10}},{"type":"Clip","props":{"y":0,"x":114,"skin":"comp/clip_number.png","name":"item6","clipX":10}},{"type":"Clip","props":{"y":0,"x":133,"skin":"comp/clip_number.png","name":"item7","clipX":10}},{"type":"Clip","props":{"y":0,"x":152,"skin":"comp/clip_number.png","name":"item8","clipX":10}},{"type":"Clip","props":{"y":0,"x":171,"skin":"comp/clip_number.png","name":"item9","clipX":10}}]}]};
		return GameOverUI;
	})(Dialog);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.startBtn=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":55,"x":38,"skin":"comp/help.png"}},{"type":"Button","props":{"y":417,"x":311,"var":"startBtn","stateNum":2,"skin":"comp/btn_start.png"}}]};
		return GameStartUI;
	})(View);
var HammerUI=(function(_super){
		function HammerUI(){
			
		    this.hit=null;
		    this.hammer=null;

			HammerUI.__super.call(this);
		}

		CLASS$(HammerUI,'ui.HammerUI',_super);
		var __proto__=HammerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HammerUI.uiView);

		}

		HammerUI.uiView={"type":"View","props":{"width":100,"height":100},"child":[{"type":"Image","props":{"y":64,"x":61,"width":98,"var":"hammer","skin":"comp/hammer.png","rotation":0,"pivotY":53,"pivotX":60,"height":77},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":0},{"value":-40,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":1},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":5}]}}],"name":"hit","id":1,"frameRate":24,"action":0}]};
		return HammerUI;
	})(View);