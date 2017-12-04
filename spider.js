/**
 * Created by zyj on 2017/12/1.
 */
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var i = 0;
var url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391';
var app = express();

function  fetchPage(url) {
    startRequest(url);
}

function startRequest(url) {
    // 使用http发起请求
    http.get(url,function (res) {
        var html = '';
        var titles = [];
        res.setEncoding('utf-8');

        // 监听data事件  取数据
        res.on("data",function (chunk) {
            html += chunk;
        })
        
        // 监听end事件
        res.on("end",function () {
            var $ = cheerio.load(html);
            var time = $('.article-info a:first-child').next().text().trim();

            var news_item = {
                //获取文章的标题
                title: $('div.article-title a').text().trim(),
                //获取文章发布的时间
                Time: time,
                //获取当前文章的url
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                //获取供稿单位
                author: $('[title=供稿]').text().trim(),
                //i是用来判断获取了多少篇文章
                i: i = i + 1,

            };
            console.log(news_item);
            //打印新闻信息
            var news_title = $('div.article-title a').text().trim();

            savedContent($,news_title);  //存储每篇文章的内容及文章标题

             /*savedImg($,news_title);    //存储每篇文章的图片及图片标题*/

            //下一篇文章的url
            /*var nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            str1 = nextLink.split('-');  //去除掉url后面的中文
            str = encodeURI(str1[0]);
            //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
            if (i < 10) {
                fetchPage(str);
            }else{

            }*/
        }).on("error",function (err) {
            console.log(err);
        })
    })
}
//该函数的作用：在本地存储所爬取的新闻内容资源
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();

        var y = x.substring(0, 2).trim();

        if (y == '') {
            x = x + '\n';
            //将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.appendFile('./public/data/' + news_title + '.txt', x, 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
}
/*//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($,news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();  //获取图片的标题
        if(img_title.length>35||img_title==""){
            img_title="Null";}
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url

        //采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}*/

fetchPage(url)
/*
app.listen(3000,function () {
    console.log('端口3000启动成功');
})*/
