var config = require('./config.js');
var _ = require('lodash');

function test() {
	var path = '/hello';
	var route = _.find(config.routers, {
			'proxyPath' : path
		});

	var httpServersParams = _.find(config.httpServers, {
			'url' : path
		});

	var destinationNo = _.find(config.httpServers.destinationNo, {
			'url' : path
		});
	var fields = httpServersParams.fields;
	var body = {
		"OrigDomain" : "APP",
		"Token" : "string",
		"DriverEmployeeNo" : "string"
	};
	var str = [];
	_.forEach(fields, function (value, key) {
		console.log(key);
		console.log(fields[key].length);
		str += body[key];
	});
	console.log(str);
	// console.log(httpServersParams);
}

test();
