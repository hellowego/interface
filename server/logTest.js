// var log4js = require('log4js');
// log4js.configure('./config/log4js.json');
// var logger = log4js.getLogger('access');  

var logger = require('./util/logger');

var logapp = logger('app');
var loghttp = logger('http');



function say(words) {
    console.log(words);
    logapp.trace('Entering cheese testing');
    logapp.debug('Got cheese.');
    logapp.info('Cheese is Gouda.');
    logapp.warn('Cheese is quite smelly.');
    logapp.error('Cheese is too ripe!');
    logapp.fatal('Cheese was breeding ground for listeria.');
	
	loghttp.trace('Entering cheese testing');
    loghttp.debug('Got cheese.');
    loghttp.info('Cheese is Gouda.');

}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "Hello");

console.log('hi');