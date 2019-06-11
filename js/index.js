(function(){
    window.onload = function () {
        var indexMode = {
            init: function() {
                this.totalEvents();
            },
            totalEvents: function() {
                this.scrollFn();
                this.mouseenterEvent();
                this.animation();
                this.carousel();
                this.clickEvents();
                this.videoEvents();
            },
            // 滑轮滚动一定距离，头部变化
            scrollFn: function() {
                $(window).scroll(function () {
                    indexMode.animation();
                 });
            },
            // 头部变化
            animation: function () {
                var scrollHeight = $(window).scrollTop();
                    if(scrollHeight >= 80) {
                        $('.top').css('display','none');
                        $('.top_scroll').css('display','block');
                    } else {
                        $('.top').css('display','block');
                        $('.top_scroll').css('display','none');
                    }
                    if(scrollHeight >= 1100) {
                        $('.third_person').animate({
                            left:'-300px',
                            bottom:'-135px'
                        },1000)
                    }
            },
            mouseenterEvent: function () {
                $('.news_item').mouseenter(function () {
                    $('.news_box.active').find('.news_item').removeClass('active');
                    $(this).addClass('active');
                });
                $('.news_tab_item').mouseenter(function (e) {
                    let index = $(this).index();
                    $('.news_tab_item').removeClass('active');
                    $(this).addClass('active');

                    $('.news_box').removeClass('active').addClass('hide');
                    $('.news_box').eq(index).removeClass('hide').addClass('active');
                });
                $('.video_tab_li').mouseenter(function () {
                    $('.video_tab_li').removeClass('active');
                    $(this).addClass('active');
                    $('.video_box').removeClass('active').addClass('hide');
                    $('.video_box').eq($(this).index()).removeClass('hide').addClass('active');
                });
                $('.video_mask').mouseenter(function () {
                    $(this).addClass('hide');
                }).mouseleave(function () {
                    $(this).removeClass('hide');
                });
            },
            clickEvents: function () {
                let video = document.getElementsByClassName('video');
                $('.video_button').click(function(){
                    let v_attr = $(this).parent().siblings('video').attr('src');
                    $('.big_video_box').find('video').attr('src',v_attr);
                    $('.big_video_box').show();
                });
                $('.close_video').click(()=>{
                    $('.big_video_box').find('video').attr('src','');
                    $('.big_video_box').hide();
                })
            },
            videoEvents: function () {
                let v = document.getElementsByClassName('video');
                
            },
            // 轮播图
            carousel: function(){
                let flag = true;
                let index = 1;
                $('.carousel_item').last().clone().insertBefore($('.carousel_item').first());
                $('.carousel_item').eq(1).clone().appendTo('.carousel_ul');
                let len = $('.carousel_item').length;
                let p_width = $('.carousel_item img').width();
                $('.carousel_ul').css('left',''+ -p_width +'');
                let timerID = setInterval(selectPic,3000);
                $('.carousel_box').mouseenter(()=>{
                    clearInterval(timerID);
                }).mouseleave(()=>{
                    timerID = setInterval(selectPic,3000);
                })    
                // 自动切换图片
                function selectPic(){
                    // 初始   

                    if(index < (len - 2) && index > 0) {
                        flag = false;
                        $('.carousel_ul').animate({
                            left:''+ (-p_width) * (index + 1) + 'px'
                        },800,'linear',function(){
                            flag = true;
                        })
                        index++;

                    } else if (index === (len - 2)) {
                        flag = false;
                        $('.carousel_ul').animate({
                            left:''+ (-p_width) * (index + 1) + 'px'
                        },800,'linear',function () {
                            $('.carousel_ul').css('left',-p_width);
                            flag = true;
                        });          
                        index = 1;
                    }                
                }
                $('.arrow_right').click(function(){
                    if(flag) {
                        clearInterval(timerID);
                        selectPic();
                        timerID =  setInterval(selectPic,3000);
                    }
                });
                $('.arrow_left').click(function(){
                    if(flag) {
                        flag = !flag;
                        clearInterval(timerID);
                        if(index === 1){
                            $('.carousel_ul').animate({
                                left:'0px'
                            },800,'linear',function(){
                                $('.carousel_ul').css('left', -(len-2) * p_width);
                                flag = !flag;
                            })
                            index = len-2;
                        } else {
                            $('.carousel_ul').animate({
                                left: ''+ (-p_width) * (index - 1) +'px'
                            },800,'linear',function(){
                                flag = !flag;
                            })
                            index--;
                        }
                        timerID = setInterval(selectPic,3000);
                    }
                })
                
            }
        }
        indexMode.init();
    }
}())
