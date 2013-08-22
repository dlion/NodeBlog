var express = require('express'),
    app = module.exports = express(),
    //Category Routes
    routesCategory = require('../../routes/category');

//
// Category Create Form && Category Create Process
// 

app.get('/dashboard/cat', routesCategory.showUpdate);

app.get('/cat/new', routesCategory.showNew);
app.post('/cat/new', routesCategory.add);


//REST options for categories
app.get('/cat/:cat/update', routesCategory.showUpdate);
app.put('/cat/:cat', routesCategory.update);


app.delete('/cat/:cat', routesCategory.del);
