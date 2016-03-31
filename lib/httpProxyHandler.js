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
   

module.exports.requestHandler = requestHandler; 