// 参数配置文件
var config = {

	// 服务器端口
	port : 8888,

	routers : [{
			surl : "/hello",
			durl : "/hello",
			host : "localhost",
			port : 8888,
			stype : "post",
			dtype : "post",
			fields : ["cardno", "trademoney"]
		}, {
			surl : "/hi",
			durl : "/hi",
			host : "localhost",
			port : 8888,
			stype : "get",
			dtype : "post",
			fields : ["cardno", "trademoney"]
		}, {
			surl : "/nihao",
			durl : "/hi",
			host : "localhost",
			port : 8888,
			stype : "post",
			dtype : "get",
			fields : ["cardno", "trademoney"]
		}
	],

	log4js : {
		"appenders" : [
			{
				"type" : "console",
				"category" : "console"
			},
			
			{
				"type" : "dateFile",
				"filename" : "logs", 
				"pattern" : "debug/yyyyMMddhh.txt", 
				"absolute" : true, 
				"alwaysIncludePattern" : true, 
				"category" : "logInfo" 
			}
		],
		"levels" : {
			"logInfo" : "DEBUG"
		} 
	}
};

module.exports = config;
