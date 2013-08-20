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
            models.Categorie.find( { }, "title").each().run(function(err, resp) {
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

