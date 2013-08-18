//
// Configuration
//

var config = require('../../config'),
    models = require('../../models'),
    utilities = require('../../utilities/function.js');

var user = exports;

//
// Function to return user's information by ID
// chi: ID (number)
// cosa: id, nic, emai,etc. (string)
// callback: function
// next: error handle
// 

var EverythingById = function(chi,cosa,callback) {
    var elementi = [ 'id', 'nick', 'email', 'password', 'hash', 'last_login' ];
    if(utilities.inArray(elementi,cosa)) {
        models.Utenti.get(chi, function(err, user) {
            callback(user[cosa]);
        });
    }
};

//
// Check if an user is Logged
//

user.isLogged = function(obj, callback) {
    if(!obj.session.nick || !obj.session.id || !obj.session.logIN) {
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
        models.Utenti.count( { nick: nick, password: everythingcrypted }, function(err, count) {
            if(err) {
                console.log(err);
                return;
            }
            //Se ho degli utenti che corrispondono
            if(count > 0) {
                models.Utenti.find( { nick: nick, password: everythingcrypted }, 1, function(err, utente) {
                    obj.session.nick = nick;
                    obj.session.id = utente.id;
                    obj.session.logIN = true;
                    //Qui ci dovrebbe andare il save ma non funge :S
                    return callback(1, "Login Successfull!");
                });
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
    if(obj.session.nick || obj.session.id || obj.session.logIN) {
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
