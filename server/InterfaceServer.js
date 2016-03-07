//express_demo.js 文件
var express = require('express');
var app = express();
var config = require('./config');

// 读取参数
// 服务端口
var port = config.port;

// 服务路由
//var routers = config.routers;

app.get('/', function (req, res) {
	res.send('Hello World');
})

app.get('/hello', function (req, res) {
	res.send('Hello ');
})

//  POST 请求
app.post('/', function (req, res) {
	console.log("主页 POST 请求");
	res.send('Hello POST');
})

function addRouter() {
	var roule = '/hi';
	app.get(roule, function (req, res) {
		res.send(roule);
	})
}

app.post('/process_get', function (req, res) {

	// 输出 JSON 格式
	response = {
		first_name : req.query.first_name,
		last_name : req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

var server = app.listen(config.port, function () {

		var host = server.address().address;
		var port = server.address().port;

		addRouter();

		console.log("应用实例，访问地址为 http://%s:%s", host, port);

	});

console.log("start");
