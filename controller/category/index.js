var config    = require('../../config'),
	models    = require('../../models'),
    utilities = require('../../utilities/function.js'),
	category  = exports;



//
// Return Category infos
//

category.getInfo = function(chi,cosa,callback) {
    var elementi = [ 'id', 'title', 'descr' ];
    if(utilities.inArray(elementi,cosa)) {
        models.Categorie.count( { id: chi }, function(err, count) {
            if(count > 0) {
                models.Categorie.get(chi, function(err, cate) {
                return callback(cate[cosa]);
                });
            }
            else {
                return callback("Categoria Non Trovata");
            }
        });
    }
    else {
        return callback("Passami un valore valido");
    }
};

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
            models.Categorie.find(function(err,resp) {
                // error reporting
                if(err) {
                    console.log(err);
                    return;
                }

                for(var miao in resp) {
                    console.log("-- CATEGORIE --\ntitolo: "+resp[miao].title+"\nDescr: "+resp[miao].descr+"\n");
                }
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
    if(obj.params.cat == null) {
        return callback(-1, "Impossibile identificare l'id dellla categoria");
    }
    models.Categorie.count( { id: obj.params.cat }, function(err, count) {
        if(err) {
            console.log(err);
            return;
        }
        // Se la categoria esiste
        if(count > 0) {
            models.Categorie.get(obj.params.cat,function (err, resp) {
                if(err){
                    console.log(err);
                    return;
                }
                callback(1,resp);
            });
        }
        else {
            return callback(0,"La categoria non esiste!");
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
    models.Categorie.count( { id: obj.params.cat }, function(err, numero){
        if(numero > 0){
            models.Categorie.get(obj.params.cat, function(err, cateinfo){
                cateinfo.title = obj.body.title;
                cateinfo.descr = obj.body.descr;

                cateinfo.save(function (err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    return callback (1,"Categoria aggiornata correttamente");
                });
            });
        }
        else{
            return callback(0,"Categoria non esistente");
        }
    });
};

//
// Delete a category
//

category.del = function (obj, callback){
    models.Categorie.count({id: obj.params.cat}, function (err, number){
        if(number > 0){
            models.Categorie.get(obj.params.cat, function(err, category){
                category.remove(function (err){
                    if (err){
                        console.log(err);
                        return;
                    }
                    return callback(1,"Categoria rimossa con successo");
                });
            });
        }
        else{
            return callback(0,"La categoria non esiste");
        }
    });
};
