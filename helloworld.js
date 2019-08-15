var fs = require('fs');

//读文件
fs.readFile('./hw.txt', function(err, data) {
    console.log(data.toString());
})
//写文件
fs.writeFile('./hw.txt', '123', function(err) {
    //写入到回调只接受错误的 写入成功时为null
    console.log(err, "write");
})
fs.writeFile('./hw1.txt', '123', function(err) {//自动创建类hw1.txt
    //写入到回调只接受错误的 写入成功时为null
    console.log(err, "write");
})