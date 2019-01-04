import Player from "./player.js";

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8888, '0.0.0.0', () => {
  Log(`App listening at port 8888`)
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});



var players = [];
var id = 0;

io.sockets.on('connection', function (socket) {
  Log(`[${socket.id}] connected`)
  socket.on('ready', () => {
      const player = new Player(++id, socket.id, {x:0,y:0})
      players.push(player);
      socket.emit('selfJoinGame', { player, players});
      socket.broadcast.emit('playerJoinGame', player);
  });

  socket.on('hit', function (index) {
       io.sockets.emit('hit', {
        playerId : socket.id,
         index
      });
  });
  socket.on('otherHammerMove', (data) => {
    const playerId = data.id;
    const pos = data.pos;
    players.forEach(p => {
      if (playerId == p.id) {
          p.pos = data.pos;
      }
    });
    socket.broadcast.emit('otherHammerMove', data);
 });
  socket.on('otherHammerHit', (data) => {
    socket.broadcast.emit('otherHammerHit', data);
   });
  socket.on('disconnect', (reason) => {
    Log(`[${socket.id}] was disconnected reason:${reason}`);
    if (reason === 'io server disconnect') {
    }
    for(let i = 0; i < players.length; i++) {
       var player = players[i];
       if (player.socketId == socket.id) {
           players.splice(i, 1);
           socket.broadcast.emit("playerLeave", {
            id : player.id,
            reason
          });
           break;
       }
    }
  });
});

setInterval( () => {
  var count = Math.floor(Math.random() * 4)
  count = count == 0 ? 1 : count;
  var array = new Array(8)
  .fill(0)
  .map((v, i) => i + 1)
  .sort(() => 0.5 - Math.random())
  .filter((v, i) => i< count);
  array.forEach( function(index) {
      const type =  Math.random() <= 0.5 ? 1 : 2
      io.sockets.emit('showMole', {
          index, type
      });   
      Log(`显示地鼠 索引 ：${index}  类型： ${type}`);
}, this);
}, 1000);
 
function getNowFormatDate () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate +
                    " " + date.getHours() + seperator2 + date.getMinutes() +
                     seperator2 + date.getSeconds();
  return currentdate;
};

function Log(info) {
  console.log(getNowFormatDate() + " ", info);
}
Log(111);
var index = 1;
