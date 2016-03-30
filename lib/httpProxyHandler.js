var http           = require("http"),
    httpProxy      = require('http-proxy'),
	url            = require("url"),
    config         = require('../config/config.js'),
    _              = require('lodash'); 
var proxy = httpProxy.createServer({}); 
proxy.on('proxyRes', function (proxyRes, req, res) {
  //TODO: 调用缓存模块
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

//TODO:报文验证，可以提取成模块
function verifyRequetData(req) {

}

//处理请求
function requestHandler(req,rsp) { 
    var host               = req.headers.host,
        protocol           = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http",
        fullUrl            = (protocol + '://' + host + req.url),
        urlPattern         = url.parse(fullUrl),
        path               = urlPattern.path;
  
	var route = _.find(config.routers, { 'proxyURI': path}); 
	if(route){ 
		//TODO: 报文验证
		//TODO：调用缓存模块
		 console.log('123');
		proxy.web(req, rsp,{
			target:  route.targetURI
		  }); 
	}
	else{ 
		rsp.writeHead(404);
		rsp.end();
	}
}
 

module.exports.requestHandler = requestHandler; 