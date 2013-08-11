//
// Configuration
//

var config = require('../../config'),
    models = require('../../models'),
    crypto = require('crypto');

var user = exports;

//
// Function to returns user's password by ID
//

var PassById = function(chi, callback) {
    models.Utenti.all( { where: { id: chi } }, function(err, dati) {
        if(err !== null) throw err;
        
        callback(dati[0].password);
    });
};

//
// Function to returns user's ID by Nick
//

var IdByNick = function(chi, callback) {
    models.Utenti.all( { where: { nick: chi } }, function(err, dati) {
        if(err !== null) throw err;

        callback(dati[0].nick);
    });
};

//
// Prova Stampa Pass by ID
//

user.list = function(res, req) {
    PassById(1,console.log);
};

//
// SignIn Process
//

user.signin = function (req, res) {
    var nick = req.body.nick;
    var pass = req.body.pass;

    //
    // Per criptare qualcosa con lo sha1 utilizzo il modulo crypt
    //
    
    var shasum = crypto.createHash('sha1');
    shasum.update(pass);
    var passcrypted = shasum.digest('hex');
    
    console.log("Ho ricevuto questi dati: %s %s\nLa pass criptata è: %s",nick,pass,passcrypted);
    if(nick == 'DLion' && pass == 'ciao') {
        req.session.id = 1;
        req.session.nick = nick;
        req.session.admin = true;
    }

    //Qui ci va tutta la merda con il DB :| good luck
    res.redirect('/loggato');
};
