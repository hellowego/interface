module.exports = {
    "webserviceServers": [{
            "IP": "127.0.0.1",
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
            "IP": "127.0.0.1",
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
        }]
}