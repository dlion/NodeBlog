var config = require('../../config'),
	models = require('../../models'),
	post = exports;

post.list = function(obj, callback){
	models.Post.all( { order: 'id', limit: 10, skip: obj.skip}, function (err, resp) { 
		callback(resp);
	});
};

post.findOne = function(obj, callback){
    // Dovrebbe essere obj.params.id secondo http://i.imgur.com/h2Kw4U4.jpg no ?
	models.Post.findOne( { where: { id: obj.id } }, function (erro, resp) {
        callback(resp);
	});
};
