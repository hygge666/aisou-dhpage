$(document).ready(function() {
  var searchEngines = ['baidu', 'google', 'meta', 'aisou', 'kaifa', 'thinkanyai'];
  var currentEngineIndex = localStorage.getItem("currentEngineIndex") || 0;
  var $lg = $(".lg");
  $lg.addClass(searchEngines[currentEngineIndex]);

  // 侧边栏导航效果
  $("#menu").click(function(event) {
    $(this).toggleClass('on');
    $(".list").toggleClass('closed');
    $(".mywth").toggleClass('hidden');
  });
  $("#content").click(function(event) {
    $(".on").removeClass('on');
    $(".list").addClass('closed');
    $(".mywth").removeClass('hidden');
    $('#word').hide();
  });

  // 监听点击事件切换搜索引擎
  $lg.click(function() {
    currentEngineIndex = (currentEngineIndex + 1) % searchEngines.length;
    $lg.removeClass(searchEngines.join(' ')).addClass(searchEngines[currentEngineIndex]);
    localStorage.setItem("currentEngineIndex", currentEngineIndex);
  });

  // 回车搜索
  $('#search').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('.wd').val();
    var currentEngine = searchEngines[currentEngineIndex];
    var searchUrl = '';

    if (currentEngine === 'baidu') {
      searchUrl = 'https://www.baidu.com/s?ie=utf-8&word=' + encodeURIComponent(searchTerm);
    } else if (currentEngine === 'google') {
      searchUrl = 'https://gg.lty.wiki/search?q=' + encodeURIComponent(searchTerm);
    } else if (currentEngine === 'meta') {
      searchUrl = 'https://metaso.cn/?q=' + encodeURIComponent(searchTerm);
    } else if (currentEngine === 'aisou') {
      searchUrl = 'https://www.sou.com/?q=' + encodeURIComponent(searchTerm);
    } else if (currentEngine === 'kaifa') {
      searchUrl = 'https://kaifa.baidu.com/searchPage?wd=' + encodeURIComponent(searchTerm);
    } else if (currentEngine === 'thinkanyai') {
      searchUrl = 'https://thinkany.so/zh/search?q=' + encodeURIComponent(searchTerm);
    }
    window.open(searchUrl);
  });

  // 关键词sug
  $('.wd').keyup(function() {
    var keywords = $(this).val();
    if (keywords == '') {
      $('#word').hide();
      return;
    }
    $.ajax({
      url: 'https://suggestion.baidu.com/su?wd=' + encodeURIComponent(keywords),
      dataType: 'jsonp',
      jsonp: 'cb',
      beforeSend: function() { },
      success: function(data) {
        $('#word').empty().show();
        if (data.s == '') {
          $('#word').hide();
        }
        $.each(data.s, function() {
          $('#word').append('<li><svg class="icon" style="width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' + this + '</li>');
        })
      },
      error: function() {
        $('#word').empty().show();
        $('#word').hide();
      }
    })
  });

  // 点击搜索数据复制给搜索框
  $(document).on('click', '#word li', function() {
    var word = $(this).text();
    $('.wd').val(word);
    $('#word').hide();
    $("form").submit();
  });
});