// var log4js = require('log4js');
// log4js.configure('./config/log4js.json');
// var logger = log4js.getLogger('access');  

var log = require('./util/logger');

var logger = log.getlog('hi');



console.log(log4js.configure);

function say(words) {
    console.log(words);
    logger.info("测试日志信息");

    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Gouda.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');

}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "Hello");

console.log('hi');