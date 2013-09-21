//
// Configuration
//

var config    = require('../../config');
var models    = require('../../models');
var utilities = require('../../utilities/function.js');
var user      = exports;

//
// Check if an user is Logged
//

user.isLogged = function(obj, callback) {
    if(!obj.session.nick || !obj.session.userID || !obj.session.logIN) {
        return callback(0);
    }
    else {
        return callback(1);
    }
};

//
// SignIn Process
//

user.signin = function(obj, callback) {
    var nick = obj.body.nick,
        pass = obj.body.pass;
    if(nick.length == 0 || pass.length == 0) {
        return callback(-1,"Insert Nick && Pass, please!");
    }
    else {
       // Crypt Salt
        var saltcrypted = utilities.cryptSha1(config.web.secret_salt);
       // Crypt Pass
        var passcrypted = utilities.cryptSha1(pass);
        // Crypt everything
        var everythingcrypted = utilities.cryptSha1(saltcrypted+passcrypted);
        //Conto gli utenti con il nick e la pass
        models.utenti.find({ nick: nick, password: everythingcrypted }, function(err, dato) {
            if(err) {
                console.log(err);
                return;
            }
            if(dato.length > 0) {
                obj.session.nick = dato.nick;
                obj.session.nome = dato.nome;
                obj.session.cognome = dato.cognome;
                obj.session.pic = dato.pic;
                obj.session.email = dato.email;
                obj.session.userID = dato._id;
                obj.session.logIN = true;
                return callback(1, "Login Successfull!");
            }
            else {
                return callback(0,"Login Incorrect!");
            }
        });
    }
};

//
// SignOut Process
//

user.signout = function(obj, callback) {
    if(obj.session.nick || obj.session.userID || obj.session.logIN) {
        obj.session.destroy(function(err) {
            if(err) {
                console.log(err);
                return;
            }
            else {
                callback(1);
            }
        });
    }
};
