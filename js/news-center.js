(function(){
    window.onload=function() {
        var news_li = $('.news_li');
        for (var i = 0, len = news_li.length; i < len; i++) {
            $(news_li[i]).hover(function (e) {
                $(this).addClass('active');
                $(this).find('.container').animate({
                    left: "-50px"
                },100,"linear");
                $(this).find('.news_date').css('display','none');
                $(this).find('.news_arrow').css('display','block');
            }, function (e) {
                $(this).removeClass('active');
                $(this).find('.container').css("left","0px");
                $(this).find('.news_arrow').css('display','none');
                $(this).find('.news_date').css('display','block');
            });
        }
        $(window).scroll(function () {
           var scrollHeight = $(window).scrollTop();
           //console.log(scrollHeight);
           if(scrollHeight >= 100) {
               $('.top').css('display','none');
               $('.top_scroll').css('display','block');
           } else {
               $('.top').css('display','block');
               $('.top_scroll').css('display','none');
           }
        });
    }
})()