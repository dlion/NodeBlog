//
// GET Home Page
//

exports.index = function(req, res){
  res.render('index', { title: 'NodeBlog - Index' });
};
