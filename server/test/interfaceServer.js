/**
 *
 * interfaceServer.js
 * 接口服务器
 *
 */
var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
var routerParse = require('./routerParse');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
		extended : true
	})); // for parsing application/x-www-form-urlencoded


// 读取参数
/** 服务端口 */
var port = config.port;

/** 读取路由参数 */
var routerMap = routerParse(config);

app.get('/', function (req, res) {
	res.send('Hello World');
})

//
function mysend(data) {
	return data;
}

//  POST 请求
app.post('/', function (req, res) {

	var recvMsg = req.body;
	console.log("主页 接受到 POST 请求, %s", recvMsg.first_name);
	var recvMsg = mysend(recvMsg.first_name);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	res.send(recvMsg);
})

function transPost(req) {
	var route = req.route;
	var url = route['path'];
	console.log(url);
	// 载入路由参数
	routeParams = routerMap.get(url);
	// 转发的主机地址
	host = routeParams['host'];
	// 转发的主机端口
	dport = routeParams['port'];
	// 转发的目的路由
	durl = routeParams['durl'];
	// 转发的方式
	dtype = routeParams['dtype'];

	console.log(routeParams['fields']);
	var recvMsg = req.body;
	console.log(recvMsg.first_name);
	return recvMsg.first_name;
}

/**
 * 处理post请求
 */
function dealPost(req, res) {

	//var sendmsg = '{"retcode: " : "1",	"retmsg" : "ok"}';
	var sendmsg = 'success';

	res.send(sendmsg);
}

/**
 * 处理get请求
 */
function dealGet(req, res) {
	var recvMsg = req.body;
	console.log("主页 接受到 POST 请求, %s", recvMsg.first_name);
	var sendmsg = mysend(recvMsg);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	res.send(recvMsg);
}

/**
 * 添加路由
 */
function addRouter() {
	// var roule = '/hi/hello';
	// app.post(roule, function (req, res) {
	// var sendmsg = mysend(req.body);
	// res.send(sendmsg);
	// })

	var s = "";
	routerMap.each(function (key, value, index) {
		s += index + ":" + key + "=" + value + "\n";
		if (value['stype'] == 'post') {
			app.post(value['surl'], dealPost);
		} else if (value['stype'] == 'get') {
			app.get(value['surl'], dealGet);
		}

		// console.log(value);
	});

	console.log(s);

	console.log('%s, %s', '/hi', routerMap.get('/hi')["fields"]);

}

var server = app.listen(config.port, function () {

		var host = server.address().address;
		var port = server.address().port;

		addRouter();

		console.log("应用实例，访问地址为 http://%s:%s", host, port);

	});

console.log("start");
