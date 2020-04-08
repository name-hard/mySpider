/**
 * Created by zyj on 2018/11/15.
 */
var express = require('express');
var request = require('request');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var app = express();
app.use(express.static("public"))

app.get('/spider',function (req,res) {
    let url = req.query.url
    let prefix = req.query.prefix
    request(url,function (error,response,body) {
        if (!error && response.statusCode == 200){
            try {
                var api = "import axios from './http'\n";
                api += '// 生成时间:' + new Date() +'\n'
                api += 'const api = {\n';
                var data = JSON.parse(body)
                for (var i = 0;i < data.tags.length; i++ ){
                    // 模块注释
                    api += '  // ' + data.tags[i].name + '\n'
                    var descSplit = data.tags[i].description.split(' ')
                    var desc = ''
                    // 模块key值
                    _.forEach(descSplit,function (descValue, descIndex) {
                        if (descIndex === 0) {
                            desc += descValue.toLowerCase();
                        } else {
                            desc += descValue;
                        }
                    })
                    api += '  '+ desc +': {\n';
                    _.forEach(data.paths,function (pathValue, pathIndex) {//这里规定的就是第一个参数返回的是value值，第二个参数是下标index
                        // 接口name
                        var pathSplit = pathIndex.split(/\/|-|{|}/)
                        pathSplit = _.drop(pathSplit, 1)
                        pathSplit = _.drop(pathSplit, _.indexOf(pathSplit, 'v1')+1)
                        _.forEach(pathSplit,function (pathArrValue, pathArrIndex) {
                            if (pathArrIndex !== 0) {
                                pathSplit[pathArrIndex] = pathArrValue.charAt(0).toUpperCase() + pathSplit[pathArrIndex].slice(1)
                            }
                        })
                        // 区分请求
                        _.forEach(pathValue,function (wayValue, wayIndex) {//这里规定的就是第一个参数返回的是value值，第二个参数是下标index
                            if (wayValue.tags[0] === data.tags[i].name) {
                                api += '    // ' + wayValue.summary + '\n'
                                api += '    '
                                switch (wayIndex) {
                                    case 'get':
                                        let flag = false
                                        _.forEach(wayValue.parameters,function (paramValue, paramIndex) {
                                            if (paramValue.in === 'path') {
                                                flag = true
                                            }
                                        })
                                        if (flag) {
                                            var pathIndexArr = pathIndex.split(/{|}/)
                                            var pathIndexStr = pathIndex.replace(/{/g,"' + ")
                                            var parms = '('
                                            for (var d = 0;;d++){
                                                if (pathIndexStr.indexOf('}') !== pathIndexStr.lastIndexOf('}') ){
                                                    pathIndexStr = pathIndexStr.replace(/}/," + '")
                                                    parms += pathIndexArr[2 * d + 1] + ', '
                                                } else {
                                                    pathIndexStr = pathIndexStr.replace(/}/,'')
                                                    parms += pathIndexArr[2 * d + 1]
                                                    break
                                                }
                                            }
                                            parms += ')'
                                            api += wayIndex+pathSplit.join('') + ": " + parms +" => axios."+ wayIndex +"('/" + prefix + pathIndexStr +")";
                                        } else {
                                            api += wayIndex+pathSplit.join('') + ": params => axios."+ wayIndex +"('/" + prefix + pathIndex + "', {params: params})";
                                        }
                                        break;
                                    case 'post':
                                        let flagPost = false
                                        _.forEach(wayValue.parameters,function (paramValue, paramIndex) {
                                            if (paramValue.in === 'body') {
                                                flagPost = true
                                            }
                                        })
                                        if (flagPost) {
                                            api += wayIndex+pathSplit.join('') + ": data => axios."+ wayIndex +"('/" + prefix +  pathIndex + "', data)";
                                        } else {
                                            api += wayIndex+pathSplit.join('') + ": param => axios."+ wayIndex +"('/" + prefix +  pathIndex + "', '', {params: param})";
                                        }
                                        break;
                                    case 'put':
                                        let flagPut = false
                                        _.forEach(wayValue.parameters,function (paramValue, paramIndex) {
                                            if (paramValue.in === 'body') {
                                                flagPut = true
                                            }
                                        })
                                        if (flagPut) {
                                            api += wayIndex+pathSplit.join('') + ": data => axios."+ wayIndex +"('/" + prefix +  pathIndex + "', data)";
                                        } else {
                                            api += wayIndex+pathSplit.join('') + ": param => axios."+ wayIndex +"('/" + prefix +  pathIndex + "', '', {params: param})";
                                        }
                                        break;
                                    case 'delete':
                                        let flagDel = false
                                        _.forEach(wayValue.parameters,function (paramValue, paramIndex) {
                                            if (paramValue.in === 'path') {
                                                flagDel = true
                                            }
                                        })
                                        if (flagDel) {
                                            var pathIndexArr = pathIndex.split(/{|}/)
                                            var pathIndexStr = pathIndex.replace(/{/g,"' + ")
                                            var parms = '('
                                            for (var d = 0;;d++){
                                                if (pathIndexStr.indexOf('}') !== pathIndexStr.lastIndexOf('}') ){
                                                    pathIndexStr = pathIndexStr.replace(/}/," + '")
                                                    parms += pathIndexArr[2 * d + 1] + ', '
                                                } else {
                                                    pathIndexStr = pathIndexStr.replace(/}/,'')
                                                    parms += pathIndexArr[2 * d + 1]
                                                    break
                                                }
                                            }
                                            parms += ')'
                                            api += wayIndex+pathSplit.join('') + ": " + parms +" => axios."+ wayIndex +"('/" + prefix + pathIndexStr +")";
                                        } else {
                                            api += wayIndex+pathSplit.join('') + ": params => axios."+ wayIndex +"('/" + prefix + pathIndex + "', {params: params})";
                                        }
                                        break;
                                }
                                api += ',\n'
                            }
                        });
                    });
                    if (i === data.tags.length-1) {
                        api += '  }';
                    } else {
                        api += '  },';
                    }
                    api += '\n';
                }
                api += '}\n'
                api += 'export default api'
                res.send(api)
            }catch (e){
                console.log(e);
            }
        }
    })
})

app.listen(3000,function () {
    console.log('listening at 3000');
})

