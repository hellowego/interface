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

	async.series([
			fetchReqData,
			verifyRequetData,
			requestRecord,
			proxyRequest
		], function (err, results) {
		console.log(err);
	});

	//获取请求报文体
	function fetchReqData(callback) {
		console.log('---FetchReqData---');
		sock.on('data', function (data) {
			console.log('DATA ' + sock.remoteAddress + ': ' + data);

			var postData = data.body;

			// sock.write('You said "' + data + '"');
			var socketServerParams = _.find(config.socketServers, {
					'port' : "9091"
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
						async.series([
								//报文处理
								//发送代理报文
								function (callback) {
									console.log(resData);
									serverResData = Buffer.concat(resData);
									console.log(serverResData);
									var j1 = JSON.parse(serverResData);
									console.log(j1);
									console.log(serverResData.toString());
									sock.write(serverResData.toString() );
									// proxyRsp.end(serverResData);
									callback();
								}
								//记录缓存或者持久化
							], function (err, result) {
							callback && callback();
						});
					});
				});
			proxyReq.on("error", function (e) {
				// proxyRsp.end();
			});
			proxyReq.end(postData);

		});

		// 为这个socket实例添加一个"close"事件处理函数
		sock.on('close', function (data) {

			console.log('CLOSED: ' +
				sock.remoteAddress + ' ' + sock.remotePort);
		});

		sock.on('error', function (err) {
			console.log('socket error - ', err);
		});

		callback();

	}

	function verifyRequetData(callback) {
		console.log('---verifyRequetData---');
		callback();
	}

	function requestRecord(callback) {
		console.log('---requestRecord---');
		callback();
	}

	function proxyRequest(callback) {
		console.log('---proxyRequest---');
		callback();
	}

}

module.exports.requestHandler = requestHandler;