var _ = require('lodash');
var config = require('./wsdlServerConfig.js');
var soap = require('./soap-server.js');
var EventProxy = require('eventproxy');
var http = require("http");

function webserviceProxyHandler() {
    webserviceProxyHandler.prototype.proxy = function (soapRequestData) {
        var ep = EventProxy();
        ep.fail(function (err) {
            console.log('ep.fail: %s', err.message);
		// throw err;
        });
        
        function myFail() {
            console.log('myFail: ');
        }
        verifyRequestData(soapRequestData);
        // 向代理服务器发送数据
        ep.on('proxyRequest', proxyRequest);
        
        // 服务器返回
        ep.on("socketResponse", socketResponse);
        
        // 定义异常
        ep.fail(myFail);
        
        function verifyRequestData(data) {
            console.log('---verifyRequetData---');
            console.log(data);
            try {
                var dataJson = JSON.parse(data);
                // 获取路由
                var routeNo = dataJson.routeNo;
                console.log(dataJson);
                console.log(routeNo);
                
                
                if (dataJson.routeNo) {
                    console.log("emit proxyRequest");
                    ep.emit("proxyRequest", dataJson);
                }
                else {
                    console.log("emit socketResponse");
                    ep.emit("socketResponse", "报文格式错误");
                }
			
            } catch (err) {
                console.log("报文格式错误");
            }
		
        }
        
        function socketResponse(data) {
            console.log('---soapResponse---');
            console.log(data);
             return data;
        }
        
        function proxyRequest(data) {
            console.log('---proxyRequest---');
            console.log(data);
            var soapServerParams = _.find(config.soapServers, {
                'routeNo' : data.routeNo
            });
            
            console.log(soapServerParams);
            
            var options;
            var requestInfo = {};
            requestInfo.soapServerParams = soapServerParams;
            
            requestInfo.route = _.find(config.routes, {
                'no' : soapServerParams.routeNo
            });
            requestInfo.response = _.find(config.response, {
                'no' : soapServerParams.responseNo
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
                    
                    // console.log(resData);
                    serverResData = Buffer.concat(resData);
                    // console.log(serverResData);
                    
                    try {
                        var dataJson = JSON.parse(serverResData);
                        var dataStr = JSON.stringify(dataJson);
                        console.log(dataStr);
                    } catch (err) {
                        console.log('catch error: ');
                        console.log(err);
						// throw(err);
						// ep.throw(err);
                    }
                    
                    ep.emit("soapResponse", dataStr);
					
                });
            });
            proxyReq.on("error", function (e) {
			// proxyRsp.end();
            });
            proxyReq.end(soapRequestData);
        }
    };
 
}

exports.webserviceProxyHandler = webserviceProxyHandler;