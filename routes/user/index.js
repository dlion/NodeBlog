//
// Configuration
//

var config = require('../../config'),
    controller = require('../../controller/user');

//
// Login Page
//

exports.login = function(req, res) {
    res.render('login', { namesite: config.web.namesite, title: 'Login', errore: '' });
};

//
// SignIn Action and result to login page or redirect to dashboard
//

exports.signin = function(req, res) {
    controller.signin(req, function(risultato,stringa) {
        if(risultato > 0) {
            res.redirect('/dashboard');
        }
        else {
            res.render('login', { namesite: config.web.namesite, title: 'Login', errore: stringa });
        }
    });
};

