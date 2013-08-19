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
            res.render('login', { namesite: config.web.namesite, title: 'Login', errore: '' });
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
                    res.render('login', { namesite: config.web.namesite, title: 'Login', errore: stringa });
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

//
// Dashboard
// 

user.dashboard = function(req, res) {
    controller.isLogged(req, function(risultato) {
        if(risultato > 0) {
            res.render('admin/dashboard', { namesite: config.web.namesite, title: 'DashBoard' });
        }
        else {
            res.redirect('/login');
        }
    });
};

