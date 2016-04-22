var soap = require('soap-server');

function MyTestService() {
}
MyTestService.prototype.test1 = function (myArg1, myArg2) {
    return myArg1 + myArg2;
};
//*
MyTestService.prototype.test2 = function (myArg1, myArg2) {
    return myArg1 + myArg2;
};
//*/
function MyObject() {
}
MyObject.prototype.concated = '';
MyObject.prototype.incremented = 0;

MyTestService.prototype.test3 = function (strArg, intArg) {
    var ret = new MyObject();
    ret.concated = strArg + '[' + intArg + ']';
    ret.incremented = intArg + 1;
    return ret;
};
var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('testService', new MyTestService());
//*
var test2operation = soapService.getOperation('test2');
test2operation.setOutputType('number');
test2operation.setInputType('myArg1', { type: 'number' });
test2operation.setInputType('myArg2', { type: 'number' });
//*/
var test3operation = soapService.getOperation('test3');
test3operation.setOutputType(MyObject, 'MyObject');
test3operation.setInputType('intArg', { type: 'number' });


soapServer.listen(1337, '127.0.0.1');