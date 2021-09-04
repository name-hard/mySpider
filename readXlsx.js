/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var xlsx = require('node-xlsx');
var moment = require('moment')

var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  // 读取每行内容
  let csv = 'name,type,value,date\n'
  let dataName = {}
  let str = 'sister1591891200000.xlsx,sister1592270636000.xlsx,sister1592274158000.xlsx,sister1592276734000.xlsx,sister1592280082000.xlsx,sister1592283483000.xlsx,sister1592285641000.xlsx,sister1592292710000.xlsx,sister1592297418000.xlsx,sister1592297616000.xlsx,sister1592353711000.xlsx,sister1592355149000.xlsx,sister1592363782000.xlsx,sister1592365021000.xlsx,sister1592369806000.xlsx,sister1592373951000.xlsx,sister1592376399000.xlsx,sister1592380864000.xlsx,sister1592389818000.xlsx,sister1592397558000.xlsx,sister1592440171000.xlsx,sister1592449015000.xlsx,sister1592453238000.xlsx,sister1592461912000.xlsx,sister1592485669000.xlsx,sister1592528307000.xlsx,sister1592532401000.xlsx,sister1592543851000.xlsx,sister1592555373000.xlsx,sister1592787353000.xlsx,sister1592803195000.xlsx,sister1592899483000.xlsx,sister1592961814000.xlsx,sister1592999504000.xlsx,sister1593048280000.xlsx,sister1593060483000.xlsx,sister1593396092000.xlsx,sister1593408615000.xlsx,sister1593416424000.xlsx,sister1593478821000.xlsx,sister1593563360000.xlsx,sister1593685804000.xlsx,sister1593737797000.xlsx,sister1593994717000.xlsx,sister1594020611000.xlsx,sister1594082516000.xlsx,sister1594106887000.xlsx,sister1594255677000.xlsx,sister1594344275000.xlsx,sister1594601285000.xlsx,sister1594686591000.xlsx,sister1594774382000.xlsx,sister1594783243000.xlsx'
  let xlsxArr = str.split(',')
  for (let item of xlsxArr) {
    console.log(item)

    // 解析得到文档中的所有 sheet
    let sheets = xlsx.parse('./' + item);

    // 遍历 sheet
    sheets.forEach(function(sheet){
      for(var rowId in sheet['data']){
        var row = sheet['data'][rowId];
        if (dataName.hasOwnProperty(row[0])) {
        } else {
          dataName[row[0]] = []
        }
        let itemTime = item.replace('sister', '').replace('.xlsx', '')
        dataName[row[0]].push({
          name: row[0],
          type: row[0],
          value: row[1],
          date: moment(parseInt(itemTime)).format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });
  }
  for (let dataIndex in dataName) {
    if (dataIndex !== '姐姐名字') {
      for (let item of dataName[dataIndex]) {
        csv += item.name + ',' + item.type + ',' + item.value + ',' + item.date + '\n'
      }
    }
  }
  let buffer = new Buffer(csv)
  fs.writeFile('sister.csv', buffer, function (err) {
    if (err)
      throw err;
    console.log('sister.csv Write to xls has finished');
  });
  res.write('<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta charset="utf-8" />'+
    '<title>ffdsfds</title>'+
    '</head><body>' + JSON.stringify(dataName) +'</body></html>');
})

app.listen(3001, function () {
  console.log('3001readXlsx');
})
