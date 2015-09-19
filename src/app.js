/* global process:true, __dirname:true */
/*jslint node: true */

'use strict';


var restify = require('restify'),
 globby = require('globby'),
    path = require('path');

module.exports.createServer = function (logger) {
    var pkg = require('./../package.json');
    var settings = {
        name: pkg.name
    };

    if (logger) {
        settings.log = logger;
    }

    var server = restify.createServer(settings);

    server.use(restify.acceptParser(server.acceptable));
    //	server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser());
    server.use(restify.jsonp());
    server.use(restify.CORS());

    server.on('NotFound', function (req, res, next) {
        if (logger) {
            logger.debug('404', 'No route that matches request for ' + req.url);
        }
        res.send(404, req.url + ' was not found');
    });

    if (logger) {
        server.on('after', restify.auditLogger({log: logger}));
    }

    // Add Routes
    globby(['routes/**/*.js', '!routes/**/*.spec.js'], {cwd:__dirname}, function (err, files) {
        if (err) {
            throw new Error(err);
        }

        logger.info(files);

        files.forEach(function (file) {
            logger.info(file);
            require(path.join(__dirname, file))(server, logger);
        });
    });

    return server;
};
