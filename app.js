/**
 * Created by zyj on 2017/11/30.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var app = express();

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
    //http://www.jianshu.com/
    request("https://d.jd.com/lab/get?callback=lab",function (error,response,body) {
        if (!error && response.statusCode == 200){
            var $ = cheerio.load(body);
            /*var html = "";
            $(".meta").each(function (index,entry) {
                html += '<div>';
                html += '<p>专题：'+ $(entry).find('.collection-tag').html() +'</p>';
                html += '</div>';
             })*/
            /*var arr = [];
            var arrTitle = [];
            var arrBrowse = [];
            var arrComment = [];
            var arrLike = [];
            $(".meta").each(function (index,entry) {
                arrTitle.push($(entry).find('a:nth-of-type(1)').text().trim());
                arrBrowse.push($(entry).find('a:nth-of-type(2)').text().trim());
                arrComment.push($(entry).find('a:nth-of-type(3)').text().trim());
                arrLike.push($(entry).find('span').text().trim());
            });
            arr.push(arrTitle);
            arr.push(arrBrowse);
            arr.push(arrComment);
            arr.push(arrLike);*/
            res.send(body);
        }
    })
})

app.listen(3000,function () {
    console.log('listening at 3000');
})