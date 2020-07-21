const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFound = require('./utils/middleware/notFoundHandler');
/*
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/json', function(req, res){
    res.json({hello: 'world'});
});
*/

//Body-parser
app.use(express.json());
moviesApi(app);
app.use(notFound);
//Siempre deben ir al final
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);



app.listen(config.port, function(){
    console.log(`Server http://localhost:${config.port}`);
});