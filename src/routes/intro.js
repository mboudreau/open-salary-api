/* global __dirname:true */
var restify = require('restify');

module.exports = function (server, logger) {
	server.get('/intro', function (req, res, next) {
		var query = req.params.q;
		if (!query) { // throw error if no queries present
			var err = new restify.errors.InternalServerError('oh noes! Out of queries.');
			return next(err);
		}
	});
};
