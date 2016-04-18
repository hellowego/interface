var net = require('net');
var http = require("http");
var async = require('async');
var EventProxy = require('eventproxy');
var _ = require('lodash');
var HOST = '127.0.0.1';
var PORT = 9000;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function (sock) {

	var postData = "";
	// 我们获得一个连接 - 该连接自动关联一个socket对象
	console.log('CONNECTED: ' +
		sock.remoteAddress + ':' + sock.remotePort);
		
	
		
	var ep = EventProxy();
	ep.fail(function (err) {
		console.log('11111111111111111111111111111111111111: ');
		throw err;
	});
	
	function myfail(){
		console.log('11111111111111111111111111111111111111: ');
	}
	
	ep.once('fetchReqData', fetchReqData);
	ep.once('proxyRequest', proxyRequest).fail(myfail);;
	
	function fetchReqData(result, p2) {
		console.log('---fetchReqData---');
		console.log(result);
		console.log(postData);
		console.log(p2);
		
		ep.emit("proxyRequest");
	}
	
	function proxyRequest() {
		console.log('---proxyRequest---');
		var options = {
			hostname : "139.129.131.178",
			port : 80,
			path : "/wq/addons/bound/php/msgsend.php",
			method : "post"
		};
		options.headers = _.mapKeys(options.headers, function (value, key) {
				return key.toLowerCase();
			});
		options.headers["Content-Type"] = "application/json";

		//send request
		var proxyReq = http.request(options, function (res) {

				var statusCode = res.statusCode;
				//TODO:替换statusCode
				//TODO:替换响应头
				var resHeader = res.headers;
				resHeader = _.mapKeys(resHeader, function (value, key) {
						return key.toLowerCase();
					});
				delete resHeader['content-length'];
				// proxyRsp.writeHead(statusCode, resHeader);

				var length,
				resData = [];
				res.on("data", function (chunk) {
					resData.push(chunk);
				});
				res.on("end", function () {
					var serverResData;
					async.series([
							//报文处理
							//发送代理报文
							function (callback) {
								console.log(resData);
								serverResData = Buffer.concat(resData);
								console.log(serverResData);
								
								try {
									var j1 = JSON.parse(serverResData + "123");
									console.log(j1);
								} catch (err)
								{
									console.log(err);
									// throw(err);
								}
								
								console.log("begin check");
								console.log(serverResData.toString());
								sock.write(serverResData.toString());
								// proxyRsp.end(serverResData);
								
								console.log("check end");
								callback();
							}
							//记录缓存或者持久化
						], function (err, result) {
						console.log('22222222222222222222222222222222: ');
					});
				});
			});
		proxyReq.on("error", function (e) {
			// proxyRsp.end();
		});
		proxyReq.end(postData);
	}

	
	sock.on('data', function (data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);
		// 回发该数据，客户端将收到来自服务端的数据
		// 载入路由参数
		// routeParams = routerMap.get(url);
		// http 客户端转发请求
		postData = data;
		console.log(postData);
		ep.emit("fetchReqData", postData.toString(), "hi");
	});
	
	// 为这个socket实例添加一个"close"事件处理函数
	sock.on('close', function (data) {

		console.log('CLOSED: ' +
			sock.remoteAddress + ' ' + sock.remotePort);
	});
	
	

}).listen(PORT, HOST);