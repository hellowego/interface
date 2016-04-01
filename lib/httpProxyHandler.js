
/**
 *
 * httpProxyHandler.js
 * 报文模型
 * 功能：接受Http请求，并转发
 *
 */
 
var http           = require("http"), 
	url            = require("url"),
    config         = require('../config/config.js'),
    _              = require('lodash'),
	messageProxy = require('../proxy').Message,
	UserProxy = require('../proxy').User,
	async          = require('async');  
var mongoose = require('mongoose');

 
 
//处理请求
function requestHandler(req,proxyRsp) { 
    var host               = req.headers.host,
        protocol           =  "http",
        fullUrl            = (protocol + '://' + host + req.url),
        urlPattern         = url.parse(fullUrl),
        path               = urlPattern.path,
		reqData,
		msgId,
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
		requestRecord,
		proxyRequest
    ],function(err, results) { 
		console.log(err);
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

	}
	
	// 请求报文记录数据库
	function requestRecord(callback) {
		var msg = reqData.toString();
		// 去除报文中的空格和回车
		// stringify 把json对象转换成json字符串， parse是字符串转换成对象
		msg = JSON.parse(msg);
		msg = JSON.stringify(msg);

		msgId = mongoose.Types.ObjectId();
		
		messageProxy.newAndSave(msgId, requestInfo.host, 'supply', msg, 0, 'ok', function (err, msg) {
			if (err) {
				console.log(err);
			}
			console.log('message save');
		});
		
		console.log('succ');
		callback(); 
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
						// console.log(serverResData.toString());
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


module.exports.requestHandler = requestHandler;
