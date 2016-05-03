var _ = require('lodash');
var config = require('./wsdlServerConfig.js');

function requestHandler() {
    requestHandler.prototype.soapServer = function (InputArg) {
        var jsonInput = JSON.parse(InputArg);
        var webServerParams = _.find(config.webserviceServers, {
            "routeNo": jsonInput.routNo
        });
        console.log(InputArg.routNo);
       
        
     
        
        return ret;
    };
}
exports.requestHandler = requestHandler;