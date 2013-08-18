//
// Module dependencies.
//

var express = require('express'),
    http = require('http'),
    path = require('path'),
    // Configuration file
    config = require('./config'),
    // Index Routes
    routes = require('./routes'),
    //User Routes
    routesUser = require('./routes/user'),
    //Post Routes
    routesPost = require('./routes/post');

var app = express();

// all environments
app.set('port', config.web.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.web.secret_cookie));
app.use(express.session(config.web.secret_session));
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler({showStack: true, dumpExceptions: true}));

//
// 404 Page Not Found Error
//

app.use(function(req, res) {
    res.status(404);
    res.render('404.ejs', { namesite: config.web.namesite, title: '404 Page Not Found!', content: 'Where are you going, motherfoca!?' });
});

//
// 500 Internal Server Error
//

app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500.ejs', { namesite: config.web.namesite, title: '500 Fucking Error!', content: 'What do you do, motherfoca!?', error: error });
});

//
// Index Page
//

app.get('/', routesPost.list);

//
// Single post page
//
app.get('/:id',routesPost.show);

//
// User Login
//

app.get('/login', routesUser.login);

//
// User Signin
//

app.post('/login', routesUser.signin);

//
// User Signout
// 

app.get('/logout', routesUser.signout);

//
// Dashboard
// 

app.get('/dashboard', routesUser.dashboard);

//
// Server Startup
//

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server avviato sulla porta: ' + app.get('port'));
});
