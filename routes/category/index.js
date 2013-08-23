var config = require ('../../config/'),
    controllerCategory = require('../../controller/category'),
    user = require('../../controller/user'),
    category = exports;


// 
// Show Form to create a new Category
// 

category.showNew = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            res.render('category/new', {
                namesite: config.web.namesite,
                title: 'Aggiungi categorie',
                base: config.web.base
            });
        }
        else {
            res.redirect('/login');
        }
    });
};

//
// List the category options for the dashboard
//

category.list = function (req, res){
    user.isLogged(req, function (risultato){
        if(risultato > 0){
            controllerCategory.list(function(resp,dati){
                res.render('admin/categories', {
                    namesite: config.web.namesite,
                    title: 'Lista delle Categorie',
                    base: config.web.base,
                    numero: resp,
                    dato: dati
                });
            });
        }
        else{
            res.redirect('/login');
        }
    });
};

//
// Add a new Category
//

category.add = function(req, res) {
    user.isLogged(req, function(risultato) {
        if(risultato > 0) {
            if(req.body.title && req.body.descr) {
                controllerCategory.add(req, function(respo, risu) {
                    res.send(risu);
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
// Show Form to update a category
//

category.showUpdate = function (req, res) {
    user.isLogged(req, function(risultato){
        if(risultato > 0){
            controllerCategory.show(req, function(respo, risu){
                console.log(risu);
                res.render('category/update', {
                    namesite: config.web.namesite,
                    title: 'Modifica Categoria',
                    base: config.web.base,
                    obj: risu
                });
            });
        }
        else{
            res.redirect('/login');
        }
    });
};

//
// Update a category
//

category.update = function (req, res){
    user.isLogged(req, function(result){
        if (result > 0){
            if (req.body.title && req.body.descr){
                controllerCategory.update(req, function(resp, result){
                    res.send(result);
                });
            }
            else{
               res.send("Complete all fields of form, please!"); 
            }
        }
        else{
            res.redirect('/login');
        }
    });
};

//
// Delete a category
//

category.del = function (req, res){
    user.isLogged(req, function(result){
        if(result > 0){
            controllerCategory.del(req,function (resp, result){
                res.send(result);
            });
        }
        else{
            res.redirect('/login');
        }
    });
};
