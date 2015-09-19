/* global __dirname:true */
var restify = require('restify'),
	ddb = require('../services/dynamodb')

// { score: 304, date: (new Date).getTime(), sha: '3d2d6963', usr: 'spolu', lng: ['node', 'c++'] }

module.exports = function (server) {
	server.get('/fakeData', function (req, res, next) {
		var item1 = {
			id: '1',
			date: (new Date).getTime(),
			sha: '3d2d69633ffa5368c7971cf15c91d2eb',
			usr: 'spolu',
			val: [5, 6, 7]
		};
		var data = [];
		data.push({
			'PutRequest': {
				'Item': {
					'id': {'S': '1'},
					'username': {'S': 'peeps'},
					'logins': {'N': '0'},
					'password': {'S': '$2a$10$QfFcIJohati4wvwc9OuFg.IXvsUH6N5ZRmkYxky.5Vh2wGYqvM6Pi'},
				}
			}
		});

		// Simple
		ddb.batchWriteItem('opensalary-data', data, {}, function (err, res, cap) {
			if (err)
				console.log(err);
			else {
				console.log('PutItem: ' + cap);
			}
		});
	});
};
