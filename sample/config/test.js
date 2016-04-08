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

function test1() {
	var res = "123456789";
	// 解析返回报文
	var resParams = _.find(config.response, {'no' : '0002'});
	// 返回的是字符串结构
	if (resParams.type == "text") {
		var resFields = resParams.fields;
	
		_.forEach(resParams.fields, function (value, key) {
			console.log("key: %s  value: %s", key, value[0]);
			resParams.fields[key] = res.substr(value[0], value[1]);
		});
		
		console.log(resParams.fields);
	}
}

test1();
