
/**
 *
 * httpProxyHandler.js
 * 报文模型
 * 功能：接受Http请求，并转发
 *
 */

var http = require("http"),
url = require("url"),
config = require('../config/config.js'),
_ = require('lodash'),
// messageProxy = require('../proxy').Message,
// UserProxy = require('../proxy').User,
async = require('async');
var mongoose = require('mongoose');
var net = require('net');
var tools = require("./tools.js");
var logger = require("./logger.js");

//处理请求
function requestHandler(req, proxyRsp) {
	var host = req.headers.host,
	protocol = "http",
	fullUrl = (protocol + '://' + host + req.url),
	urlPattern = url.parse(fullUrl),
	path = urlPattern.path,
	reqData,
	msgId,
	requestInfo;

	requestInfo = {
		host : host,
		method : req.method,
		path : path,
		protocol : protocol,
		url : fullUrl,
		req : req,
		startTime : new Date().getTime()
	};

	async.series([
			routeReq,
			fetchReqData,
			verifyRequetData,
			requestRecord,
			proxyRequest
		], function (err, results) {
		logger().debug(err);
		logger().debug("err");
		return;
	});

	//路由请求
	function routeReq(callback) {
		var httpServerParams = _.find(config.httpServers, {
				'url' : path
			});
		logger().debug(path);
		logger().debug(httpServerParams);
		if (!httpServerParams) {
			next = false;
			proxyRsp.writeHead(404);
			proxyRsp.end();
			logger().debug('404');
		} else {
			// 参数
			requestInfo.httpServerParams = httpServerParams;
			requestInfo.route = _.find(config.routes, {
					'no' : httpServerParams.routeNo
				});
			requestInfo.response = _.find(config.response, {
					'no' : httpServerParams.responseNo
				});
			logger().debug(requestInfo.resFields);
			callback();
		}
	}

	//获取请求报文体
	function fetchReqData(callback) {
		logger().debug('---FetchReqData---');
		var postData = [];
		req.on("data", function (chunk) {
			postData.push(chunk);
		});
		req.on("end", function () {
			
			try{
				reqData = Buffer.concat(postData);
				logger().debug(postData);
				logger().debug(reqData);
				logger().debug("request body: %s", reqData.toString());
				requestInfo.reqBody = JSON.parse(reqData.toString());
			}catch(err){
				logger().debug(err.message);
				next = false;
				proxyRsp.writeHead(404);
				proxyRsp.end();
				logger().debug('404');
			}
			callback();
		});
		
		req.on("error", function (e) {
			logger().debug('problem with request: ' + e.message);
		});

		logger().debug('---FetchReqData end ---');
	}

	//TODO:报文验证，可以提取成模块
	function verifyRequetData(callback) {
		logger().debug('---VerifyRequetData---');
		var sentJson = {};
		_.forEach(requestInfo.route.fields, function (value, key) {
			// 路由里的字段用报文里的代替
			if (requestInfo.reqBody[key]) {
				sentJson[key] = requestInfo.reqBody[key];
			} else {
				sentJson[key] = value;
			}

		});
		requestInfo.sendbuf = JSON.stringify(sentJson);		
		logger().debug('socket send buf: %s', requestInfo.sendbuf);
		// logger().debug();
		callback();

	}

	// 请求报文记录数据库
	function requestRecord(callback) {
		var msg = reqData.toString();
		// 去除报文中的空格和回车
		// stringify 把json对象转换成json字符串， parse是字符串转换成对象
		msg = JSON.parse(msg);
		msg = JSON.stringify(msg);

		msgId = mongoose.Types.ObjectId();

		// messageProxy.newAndSave(msgId, requestInfo.host, 'supply', msg, 0, 'ok', function (err, msg) {
		// if (err) {
		// logger().debug(err);
		// }
		// logger().debug('message save');
		// });

		logger().debug('succ');
		callback();
	}

	//转发请求
	function proxyRequest(callback) {
		logger().debug('---ProxyRequest---');
		// 判断转发方式
		if (requestInfo.route.type == "socket") {
			getSocketResonse(callback);
		} else if (requestInfo.route.type == "http") {
			getRomoteResonse(callback);
		}

	}

	function getSocketResonse(callback) {
		var client = new net.Socket();
		client.connect(requestInfo.route.port, requestInfo.route.host, function () {

			logger().debug('CONNECTED TO: ' + requestInfo.route.host + ':' + requestInfo.route.port);
			// 建立连接后立即向服务器发送数据，服务器将收到这些数据
			client.write(requestInfo.sendbuf);

		});

		// 为客户端添加“data”事件处理函数
		// data是服务器发回的数据
		client.on('data', function (data) {

			logger().debug('DATA: ' + data.toString());
			var repStr = data.toString();
			// logger().debug(repStr);
			// 完全关闭连接
			client.destroy();

			// 返回给外部的响应
			var resjson = {};

			// 解析内部服务返回报文
			var resParams = _.find(config.response, {
					'no' : requestInfo.route.responseNo
				});
			logger().debug(resParams);
			// 解析返回的是字符串结构
			if (resParams.type == "text") {
				_.forEach(resParams.fields, function (value, key) {
					// 从返回的字符串中解析出字段
					// resjson[key] = repStr.substr(value[0], value[1]).trim();
					resjson[key] = tools.cutstr(repStr, value[0], value[1]).trim();
					logger().debug("key: %s  value: %s", key, repStr.substr(value[0], value[1]));
					logger().debug(resjson[key]);
				});
			} else if(resParams.type == "json"){
				var reqStrJson = JSON.parse(repStr);
				
				_.forEach(resParams.fields, function (value, key) {
					// 从返回的字符串中解析出字段
					if (reqStrJson[key]){
						resjson[key] = reqStrJson[key];
					}
					
				});
			}

			logger().debug(resjson);

			// 拼接外部服务的返回报文
			_.forEach(requestInfo.response.fields, function (value, key) {
				//路由里的字段用报文里的代替
				if (!resjson[key]) {
					resjson[key] = requestInfo.response.fields[key];
				}
			});

			var resJsonStr = JSON.stringify(resjson);
			var jss = JSON.parse(resJsonStr);
			logger().debug(jss.DriverName);
			logger().debug("resJsonStr: %s", resJsonStr);
			resJsonStr.replace("\"DriverName\"", "11111");
			logger().debug(resJsonStr);

			proxyRsp.end(resJsonStr);

		});

		// 为客户端添加“close”事件处理函数
		client.on('close', function () {
			logger().debug('Connection closed');
		});

		callback();
	}


	function getLocalResonse(callback) {
		//TODO:本地缓存XXX
	}

	function getRomoteResonse(callback) {
		var options;
		//modify request options
		options = {
			hostname : requestInfo.route.targetHost,
			port : requestInfo.route.targetPort,
			path : requestInfo.route.targetPath,
			method : req.method,
			headers : req.headers
		};
		options.rejectUnauthorized = false;
		//TODO:替换或者删除请求报文头或者报文体
		options.headers = _.mapKeys(options.headers, function (value, key) {
				return key.toLowerCase();
			});
		options.headers["content-length"] = reqData.length;

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
				proxyRsp.writeHead(statusCode, resHeader);
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
								serverResData = Buffer.concat(resData);
								proxyRsp.end(serverResData);
								callback();
							}
							//记录缓存或者持久化
						], function (err, result) {
						callback && callback();
					});
				});
			});
		proxyReq.on("error", function (e) {
			proxyRsp.end();
		});
		proxyReq.end(reqData);
	}
}

module.exports.requestHandler = requestHandler;
