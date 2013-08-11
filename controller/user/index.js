//
// Configuration
//

var config = require('../../config')
 ,  models = require('../../models')
 ,  user = exports;

//
// SignIn Process
//

user.signin = function (req, res) {
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

//questo è un POC, bisogna poi provare
user.all = function (callback){
    models.Utenti.all(function(err, resp){
        if (err !== null) throw err;
        callback(resp);
    });
};

//qui c'è anche un minimo di paginazione
user.list = function (obj, callback) {
    models.Utenti.all(
        {order:'id', limit:20, skip:obj.skip},

        function(err, resp){
            if (err !== null) throw err;
            callback(resp);
        }
    );
};
