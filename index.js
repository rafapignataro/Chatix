const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(session({
    secret: 'teste',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/home', (req, res) =>{
    res.render('home');
});

app.use('/chat', (req, res) =>{
    const { name } = req.session;
    if(name){
        res.render('chat', {username: name});
    }else {
        res.render('Login');
    } 
});

app.post('/login', (req,res) => {
    const { name } = req.body;
    req.session.name = name;
    res.end('done');
});

app.get('/logout', (req,res) => {
    req.session.destroy(function(err){
        if(err) {
            res.negotiate(err);
        }else {
            res.redirect('/chat');
        }
    })
});

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

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
    var addr = server.address();
    console.log("Server on em http://", addr.address + ":" + addr.port);
});
