/**
 *
 * interfaceServer.js
 * 接口服务器 
 * 功能：接受get、post请求，转发请求
 *
 */
var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
var routerParse = require('./routerParse');
var httpClient = require('./client/httpClient');
var log4js = require('log4js');

var UserProxy    = require('./proxy').User;

log4js.configure('./config/log4js.json');
var log = log4js.getLogger("app");


app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

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
	console.log('receive from : %s', req.ip)
	
	console.log('hello '); 
	loginname = 'hi';
	passhash = '123456';
	email = 'hi@hi.com';
	UserProxy.newAndSave(loginname, loginname, passhash, email, function (err) {
        if (err) {
          console.log('hello 1'); 
        }
        console.log('hello 2'); 
      });
	  
	 console.log('hello 3'); 
	 
	res.send('Hello World');
})

//
function mysend(data) {
	return data;
}

/**
 * 校验报文
 */
function verifyPost(req) {}

/**
 * 处理post请求
 */
function dealPost(req, res) {

	// 获取请求的地址
	var route = req.route;
	var url = route['path'];
	console.log(url);

	// 载入路由参数
	routeParams = routerMap.get(url);
	// http 客户端转发请求
	var postData = req.body;
	log.info('receive from : %s', req.ip)
	log.info(postData);
	httpClient.send(postData, routeParams, function (data) {
		console.log(data);
		res.send(data);
	});

}

/**
 * 处理get请求
 */
function dealGet(req, res) {
	var recvMsg = req.query;
	console.log(recvMsg);
	var sendmsg = mysend(recvMsg);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	log.info('receive from : %s', req.ip)
	res.send(recvMsg);
}

/**
 * 添加路由
 */
function addRouter() {

	routerMap.each(function (key, value, index) {
		if (value['stype'] == 'post') {
			app.post(value['surl'], dealPost);
		} else if (value['stype'] == 'get') {
			app.get(value['surl'], dealGet);
		}

	});
}

/**
 * 建立监听
 */
var server = app.listen(config.port, function () {

		var host = server.address().address;
		var port = server.address().port;

		addRouter();

		console.log("应用实例，访问地址为 http://%s:%s", host, port);

	});

console.log("start");
