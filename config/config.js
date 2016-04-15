module.exports={	
	"httpServers": [{
		"url": "/posp/taxi/signdriver",
		"port": 8081,
		"routeNo": "0101",
		"responseNo" : "0102",
		"checkFields": {
			"OrigDomain": {
				"length": 8,
				"number": 0
			},
			"Token": {
				"length": 32,
				"number": 0
			},
			"CarNo" : {
				"length": 8,
				"number": 0
			},
			"Time" : {
				"length": 8,
				"number": 0
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
				"number": 0
			},
			"Token": {
				"length": 32,
				"number": 0
			},
			"DriverEmployeeID" : {
				"length": 8,
				"number": 0
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
	],
	"socketServers": [{
		"host": "0.0.0.0",
		"port": 9091,
		"routeNo": "0301",
		"fields": {
			"OrigDomain": {
				"length": 8,
				"number": 0
			},
			"Token": {
				"length": 32,
				"number": 0
			},
			"DriverEmployeeID" : {
				"length": 8,
				"number": 0
			}
		},
		"status": "1",
		"des": ""
	},
	{
		"host": "0.0.0.0",
		"port": 9092,
		"routeNo": "0302",
		"fields": {
			"cardno": {
				"length": 16,
				"number": 1
			},
			"password": {
				"length": 6,
				"number": 1
			}
		},
		"status": "1",
		"des": ""
	}],
};