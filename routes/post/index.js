var config       = require ('../../config/'),
    controller   = require ('../../controller/post'),
    post         = exports;

/*
 * This is the route function for the index of the blog
 * this handle the cronological list of all the posts
 */
post.list = function (req, res) {
	controller.list(req, function(obj){
		res.render('post/index',  {
			namesite: config.web.namesite,
			title: config.web.namesite,
			//ho assegnato il callback del controller 
			//ad un'altra variabile
			arr: obj 
		});
	});
};
/***
 * This is the route function for the single pages of the blog
 * this handle the single post
 */

post.show = function (req, res) {
	//non so se questa condizione si avvererà mai ma meglio 
	// scoprirlo in altre maniere
    controller.show(req, function(obj){
    	res.render('post/show', {
    		namesite: config.web.namesite,
			title: config.web.namesite,
			//ho assegnato il callback del controller 
			//ad un'altra variabile
			arr: obj 
    	});
    });
}
