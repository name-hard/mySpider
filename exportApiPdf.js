/**
 * Created by zyj on 2018/11/15.
 */
var express = require('express');
var request = require('request');
var _ = require('lodash');
var app = express();
app.use(express.static("public"))
var officegen = require('officegen');
var fs    = require('fs');
var path  = require('path');
var docx  = officegen('docx');
var async = require('async');
var mammoth = require("mammoth");

mammoth.convertToHtml({path: "./out.docx"})
  .then(function(result){
    var html = result.value; // The generated HTML
    fs.writeFile('out.pdf', html,  function(err) {
      if (err) {
        return console.error(err);
      }
    });
    var messages = result.messages; // Any messages, such as warnings during conversion
  }).done();

app.get('/spider', function (req, res) {
  let url = req.query.url
  let prefix = req.query.prefix
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(body)
        var pObj = docx.createP();
        pObj.options.align = 'center';
        pObj.addText("API文档", {font_size:20,font_face:'KaiTi_GB2312'});
        // 循环接口
        let index = 0
        let indexOld = 0
        let index2 = 1
        let flagIndex = true
        for (let i in data.paths) {
          if (index != indexOld) {
            indexOld++
            index2 = 1
            flagIndex = true
          }
          // 循环请求方式
          for (let j in data.paths[i]) {
            if (flagIndex) {
              let pObj0 = docx.createP();
              pObj0.addText((index + 1) + '.' + data.tags[_.findIndex(data.tags, {name: data.paths[i][j].tags[0]})].description, {font_size:20,font_face:'KaiTi_GB2312'});
              flagIndex = false
            }
            let pObj0 = docx.createP();
            pObj0.addText((index + 1) + "." + (index2++) + "接口路径：" + i, {font_size:20,font_face:'KaiTi_GB2312'});
            let pObj = docx.createP();
            pObj.addText("请求方式：" + j, {font_size:20,font_face:'KaiTi_GB2312'});
            let dpij = data.paths[i][j]
            if (dpij.parameters && dpij.parameters.length > 0) {
              let table = [
                [{
                  val:"参数",
                  opts:{
                    b:true,
                    sz:'20',
                    align:"left"
                  }
                },{
                  val:"类型",
                  opts:{
                    b:true,
                    sz:'20',
                    align:"left"
                  }
                },{
                  val:"是否必填",
                  opts:{
                    b:true,
                    sz:'20',
                    align:"left"
                  }
                },{
                  val:"传参方式",
                  opts:{
                    b:true,
                    sz:'20',
                    align:"left"
                  }
                }]
              ];
              for (let item of dpij.parameters) {
                if (item.name === 'body') {
                  let schemaArr = []
                  if (item.schema.type) {
                    schemaArr = item.schema.items.$ref.split('/')
                  } else {
                    schemaArr = item.schema.$ref.split('/')
                  }
                  let ddstwo = data.definitions[schemaArr[2]]
                  for (let itemDef in ddstwo.properties) {
                    let requireFlag = false
                    if (ddstwo.required && ddstwo.required.indexOf(itemDef) !== -1) {
                      requireFlag = true
                    }
                    let arrStr = ''
                    if (ddstwo.properties[itemDef].enum) {
                      arrStr = '(可选参数：' + ddstwo.properties[itemDef].enum.join(',') + ')'
                    }
                    let type = ''
                    if (ddstwo.properties[itemDef].type) {
                      type = ddstwo.properties[itemDef].type
                    }
                    table.push([
                      {
                        val: itemDef,
                        opts:{
                          b:true,
                          sz:20,
                          align:"left"
                        }
                      },
                      {
                        val: type + arrStr,
                        opts:{
                          b:true,
                          sz:20,
                          align:"left"
                        }
                      },
                      {
                        val: requireFlag,
                        opts:{
                          b:true,
                          sz:20,
                          align:"left"
                        }
                      },
                      {
                        val: 'body',
                        opts:{
                          b:true,
                          sz:20,
                          align:"left"
                        }
                      }
                    ])
                    if (!type){
                      refSplit(data, table, ddstwo.properties[itemDef].$ref)
                    }
                  }
                } else {
                  let arrStr = ''
                  if (item.type === 'array' && item.items.enum) {
                    arrStr = '(可选参数：' + item.items.enum.join(',') + ')'
                  }
                  table.push([
                    {
                      val: item.name,
                      opts:{
                        b:true,
                        sz:20,
                        align:"left"
                      }
                    },
                    {
                      val: item.type + arrStr,
                      opts:{
                        b:true,
                        sz:20,
                        align:"left"
                      }
                    },
                    {
                      val: item.required,
                      opts:{
                        b:true,
                        sz:20,
                        align:"left"
                      }
                    },
                    {
                      val: item.in,
                      opts:{
                        b:true,
                        sz:20,
                        align:"left"
                      }
                    }
                  ])
                }
              }
              let tableStyle = {
                tableColWidth: 5000,
                tableSize: 20,
                borders:true
              }
              let pObj = docx.createTable(table, tableStyle);
            }
            if (_.findIndex(data.tags, {name: data.paths[i][j].tags[0]}) !== index) {
              index++
            }
          }
        }
        var out = fs.createWriteStream('out.docx');// 文件写入
        var result = docx.generate(out);// 服务端生成word
      } catch (e) {
        console.log(e);
      }
    }
  })
})


function refSplit (data, table, ref) {
  let schemaArr = []
  schemaArr = ref.split('/')
  let ddstwo = data.definitions[schemaArr[2]]
  for (let itemDef in ddstwo.properties) {
    let requireFlag = false
    if (ddstwo.required && ddstwo.required.indexOf(itemDef) !== -1) {
      requireFlag = true
    }
    let arrStr = ''
    if (ddstwo.properties[itemDef].enum) {
      arrStr = '(可选参数：' + ddstwo.properties[itemDef].enum.join(',') + ')'
    }
    let type = ''
    if (ddstwo.properties[itemDef].type) {
      type = ddstwo.properties[itemDef].type
    }
    table.push([
      {
        val: itemDef,
        opts:{
          b:true,
          sz:20,
          align:"left"
        }
      },
      {
        val: type + arrStr,
        opts:{
          b:true,
          sz:20,
          align:"left"
        }
      },
      {
        val: requireFlag,
        opts:{
          b:true,
          sz:20,
          align:"left"
        }
      },
      {
        val: schemaArr[2].toLowerCase(),
        opts:{
          b:true,
          sz:20,
          align:"left"
        }
      }
    ])
  }
}

app.listen(3000, function () {
  console.log('listening at 3000');
})

