// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the Anagrammatix game file.
var agx = require('./agx.js');
app.use(express.static(__dirname + '/public'));
// app.get('/', function(req, res){
//   res.sendfile('public/index.html');
// });


var server = require('http').createServer(app).listen(8080)
// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO

var http = require('http');

io.on('connection', function(socket){
  agx.initGame(io, socket);
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    // io.emit('chat message', msg)
  });

});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });


// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

// app.configure(function() {
//     // Turn down the logging activity
//     app.use(express.logger('dev'));

//     // Serve static html, js, css, and image files from the 'public' directory
//     app.use(express.static(path.join(__dirname,'public')));
// });


// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//   socket.on('chat message', function(msg){
//     socket.broadcast.emit('chat message', msg);
//     // io.emit('chat message', msg)
//   });
// });

// // io.on('connection', function(socket){
// //   socket.on('chat message', function(msg){
// //     io.emit('chat message', msg);
// //   });
// // });


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });