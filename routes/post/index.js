var config       = require ('../../config/'),
    controller   = require ('../../controller/post'),
    user		 = require('../../controller/user'),
    cate         = require('../../controller/category'),
    post         = exports;

//
// Lista gli articoli
//

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


//
// Ritorna le info di un singolo Articolo
//
/*
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
            // Prendo le info dell'autore
            user.getInfo(obj.autore_id,"nick", function(autore) {
                // Prendo le info della categoria
                cate.getInfo(obj.categoria_id,"title", function(categoria) {
                    res.render('post/show', {
                        namesite: config.web.namesite,
                        title: obj.titolo,
                        base: config.web.base,
                        articolo: obj,
                        autore: autore,
                        categoria: categoria
                    });
                });
            });
        }
    });
};

//
// Show Form to create a new Article
//

post.showNew = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            cate.list(function(resp, categorie) {
                res.render('post/new', {
                    namesite: config.web.namesite,
                    title: 'Aggiungi Articolo',
                    base: config.web.base,
                    categorie: categorie
                });
            });
        }
        else {
            res.redirect('/login');
        }
    });
};

//
// Create a new Article
//

post.createNew = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            if(req.body.titolo && req.body.testo && req.body.categoria_id) {
                controller.create(req, function(response, risultato) {
                    res.send(risultato);
                });
            }
            else {
                res.send("Complete all fields of form, please!");
            }
       }
        else {
            res.redirect('/login');
        }
    });
};

//
// Show Form to modify Article
//

post.modify = function(req, res) {
    if(req.params.id) {
        user.isLogged(req, function(risultato) {
            if(risultato > 0) {
                controller.show(req, function(resp, info) {
                    if(resp > 0) {
                        cate.list(function(resp, categorie) {
                            res.render('post/modify', {
                                namesite: config.web.namesite,
                                title: 'Modifica Articolo',
                                base: config.web.base,
                                data: info,
                                categorie: categorie
                            });
                        });

                    }
                    else {
                        res.render('404', {
                            namesite: config.web.namesite,
                            base: config.web.base,
                            title: '404 Article Not Found!',
                            content: info
                        });
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });
    }
    else {
        res.render('500', {
            namesite: config.web.namesite,
            base: config.web.base,
            title: '500 Fucking Error!',
            content: info,
            error: ''
        });
    }
};

//
// Update and Article
//

post.update = function (req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            if(req.body.titolo && req.body.testo && req.body.categoria_id) {
                controller.update(req, function(obj){
                    res.send(obj);
	            });
            }
            else {
                res.send("Complete all field of form, please!");
            }
        }
        else {
            res.redirect('/login');
        }
    });
};

//
// Delete a single Articles
//

post.del = function (req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            controller.del(req, function(obj){
		    res.send(obj);
            });
        }
        else {
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
                        namesite: config.web.namesite,
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

//
// Show Post by Category
//

post.byCat = function(req, res){
    controller.byCat(req, function(number,obj){
        res.render('post/index',  {
            namesite: config.web.namesite,
            title: config.web.namesite,
            base: config.web.base,
            numero: number,
            arr: obj
        });
    });
};

//
// Per le API
//

post.listJSON = function (req, res){
	controller.list(req, function (number, obj){
		res.send(obj);
	});
};
*/
