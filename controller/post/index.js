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

	models.Post.pages(function(err, articoli) {
        if(articoli > 0) {
            models.Post.page(page).order('id', 'Z').run(function(err, resp){
		        //error reporting
		        if(err) {
			        console.log(err);
			        return;
		        }

                // Questo dovrebbe darmi in console tutti i dati, invece mi ritorna il titolo di tutti (GIUSTO)
                // Ma i dati solo del primo! (SBAGLIATO)
                // Che potrebbe essere?

                for(var index in resp){
                    console.log("DAFUQ: "+resp[index].titolo);
                    user.getInfo(resp[index].autore_id,"nick",function(nick) {
                        cate.getInfo(resp[index].categoria_id, "title", function(categoria_nome) {
                            console.log("Post: "+resp[index].titolo+"\nAutore: "+nick+"\nCategoria: "+categoria_nome);
                        });
                    });
                }
		        return callback(articoli, resp);
	        });
        }
        else {
            return callback(articoli, "Nessun Articolo Disponibile!");
        }
    });
};


/***
 * Questa funzione gestisce la richiesta di un solo articolo del
 * blog
*/

post.show = function(obj, callback){
    if(obj.params.id == null) {
        return callback(-1, "Impossibile identificare l'id dell'articolo");
    }
    models.Post.count( { id: obj.params.id }, function(err, count) {
        if(err) {
            console.log(err);
            return;
        }
        // Se il post esiste
        if(count > 0) {
            models.Post.get(obj.params.id,function (err, resp) {
				if(err){
					console.log(err);
					return;
				}
		        callback(1,resp);
	        });
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
        models.Post.create({
            titolo: obj.body.titolo,
		    testo: obj.body.testo,
		    categoria_id: obj.body.categoria_id,
		    autore_id: obj.session.userID,
            data: utilities.getTimestamp()
        },function(err, item){
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
