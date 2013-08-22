var config = require ('../../config/'),
    controllerCategory = require('../../controller/category'),
    user = require('../../controller/user'),
    category = exports;

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
