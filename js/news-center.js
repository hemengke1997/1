(function(){
    window.onload=function() {
        var indexMode = {
            init: function() {
                this.totalEvents();
            },
            totalEvents: function() {
                this.newsLiHoverFn();
                this.scrollFn();
                this.returnFn();
                this.showNewsFn();
                this.tabToggleFn();
            },
            // li标签的hover效果
            newsLiHoverFn: function () {
                var news_li = $('.news_li');
                $(news_li).mouseenter(function () {
                    $(news_li).removeClass('active');
                    $(this).addClass('active');
                    $(this).find('.container').css('left','-50px');
                    $(this).find('.news_date').css('display','none');
                    $(this).find('.news_arrow').css('display','block');
                }).mouseleave(function () { 
                    $(this).find('.container').css('left','0px');
                    $(this).find('.news_date').css('display','block');
                    $(this).find('.news_arrow').css('display','none');
                });
            },
            // 滑轮滚动一定距离，头部变化
            scrollFn: function() {
                $(window).scroll(function () {
                    var scrollHeight = $(window).scrollTop();
                    //console.log(scrollHeight);
                    if(scrollHeight >= 80) {
                        $('.top').css('display','none');
                        $('.top_scroll').css('display','block');
                    } else {
                        $('.top').css('display','block');
                        $('.top_scroll').css('display','none');
                    }
                 });
            },
            // 点击返回，回到新闻列表
            returnFn: function () { 
                $('.return_arrow').click(function () { 
                    $('.news_body2').css('display','none');
                    $('.news_body1').css('display','block');
                    return false;
                });  
            },
            // 点击li标签，显示对应新闻
            showNewsFn: function () {
                $(".news_detail li").click(function(){
                    console.log($(this).index());
                    var index = $(this).index();
                    $('.news_body1').css('display','none');
                    $('.news_body2').eq(index).css('display','block');
                });
            },
            // tab效果
            tabToggleFn: function () {
                $('#tab_ul li').mouseenter(function () { 
                    var index = $(this).index();
                    $(this).siblings().find('span').removeClass('active');
                    $(this).find('span').addClass('active');
                    $('.main_2').addClass('hide').removeClass('active');
                    $('.main_2').eq(index).removeClass('hide').addClass('active');
                    $('.main_2').eq(index).find('.news_li').eq(0).addClass('active');
                    $('.main_2').eq(index).find('.news_li').eq(0).siblings().removeClass('active');
                });
            }
        }
        indexMode.init();
    }
}())