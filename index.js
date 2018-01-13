
const express = require('express');
const app = express(); // Express initializes app to be a function handler that you can supply to an HTTP server  

const http = require('http'); // node.js module. Use the createServer() method to create a HTTP server.
const server = http.createServer(app);
/* 
http.createServer([requestListener]);
The requestListener is a function which is automatically added to the 'request' event.
Event 'request': Emitted each time there is a request. Note that there may be multiple 
requests per connection (in the case of HTTP Keep-Alive connections).

Creating an HTTP server yourself, instead of having Express create one for you is useful if you want to reuse the HTTP server,
for example to run socket.io within the same HTTP server instance
*/

const socketIo = require('socket.io'); // server that integrates with (or mounts on) the Node.JS HTTP Server 
const io = socketIo(server);

const UsersService = require('./UsersService');
const userService = new UsersService();

// serving static files
app.use(express.static(__dirname + '/public'));

// routing - but server doesn't serve this file, instead it serves html from /public
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});




/* Socket.IO allows you to emit and receive custom events. Besides 'Connect', 'Message', 'Disconnect', 'Reconnect', 
'Ping', 'Join' and 'Leave', you can emit custom events. 

The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want.
Any objects that can be encoded as JSON will do, and binary data is supported too.
*/

// node.js's 'connection' event is emitted when a new connection is made. all socket event handlers should go in here. Socket represents a client. 
io.on('connection', function(socket) {
    
    // when user joins. 'join' event is provided by socket.io
    socket.on('join', function(name){

        // save user to userService
        userService.addUser({
            id: socket.id,
            name
        });

        /* In order to send an event to everyone, Socket.IO gives us the io.emit.
        io.emit('some event', { for: 'everyone' }); */
        
        io.emit('update', {
                                             // whenever 'join' event occurs, emit 'update' to all users; cb for that event is userService.getAllUsers()
            users: userService.getAllUsers() // every client 'hears' the update event and calls cb function that refreshes user list
        });                                      
    });

    // when user leaves the chat. 'disconnect' event is provided by socket.io
    socket.on('disconnect', () => { 

        userService.removeUser(socket.id);

        // broadcast <==> to all sockets(clients) except the one that emits the event
        socket.broadcast.emit('update', {
          users: userService.getAllUsers()
        }); 
    });

    // 'message' event is provided by socket.io
    socket.on('message', function(message) {

        // js destructuring. "give me a variable called 'name' and take it from the user object"
        const {name} = userService.getUserById(socket.id);

        socket.broadcast.emit('message', {
          text: message.text,
          from: name
        });
    });
});





// start server
server.listen(3000, function(){
  console.log('Server listening on *:3000');
});


