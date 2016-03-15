var log4js = require('log4js');
var path = require('path');
var app_path = path.join(__dirname, '../');

// log4js.configure(__dirname + 'config/log4js.json');
log4js.configure(path.join(app_path, 'config/log4js.json'));


var logger = log4js.getLogger("app");


function logger(logname) {
	
	return logger;
} 

function test() {
	logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Gouda.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
} 

// test();

module.exports = logger;



