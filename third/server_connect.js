var port = 3030;
var connect = require('connect');
var app = connect();
var logger = function(req, res, next) {
    console.log(req.method, req.url);
    next();
};

var howdyWorld = function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hey, World');
};
app.use(logger);
app.use('/howdy', howdyWorld);
app.listen(port);
console.log('Word to your server running at http://localhost:' + port);
