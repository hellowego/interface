var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
		extended : true
	})); // for parsing application/x-www-form-urlencoded



app.post('/', function (req, res) {
	
	console.log(req.body);
	res.json(req.body);
});

var server = app.listen(8888, function () {

		var host = server.address().address;
		var port = server.address().port;

		console.log("应用实例，访问地址为 http://%s:%s", host, port);

	});
