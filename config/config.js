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
		"destinationNo": "0001",
		"status": "1",
		"des": ""
	},
	{
		"utl": "/hello",
		"port": 8082,
		"destinationNo": "0001",
		"status": "1",
		"des": ""
	}],
	"socketServers": [{
		"host": "0.0.0.0",
		"Port": 9091,
		"destinationNo": "0001",
		"fields": {
			"cardno": {
				"length": 16,
				"number": 1
			},
			"trademoney": {
				"length": 16,
				"number": 1
			}
		},
		"status": "1",
		"des": ""
	},
	{
		"host": "0.0.0.0",
		"Port": 9092,
		"destinationNo": "0002",
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
	"destinations": [{
		"no": "0001",
		"type": "http",
		"host": "0.0.0.0",
		"port": 8083,
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