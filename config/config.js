// 参数配置文件
module.exports  = { 
	routers : [
		{ 
			proxyURI : "/hello",
			port: 8801,
			targetURI : "http://localhost:9000/hello",  
			fields : ["cardno", "trademoney"]
		} ,
		{ 
			proxyURI : "/hi",
			port: 8802,
			targetURI : "http://localhost:9000/hello",  
			fields : ["cardno", "trademoney"]
		} 
	]
};
 
 