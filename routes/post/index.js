var config       = require ('../../config/'),
    controller   = require ('../../controller/post'),
    post         = exports;

/*
 * This is the route function for the index of the blog
 * this handle the cronological list of all the posts
 */

post.list = function(req, res) {
	controller.list(req, function(number,obj){
		res.render('post/index',  {
			namesite: config.web.namesite,
			title: config.web.namesite,
            numero: number,
			arr: obj 
		});
	});
};

/***
 * This is the route function for the single pages of the blog
 * this handle the single post
 */

post.show = function (req, res) {
    controller.show(req, function(obj){
    	res.render('post/show', {
    		namesite: config.web.namesite,
			title: obj.titolo,
			arr: obj 
    	});
    });
}
/***
 * This is the route function for the single
 * post update, it returns a JSON obj
 */
post.update = function (req, res) {
	controller.update(req, function(obj){
		res.send({status:obj});
	});
};
/***
 * This is the route function for the single post
 * delete
 */
post.del = function (req, res) {
	controller.del(req, function(obj){
		res.send({status:obj});
	});
};
/***
 * This is the route function for the single post
 * create
 */
post.create = function (req, res) {
	controller.create(req, function(obj){
		res.send({status:obj});
	});
};