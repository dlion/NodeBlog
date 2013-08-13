var config = require ('../config')
 ,  post   = require ('../controller/post');

exports.index = function (req, res) {
	if(req.skip === null){
		req.skip = 0;
	}
	post.list(req, function(obj){
		res.render('post',  {
			namesite: config.web.namesite,
			title: config.web.namesite,
			arr: obj
		});
		console.log(obj)
	});
};

exports.findOne = function (req, res) {
	if(req.id === null ){
		res.status(404);
    	res.render('404.ejs', { namesite: config.web.namesite, title: '404 Page Not Found!', content: 'There are no articles like that' });
	}
	else {
		post.findOne(req, function(obj){
			res.render('post/singlepage',  {
				namesite: config.web.namesite,
				title: 'Login',
				arr: obj
			});
		});
	}
}