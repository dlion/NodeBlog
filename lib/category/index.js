var express = require('express'),
    app = module.exports = express(),
    //Category Routes
    routesCategory = require('../../routes/category');

//
// Category Create Form && Category Create Process
// 

app.get('/cat/new', routesCategory.showNew);
app.post('/cat/new', routesCategory.add);

//
// Category Update Form && Category Update Process
//

app.get('/cat/:cat/update', routesCategory.showUpdate);
app.put('/cat/:cat', routesCategory.update);

//
// Category Delete
//

app.delete('/cat/:cat', routesCategory.del);

//
// List all category
// 

app.get('/dashboard/cat', routesCategory.list);
