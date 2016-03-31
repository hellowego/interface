// 参数配置文件
module.exports  = { 
	routers : [
		{ 
			proxyPath : "/hello",
			proxyPort: 8801,
			targetPath : "/hello",  
			targetHost: "localhost",  
			targetPort : 9000, 
			fields : ["cardno", "trademoney"]
		} ,
		{ 
			proxyPath : "/hi",
			proxyPort: 8802, 
			targetPath : "/hello",  
			targetHost: "localhost",  
			targetPort : 9000, 
			fields : ["cardno", "trademoney"]
		} 
	]
};
 
 