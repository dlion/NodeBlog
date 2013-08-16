var config = require('../../config'),
	models = require('../../models'),
	post = exports;


/*
 *
 * DEPRECATED --- BISOGNA AGGIORNARLE PER IL NUOVO ORM
 *
 *
 *
 *
 *
 * Questa funzione gestisce la lista dei post, funziona anche
 * per impaginare, basta dare in input get un parametro page
 * il parametro verrà moltiplicato per 10 (numero di post per pagina)
 *

post.list = function(obj, callback){
	//plz usiamo questi a capo se no non ho abbastanza schermo per vedere tutto :S
	models.Post.all( 
		{ order: 'id', limit: 10, skip: ((obj.params.page !== null) ? obj.params.page * 10 : 0)},
		function (err, resp, next) { 
			if(err !== null){
				return next(err);
			}
			callback(resp);
		}
	);
};

/***
 * Questa funzione gestisce la richiesta di un solo articolo del 
 * blog


post.show = function(obj, callback){
	//non ho capito perché non posso usare id ma
	//devo usare id_ se lo capisci dimmelo XD
	models.Post.find(obj.params.id_, 
		function (err, resp, next) {
			if(err !== null){
				return next(err);
			}
	        callback(resp);
		}
	);
};
*/

