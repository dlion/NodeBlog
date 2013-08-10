//
// Configuration 
//

var config = require('../config/');

//
// GET Home Page
//

exports.index = function(req, res){
  res.render('index', { namesite: config.web.namesite,  title: 'Index' });
};
