/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var xlsx = require('node-xlsx');

var fs = require('fs');
var queryString = require('querystring');
var app = express();
var Crawler = require("crawler");

var c = new Crawler({
  maxConnections : 1,
  rateLimit: 5000
});
app.get('/', function (req, res) {
  // 解析得到文档中的所有 sheet
  let sheets = xlsx.parse('./NALA.xlsx');

  // 遍历 sheet
  sheets.forEach(function(sheet){
    // 读取每行内容
    let dataName = []
    for(var rowId in sheet['data']){
      if (rowId > 0) {
        var row = sheet['data'][rowId];
        dataName.push(row[1])
      }
    }
    for (let i = 0; i < dataName.length ; i++) {
      let name = escape(dataName[i])
      c.queue([{
        // http://s.manmanbuy.com/Default.aspx?key=韩国蒂佳婷Dr.Jart+ 维生素活颜亮白霜&btnSearch=搜索
        // http://www.b1bj.com/s.aspx?key=" + name + "&I1.x=0&I1.y=0
        uri: "http://s.manmanbuy.com/Default.aspx?key=" + name + "&btnSearch=%CB%D1%CB%F7",
        // The global callback won't be called
        callback : function (error, res, done) {
          if(error){
            console.log(error);
          }else{
            var $ = res.$;
            // $默认使用Cheerio
            // 比一比价
            /*if ($(".bjline").length > 0) {
              let trList = $(".bjline").length
              let arr = [
                [
                  '商品名称',
                  '商品商铺',
                  '商品价格',
                ]
              ]
              for (let iL = 0; iL < trList; iL++) {
                let item = $($(".bjline")[iL])
                arr.push([
                  item.find('.divtitle>div').text(),
                  item.find('.divtitle .divlogo').text(),
                  item.find('.divprice').text()
                ])
              }
              let data = [
                {
                  name: 'sheet1',
                  data: arr
                }
              ]
              // 写xlsx
              let buffer = xlsx.build(data);
              fs.writeFile(dataName[i] + '.xlsx', buffer, function (err) {
                if (err)
                  throw err;
                console.log('Write to xls has finished');
              });
            }*/
            // 慢慢买
            console.log('第' + i + '个' + dataName[i] + '的长度为' + $(".bjlineSmall").length)
            if ($(".bjlineSmall").length > 0) {
              let trList = $(".bjlineSmall").length
              let arr = [
                [
                  '商品名称',
                  '商品商铺',
                  '商品价格',
                ]
              ]
              for (let iL = 0; iL < trList; iL++) {
                let item = $($(".bjlineSmall")[iL])
                arr.push([
                  item.find('.title .t').text(),
                  item.find('.mall').text(),
                  item.find('.cost').text()
                ])
              }
              let data = [
                {
                  name: 'sheet1',
                  data: arr
                }
              ]
              // 写xlsx
              let buffer = xlsx.build(data);
              fs.writeFile(dataName[i] + '.xlsx', buffer, function (err) {
                if (err)
                  throw err;
                console.log(dataName[i] + 'Write to xls has finished');
              });
            }
          }
          done();
        }
      }])
    }
    res.write('<!DOCTYPE html>'+
      '<html>'+
      '<head>'+
      '<meta charset="utf-8" />'+
      '<title>ffdsfds</title>'+
      '</head><body>成功</body></html>');
  });
})

app.listen(3000, function () {
  console.log('3000NodeCrawler');
})
