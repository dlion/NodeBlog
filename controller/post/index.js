var config = require('../../config'),
	models = require('../../models'),
	post = exports;

post.list = function(obj, callback){
	models.Post.all( { order: 'id', limit: 10, skip: obj.skip}, function (err, resp) { 
		callback(resp);
	});
};

post.findOne = function(obj, callback){
	models.Post.findOne( { where: { id: obj.id } }, function (erro, resp) {
        callback(resp);
	});
};
