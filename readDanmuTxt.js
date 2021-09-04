/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var Segment = require("novel-segment");
var segment = new Segment();
segment.useDefault();

var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  let arr = []
  fs.readFile('./danmu.txt', 'utf8', function(err, data){
    let dataArr = JSON.parse(data)
    for (let item of dataArr) {
      var jiebaArr = segment.doSegment(item.content, {
        simple: true
      });
      arr.push(...jiebaArr)
    }
    res.write('<!DOCTYPE html>'+
      '<html>'+
      '<head>'+
      '<meta charset="utf-8" />'+
      '<title>ffdsfds</title>'+
      '</head><body>' + arr + '</body></html>');
  });
})

app.listen(3002, function () {
  console.log('3002readDanmu');
})
