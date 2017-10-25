'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    //cookieParser = require('cookie-parser'),
    //bodyParser = require('body-parser'),
    http = require('http'),
    app = express(),
    routes = require('./routes/views');
    //api = require('./routes/api'),
    //dal = require('./dal/dal');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

/*app.engine('html', require('ejs').renderFile);*/

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/node', express.static(path.join(__dirname, '../node_modules')));
app.use(logger('dev', {
    skip: function (req, res) {
        return req.baseUrl == '/node' && res.statusCode < 400;
    }
}));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
    // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/partials/:name', routes.partials);


// redirect all others to the index (HTML5 history)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


var server = http.createServer(app).listen( app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup () {
    server.close(function () {
        console.log("Closed out remaining connections.");
        // Close db connections, other chores, etc.
        process.exit();
    });

    setTimeout(function () {
        console.error("Could not close connections in time, forcing shut down");
        process.exit(1);
    }, 30 * 1000);
}


