var config = require('../../config'),
	models = require('../../models'),
	post = exports;

/*
 * Questa funzione gestisce la lista dei post, funziona anche
 * per impaginare, basta dare in input get un parametro page
 * il parametro verrà moltiplicato per 10 (numero di post per pagina)
 */

post.list = function(obj, callback){
	var page = (obj.params.pg !== null) ? obj.params.pg : 1;
    
	models.Post.pages(function(err, articoli) {
        if(articoli > 0) {
            models.Post.page(page).run(function(err, resp){
		        //error reporting
		        if(err) {
			        console.log(err);
			        return;
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

//da qui in poi vanno provate

/***
 * Questa funzione gestisce l'immissione di un post nel database
*/
post.create = function(obj, callback){
	models.Post.create({
		titolo:        obj.body.titolo,
		testo:         obj.body.testo,
		categoria_id:  obj.body.categoria_id,
		autore_id:     obj.session.id
	}, function(err, item){
		if(err){
			console.log(err);
			callback(err);
			return;
		}
		callback("Post aggiunto");
	});
};
/***
 * Questa funzione gestisce l'aggiornamento di un post nel database
 */

post.update = function(obj, callback){
	models.Post.get(obj.params.id, function(err, p){
		p.titolo       = obj.body.titolo;
		p.testo        = obj.body.testo;
		p.categoria_id = obj.body.categoria_id;
		p.save(function(err){
			if(err){
				console.log(err);
				return;
			}
			callback("Articolo aggiornato");
		});
	});
};
/***
 * Questa funzione gestisce la rimozione di un post dal database
 */

//funziona
post.del = function(obj, callback){
	models.Post.get(obj.params.id, function(err, p){
		p.remove(function(err){
			if(err){
				console.log(err);
				return;
			}
			callback("post rimosso");
		});
	});
};
