//express_demo.js 文件
var express = require('express');
var app = express();
var config = require('./config');

var bodyParser = require('body-parser');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
		extended : true
	})); // for parsing application/x-www-form-urlencoded



// 读取参数
// 服务端口
var port = config.port;

// 服务路由
//var routers = config.routers;

app.get('/', function (req, res) {
	res.send('Hello World');
})

// 
function mysend(data){
	return data;
}


//  POST 请求
app.post('/', function (req, res) {
	
	recvMsg = req.body;
	console.log("主页 接受到 POST 请求, %s", recvMsg.first_name);
	sendmsg = mysend(recvMsg);
	console.log("主页 接受到 POST 请求 返回信息, %s", sendmsg);
	res.send(recvMsg);
})


function addRouter() {
	var roule = '/hi/hello';
	app.get(roule, function (req, res) {
		res.send(roule);
	})
}



var server = app.listen(config.port, function () {

		var host = server.address().address;
		var port = server.address().port;

		addRouter();

		console.log("应用实例，访问地址为 http://%s:%s", host, port);

	});

console.log("start");
