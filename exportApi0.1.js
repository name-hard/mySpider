/**
 * Created by zyj on 2018/11/15.
 */
var express = require('express');
var request = require('request');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var app = express();
var stream = require('stream');
app.use(express.static("public"))

app.get('/', function(req, res, next) {
    var fileType = 2;
    var fileName = 'api.js';

    if (fileType == 1) {
        //直接访问文件进行下载
        res.redirect(fileName);
    } else if (fileType == 2) {
        //以文件流的形式下载文件
        var filePath = path.join(__dirname, './' + fileName);
        var stats = fs.statSync(filePath);
        var isFile = stats.isFile();
        if(isFile){
            res.set({
                'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
                'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件
                'Content-Length': stats.size  //文件大小
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end(404);
        }
    } else if (fileType == 3) {
        //读取文件内容后再响应给页面
        var filePath = path.join(__dirname, '../public/' + fileName);
        var stats = fs.statSync(filePath);
        var isFile = stats.isFile();
        if (isFile) {
            fs.readFile(filePath, function(isErr, data){
                if (isErr) {
                    res.end("Read file failed!");
                    return;
                }
                res.set({
                    'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
                    'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件
                    'Content-Length': stats.size  //文件大小
                });
                res.end(data)
            })
        } else {
            res.end(404);
        }
    } else {
        res.end(404);
    }
});

app.get('/spider',function (req,res) {
    var fileName = 'api.js';
    request(req.query.url,function (error,response,body) {
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
                                            api += pathSplit.join('') + ": " + pathIndexArr[1] +" => axios."+ wayIndex +"('" + pathIndexArr[0] +"'"+ " + "+ pathIndexArr[1] +")";
                                        } else {
                                            api += pathSplit.join('') + ": params => axios."+ wayIndex +"('" + pathIndex + "', {params: params})";
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
                                            api += pathSplit.join('') + ": data => axios."+ wayIndex +"('" + pathIndex + "', data)";
                                        } else {
                                            api += pathSplit.join('') + ": param => axios."+ wayIndex +"('" + pathIndex + "', '', {params: param})";
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
                                            api += pathSplit.join('') + ": data => axios."+ wayIndex +"('" + pathIndex + "', data)";
                                        } else {
                                            api += pathSplit.join('') + ": param => axios."+ wayIndex +"('" + pathIndex + "', '', {params: param})";
                                        }
                                        break;
                                    case 'delete':
                                        api += pathSplit.join('') + ": param => axios."+ wayIndex +"('" + pathIndex + "', {params: param})";
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
                // fs.writeFile('./api.js', api, function (err) {
                //     if (err) console.error(err);
                //     console.log('数据写入的数据');
                //     console.log('-------------------');
                // });
                res.send(api)
                // //以文件流的形式下载文件
                // var filePath = path.join(__dirname, './' + fileName);
                // var stats = fs.statSync(filePath);
                // var isFile = stats.isFile();
                // if(isFile){
                //     res.set({
                //         'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
                //         'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件
                //         'Content-Length': stats.size  //文件大小
                //     });
                //     res.send(filePath)
                //     // fs.createReadStream(filePath).pipe(res);
                // } else {
                //     res.end(404);
                // }
            }catch (e){
                console.log(e);
            }
        }
    })
})

app.listen(3000,function () {
    console.log('listening at 3000');
})

