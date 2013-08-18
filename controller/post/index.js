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

	models.Post.page(page).run(function(err, resp){
		//error reporting
		if(err) {
			console.log(err);
			return;
		}
		console.log(resp); //debug pourpose
		callback(resp);
	});
};

/***
 * Questa funzione gestisce la richiesta di un solo articolo del 
 * blog
*/


post.show = function(obj, callback){
	models.Post.get(obj.params.id,function (err, resp) {
			if(err){
				console.log(err);
				return;
			}
	        callback(resp);
		}
	);
};