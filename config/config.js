module.exports={	
	"httpServers": [{
		"url": "/posp/taxi/signdriver",
		"port": 8081,
		"routeNo": "0101",
		"responseNo" : "0102",
		"checkFields": {
			"OrigDomain": {
				"length": 8,
				"type": 0
			},
			"Token": {
				"length": 32,
				"type": 0
			},
			"CarNo" : {
				"length": 8,
				"type": 0
			},
			"Time" : {
				"length": 8,
				"type": 0
			}			
		},	
		"status": "1",
		"des": ""
	},
	{
		"url": "/posp/taxi/driverinfo",
		"port": 8081,
		"routeNo": "0201",
		"responseNo" : "0202",		
		"checkFields": {
			"OrigDomain": {
				"length": 8,
				"type": 0
			},
			"Token": {
				"length": 32,
				"type": 0
			},
			"DriverEmployeeID" : {
				"length": 8,
				"type": 0
			}
		},	
		"status": "1",
		"des": ""
	}],	
	"routes": [{
		"no": "0101",
		"type": "socket",
		"host": "192.168.128.207",
		"port": 9988,
		"fields": {"CommandType":"0001",
			"OrigDomain":"WEIXIN",
			"Token":"123",
			"CarNo":"",
			"Time":""
			},
		"responseNo" : "0101",
		"status": "1",
		"des": ""
	},
	{
		"no": "0201",
		"type": "socket",
		"host": "192.168.128.207",
		"port": 9988,
		"fields": {"CommandType":"0002",
			"Token":"123",
			"OrigDomain":"WEIXIN",
			"DriverEmployeeID":""
			},
		"responseNo" : "0201",
		"status": "1",
		"des": ""
	},
	{
		"no": "0301",
		"type": "http",
		"host": "139.129.131.178",
		"port": 80,
		"url": "/wq/addons/bound/php/msgsend.php",
		"method": "post",
		"fields": {"CommandType":"0002",
			"Token":"123",
			"OrigDomain":"WEIXIN",
			"DriverEmployeeID":""
			},
		"responseNo" : "0201",
		"status": "1",
		"des": ""
	}],
	"response" : [{
		"no" : "0101",
		"type" : "json",
		"fields" : {
			"DriverID": [72,20],
			"DriverName": [92,120],
			"DriverEmployeeID": [212,20],
			"ErrorCode" : [232,4],
			"ErrorMsg" : [236,50]
		}
	},
	{		
		"no" : "0102",
		"type" : "json",
		"fields" : {
			"DriverID": "",
			"DriverName": "",
			"DriverEmployeeID": "",
			"ErrorCode" : "",
			"ErrorMsg" : ""
		}
	},
	{
		"no" : "0201",
		"type" : "json",
		"fields" : {
			"DriverID": "",
			"DriverName": "",
			"DriverEmployeeID": "",
			"DriverIdentNo": "",
			"CarNo": "",
			"ErrorCode" : "",
			"ErrorMsg" : ""
		}
	},
	{		
		"no" : "0202",
		"type" : "json",
		"fields" : {
			"DriverID": "",
			"DriverName": "",
			"DriverEmployeeID": "",
			"DriverIdentNo": "",
			"CarNo": "",
			"ErrorCode" : "",
			"ErrorMsg" : ""
		}
	},
	{
		"no" : "xxxx",
		"type" : "text",
		"fields" : {
			"DriverID": [72,20],
			"DriverName": [92,120],
			"DriverEmployeeID": [212,20],
			"ErrorCode" : [232,4],
			"ErrorMsg" : [236,50]
		}
	},
	{
		"no" : "0301",
		"type" : "text",
		"fields" : {
			"DriverID": [72,20],
			"DriverName": [92,120],
			"DriverEmployeeID": [212,20],
			"ErrorCode" : [232,4],
			"ErrorMsg" : [236,50]
		}
	}
	],
	"socketServers": [{
		"host": "0.0.0.0",
		"port": "9091",
		"routeNo": "0301",
		"checkFields": {
			"routeNo": {
				"length": "4",
				"type": "number",
				"value": "taxi"
			},
			"driverid": {
				"type": "string"
			},
			"ordertime" : {
				"length": "8",
				"type": "number"
			},
			"ordermoney" : {				
				"type": "number"
			}
		},
		"status": "1",
		"des": ""
	}]
};