/* global __dirname:true */
var restify = require('restify'),
	id = require('uuid').v4,
	https = require('https');

module.exports = function (server) {
	server.get('/', function (req, res, next) {
		https.get('https://api.typeform.com/v0/form/PYLdZY?key=41ef2b0da9b7f1f4991f6b0fd45dcf5ce8387e56&completed=true', function(response) {
			console.log("Got response: " + response.statusCode);

			var body = '';
			response.on('data', function(d) {
				body += d;
			});
			response.on('end', function() {
				res.send(JSON.parse(body));
				return next();
				// Data reception is done, do whatever with it!
				//var parsed = JSON.parse(body);
				//console.info(parsed);
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	});
};
