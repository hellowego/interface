//express_demo.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var roule = '/hi';
app.get(roule, function (req, res) {
   res.send(roule);
})

app.get('/hello', function (req, res) {
   res.send('Hello ');
})

//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.delete('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

app.post('/process_get', function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


var server = app.listen(8888, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})




console.log("start");