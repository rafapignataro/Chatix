const express = require('express');
const cookierParser = require('cookie-parser')
const path = require('path');
const routes = require('./routes');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cookierParser('abcdef-12345'))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(routes);

io.on('connection', socket => {
    let username;

    socket.on('userLogged', data => {
        username = data;
        socket.broadcast.emit('newUser', data);
    });

    socket.on('sendMessage', data => {
        socket.broadcast.emit('newMessage', data);
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('userDeslogged', username);
	});
});

server.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log('_online_')
});
