var config    = require('../../config'),
	models    = require('../../models'),
    utilities = require('../../utilities/function.js'),
    user      = require('../user'),
    cate      = require('../category'),
    post      = exports;

/*
 * Questa funzione gestisce la lista dei post, funziona anche
 * per impaginare, basta dare in input get un parametro page
 * il parametro verrà moltiplicato per 10 (numero di post per pagina)
 */

post.list = function(obj, callback){
	var page = (obj.params.pg !== null) ? obj.params.pg : 1;

    models.articolo.find({},function(err, articoli) {
        if(articoli.length > 0) {
		        //error reporting
		        if(err) {
			        console.log(err);
			        return;
		        }
                return callback(articoli.length,articoli);
        }
        else {
            return callback(articoli.length, "Nessun Articolo Disponibile!");
        }
    });
};


/*
 * Questa funzione gestisce la richiesta di un solo articolo del
 * blog
*/

post.show = function(obj, callback){
    if(obj.params.titolo == null) {
        return callback(-1, "Impossibile identificare il titolo dell'articolo");
    }
    models.articolo.findOne({ titolo: obj.params.titolo }, function(err, articolo) {
        if(articolo) {
            callback(1,articolo);
		}
        else {
            return callback(0,"L'articolo non esiste!");
        }
    });
};

//
// Create Article
//

post.create = function(obj, callback){
    var inserisci = new models.articolo({
        titolo: obj.body.titolo,
		testo: obj.body.testo,
        autore: obj.session.nick,
        tag: obj.body.tag
    });

    inserisci.save(function(err) {
        if(err){
            console.log(err);
			return callback(-1,err);
		}

		return callback(1,"Post aggiunto");
    });
};

/*

//
// Update Article
//

post.update = function(obj, callback){
    models.Post.count( { id: obj.params.id }, function(err, numero) {
        if(numero > 0) {
            models.Post.get(obj.params.id, function(err, p){
                p.titolo       = obj.body.titolo;
                p.testo        = obj.body.testo;
                p.categoria_id = obj.body.categoria_id;
                p.save(function(err){
                    if(err){
                        console.log(err);
                        return;
			        }
                    return callback("Articolo aggiornato");
		        });
	        });
        }
        else {
            return callback("Articolo non trovato");
        }
    });
};

//
// Cancella un Articolo
//

post.del = function(obj, callback){
    models.Post.count( { id: obj.params.id }, function(err, conto) {
        if(conto > 0) {
            models.Post.get(obj.params.id, function(err, articolo){
                articolo.remove(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    return callback("Articolo rimosso correttamente");
                });
            });
        }
        else {
            return callback("L'articolo non esiste!");
        }
    });
};

//
// Articoli per Categorie
//

post.byCat = function(obj, callback){
	var page = (obj.params.pg !== null) ? obj.params.pg : 1;

	models.Post.pages(function(err, articoli) {
        if(articoli > 0) {
            models.Post.count( { categoria_id: obj.params.cat }, function(err, count) {
                if(count > 0) {
                    models.Post.page(page).find( { categoria_id: obj.params.cat } ).order('id', 'Z').run(function(err, resp){
                        //error reporting
		                 if(err) {
			                console.log(err);
			                return;
		                }
		                return callback(count, resp);
                    });
                }
                else {
                    callback(count,"Nessun articolo per questa categoria!");
                }
            });
        }
        else {
            return callback(articoli, "Nessun Articolo Disponibile!");
        }
    });
};
*/
