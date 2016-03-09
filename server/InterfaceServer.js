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
	var sendmsg = mysend(recvMsg);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	res.send(recvMsg);
})

/**
 * 处理post请求
 */
function dealPost(req, res){
	var recvMsg = req.body;
	console.log("主页 接受到 POST 请求, %s", recvMsg.first_name);
	var sendmsg = mysend(recvMsg);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	res.send(recvMsg);
}

/**
 * 处理get请求
 */
function dealGet(req, res){
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
		if(value['stype'] == 'post'){
			console.log( value['surl'] );
			app.post(value['surl'], dealPost);
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
