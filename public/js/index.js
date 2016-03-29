/**
 * Created by Witt on 2016/3/29.
 */
$(function () {
    var li = '<li class="list-group-item"><span></span><button class="btn btn-default btn-xs fr">copy</button></li>';
    var list = $('ul.list-group');
    var getNumber = function (code, dom) {
        $.get('/magnet',{code:code,name:dom}, function (data) {
            updateDOM(data.data, dom)
        },'json')
    };
    var updateDOM = function (data, dom) {
        var dom = $('#' + dom);
        dom.slideUp();
        data.forEach(function (v, i) {
            dom.append($(li).find('span').text(v.link).parent().find('button').text((v.size?v.size:'未知')).parent())
        })
        dom.slideDown();
    }
    $('.btn-info').on('click', function () {
        var code = $ ('.form-control').val ();
        if (! code) {
            return alert('请输入查询串')
        }
        list.slideUp();
        list.children('li').remove()
        getNumber(code,'pan')
        getNumber(code,'magnet1')
        getNumber(code,'magnet2')
        getNumber(code,'magnet3')
        getNumber(code,'magnet4')
        getNumber(code,'magnet5')
    })
    list.on('click','li>button', function () {
        $(this).toggleClass('active').parent().find('span').toggleClass('show')
    })
})