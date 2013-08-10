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

