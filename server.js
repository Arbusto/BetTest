'use strict';

var express = require('express');

var app = express();
app.locals.mainPath = __dirname;


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

app.get('/', function(req, res) {
	res.sendFile('public/views/index.html', { root : __dirname}); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000);
