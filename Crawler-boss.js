/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var xlsx = require('node-xlsx');

var fs = require('fs');
var app = express();
var Crawler = require("crawler");

var c = new Crawler({
  maxConnections : 1,
  rateLimit: 5000
});
app.get('/', function (req, res) {
  c.queue([{
    uri: "https://energy.tv.weibo.cn/e/10520/index",
    // The global callback won't be called
    callback : function (error, res, done) {
      if(error){
        console.log(error);
      }else{
        var $ = res.$;
        // $默认使用Cheerio
        if ($(".out-box").length > 0) {
        }
      }
      done();
    }
  }])
  res.write('<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta charset="utf-8" />'+
    '<title>ffdsfds</title>'+
    '</head><body>成功</body></html>');
})

app.listen(3000, function () {
  console.log('3000CrawlerBoss');
})
