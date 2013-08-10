//
// Configuration
//

var config = require('../../config');

//
// Login Page
//

exports.login = function(req, res) {
    res.render('login', { namesite: config.web.namesite, title: 'Login' });
};

//
// SignIn Process
//

exports.signin = function(req, res) {
    var nick = req.body.nick;
    var pass = req.body.pass;
    console.log("Ho ricevuto questi dati: %s %s",nick,pass);
    //Qui ci va tutta la merda con il DB :| good luck
    res.redirect('/');
};
