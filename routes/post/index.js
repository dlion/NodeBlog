var config       = require ('../../config/'),
    controller   = require ('../../controller/post'),
    user		 = require('../../controller/user'),
    marked       = require('marked'),
    post         = exports;

//
// Lista gli articoli
//

post.list = function (req, res) {
	controller.list(req, function(number,obj){
        var dati = {
            namesite: config.web.namesite,
            title: "Home",
            numero: number,
            base: config.web.base,
            username: '',
            arr: obj
        };
        if(req.session.logIN == true) {
            dati.username = req.session.nick;
        }
        res.render('post/index', dati);
    });
};


//
// Ritorna le info di un singolo Articolo
//

post.show = function (req, res) {
    controller.show(req, function(response,obj){
        var dati = {
            namesite: config.web.namesite,
            base: config.web.base,
            username: ''
        };
        //Set Username or leave blank
        dati.username = (req.session.logIN == true) ? req.session.nick : '';

    	if(response < 0) {
            dati.title = '500 Fucking Error!';
            dati.content = obj;
            dati.error = '';
            res.render('500', dati);
        }
        else if(response == 0) {
            dati.title = '404 Article Not Found!';
            dati.content = obj;
            res.render('404',dati);
        }
        else {
            dati.title = obj.titolo;
            dati.articolo = marked(obj.testo,{ sanitize: true});
            dati.autore = obj.autore;
            dati.tag = obj.tag;
            res.render('post/show', dati);
        }
    });
};


//
// Show Form to create a new Article
//

post.showNew = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            var dati = {
                namesite: config.web.namesite,
                username: req.session.nick,
                title: 'Aggiungi Articolo',
                base: config.web.base
            };

            res.render('post/new',dati);
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
            if(req.body.titolo && req.body.testo && req.body.tag) {
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
                    var dati = {
                        namesite: config.web.namesite,
                        username: '',
                        base: config.web.base
                    };
                    //Set Username or leave blank
                    dati.username = (req.session.logIN == true) ? req.session.nick : '';

                    if(resp > 0) {
                        dati.title = 'Modifica Articolo';
                        dati.data = info;
                        res.render('post/modify',dati);
                    }
                    else {
                        dati.title = '404 Article Not Found!';
                        dati.content = info;
                        res.render('404',dati);
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });
    }
    else {
        var dati = {
            namesite: config.web.namesite,
            base: config.web.base,
            title: '500 Fucking Error!',
            content: info,
            error: ''
        };
        //Set Username or leave blank
        dati.username = (req.session.logIN == true) ? req.session.nick : '';
        res.render('500',dati);
    }
};

//
// Update and Article
//

post.update = function (req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            if(req.body.titolo && req.body.testo && req.body.tag) {
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
                var dati = {
                    namesite: config.web.namesite,
                    numero: number,
                    base: config.web.base
                };
                //Set Username or leave blank
                dati.username = (req.session.logIN == true) ? req.session.nick : '';

            	if(number > 0) {
                    dati.obj = arr;
                    res.render('admin/dashboard', dati);
                }
                else {
                    dati.obj = 'Nessun Articolo Disponibile!';
                    res.render('admin/dashboard', dati);
                }
            });
        }
        else {
            res.redirect('/login');
        }
    });
};

//
// Tag Search
//

post.tagSearch = function(req, res) {
    controller.tagSearch(req,function(number, obj) {
        var dati = {
            namesite: config.web.namesite,
            title: "TagSearch",
            numero: number,
            base: config.web.base,
            username: '',
            arr: obj
        };
        if(req.session.logIN == true) {
            dati.username = req.session.nick;
        }
        res.render('post/index', dati);
    });
};
