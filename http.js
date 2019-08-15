//加载http核心模块
var http = require('http');
var fs = require('fs');

//创建一个web服务器 --> 返回一个Server实例
var server = http.createServer();

//提供对数据的服务
//客户端的请求发过来后，自动触发服务器的request事件，然后执行回调函数
//request  请求对象
//response 响应对象
server.on('request', function(request, response) {
    console.log("接收啦");
    //response有一个write方法给客户端编辑响应数据 write可有多次
    //最后要有end方法表示结束 发送响应数据
    // response.write("hello");
    // response.write(" world");
    // response.end();
    //通常直接用end("XXX")
    var url = request.url;
    if(url === "/") {
        response.end("index");
    }else if(url === "/fs") {
        fs.readFile('./hw.txt', function(err, data) {
            if(err) {
                response.end("error");
            }
            if(data) {
                // response.statusCode = 302;
                // response.setHeader('Location', '/');
                response.setHeader('Content-Type', 'text/html; charset=utf-8');
                response.end(data);
            }
        })
    }else {
        response.end("hello world");
    }
})

//绑定端口号，启动服务器
server.listen(3000, function() {
    console.log("启动成功");
})