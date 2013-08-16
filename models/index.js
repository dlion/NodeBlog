var config = require('../config'),
    orm = require('orm'),
    paging = require('orm-paging');

var models = exports;


//
//Define and initialize Models
//

function setup(db) {
    models.Utenti = db.define('utenti', require('./utenti'));
    models.Post = db.define('post', require('./post'));
    models.Categorie = db.define('categorie', require('./categorie'));
    
    //
    //Associations
    //
    models.Post.hasOne('autore', models.Utenti);
    models.Utenti.hasMany('articoli', models.Post);
    models.Post.hasOne('categoria',models.Categorie);
};

//
// ORM Connect
//

orm.connect("mysql://"+config.orm.user+":"+config.orm.pass+"@"+config.orm.host+"/"+config.orm.db, function(err, db) {
    if(err) {
        console.log("Impossibile stabilire una connessione!",err);
        return;
    }
    //Use Paging
    db.use(paging);
    //Initialize Models
    setup(db);
});

