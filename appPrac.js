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
app.get('/', function (req, res) {
// 解析得到文档中的所有 sheet
  var sheets = xlsx.parse('./NALA美妆平台商品信息.xlsx');

// 遍历 sheet
  sheets.forEach(function(sheet){
    // 读取每行内容
    let html = ''
    let dataName = []
    for(var rowId in sheet['data']){
      if (rowId > 0) {
        var row = sheet['data'][rowId];
        dataName.push(row[1])
      }
    }
    // html = dataName.join(',')
    for (let i = 0; i < dataName.length ; i++) {
      if (i > 10) {
        break;
      } else {
        let name = escape(dataName[i])
        request({
          url: "http://www.b1bj.com/s.aspx?key=" + name + "&I1.x=0&I1.y=0",
          // method: "POST", // 请求方式，默认为get
          rejectUnauthorized: false,
          // body: JSON.stringify(data), // post参数字符串
          gzip: true,
          headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Cookie": "ASP.NET_SessionId=ydsvrx15xbto2posb1iyifgz; Hm_lvt_2593e6ba8f59725445ca5c425336e9c8=1590808912; Hm_lpvt_d932f5e6ecb2438e8dc4d3861f838117=303c1edc-c033-400c-8dd5-7ce90de57a32; Hm_lpvt_2593e6ba8f59725445ca5c425336e9c8=1590808971; SIGNUSER2=%7B%22signname%22%3A%22sign-7yi9l86erxkw55pu%22%2C%22signcount%22%3A1%2C%22signallcount%22%3A3%7D; SIGNINFO2=%7B%22signurl%22%3A%22http%3A//www.b1bj.com/s.aspx%3Fkey%3D%25E8%258D%25A3%25E8%2580%2580%25E6%2599%25BA%25E6%2585%25A7%25E5%25B1%258F%26I1.x%3D0%26I1.y%3D0%22%2C%22signstep%22%3A3%7D",
            // "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "Host": "www.b1bj.com", // 根据network修改
            "Referer": "http://www.b1bj.com/s.aspx?key=" + name + "&I1.x=0&I1.y=0",//  这里需要和url统一
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
          }
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // res.send(body)
            var $ = cheerio.load(body);
            console.log($(".bjline").length)
            let trList = $(".bjline").length
            // res.send(body);
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
            var data = [
              {
                name: 'sheet1',
                data: arr
              }
            ]
            // 写xlsx
            var buffer = xlsx.build(data);
            fs.writeFile('./resut' + i + '.xlsx', buffer, function (err) {
              if (err)
                throw err;
              console.log('Write to xls has finished');
            });
          }
        })
      }
    }
    // res.write('<!DOCTYPE html>'+
    //   '<html>'+
    //   '<head>'+
    //   '<meta charset="utf-8" />'+
    //   '<title>ffdsfds</title>'+
    //   '</head><body>'+ html + '</body></html>');
  });
})

app.listen(3000, function () {
  console.log('3000appPrac');
})
