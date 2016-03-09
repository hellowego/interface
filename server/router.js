var config = require('./config');

var name = '{	"first_name" : "hi",	"last_name" : "hello"}';

function routerParse(config) {

	// console.log(config);
	// console.log(config.port);
	// console.log(config.routers);
	var configstr = JSON.stringify(config);
	var contact = JSON.parse(configstr);
	for (var key in contact) {
		if (key == 'port') {
			console.log('%s, %s ', key, contact[key]);
		}
		if (key == 'routers') {
			//console.log('%s, %s ', key, contact[key]);
			var routers = contact[key];
			for(var i = 0; i < routers.length; i++){
				console.log(routers[i]);
				for(var elem in routers[i]){
					console.log('%s, %s ', elem, routers[i][elem]);
				}
			}
		}
	}
	// console.log(configstr);
}

console.log('hi');

function execute(someFunction, value) {
	someFunction(value);
}

//execute(routerParse, "Hello");

routerParse(config);
