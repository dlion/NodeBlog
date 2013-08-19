var config       = require ('../../config/'),
    controller   = require ('../../controller/post'),
    user		 = require('../../controller/user'),
    post         = exports;

/*
 * This is the route function for the index of the blog
 * this handle the cronological list of all the posts
 */

post.list = function (req, res) {
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
 * This function is the JSON api for post listing
 *
 */

post.listJSON = function (req, res){
	controller.list(req, function (number, obj){
		res.send(obj);
	});
};

/***
 * This is the route function for the single pages of the blog
 * this handle the single post
 */

post.show = function (req, res) {
    controller.show(req, function(response,obj){
    	if(response < 0) {
            res.render('500', { 
                namesite: config.web.namesite, 
                title: '500 Fucking Error!', 
                content: obj, 
                error: '' 
            });
        }
        else if(response == 0) {
            res.render('404', { 
                namesite: config.web.namesite, 
                title: '404 Article Not Found!', 
                content: obj 
            });
        }
        else {
            res.render('post/show', {
                namesite: config.web.namesite,
			    title: obj.titolo,
			    arr: obj
            });
        }
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

/***
 * This function render the form for updating or
 * create a Post
 */

post.formRender = function (req, res){
	user.isLogged(req, function(logged){
		if(logged > 0){
			if(req.params.id === "new"){
					res.render('post/form', {obj:null});
			}
			else{
				controller.show(req, function (arr){
                    res.render('post/form', {
                        obj: arr
                    });
				});
			}
		}
		else{
			res.redirect('/login');
		}
	});
};
