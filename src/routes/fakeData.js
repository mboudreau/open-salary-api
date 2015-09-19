/* global __dirname:true */
var restify = require('restify'),
		ddb = require('dynamodb').ddb({ accessKeyId: 'AKIAI5LQN2STTRV3QTGQ',
		secretAccessKey: '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',
		endpoint: 'dynamodb.ap-southeast-2.amazonaws.com' });

// { score: 304, date: (new Date).getTime(), sha: '3d2d6963', usr: 'spolu', lng: ['node', 'c++'] }

module.exports = function (server, logger) {
	server.get('/fakeData', function (req, res, next) {
		//var data = req.params.d;
		//if (!data) { // throw error if no queries present
		//	var err = new restify.errors.InternalServerError('oh noes! Out of queries.');
		//	return next(err);
		//}

		var item = {"id": {"N": 1234},"title": {"S": "Foobar"}};

		console.log(item);
		var params = {TableName: 'opensalary-data',
			Item: item
		};
		console.log(params);

		ddb.putItem(params, function(err, data) {
    if (err)
			console.log(err); // an error occurred
    else
			console.log(data); // successful response
		});
	});
};
