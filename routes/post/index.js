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
            base: config.web.base,
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
                base: config.web.base, 
                title: '500 Fucking Error!', 
                content: obj, 
                error: '' 
            });
        }
        else if(response == 0) {
            res.render('404', { 
                namesite: config.web.namesite, 
                base: config.web.base,
                title: '404 Article Not Found!', 
                content: obj 
            });
        }
        else {
            res.render('post/show', {
                namesite: config.web.namesite,
			    title: obj.titolo,
                base: config.web.base,
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
	controller.create(req, function(response,obj){
        res.send( { status: obj } );
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
					res.render('post/form', { 
                        obj: null,
                        base: config.web.base
                    });
			}
			else{
				controller.show(req, function (response, content){
					if(response > 0){
						res.render('post/form', {
                       		obj: content,
                            base: config.web.base
                    	});
					}
					else{
						res.status('404');
					}
                    
				});
			}
		}
		else{
			res.redirect('/login');
		}
	});
};

//
// Dashboard
// 

post.dashboard = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            controller.list(req, function(number,arr){
            	if(number > 0) {
                    res.render('admin/dashboard',{
                        numero: number,
                        base: config.web.base,
                        obj:arr
                    });
                }
                else {
                    res.render('admin/dashboard', {
                        numero: number,
                        base: config.web.base,
                        obj: "Nessun Articolo Disponibile!"
                    });
                }
            });
        }
        else {
            res.redirect('/login');
        }
    });
};

post.byCat = function(req, res){
    controller.byCat(req, function(number,obj){
        res.render('post/index',  {
            namesite: config.web.namesite,
            title: config.web.namesite,
            numero: number,
            base: config.web.base,
            arr: obj 
        });
    });
}
