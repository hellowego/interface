/**
 *
 * socketProxyHandler.js
 * socket服务端
 * 功能：接受Http请求，并转发
 *
 */

var net = require('net');
var async = require('async');
var EventProxy = require('eventproxy');
var _ = require('lodash');
var config = require('../config/config.js');
var http = require("http");

//处理请求
function requestHandler(sock) {

	var postData = "";
	// 我们获得一个连接 - 该连接自动关联一个socket对象
	console.log('CONNECTED: ' +
		sock.remoteAddress + ':' + sock.remotePort);

	var ep = EventProxy();
	ep.fail(function (err) {
		console.log('ep.fail: %s', err.message);
		// throw err;
	});

	function myfail() {
		console.log('myfail: ');
	}

	// 获取socket客户端发来的数据
	ep.on('verifyRequetData', verifyRequetData);

	// 向代理服务器发送数据
	ep.on('proxyRequest', proxyRequest);

	// 服务器返回
	ep.on("socketResponse", socketResponse);

	// 定义异常
	ep.fail(myfail);

	function verifyRequetData(data) {
		console.log('---verifyRequetData---');		
		console.log(data);
		try {
			var dataJson = JSON.parse(data);
			// 获取路由
			var routeNo = dataJson.routeNo;
			console.log(dataJson);
			console.log(routeNo);
			
			
			if (dataJson.routeNo)
			{
				console.log("emit proxyRequest");	
				ep.emit("proxyRequest", dataJson);
			}
			else{
				console.log("emit socketResponse");	
				ep.emit("socketResponse", "报文格式错误");
			}
			
		}catch(err){
			console.log("报文格式错误");
		}
		
	}
	
	function socketResponse(data) {
		console.log('---socketResponse---');
		console.log(data);
		sock.write(data);
	}

	function proxyRequest(data) {
		console.log('---proxyRequest---');
		console.log(data);
		var socketServerParams = _.find(config.socketServers, {
				'routeNo' : data.routeNo
			});

		console.log(socketServerParams);

		var options;
		var requestInfo = {};
		requestInfo.socketServerParams = socketServerParams;

		requestInfo.route = _.find(config.routes, {
				'no' : socketServerParams.routeNo
			});
		requestInfo.response = _.find(config.response, {
				'no' : socketServerParams.responseNo
			});

		//modify request options
		options = {
			hostname : requestInfo.route.host,
			port : requestInfo.route.port,
			path : requestInfo.route.url,
			method : requestInfo.route.method
		};
		options.rejectUnauthorized = false;
		//TODO:替换或者删除请求报文头或者报文体
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

					// console.log(resData);
					serverResData = Buffer.concat(resData);
					// console.log(serverResData);

					try {
						var dataJson = JSON.parse(serverResData);
						var dataStr = JSON.stringify(dataJson);
						console.log(dataStr);
					} catch (err) {
						console.log('catch error: ');
						console.log(err);
						// throw(err);
						// ep.throw(err);
					}
					
					ep.emit("socketResponse", dataStr);
					
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
		ep.emit("verifyRequetData", postData.toString());
	});

	// 为这个socket实例添加一个"close"事件处理函数
	sock.on('close', function (data) {

		console.log('CLOSED: ' +
			sock.remoteAddress + ' ' + sock.remotePort);
	});

	console.log("end");

	//////////////////////

	

}

module.exports.requestHandler = requestHandler;