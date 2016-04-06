module.exports={
	"routers": [{
		"proxyPath": "/hello",
		"proxyPort": 8081,
		"targetPath": "/hello",
		"targetHost": "localhost",
		"targetPort": 8888,
		"fields": ["cardno",
		"trademoney"]
	},
	{
		"proxyPath": "/hi",
		"proxyPort": 8802,
		"targetPath": "/hello",
		"targetHost": "localhost",
		"targetPort": 8888,
		"fields": ["cardno",
		"trademoney"]
	}],
	"httpServers": [{
		"url": "/hello",
		"port": 8081,
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
		"utl": "/hi",
		"port": 8082,
		"routeNo": "0001",
		"status": "1",
		"des": ""
	}],
	"socketServers": [{
		"host": "0.0.0.0",
		"Port": 9091,
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
		"Port": 9092,
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
	"routes": [{
		"no": "0001",
		"type": "socket",
		"host": "192.168.128.207",
		"port": 9988,
		"fields": {
			"prefix" : "123",
			"OrigDomain" : "",
			"Token" : "",
			"DriverEmployeeNo" : ""
		},
		"status": "1",
		"des": ""
	},
	{
		"no": "0002",
		"type": "socket",
		"host": "0.0.0.0",
		"port": 9092,
		"status": "1",
		"des": ""
	}]
};