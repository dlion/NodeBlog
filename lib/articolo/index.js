var express = require('express'),
    app = module.exports = express(),
    //Post Routes
    routesPost = require('../../routes/post');

//
// Index Page
//

app.get('/', routesPost.list);

//
// json api for articles
//

//app.get('/articolo.json',routesPost.listJSON);


//
// Articles Create form && Article Create Process
//

app.get('/articolo/new', routesPost.showNew);
app.post('/articolo/new', routesPost.createNew);

//
// Articles Modify form && Article Modify Process
//

app.get('/articolo/:id/update', routesPost.modify);
app.put('/articolo/:id', routesPost.update);

//
// Delete Article
//

app.delete('/articolo/:id', routesPost.del);

//
// Show Article
//

app.get('/articolo/:id',routesPost.show);

//
// Dashboard
//

app.get('/dashboard', routesPost.dashboard);
