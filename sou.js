$(document).ready(function() { var wid = $("body").width(); if (wid < 640) { } else { $(".wd").focus(); } $("#menu").click(function(event) { $(this).toggleClass('on'); $(".list").toggleClass('closed'); $(".mywth").toggleClass('hidden'); }); $("#content").click(function(event) { $(".on").removeClass('on'); $(".list").addClass('closed'); $(".mywth").removeClass('hidden'); $('#word').hide();});
    //初始化搜索引擎
    var current = localStorage.getItem("5iux-sou-search") || "baidu"; $lg = $(".lg"); $lg.addClass(current);
    //监听点击事件
    $lg.click(function() { if(current == 'baidu'){ $lg.removeClass('baidu').addClass('google'); current = 'google'; }else{ $lg.removeClass('google').addClass('baidu'); current = 'baidu'; } localStorage.setItem("5iux-sou-search",current); });
    // 回车搜索
    $('#search').submit(function(event) { event.preventDefault(); const searchTerm = $('.wd').val(); if(current == 'baidu'){ window.open('https://www.baidu.com/s?ie=utf-8&word=' + searchTerm); }else{ window.open('https://www.google.com/search?hl=zh&q=' + searchTerm); } });
});
//关键词sug
$(function() {
    //当键盘键被松开时发送Ajax获取数据
    $('.wd').keyup(function() { var keywords = $(this).val(); if (keywords == '') { $('#word').hide(); return }; $.ajax({ url: 'https://suggestion.baidu.com/su?wd=' + keywords, dataType: 'jsonp',jsonp: 'cb', beforeSend: function() { }, success: function(data) { $('#word').empty().show(); if (data.s == '') { $('#word').hide(); } $.each(data.s, function() { $('#word').append('<li><svg class="icon" style=" width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' + this + '</li>'); }) }, error: function() { $('#word').empty().show(); $('#word').hide(); } }) })
    //点击搜索数据复制给搜索框
    $(document).on('click', '#word li', function() { var word = $(this).text(); $('.wd').val(word); $('#word').hide(); $("form").submit(); })
})