const express = require('express');
const cookierParser = require('cookie-parser')
const path = require('path');
const routes = require('./routes');
const users = require('./users');

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
    const username = socket.request._query.name;
    const avatar = socket.request._query.avatar;

    users.data[username] = {'avatar': avatar, 'socketId': socket.id};
    users.length = io.engine.clientsCount;
    socket.broadcast.emit('newUser', {name: username, users: users});

    console.log(users.data)
    console.log(users.length);

    socket.emit('directConnection', {usersCounter: io.engine.clientsCount, users: users.data});

    socket.on('sendMessage', data => {
        socket.broadcast.emit('newMessage', data);
    });

    socket.on('disconnect', function() {
        delete users.data[username];
        users.length = io.engine.clientsCount;
        console.log(users.data);
        console.log(users.length);
        socket.broadcast.emit('userDeslogged', {name: username, users: users});
	});
});



server.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log('servern on...')
});
