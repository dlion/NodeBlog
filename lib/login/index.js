// Modularizzazione per l'autenticazione dell'utente

var express = require('express'),
    app = module.exports = express(),
    //User Routes
    routesUser= require('../../routes/user');


//
// User Login form && User Signin Process
//

app.get('/login', routesUser.login);
app.post('/login', routesUser.signin);

//
// User Signout
//

app.get('/logout', routesUser.signout);
