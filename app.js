var express = require('express');
var app = express();
var socket = require('socket.io');

var port = 3000;

app.use(express.static('public'));

var server = app.listen(port, ()=> {
    console.log("Server is up on port "+port);
});

var io = socket(server);

io.on('connection', (socket) => {
    console.log("User just connected");    
    // Send msg to all clients
    //console.log(socket.id)
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data); 
    });

    // On typing event, emit  
    socket.on('typing', (data) => {
        //send msg to all clients in the current namespace including the sender
        socket.broadcast.emit('typing', data);
    });
});


