//
// Configuration
//

var config = require('../../config'),
    models = require('../../models'),
    utilities = require('../../utilities/function.js'),
    crypto = require('crypto');

var user = exports;

//
// Function to return user's information by ID
// chi: ID (number)
// cosa: id, nic, emai,etc. (string)
// callback: function
// next: error handle
// 

var EverythingById = function(chi,cosa,callback,next) {
    var elementi = [ 'id', 'nick', 'email', 'password', 'hash', 'last_login' ];
    if(utilities.inArray(elementi,cosa)) {
        models.Utenti.all( { where: { id: chi } }, function(err, dati) {
            /*
             * Questa non funziona!
             * if(err)
             *  next(err);
             */

            callback(dati[0][cosa]);
        });
    }
    else
        next("Error on EverythingById: '"+cosa+ "' doesn't find!");
};

//
// Prova
// 

user.prova = function(req, res,next) {
    EverythingById(1,'password',console.log,next);
};

//
// SignIn Process
//

user.signin = function(req, res) {
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
