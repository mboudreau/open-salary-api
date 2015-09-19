/* global describe:true, before:true, after:true, it:true, global:true, process:true */

var app          = require('./app.js'),
    bunyan       = require('bunyan'),
    PrettyStream = require('bunyan-prettystream'),
    request      = require('supertest'),
    baseUrl = 'http://localhost:8000';

var server;
/*
describe("Server Spec", function() {

before(function (done) {

  var bunyanToConsole = new PrettyStream();
  bunyanToConsole.pipe(process.stdout);

  var logger = bunyan.createLogger({
    name: 'testLogger',
    streams: [{
      level: 'error',
      type: 'raw',
      stream: bunyanToConsole
    }]
  });

  server = app.createServer(logger);

  // start listening
  var port = 8000;
  server.listen(port, function () {
    logger.info('%s listening at %s', server.name, server.url);
  });


  // make sure the server is started
  setTimeout(function() {
    request(baseUrl)
        .get('/')
        .end(function (err, res) {
          if (err && err.code === 'ECONNREFUSED') {
            return done(new Error('Server is not running.'));
          }
          return done(err);
        });
    }, 500);
  });

  after(function () {
    server.close();
  });

});*/
