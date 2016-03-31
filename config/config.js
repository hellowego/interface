// 参数配置文件
module.exports  = { 
	routers : [
		{ 
			proxyURI : "/hello",
			port: 8801,
			targetURI : "http://localhost:8888/hello",  
			fields : ["cardno", "trademoney"]
		} ,
		{ 
			proxyURI : "/hi",
			port: 8802,
			targetURI : "http://localhost:8888/hello",  
			fields : ["cardno", "trademoney"]
		} 
	]
};
 
 