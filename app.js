// /**
//  * Created by zyj on 2017/11/30.
//  */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var app = express();
var xlsx = require('node-xlsx');
var fs = require('fs');

/*// 模板目录
app.set('views', path.join(__dirname, config.viewPath));
app.set('view engine', 'ejs');*/

app.use(express.static('public'));
/*app.use(express.static(path.join(__dirname, 'public')));*/
app.get('/',function (req,res) {
    /*res.render("view/index.html")*/
    res.sendFile( __dirname + "/view/" + "index.html" );
})
app.get('/spider',function (req,res) {
    request({
        url:"http://www.sofreight.com/ports.html",
        rejectUnauthorized:false,
        gzip:true,
        headers:{
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding":"gzip, deflate, br",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "Host":"www.sofreight.com", // 根据network修改
            "Referer":"http://www.sofreight.com/ports/ae",//  这里需要和url统一
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        }
    },function (error,response,body) {
        if (!error && response.statusCode == 200){
            var $ = cheerio.load(body);
            var trList = $("#areaList").children().length
            // var s = ''
            // for (let item of trList) {
            //     console.log(item)
            //     s += $(item).html()
            // }
            res.send(body);
            var arr = [
                [
                    '国家名称',
                    '国家代码',
                ]
            ]
            for (var i = 0; i < trList; i++) {
                let str = $("#areaList").find('a').eq(i).text()
                str = str.replace('(', '|')
                str = str.replace(')', '')
                let arrA = str.split('|')
                arr.push([
                    arrA[0],
                    arrA[1]
                ])
            }
            var data = [
                {
                    name : 'sheet1',
                    // data : [
                    //     [
                    //         '国家名称',
                    //         '国家代码',
                    //     ],
                    //     // [
                    //     //     $("#areaList").find('a').eq(0).text(),
                    //     //     $("#areaList").find('a').eq(0).text()
                    //     // ]
                    // ]
                    data: arr
                }
            ]
            // 写xlsx
            var buffer = xlsx.build(data);
            fs.writeFile('./resut.xls', buffer, function (err){
                if (err)
                    throw err;
                console.log('Write to xls has finished');
            });
        }
    })
})

app.listen(3000,function () {
    console.log('listening at 3000');
})
