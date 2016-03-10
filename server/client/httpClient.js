var http = require('http');

exports.send = function (postData, routeParams, success) {

	// 转发的主机地址
	host = routeParams['host'];
	// 转发的主机端口
	dport = routeParams['port'];
	// 转发的目的路由
	durl = routeParams['durl'];
	// 转发的方式
	dtype = routeParams['dtype'];
	
	var postDataStr = JSON.stringify(postData);

	console.log('from httpClient');
	console.log('postData: ');
	console.log(postDataStr);

	var options = {
		hostname : 'localhost',
		port : 8889,
		path : '/nihao',
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	var req = http.request(options, function (res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);
				success(chunk);
			});
		});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postDataStr);
	req.end();

	

}
