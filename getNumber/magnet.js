/**
 * Created by Witt on 2016/3/26.
 */
'use strict'
const http = require ('http')
const request = require ('request')
const cheerio = require ('cheerio')

module.exports = {
    pan: (code, cb) => {
        //网盘搜索资源1
        let resource = [];
        request.get ('http://www.wangpansou.cn/s.php?wp=0&ty=gn&op=gn&q=' + code, (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let a = $ ('.cse-search-result_content_item_top_a');
                const length = (a.length < 5 ? a.length - 1 : 4);
                [].forEach.call (a, (v, i) => {
                    if (i < 5) {
                        resource.push ({
                            link: $ (v).attr ('href'),
                            size: '网盘链接'
                        })
                    }
                    if (i == length) cb (resource)
                })
            }
        })
    },
    magnet1: (code, cb) => {
        let resource = [];
        request.get ('http://btcherry.org/search?keyword=' + code, (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let a = $ ('.r');
                const length = (a.length < 5 ? a.length - 1 : 4);
                [].forEach.call (a, (v, i) => {
                    if (i < 5) {
                        let div = $ (v).find ('div');
                        resource.push ({
                            link: div.find ('a').attr ('href'),
                            size: $ (div.find ('.prop_val')[1]).text ()
                        })
                    }
                    if (i == length) cb (resource)
                })
            }
        })
    },
    magnet2: (code, cb) => {
        let resource = [];
        request.get ('http://www.bthave.net/search/' + code + '.html', (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let a = $ ('.search-item h3 a');
                const length = (a.length < 5 ? a.length - 1 : 4);
                [].forEach.call (a, (v, i) => {
                    if (i < 5) {
                        if ($ (v).attr ('href')) {
                            let time = setTimeout (() => {
                                request.get ('http://www.bthave.net/' + $ (v).attr ('href'), (e, r, b) => {
                                    if (! err && res.statusCode == 200) {
                                        $ = cheerio.load (b);
                                        resource.push ({
                                            link: $ ('.panel-body a').attr ('href'),
                                            size: $ ('.yellow-pill').text ()
                                        })
                                        if (i == length) cb (resource)
                                        clearTimeout (time);
                                    }
                                })
                            }, 500)
                        }
                    }
                })
            }
        })
    },
    magnet3: (code, cb) => {
        let resource = [];
        request.get('http://www.cilisou.cn/s.php?q=' + code, (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let a = $('.ttth a');
                const length = (a.length < 5 ? a.length - 1 : 4);
                [].forEach.call(a, (v, i) => {
                    if (i < 5) {
                        resource.push ({
                            link: $ (v).attr('href'),
                            size: ''.trim.call ($ ($ (v).parent ().parent ().find ('.attr_val')[0]).text ().replace (/\r\n/g, ''))
                        })
                    }
                    if (i == length) cb (resource)
                })
            }
        })
    },
    magnet4: (code, cb) => {
        let resource = [];
        request.get('http://btdigge.com/s/' + code, (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let tr = $("a:contains('磁力下载')");
                const length = (tr.length < 5 ? tr.length - 1 : 4);
                [].forEach.call(tr, (v, i) => {
                    if (i < 5) {
                        resource.push ({
                            link: $(v).attr('href'),
                            size: $($(v).parent().parent().find('td')[1]).html()
                        })
                    }
                    if (i == length) cb (resource)
                })
            }
        })
    },
    magnet5: (code, cb) => {
        let resource = [];
        request.get('http://www.btmayi.me/q?kw=' + code, (err, res, body) => {
            if (! err && res.statusCode == 200) {
                let $ = cheerio.load (body);
                let a = $("a:contains('磁力链接')");
                const length = (a.length < 5 ? a.length - 1 : 4);
                [].forEach.call(a, (v, i) => {
                    if (i < 5) {
                        resource.push ({
                            link: $(v).attr('href'),
                            size: $($(v).parent().find('span>.yellow-pill')[1]).html()
                        })
                    }
                    if (i == length) cb (resource)
                })
            }
        })
    }
}