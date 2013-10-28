//
// Configuration
//

var config = require('../../config'),
    controller = require('../../controller/user'),
    user = exports;

//
// Login Page
//

user.login = function(req, res) {
    controller.isLogged(req, function(risultato) {
        if( risultato > 0) {
            res.redirect('/dashboard');
        }
        else {
            var dati = {
                namesite: config.web.namesite,
                title: 'Login',
                errore: '',
                base: config.web.base,
                username: ''
            };

            res.render('login',dati);
        }
    });
};

//
// SignIn Action and result to login page or redirect to dashboard
//

user.signin = function(req, res) {
    controller.isLogged(req, function(risultato) {
        if( risultato > 0) {
            res.redirect('/dashboard');
        }
        else {
            controller.signin(req, function(responso,stringa) {
                if(responso > 0) {
                    res.redirect('/dashboard');
                }
                else {
                    var dati = {
                        namesite: config.web.namesite,
                        title: 'Login',
                        username: '',
                        errore: stringa,
                        base: config.web.base
                    };
                    res.render('login',dati);
                }
            });
        }
    });
};

//
// SingOut Process
//

user.signout = function(req, res) {
    controller.isLogged(req, function(risultato) {
        if( risultato > 0) {
            controller.signout(req, function(resp) {
                if( resp != 1) {
                    console.log("Errore nel Logout: "+resp);
                }
                else {
                    res.redirect('/login');
                }
            });
        }
        else {
            res.redirect('/');
        }
    });
};
