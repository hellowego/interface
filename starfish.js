var http              = require('http'),
	net 			  = require('net'),
	httpProxyHandler  = require("./lib/httpProxyHandler"),
	socketProxyHandler  = require("./lib/socketProxyHandler"),
	config            = require('./config/config.js'),
    _                 = require('lodash');
	

function starfish(){
	var self = this,
	proxyWebPort = 8800;
	self.httpProxyServers = [];
	self.socketProxyServers =[];
	self.soapProxyServers = [];
	
	// http服务端，接受http服务
	_.union(_.map(config.httpServers, 'port')).forEach(function(port) {
		console.log("create proxy server listening on port" + port.toString());
		self.httpProxyServers.push(http.createServer(httpProxyHandler.requestHandler).listen(port));
	});
	
	
	// socket 服务端，接受socket服务
	_.union(_.map(config.socketServers, 'port')).forEach(function(port) {
		console.log("create proxy server listening on port" + port.toString());
		self.socketProxyServers.push(net.createServer(socketProxyHandler.requestHandler).listen(port));
	});
		
}

starfish();
	