var soap = require('soap-server');

function TestService() {
}
TestService.prototype.test1 = function (myArg1, myArg2) {
    return myArg1 + myArg2;
};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('testService', new TestService());

soapServer.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/testService?wsdl');

/*
function InputObejct(){
}
InputObejct.prototype.concated = '';
InputObejct.prototype.incremented = '';
function OutPutObject() {
}
OutPutObject.prototype.values = '';
var soapOperation = soapService.getOperation('soapServer');
soapOperation.setOutputType(OutPutObject, 'OutPutObject');
//*/