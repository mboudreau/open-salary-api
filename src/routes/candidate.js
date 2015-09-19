/* global __dirname:true */
var restify = require('restify'),
    searchClient = require('../search-client');

module.exports = function(server, logger) {

  server.get('/candidate', function(req, res, next) {
    searchClient.search().then(
      function(obj) {
        res.send(obj);
        next();
      },
      next.ifError
    );
  });

  server.get('/candidate/:id', function(req, res, next) {
    searchClient.search({q:"ApplicantDetails.Id:" + req.params.id}).then(
      function(obj) {
        res.send(obj);
        next();
      },
      next.ifError
  );
});
};
