var config = require('../config'),
    Schema = require('jugglingdb').Schema;

//
// JugglingDb Config
//

var schema = new Schema('mysql', {
                database: config.jugglingdb.db,
                username: config.jugglingdb.user,
                password: config.jugglingdb.pass
});

var models = exports;

//
//Define Models
//

models.Utenti = schema.define('utenti', require('./utenti'));
models.Post = schema.define('post', require('./post'));
models.Categorie = schema.define('categorie', require('./categorie'));

//
//Define Relationship
//
models.Utenti.hasMany(models.Post, {as: 'post', foreignKey:'autore'});
//crea roba del tipo Utenti.post.all()
models.Categorie.hasMany(models.Post, {as: 'categoria', foreignKey: 'id_categoria'});
//fghjkl