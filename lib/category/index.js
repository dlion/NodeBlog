var express = require('express'),
    app = module.exports = express(),
    //Category Routes
    routesCategory = require('../../routes/category');

//
// Category Create Form && Category Create Process
// 

app.get('/cat/new', routesCategory.showNew);
app.post('/cat/new', routesCategory.add);
