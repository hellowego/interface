var net = require('net');
var log4js = require('log4js');
var httpClient = require('../../client/httpClient');
// var routerParse = require('../../routerParse');
// var config = require('../../config');


log4js.configure('../../config/log4js.json');
// var log = log4js.getLogger("app");

var HOST = '127.0.0.1';
var PORT = config.port;
/** 读取路由参数 */
// var routerMap = routerParse(config);

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function (sock) {
    
    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);
    
    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function (data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // 回发该数据，客户端将收到来自服务端的数据
        // 载入路由参数
        // routeParams = routerMap.get(url);
        // http 客户端转发请求
        var postData = data.body;
        // log.info('receive from : %s', data.ip)
        
        httpClient.send(postData, '127.0.0.1', function (data) {
            console.log(data);
            sock.write('You said "' + data + '"');
        });
        
    });
    
    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function (data) {

        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

