var express = require('express');
var app = express();
//var PORT = '3000';
var PORT = process.env.PORT || 3000//changed for heroku

var middleware = require('./middleware.js');

/*
//moved to 'middleware.js
var middleware = { //to add our own middleware to eXpress you need to create a function that takes three arguments:req,res,next. Middelware runs before page rendering and that's where the next param comes in.
    requireAuthentication: function(req, res, next) {
        console.log('private route hit');
        next(); //this is what allows the continuation of the process.
    },
    logger: function(req, res, next) {
        console.log('Request: ' + req.method + ' ' + req.originalUrl +
            ' on: ' + new Date().toString());
        next(); //this is what allows the continuation of the process.
    }
};
*/

app.use(middleware.logger); //this is how you implement the middleware defined above at an application level. The order objects are added via app.use() is important. Middleware should be added first.

//below represents an outher route:
/*
app.get('/about', function(req, res) { //first argument is the route, the second is the anonomous function that has req, res as parameters and they are similar to those in JEE
    res.send('about page');
});
*/
//to add the middleware to just specifci routes:
app.get('/about', middleware.requireAuthentication, function(req, res) { //in this case the second argument is the desired middleware
    res.send('about page');
});

app.use(express.static(__dirname + '/public')); //this is to use a directory as static root for the site and needs to full path. The __dirname variable from node provides the physical path to the project

app.listen(PORT, function() { //essentially the server start command and can specify the port. Now go to http://localhost:3000/ to see the output. Ctrl C twice stops the server. The function is an optional param that runs once the server starts.
    console.log('server running on port: ' + PORT);
});


/*
app.get('/', function(req, res) { //first argument is the route, the second is the anonomous function that has req, res as parameters and they are similar to those in JEE. This represents a dynamic site route
    res.send('Hello from express');
});
*/
