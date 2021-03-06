﻿var soap = require('./soap-server.js');
var config = require('./wsdlServerConfig.js');
//var _ = require('lodash');
var webserviceProxyHandler = require('./webserviceProxyHandler.js');
/*
function webserviceProxyHandler() {
    webserviceProxyHandler.prototype.signdriver = function (data) {
        var ret = 'hello :' + data;
    return ret;
    };
    webserviceProxyHandler.prototype.driverinfo = function (data) {
        var ret = 'there :' + data;
        return ret;
    };   
}
//*/
var soapServer = new soap.SoapServer();
config.soapServers.forEach(function (server) {
    soapServer.addService(server['serviceName'], new webserviceProxyHandler());
    soapServer.listen(server['port'], server['IP']);
    console.log('Server running at http://'+ server['IP']+':'+ server['port'].toString()+'/'+ server['serviceName']+'?wsdl');
});

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