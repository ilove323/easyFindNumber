/**
 * Created by Witt on 2016/3/24.
 */
'use strict'
const http = require('http')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const bodyParser = require ('body-parser');
const app = express()
const pan = require('./getNumber/magnet')

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use ('/', express.static (__dirname + '/public'));
app.use ('/node_modules', express.static (__dirname + '/node_modules'));
let server = http.createServer(app)
server.listen(1234, () => console.log ('启动web服务成功,请打开127.0.0.1:1234'))

app.get('/magnet', (req, res) => {
    const code  = req.query.code;
    const getName = req.query.name;
    if (!code || !getName) {
        return res.json({msg:'查询串出错或未填写', status: 0})
    }
    return pan[getName](code, (err, v) => {
        if (err) {
            res.status(200)
            return res.json({msg:'未查询到数据', status: 0})
        }
        res.status(200)
        return res.json({data: v,status: 1})
    })
})






























