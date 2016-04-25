var soap = require('soap-server');
var config = require('./wsdlServerConfig.js');
var _ = require('lodash');
function MyTestService() {
    MyTestService.prototype.soapServer = function (InputArg) {
        var jsonInput = JSON.parse(InputArg);
        var webServerParams = _.find(config.webserviceServers,  {
            "routeNo": jsonInput.routNo
        });
        console.log(InputArg.routNo);
        if (!httpServerParams) {
            next = false;
            proxyRsp.writeHead(404);
            proxyRsp.end();
            console.log('404');
        } else {
            // 参数
            requestInfo.httpServerParams = httpServerParams;
            requestInfo.route = _.find(config.routes, {
                'no' : httpServerParams.routeNo
            });
            requestInfo.response = _.find(config.response, {
                'no' : httpServerParams.responseNo
            });
            console.log(requestInfo.resFields);
            callback();
        }

        var ret = new OutPutObject();
        ret.values = inputArg;
        
        return ret;
    };
}



function InputObejct(){
}
InputObejct.prototype.concated = '';
InputObejct.prototype.incremented = '';
function OutPutObject(){
}
OutPutObject.prototype.values = '';
var soapOperation = soapService.getOperation('soapServer');
soapOperation.setOutputType(OutPutObject, 'OutPutObject');

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('testService', new MyTestService());

//soapOperation.setInputType(InputObejct, 'InputObejct');
/*
var test2operation = soapService.getOperation('test2');
test2operation.setOutputType('number');
test2operation.setInputType('myArg1', { type: 'number' });
test2operation.setInputType('myArg2', { type: 'number' });
//*/

soapServer.listen(1337, '127.0.0.1'); 
console.log('Server running at http://127.0.0.1:1337/testService?wsdl');