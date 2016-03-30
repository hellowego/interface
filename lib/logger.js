/**
 *
 * logger.js
 * 日志模块封装
 * 读取日志配置文件，封装日志接口
 * 有三种日志文件：access、app、error
 * access 记录报文日志，app记录所以日志，error记录异常错误日志
 * 
 *
 */
var log4js = require('log4js');
var path = require('path');
var app_path = path.join(__dirname, '../');  // 获取app的跟目录

log4js.configure(path.join(app_path, 'config/log4js.json')); // 载入配置文件


var logapp = log4js.getLogger("app");
var loghttp = log4js.getLogger("http");


/**
 * @param {string} logname 获取日志的文件名
 * http 记录access.log，app.log
 * app 记录aap.log，如果级别是error或以上的也记录error.log
 */
function logger(logname) {
	if (logname == 'http'){
		return loghttp;
	} else 
	{
		return logapp;
	}	
} 

function test() {
	logger('hi').trace('Entering cheese testing');
    
} 

// test();

module.exports = logger;



