var http              = require('http'),
	httpProxyHandler  = require("./lib/httpProxyHandler"),
	config            = require('./config/config.js'),
    _                 = require('lodash');
	

function starfish(){
	var self = this,
	proxyWebPort = 8800;
	self.httpProxyServers = [];
	self.socketProxyServers =[];
	self.soapProxyServers = [];
	
	_.union(_.map(config.httpServers, 'port')).forEach(function(port) {
		console.log("create proxy server listening on port" + port.toString());
		self.httpProxyServers.push(http.createServer(httpProxyHandler.requestHandler).listen(port));
	});
	
	 
	

	http.createServer(function (req, res) {
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9000);
	 
}

starfish();
	