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
			"DriverEmployeeNo" : {
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
		"fields": {
			"prefix" : "000096000100000001000000022016040509450011111111111111111111111111111111",
			"CarNo" : "",
			"Time" : ""
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
		"fields": {
			"prefix" : "000092000200000001000000022016040509450011111111111111111111111111111111",
			"DriverEmployeeNo" : ""
		},
		"responseNo" : "0201",
		"status": "1",
		"des": ""
	}],
	"response" : [{
		"no" : "0101",
		"type" : "text",
		"fields" : {
			"DriverID": [72,20],
			"DriverName": [92,120],
			"DriverEmployeeID": [212,20],
			"errcode" : [232,4],
			"errmsg" : [236,50]
		}
	},
	{		
		"no" : "0102",
		"type" : "json",
		"fields" : {
			"DriverID": "",
			"DriverName": "",
			"DriverEmployeeID": "",
			"errcode" : "",
			"errmsg" : ""
		}
	},
	{
		"no" : "0201",
		"type" : "text",
		"fields" : {
			"DriverID": [72,20],
			"DriverName": [92,20],
			"DriverEmployeeID": [112,20],
			"DriverIdentNo": [132,18],
			"CarNo": [150,10],
			"errcode" : [160,4],
			"errmsg" : [164,50]
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
			"errcode" : "",
			"errmsg" : ""
		}
	}
	],
	"socketServers": [{
		"host": "0.0.0.0",
		"port": 9091,
		"routeNo": "0001",
		"fields": {
			"OrigDomain": {
				"length": 8,
				"number": 0
			},
			"Token": {
				"length": 32,
				"number": 0
			},
			"DriverEmployeeNo" : {
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
		"routeNo": "0002",
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