/**
 *
 * httpClient.js
 * http 客户端
 * 功能：发送get、post请求
 *
 */
var http = require('http');
var querystring = require('querystring');


/**
 * http 客户端，可以发送get、post请求
 * @param {json} postData 发送的报文
 * @param {json} routeParams  服务端地址信息
 * @param {function} success 回调函数
 */
exports.send = function (postData, routeParams, success) {

	// 转发的主机地址
	host = routeParams['host'];
	// 转发的主机端口
	dport = routeParams['port'];
	// 转发的目的路由
	durl = routeParams['durl'];
	// 转发的方式
	dtype = routeParams['dtype'];

	// 把json对象转换成json字符串， parse是字符串转换成对象
	var postDataStr = JSON.stringify(postData);

	console.log('from httpClient');
	console.log('trans type : %s', dtype);

	// 拼接get请求
	if (dtype == 'get') {
		// json对象转换成get url
		var content = querystring.stringify(postData);
		console.log('postData: ');
		console.log(postData);
		console.log('postDataStr: ');
		console.log(postDataStr);
		console.log('content: ');
		console.log(content);
		content = '?' + content;
		durl += content;
		console.log(durl);
	}

	var options = {
		hostname : host,
		port : dport,
		path : durl,
		method : dtype,
		headers : {
			'Content-Type' : 'application/json',
			'charset' : 'UTF-8'
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
