//
// Configuration
//

var config = require('../../config');

//
// SignIn Process
//

exports.signin = function(req, res) {
    var nick = req.body.nick;
    var pass = req.body.pass;
    console.log("Ho ricevuto questi dati: %s %s",nick,pass);
    if(nick == 'DLion' && pass == 'prova') {
        req.session.id = 1;
        req.session.nick = nick;
        req.session.admin = true;
    }

    //Qui ci va tutta la merda con il DB :| good luck
    res.redirect('/loggato');
};
