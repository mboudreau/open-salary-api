/* global __dirname:true */
var restify = require('restify'),
	id = require('uuid').v4;

module.exports = function (server) {
	server.post('/auth/:provider', function (req, res, next) {
		var query = req.params.q;
		if (!query) { // throw error if no queries present
			var err = new restify.errors.InternalServerError('oh noes! Out of queries.');
			return next(err);
		}
	});

};
