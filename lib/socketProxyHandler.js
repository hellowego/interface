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
var tools = require("./tools.js");
var logger = require("./logger.js");


//处理请求
function requestHandler(sock) {

	// var postData = "";
	// 我们获得一个连接 - 该连接自动关联一个socket对象			
	logger('app').trace('CONNECTED: ' +
		sock.remoteAddress + ':' + sock.remotePort);

	var ep = EventProxy();
	ep.fail(function (err) {
		logger('app').error('ep.fail: %s', err.message);
		// throw err;
	});

	function myfail() {
		logger('app').error('myfail: ');
	}

	// 获取socket客户端发来的数据
	ep.on('verifyRequetData', verifyRequetData);
	
	// 拼接代理服务器报文
	ep.on("proxyPostdata", proxyPostdata);

	// 向代理服务器发送数据
	ep.on('proxyRequest', proxyRequest);

	// 服务器返回
	ep.on("socketResponse", socketResponse);

	// 定义异常
	ep.fail(myfail);

	function verifyRequetData(data) {
		logger().debug('---verifyRequetData---');
		try {
			var dataJson = JSON.parse(data);
			// 获取路由
			var routeNo = dataJson.routeNo;			
			if (dataJson.routeNo)
			{
				var socketServerParams = _.find(config.socketServers, {
					'routeNo' : dataJson.routeNo
				});
				
				// 判断接口是否存在
				if (socketServerParams){
					var ret = tools.validator(dataJson, socketServerParams.checkFields);
					logger().debug("validate code %s, errmsg: %s",ret.errcode,ret.errmsg);
					if(ret.errcode == 0)
					{
						logger().debug("emit proxyPostdata");	
						ep.emit("proxyPostdata", dataJson);
					}else {
						logger().error("emit socketResponse  err: %s", ret.errmsg);	
						ep.emit("socketResponse", ret.errmsg);
					}
				}else {
					logger().error("emit socketResponse  err: %s", ret.errmsg);	
					ep.emit("socketResponse", "接口编号错误");
				}
				
			}
			else{
				logger().error("emit socketResponse  err: 未找到请求编号");	
				ep.emit("socketResponse", "报文格式错误");
			}
			
		}catch(err){
			logger().error(err.message);
		}
		
	}
	
	function proxyPostdata(dataJson){
		logger().debug('---proxyPostdata---');	
		var routeParams = _.find(config.routes, {
					'no' : dataJson.routeNo
				});
		var postData = {}
		_.forEach(routeParams.fields, function(value, key){
			if(dataJson[key]){
				postData[key] = dataJson[key];
			}else{
				postData[key] = value;
			}
		});
		
		logger().debug('emit proxyRequest');
		ep.emit("proxyRequest", postData, routeParams);
	}
	
	function socketResponse(data) {
		logger().debug('---socketResponse---');
		logger().debug(data);
		sock.write(data);
	}

	function proxyRequest(jsondata, routeParams) {
		logger().debug('---proxyRequest---');
		logger().debug(jsondata);		
		var postData = JSON.stringify(jsondata);
		
		//modify request options
		options = {
			hostname : routeParams.host,
			port : routeParams.port,
			path : routeParams.url,
			method : routeParams.method
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
					serverResData = Buffer.concat(resData);
					logger('http').info("requst to: %s, message: %s", options.hostname, postData);					
					try {
						var dataJson = JSON.parse(serverResData);
						var dataStr = JSON.stringify(dataJson);
						logger().debug(dataStr);
						logger('http').info("renponse from: %s, message: %s", options.hostname, dataStr);
					} catch (err) {
						logger().debug('catch error: ');
						logger().debug('catch error: %s', err.message);						
					}
					
					logger().debug('emit socketResponse');
					ep.emit("socketResponse", dataStr);
					
				});
			});
		proxyReq.on("error", function (e) {
			// proxyRsp.end();
		});
		proxyReq.end(postData);
	}

	sock.on('data', function (data) {		
		// 回发该数据，客户端将收到来自服务端的数据
		// 载入路由参数
		// routeParams = routerMap.get(url);
		// http 客户端转发请求
		postData = data;
		logger('http').info('DATA from:' + sock.remoteAddress + ' body: ' + data);
		logger().debug('emit verifyRequetData');
		ep.emit("verifyRequetData", postData.toString());
	});

	// 为这个socket实例添加一个"close"事件处理函数
	sock.on('close', function (data) {
		logger().info('CLOSED: ' +
			sock.remoteAddress + ' ' + sock.remotePort);
	});
}

module.exports.requestHandler = requestHandler;