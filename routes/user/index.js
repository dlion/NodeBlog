//
// Configuration
//

var config = require('../../config'),
    controller = require('../../controller/user');

//
// Login Page
//

exports.login = function(req, res) {
    res.render('login', { namesite: config.web.namesite, title: 'Login' });
};

exports.signin = function(req, res) {
    controller.signin(req, function(risultato,stringa) {
        console.log("Risultato: "+risultato+"\nExplain: "+stringa);    
    });
};

