#!/bin/env node
//
// Module dependencies.
//

var express = require('express'),
    http = require('http'),
    path = require('path'),

    //
    // Configuration file
    //

    config = require('./config'),
    //
    // Login Modularized
    //

    login = require('./lib/login'),

    //
    // Articles Modularized
    //
    articolo = require('./lib/articolo'),

    //
    // Error Modularized
    //

    error = require('./lib/error'),

    //
    //  Express app
    //

    app = express();

//
// All environments
//

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
// Middleware per il login dell'utente
//

app.use(login);

//
// Middleware per gli articoli
//

app.use(articolo);

//
// Middleware per gli errori
//

app.use(error);

//
// Server Startup
//

http.createServer(app).listen(app.get('port'), function(){
  console.log('Porta in uso dal server: ' + app.get('port'));
});
