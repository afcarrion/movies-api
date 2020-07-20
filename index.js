const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
/*
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/json', function(req, res){
    res.json({hello: 'world'});
});
*/
moviesApi(app);

app.listen(config.port, function(){
    console.log(`Server http://localhost:${config.port}`);
});