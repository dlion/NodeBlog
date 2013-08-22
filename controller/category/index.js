var config    = require('../../config'),
	models    = require('../../models'),
    utilities = require('../../utilities/function.js'),
	category  = exports;

//
// Lista le categorie
// 

category.list = function(callback) {
    models.Categorie.count(function(err, count) {
        if(err) {
            console.log(err);
            return;
        }
        //Se ci sono categorie
        if(count > 0) {
            //little hack
            models.Categorie.find({1:'1'}, function(err, resp) {
                // error reporting
                if(err) {
                    console.log(err);
                    return;
                }

                console.log("CATE: "+resp);
                return callback(count, resp);
            });
        }
        else {
            return callback(-1, "Non ci sono cagetorie!");
        }
    });
};

//
// Get Category for form
//
category.show = function(obj, callback){
    if(obj.params.id == null) {
        return callback(-1, "Impossibile identificare l'id dellla categoria");
    }
    models.Categorie.count( { id: obj.params.id }, function(err, count) {
        if(err) {
            console.log(err);
            return;
        }
        // Se la categoria esiste
        if(count > 0) {
            models.Post.get(obj.params.id,function (err, resp) {
                if(err){
                    console.log(err);
                    return;
                }
                callback(1,resp);
            });
        }
        else {
            return callback(0,"LA categoria non esiste!");
        }
    });
};


//
// Add Category
//

category.add = function(req, callback) {
    models.Categorie.create( {
        title: req.body.title,
        descr: req.body.descr
    },function(err, item) {
        if(err) {
            console.log(err);
            return callback(-1, err);
        }
        return callback(1,"Categoria aggiunta");
    });
};

//
// Update category
//

category.update = function(obj, callback){
    models.Categorie.count({id: obj.params.id}, function (err, numero){
        if(numero > 0){
            models.Categorie.get(obj.params.id, function (err, c){
                c.title = obj.body.title;
                c.descr = obj.body.descr;

                c.save(function (err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    return callback ("Categoria aggiornata correttamente");
                });
            });
        }
        else{
            return callback("Categoria non esistente");
        }
    });
};

//
// Delete a category
//

category.del = function (obj, callback){
    models.Categorie.count({id: obj.params.id}, function (err, number){
        if(number > 0){
            models.Categorie.get(obj.params.id, function(err, category){
                category.remove( function (err){
                    if (err){
                        console.log(err);
                        return;
                    }
                    return callback("Articolo rimosso con successo");
                });
            });
        }
        else{
            return callback("L'articolo non esiste");
        }
    });
};