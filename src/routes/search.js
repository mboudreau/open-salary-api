/* global __dirname:true */
var restify = require('restify'),
    searchClient = require('../search-client');

module.exports = function (server, logger) {
	server.get('/search', function (req, res, next) {
		var query = req.params.q;
		if (!query) { // throw error if no queries present
			var err = new restify.errors.InternalServerError('oh noes! Out of queries.');
			return next(err);
		}

		// parse query
		var qArray = query.split(' ');
		var tags = {};
		qArray.forEach(function (val) {
			// tags
			if (val.indexOf('#') === 0) {
				tags[val] = true;
			}
		});

		searchClient.search({q: query}).then(function (obj) {
			res.send(obj);
			next();
		}, next.ifError);
	});
};
