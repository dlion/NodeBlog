var config = require ('../../config/'),
    post   = require ('../../controller/post');

/***
 * This is the route function for the index of the blog
 * this handle the cronological list of all the posts
 */
exports.index = function (req, res) {
	if(req.skip === null){
		req.skip = 0;
	}
	post.list(req, function(obj){
		res.render('post',  {
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

exports.show = function (req, res) {
	//non so se questa condizione si avvererà mai ma meglio 
	// scoprirlo in altre maniere
    if(req.params.id === null ){
		res.status(404);
    	res.render('404.ejs', { namesite: config.web.namesite, title: '404 Page Not Found!', content: 'There are no articles like that' });
	}
	else {
		post.show(req, function(obj){
			res.render('post/singlepage',  {
				namesite: config.web.namesite,
				title: 'Login',
				arr: obj
			});
		});
	}
}
