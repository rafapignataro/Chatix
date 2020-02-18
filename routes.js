const express = require('express');
const routes = express.Router();

routes.use('/home', (req, res) =>{
    res.render('home');
});

routes.use('/chat', (req, res) =>{
    const { user } = req.cookies;

    if(user){
        res.render('chat', {user: user});
    }else {
        res.render('Login');
    }
});

routes.post('/login', (req,res) => {
    const { name } = req.body;
    const expireDate = new Date(Number(new Date()) + 315360000000); 
    res.cookie('user', name, { maxAge: expireDate, httpOnly: true });
    res.redirect('/chat');
    res.end('done');
});

routes.get('/logout', (req,res) => {
    // req.session.destroy(function(err){
    //     if(err) {
    //         res.negotiate(err);
    //     }else {
    //         res.redirect('/chat');
    //     }
    // })
});

module.exports = routes;