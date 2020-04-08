/**
 * Created by zyj on 2017/12/22.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
/*const charset = require('superagent-charset');
const request = require('superagent');
charset(request);*/
var fs = require('fs');
var queryString = require('querystring');
var app = express();

app.get('/',function (req,res) {
    let data = {}
    request({
        url:"http://192.168.0.221:7002/issues/?filter=-4",
        // method: "POST", // 请求方式，默认为get
        rejectUnauthorized:false,
        // body: JSON.stringify(data), // post参数字符串
        gzip:true,
        headers:{
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding":"gzip, deflate, br",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Cookie": "seraph.rememberme.cookie=13497%3A79c9cb1850731906f8032182384f907823e86b2c; atlassian.xsrf.token=BQLS-EYDV-WTXN-P2F1|61eadd4d14ffb30b80fd0ce7011bf78bf7b6964d|lin; _gitlab_session=492390433436b9ffe07f2d4c1a07898a; issuable_sort=id_desc; JSESSIONID=3892F3B07F7BF29272DCBD9C3ED53C92",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "Host":"192.168.0.221:7002", // 根据network修改
            "Referer":"http://192.168.0.221:7002/issues/?filter=-4&jql=issuetype%20%3D%20Bug%20order%20by%20created%20DESC",//  这里需要和url统一
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        }
    },function (error,response,body) {
        if (!error && response.statusCode == 200){
            res.send(body)
        }
    })
})

app.listen(3000,function () {
    console.log('3000appPrac');
})
