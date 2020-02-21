const express = require('express');
const users = require('./users');
const routes = express.Router();

routes.get('/', (req, res) =>{
    res.render('home');
});

routes.get('/chat', (req, res) =>{
    const { user, avatar } = req.cookies;

    if(user){
        res.render('chat', {user: user, avatar: avatar, users: users});
    }else {
        res.render('Login');
    }
});

routes.post('/login', (req,res) => {
    const { name, avatar } = req.body;
    const expireDate = new Date(Number(new Date()) + 315360000000); 
    res.cookie('user', name, { maxAge: expireDate, httpOnly: true });
    res.cookie('avatar', avatar, { maxAge: expireDate, httpOnly: true });
    res.redirect('/chat');
    res.end('done');
});

routes.get('/logout', (req,res) => {
    res.clearCookie('user');
    res.end();
});

routes.get('/:diretorio', (req, res) => {
    const { diretorio } = req.params;
    res.render('404', {dir: diretorio})
});

module.exports = routes;