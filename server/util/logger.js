var log4js = require('log4js');


log4js.configure('../config/log4js.json');


var log = log4js.getLogger("app");


function logger() {
	function getlog(name){
		return log;
	}
} 


module.exports = logger;


