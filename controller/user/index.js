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

user.signin = function(obj, callback) {
    var nick = obj.body.nick,
        pass = obj.body.pass;
    if(nick.length == 0 || pass.length == 0) {
        return callback("Insert Nick && Pass, please!");
    }
    else {
        //Crypt Salt
        var shasum = crypto.createHash('sha1');
        shasum.update(config.web.secret_salt);
        var saltcrypted = shasum.digest('hex');
        //Crypt Pass
        shasum = crypto.createHash('sha1');
        shasum.update(pass);
        var passcrypted = shasum.digest('hex');
        //Crypt everything
        shasum = crypto.createHash('sha1');
        shasum.update(saltcrypted+passcrypted);
        var everythingcrypted = shasum.digest('hex');

        models.Utenti.count( { nick: nick }, function(err, conto) {
            if(conto > 0) {
                models.Utenti.all( { where: { nick: nick }, limit: 1}, function(err, dati) {
                    if(dati[0].password === everythingcrypted) {
                        obj.session.nick = dati[0].nick;
                        obj.session.id = dati[0].id;
                        
                        return callback("Login Successfull!");
                    }
                    else {
                        callback("Password Incorrect!");
                    }
                });
            }
            else {
                return callback("User not found!");
            }
        });
    }
};
