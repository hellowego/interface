var log4js = require('log4js');
var config = require('./config');

log4js.configure = config.log4js;
console.log(log4js.configure);
var logger = log4js.getLogger('logInfo');
// logger.setLevel('INFO');

function say(words) {
	console.log(words);
	logger.info("测试日志信息");  
	
}

function execute(someFunction, value) {
	someFunction(value);
}

execute(say, "Hello");

console.log('hi');
