var log4js = require('log4js');
// var config = require('./config');

// log4js.configure = config.log4js;
// console.log(log4js.configure);
// var logger = log4js.getLogger('logInfo');
// logger.setLevel('INFO');


log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
    ]
});

var logger = log4js.getLogger('cheese');
// logger.setLevel('ERROR');

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