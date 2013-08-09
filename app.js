
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var SECRET = "NodeBlogIsFuckinAwesome";

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(SECRET));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());
//
// 404 Page Not Found Error
//
app.use(function(req, res) {
    res.status(404);
    res.render('404.ejs', { title: '404 Page Not Found!', content: 'Where are you going, motherfoca!?' });
});
//
// 500 Internal Server Error
//
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500.ejs', { title: "500 Fuckin' Error!", content: 'What do you do, motherfoca!?', error: error });
});
//
// Index Page
//
app.get('/', routes.index);
//
// Server Startup
//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server avviato sulla porta: ' + app.get('port'));
});
