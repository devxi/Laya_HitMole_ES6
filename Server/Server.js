var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8888, () => {
  console.log(`App listening at port 3389`)
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var players = [];
var playerCount = 0;

io.sockets.on('connection', function (socket) {
  playerCount++;
  socket.on('ready', () => {
      var player = { id : playerCount, socketId : socket.id ,pos : {x:0,y:0}};
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
    console.log("[" + socket.id + "]" , "disconnect resson:", reason);
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
      io.sockets.emit('showMole', {
          index,
          type : Math.random() <= 0.5 ? 1 : 2
      });      
}, this);
}, 1000);
 
