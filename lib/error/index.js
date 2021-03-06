var express = require('express'),
    app = module.exports = express(),
    // Configuration file
    config = require('../../config');

//
// 404 Page Not Found Error
//

app.use(function(req, res) {
    res.status(404);
    var dati = {
        namesite: config.web.namesite,
        title: '404 Page Not Found!',
        content: 'Where are you going, motherfoca!?'
    };
    dati.username = (req.session.logIN == true) ? req.session.nick : '';
    res.render('404',dati);
});

//
// 500 Error
//

app.use(function(error, req, res, next) {
    res.status(500);
    var dati = {
        namesite: config.web.namesite,
        title: '500 Fucking Error!',
        content: 'What do you do, motherfoca!?',
        error: error
    };
    dati.username = (req.session.logIN == true) ? req.session.nick : '';
    res.render('500', dati);
});
