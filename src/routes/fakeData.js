/* global __dirname:true */
var restify = require('restify'),
	ddb = require('../services/dynamodb')

// { score: 304, date: (new Date).getTime(), sha: '3d2d6963', usr: 'spolu', lng: ['node', 'c++'] }

module.exports = function (server, logger) {
	server.get('/fakeData', function (req, res, next) {
		//var data = req.params.d;
		//if (!data) { // throw error if no queries present
		//	var err = new restify.errors.InternalServerError('oh noes! Out of queries.');
		//	return next(err);
		//}

		var item1 = { id: '1',
			date: (new Date).getTime(),
			sha: '3d2d69633ffa5368c7971cf15c91d2eb',
			usr: 'spolu',
			val: [5, 6, 7] };

		ddb.putItem('opensalary-data', item1, {}, function(err, res, cap) {
			if (err)
				console.log(err);
			else {
				console.log('PutItem: ' + cap);
				console.log(res);
			}
		});
	});
};
