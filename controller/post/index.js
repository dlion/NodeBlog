var config    = require('../../config'),
	models    = require('../../models'),
    utilities = require('../../utilities/function.js'),
    user      = require('../user'),
    post      = exports;

/*
 * Questa funzione gestisce la lista dei post, funziona anche
 * per impaginare, basta dare in input get un parametro page
 * il parametro verrà moltiplicato per 10 (numero di post per pagina)
 */

post.list = function(obj, callback){
	var page = (obj.params.pg !== null) ? obj.params.pg : 1;

    models.articolo.find({}, null, { sort: { creato_il: -1 } }, function(err, articoli) {
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
    if(obj.params.id == null) {
        return callback(-1, "Impossibile identificare il titolo dell'articolo");
    }
    models.articolo.findById(obj.params.id, function(err, articolo) {
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
    // Splitto i vari tag creando un array di tag
    var tagghi = obj.body.tag.split(',');

    var inserisci = new models.articolo({
        titolo: obj.body.titolo,
		testo: obj.body.testo,
        autore: obj.session.nick
    });

    for(var indice in tagghi) {
        inserisci.tag.push(tagghi[indice].trim());
    }

    inserisci.save(function(err) {
        if(err){
            console.log(err);
			return callback(-1,err);
		}

		return callback(1,"Post aggiunto");
    });
};

//
// Update Article
//

post.update = function(obj, callback){
    models.articolo.findByIdAndUpdate(obj.params.id,{
        titolo: obj.body.titolo,
        testo: obj.body.testo,
        tag: obj.body.tag
    }, function(err, dato) {
        if(err){
            console.log(err);
            return;
		}
        if(dato) {
            return callback("Articolo aggiornato");
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
    models.articolo.findByIdAndRemove(obj.params.id, function(err, articolo) {
        if(err){
            console.log(err);
            return;
        }
        if(articolo) {
            return callback("Articolo rimosso correttamente");
        }
        else {
            return callback("L'articolo non esiste!");
        }
    });
};
