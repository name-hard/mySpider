/**
 * Created by zyj on 2017/12/4.
 */
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var queryString = require('querystring');
var nodeExcel = require('excel-export');
var app = express();

app.get('/',function (req,res) {
    var conf = {};
    conf.stylesXmlFile = 'styles.xml';
    conf.name = 'zyj';
    conf.cols = [{
        caption:'string',
        type:'string',
        beforeCellWrite:function (row,cellData) {
            return cellData.toUpperCase();
        },
        width:28.71
    },{
        caption:"string",
        type:"string"
    }];
    conf.rows = [
        ['pi','sss'],
        ['ZYJ','qqqq']
    ]
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
});
/*function exportExcel(arr) {


}*/
function getList() {
    return new Promise(function (resolve,reject) {
        request.get({
            url:"https://d.jd.com/lab/get?callback=lab",
            rejectUnauthorized:false,
            gzip:true,
            headers:{
                "Accept":"application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding":"gzip, deflate, br",
                "Accept-Language":"zh-CN,zh;q=0.8",
                "Connection":"keep-alive",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                "Host":"vjudge.net", // 根据network修改
                "Referer":"https://www.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_45363_&utm_term=0148bc406dfb41db934e454bad9ba377-p_1&abt=3",//  这里需要和url统一
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
            }
            // post 请求提交参数
            /*form:queryString.parse('di=u3141283&dri=0&dis=0&dai=1&ps=0x0&dcb=___adblockplus&dtm=SSP_JSONP&dvi=0.0&dci=-1&dpt=none&tsr=0&tpr=1512375911797&ari=2&dbv=2&drs=1&pcs=300x250&pss=300x250&cfv=0&cpl=4&chi=1&cce=true&cec=UTF-8&tlm=1512375911&rw=320&ltu=http%3A%2F%2Fwww.kukanw.com%2Fyoumotupian%2F9591.html%3Fprefixad2%3D0&ltr=http%3A%2F%2Fwww.kukanw.com%2Fduanzijingxuan%2F9695.html&ecd=1&uc=1920x1040&pis=-1x-1&sr=1920x1080&tcn=1512375912')*/
        },
        function (err,res,body) {
            if (err){
                reject(err)
            }
            var arr = JSON.parse(body)
            console.log()
            /*var arr = JSON.parse(body).indexMiaoSha;
            exportExcel(arr);
            console.log(arr);
            resolve(arr);*/
        })
    })
}
getList();
app.listen(3000,function () {
    console.log('listening at 3000');
})
