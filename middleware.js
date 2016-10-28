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
module.exports = middleware;
