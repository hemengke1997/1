(function () {
    // var arr = [
    //     {
    //         type:1,
    //         className:red

    //     },
    //     {
    //         type:2,
    //         className:blue

    //     }
    // ]
    var indexMode = {
        init: function(){
            this.totalEvents()
        },
        totalEvents: function() {
            this.windowScrollFn();
            this.addToCarFn();
            this.personAnimateFn();
            this.tabMouseEnter();
            this.picLiMouseEnter();
            this.textFn();
            this.changeImgLabel();
            this.headActive();

        },
        windowScrollFn: function () {
            $(window).scroll(function () { 
                var scrollHeight = $(window).scrollTop();
                if(scrollHeight >= 80) {
                    $('.top').css('display','none');
                    $('.top_scroll').css('display','block');
                } else {
                    $('.top').css('display','block');
                    $('.top_scroll').css('display','none');
                }
            });
        },
        addToCarFn: function() {
            $('.add_to_car').mouseenter(function () { 
                $(this).addClass('active').siblings('p').show(1);
            });
            $('.add').mouseleave(function () { 
                $(this).find('.add_to_car').removeClass('active');
                $(this).find('p').hide();
            });
        },
        personAnimateFn: function() {
            $(window).scroll(function(){
                var scrollTop = $(window).scrollTop();
                if(scrollTop >= 650) {
                    $('.person_animate').animate({
                        left: '0px',
                        bottom: '0px'
                    }, 1000 );
                }
            })
        },
        tabMouseEnter: function () {
            $('.tab_list li').mouseenter(function(){
                $(this).siblings('li').removeClass('active');
                $(this).siblings('li').find('.yellow_bg').removeClass('active');
                $(this).addClass('active');
                $(this).find('.yellow_bg').addClass('active');
                var index = $(this).index();
                $('.pic_box').css("display","none");
                $('.pic_box').eq(index).css("display","block");
            });
        },
        picLiMouseEnter: function () {
            $('.pic_list li').mouseenter(function (params) {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
            })
        },
        // 有九张不是限时
        textFn: function () {
            $('.pic_list li').each(function(){
                if($(this).index() > 0){
                    $(this).find('.limited_time').css('display','none');
                }
            });
        },
        changeImgLabel: function(){
            $('.img_label').each(function(){
                var value = $(this).text();
                switch(value){
                    case "皮肤":
                        $(this).css("background-image","url(imgs/pifu_bg.png)");
                        break;
                    case "宠物":
                        $(this).css("background-image","url(imgs/chongwu_bg.png)");
                        break;
                    case "道具":
                        $(this).css("background-image","url(imgs/daoju_bg.png)");
                        break;
                    case "装饰":
                        $(this).css("background-image","url(imgs/zhuangshi_bg.png)");
                        break;
                    case "角色":
                        $(this).css("background-image","url(imgs/juese_bg.png)");
                        break;
                    default:
                        break;
                }
            })
        },
        headActive: function () {
            $('.role_head_li').mouseenter(function(){
                $(this).siblings('li').find('img').removeClass('active');
                $(this).find('img').addClass('active');
                let index = $(this).index();
                $('.role_pic').css("display","none");
                $('.role_pic').eq(index).css("display","flex");    
            });

            // 点击右箭头
            $('.arrow_right').click(function() {
                let index = $('.role_head img.active').parents('li').index();
                let len = $('.role_head_li').length;
                if(index < len-2) {
                    $('.role_pic').eq(index).css('display','none');
                    $('.role_head img.active').removeClass('active');
                    index++;
                    $('.role_pic').eq(index).css('display','flex');
                    $('.role_head_li').eq(index).find('img').addClass('active');
                } else if(index == len-2) {
                    $('.role_pic').eq(index).css('display','none');
                    $('.role_head img.active').removeClass('active');
                    index++;
                    $('.role_pic').eq(index).css('display','flex');
                    $('.role_head_li').eq(index).find('img').addClass('active');
                    // ul的变化
                    $('.role_head_ul').css("transform","translateX(-60px)");
                } else if(index == len-1){
                    $('.role_pic').eq(index).css('display','none');
                    $('.role_head img.active').removeClass('active');
                    $('.role_pic').eq(0).css('display','flex');
                    $('.role_head_li').eq(0).find('img').addClass('active');
                    index = 0;
                    // ul的变化
                    $('.role_head_ul').css("transform","translateX(0px)");
                }
            });
            
            //点击左箭头
            $('.arrow_left').click(function() {
                let index = $('.role_head img.active').parents('li').index();
                let len = $('.role_head_li').length;
                let flag = true;
                if(index > 0) {
                    $('.role_pic').eq(index).css('display','none');
                    $('.role_head img.active').removeClass('active');
                    index--;
                    $('.role_pic').eq(index).css('display','flex');
                    $('.role_head_li').eq(index).find('img').addClass('active');
                    if (index == 0) {
                        if($('.role_head_ul').attr("style") != undefined){
                            $('.role_head_ul').css("transform","translateX(0px)");
                        }
                    }
                } else if (index == 0) {
                    $('.role_pic').eq(index).css('display','none');
                    $('.role_head img.active').removeClass('active');
                    $('.role_pic').eq(len-1).css('display','flex');
                    $('.role_head_li').eq(len-1).find('img').addClass('active');
                    // 下面的ul怎么变化
                    $('.role_head_ul').css("transform","translateX(-60px)");
                } 
            });

            //点击返回箭头
            $('.arrow_back').click(function(){
                $('.choose_role').css('display','none');
            })
        },
        
    }
    indexMode.init();
}())