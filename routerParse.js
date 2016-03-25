/**
 *
 * routerParse.js
 * 从配置文件中解析路由
 *
 */
var config = require('./config');
var map = require('./util/map');

/**
 * @param {json} config 配置文件中的路由json对象
 */
function routerParse(config) {

	var routerMap = new map();
	// 把json对象转换成json字符串
	var configstr = JSON.stringify(config);
	// 把字符串转换成对象
	var contact = JSON.parse(configstr);
	
	for (var key in contact) {
		if (key == 'port') {
			// console.log('%s, %s ', key, contact[key]);
		}
		if (key == 'routers') {
			//console.log('%s, %s ', key, contact[key]);
			var routers = contact[key];
			for (var i = 0; i < routers.length; i++) {
				routerMap.put(routers[i]['surl'], routers[i]);				
			}
		}
	}

	return routerMap;
}


module.exports = routerParse;
