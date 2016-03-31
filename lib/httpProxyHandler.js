<<<<<<< HEAD
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
=======
var http           = require("http"), 
	url            = require("url"),
    config         = require('../config/config.js'),
    _              = require('lodash'),
	async          = require('async');  
 
//处理请求
function requestHandler(req,proxyRsp) { 
    var host               = req.headers.host,
        protocol           =  "http",
        fullUrl            = (protocol + '://' + host + req.url),
        urlPattern         = url.parse(fullUrl),
        path               = urlPattern.path,
		reqData,
		requestInfo;
		
	requestInfo = {
        host      : host,
        method    : req.method,
        path      : path,
        protocol  : protocol,
        url       : fullUrl,
        req       : req,
        startTime : new Date().getTime()
    };
    
	async.series([ 
        routeReq,
		fetchReqData,
		verifyRequetData,
		proxyRequest
    ],function(err, results) { 
	});
	
	//路由请求
	function routeReq(callback){   
		var route = _.find(config.routers, { 'proxyPath': path}); 
		if(!route){    
			next = false;
			proxyRsp.writeHead(404);
			proxyRsp.end();
		}
		else{
			requestInfo.route = route;
			callback();
		}  
	}
	
	//获取请求报文体
	function fetchReqData(callback){  
		console.log('---FetchReqData---');
		var postData = [];
		req.on("data",function(chunk){
			postData.push(chunk);
		});
		req.on("end",function(){
			reqData = Buffer.concat(postData);
			requestInfo.reqBody = reqData.toString();  
			callback();
		}); 
    }
	
	//TODO:报文验证，可以提取成模块
	function verifyRequetData(callback) { 
			console.log('---VerifyRequetData---');
			callback(); 
>>>>>>> dx
	}
	
	//转发请求
	function proxyRequest(callback){ 
		console.log('---ProxyRequest---');  
		getRomoteResonse(callback);
	}
	
	function getLocalResonse(callback){
		//TODO:本地缓存XXX
	}
	
	function getRomoteResonse(callback){
		var options; 
		//modify request options
		options = {
			hostname : requestInfo.route.targetHost,
			port     : requestInfo.route.targetPort ,
			path     : requestInfo.route.targetPath,
			method   : req.method,
			headers  : req.headers
		}; 
		options.rejectUnauthorized = false;  
		//TODO:替换或者删除请求报文头或者报文体
		options.headers = _.mapKeys(options.headers,function(value, key){return key.toLowerCase();});
		options.headers["content-length"] = reqData.length;  

		//send request
		var proxyReq = http.request(options, function(res) {

			var statusCode = res.statusCode;
			//TODO:替换statusCode 
			//TODO:替换响应头 
			var resHeader = res.headers;
			resHeader = _.mapKeys(resHeader,function(value, key){return key.toLowerCase();});  
			delete resHeader['content-length']; 
			proxyRsp.writeHead(statusCode, resHeader); 
			var length,
				resData = []; 
			res.on("data",function(chunk){
				resData.push(chunk);
			}); 
			res.on("end",function(){
				var serverResData; 
				async.series([
					//报文处理
					//发送代理报文 
					function(callback){ 
						serverResData = Buffer.concat(resData);
						proxyRsp.end(serverResData);
						callback();  
					}
					//记录缓存或者持久化
				],function(err,result){
					callback && callback();
				});
			});  
		}); 
		proxyReq.on("error",function(e){ 
			proxyRsp.end();
		}); 
		proxyReq.end(reqData); 
	}  
}
<<<<<<< HEAD
=======
   
>>>>>>> dx

module.exports.requestHandler = requestHandler;
