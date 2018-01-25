/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
/*const charset = require('superagent-charset');
const request = require('superagent');
charset(request);*/
var fs = require('fs');
var queryString = require('querystring');
var app = express();
/*app.use(express.static('public'));
app.get('/',function (req,res) {
    request.get({
        url:'http://www.dygang.net/',
        encoding:null
        /!*form:queryString.parse('type=live&params=%7B%22%24control%22%3A%7B%22schema%22%3A%22index%22%7D%2C%22%24og_title%22%3A%22DetailViewController%22%7D&linkedme_key=e773bfb3454f475c3969de086526c62c&session_id=1513911717564&identity_id=4218080914047048&source=Web&sdk_version=web1.0.2&timestamp=1513911716737&sign=&h5_url=http%3A%2F%2F36kr.com%2F&deeplink_md5=8acb999381b977a885fc2e92ddded8bc&tags=&channel=&feature=&stage=&deeplink_md5_new=82539b3ea86d74e342850fb5e824b1a9&os=Windows')*!/
    },function (error,response,body) {
        var buf =  iconv.decode(body, 'gb2312');
        var $ = cheerio.load(buf);
        $('script').remove();
        $("body").append('<script src="/js/jquery.js"></script>');
        /!*fs.writeFile('./view/1.html',$("body").html(),function (err) {
            if(err){
                console.log('出现错误!')
            }
        })*!/
        console.log($("a"));
        /!*res.send($("a"));*!/
    });
})*/
app.get('/',function (req,res) {
    request.get({url:'https://www.qu.la/book/5443/',encoding:null},function(err,response,body){
       /* var buf = iconv.decode(body, 'gb2312');*/
        var $ = cheerio.load(body);
        var arr = [];
        $('#list dd').each(function(index, el) {
            var str = '';
            if(index !=0 && index < 5){
                /*console.log($(this).attr('href'));*/
                arr.push($(this).text())
                str = $(this).find('a').attr('href');
                console.log(str)
                request.get({
                    url: "https://www.qu.la"+str,
                    async: false
                },function (errs,resp,bodys) {
                    var $1 = cheerio.load(bodys);
                    arr.push($1('#content').text())
                    console.log($1('#content').text());

                })
            }
        });
        res.send(arr);
    });
})

app.listen(3000,function () {
    console.log('3000');
})
