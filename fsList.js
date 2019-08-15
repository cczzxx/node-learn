var fs = require('fs');
var http = require('http');
var url = require('url');
var list = [{
    name: "a",
    content: "yi"
},{
    name: "b",
    content: "er"
}];
//npm config set registry https://registry.npm.taobao.org
//npm config list 查看npm 配置

var server = http.createServer(function(req, res) {
    var path = url.parse(req.url, true);
    var pathName = path.pathname;
    var fsList;

    if(pathName === "/") {
        fs.readdir('./view', function(err, data) {
            if(err) return res.end("404");

            fsList = data;
            var content = "";
            for(var i = 0; i < data.length; i++) {
                content += `<p>
                    <a href="/${data[i]}">${data[i]}</a>
                </p>`
            }

            res.setHeader('Content', 'text/html; charset=utf-8');
            res.end(content);
        })
    }else if(pathName === "/upData") {
        list.unshift(path.query);
        res.statusCode = 302;
        res.setHeader('Location', '/view3');
        res.end();
    }else if(pathName === "/view3") {
        var suggessList = "";
        for(var i = 0; i < list.length; i++) {
            suggessList += `<p>
                ${list[i].name} ${list[i].content}
            </p>`
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(suggessList);
    }else {
        fs.readFile('./view' + pathName, function(err, data) {
            if(err) return res.end("404");

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
        })
    }
});

server.listen(3000, function() {
    console.log("启动啦");
})