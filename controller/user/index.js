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

var EverythingById = function(chi,cosa,callback) {
    var elementi = [ 'id', 'nick', 'email', 'password', 'hash', 'last_login' ];
    if(utilities.inArray(elementi,cosa)) {
        models.Utenti.get(chi, function(err, user) {
            callback(user[cosa]);
        });
    }
};


//
// SignIn Process
//

user.signin = function(obj, callback) {
    var nick = obj.body.nick,
        pass = obj.body.pass;
    if(nick.length == 0 || pass.length == 0) {
        return callback("Insert Nick && Pass, please!");
    }
    else {
       // Crypt Salt
        var shasum = crypto.createHash('sha1');
        shasum.update(config.web.secret_salt);
        var saltcrypted = shasum.digest('hex');
       // Crypt Pass
        shasum = crypto.createHash('sha1');
        shasum.update(pass);
        var passcrypted = shasum.digest('hex');
        // Crypt everything
        shasum = crypto.createHash('sha1');
        shasum.update(saltcrypted+passcrypted);
        var everythingcrypted = shasum.digest('hex');
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

                    return callback("Login Successfull!");
                });
            }
            else {
                return callback("Login Incorrect!");
            }
        });
    }
};
