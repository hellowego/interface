/**
 *
 * httpProxyHandler.js
 * 报文模型
 * 功能：接受Http请求，并转发
 *
 */

var http = require("http"),
httpProxy = require('http-proxy'),
url = require("url"),
config = require('../config/config.js'),
messageProxy = require('../proxy').Message,
UserProxy = require('../proxy').User,
_ = require('lodash');
var proxy = httpProxy.createServer({});
var querystring = require('querystring');
var util = require('util');
var mongoose = require('mongoose');


proxy.on('proxyRes', function (proxyRes, req, res) {
	//TODO: 调用缓存模块
	// console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

//TODO:报文验证，可以提取成模块
function verifyRequetData(req) {}

//处理请求
function requestHandler(req, rsp) {
	var host = req.headers.host,
	protocol = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http",
	fullUrl = (protocol + '://' + host + req.url),
	urlPattern = url.parse(fullUrl),
	path = urlPattern.path;

	var route = _.find(config.routers, {
			'proxyURI' : path
		});
	if (route) {

		var post = ''; //定义了一个post变量，用于暂存请求体的信息

		// 接收报文
		req.on('data', function (chunk) { //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
			post += chunk;
		});

	

		// 验证报文
		req.on('end', function () {
			
			// stringify 把json对象转换成json字符串， parse是字符串转换成对象
			post = JSON.parse(post);
			post = JSON.stringify(post);
			id = mongoose.Types.ObjectId();
			console.log(id);
			messageProxy.newAndSave(id, host , 'supply', post, 0, 'ok', function (err, msg) {
				if (err) {
					console.log(err);
				}
				
			});

			//TODO: 报文验证

			//TODO：调用缓存模块
		
			//
			proxy.web(req, rsp, {
				target : route.targetURI
			});
		});

	} else {
		rsp.writeHead(404);
		rsp.end();
	}
}

module.exports.requestHandler = requestHandler;
