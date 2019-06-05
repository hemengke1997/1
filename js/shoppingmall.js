(function () {
    var ShopMode = {
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
            this.cart();
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
            const headNumber = 5;
            let imgSrc;
            //头像下标
            let selected_item_index = 0;
            let len = $('.role_pic').length;
            let width = $('.role_head_li').width();


           
            
            // 鼠标进入的时候，当前头像active 其他头像取消active
            $('.role_head_li').mouseenter(function(){
                $(this).siblings('li').find('img').removeClass('active');
                $(this).find('img').addClass('active');
            })
            $('.role_head_li').mouseleave(function () {
                if($(this).index === selected_item_index) {
                    return;
                } else {
                    $(this).find('img').removeClass('active');
                    $('.role_head_li').eq(selected_item_index).find('img').addClass('active');
                }
            })
            // 1 鼠标离开的时候 恢复上一个选择的头像active状态  并把当前的头像取消active状态
            $('.role_head_li').click(function(){
                if($(this).index() !== selected_item_index) {
                    //上一个选择的人物图隐藏
                    $('.role_pic').eq(selected_item_index).css('display','none');
                    //当前选择的人物图显示
                    selected_item_index = $(this).index();
                    addHeadStyle(selected_item_index);
                }
            })
            // 删除头像的样式
            function deleteHeadStyle(index){
                $('.role_pic').eq(index).css('display','none');
                $('.role_head_li').eq(index).find('img').removeClass('active');
            }
            // 增加头像样式
            function addHeadStyle(index){
                $('.role_head_li').eq(index).find('img').addClass('active');
                imgSrc = $('.role_head_li').eq(index).find('img').attr('src');
                $('.role_pic').eq(index).find('img').attr('src', imgSrc);
                $('.role_pic').eq(index).css('display','flex');
            }

            $('.arrow_right').on('click',function(){
                deleteHeadStyle(selected_item_index);
                selected_item_index++;
                console.log(selected_item_index);
                if(selected_item_index <= len-1){
                    addHeadStyle(selected_item_index);
                    if(selected_item_index >= 3 && selected_item_index <= len-3) {
                        $('.role_head_ul').css('transform','translateX('+ (-width - 10) * (selected_item_index - 2) +'px)')
                    } else if(selected_item_index == len-2) {
                        $('.role_head_ul').css('transform','translateX('+ (-width - 10) * (selected_item_index -3) +'px)')
                    }
                } else if (selected_item_index > len-1) {
                    deleteHeadStyle(selected_item_index);
                    selected_item_index = 0;
                    addHeadStyle(selected_item_index);
                    $('.role_head_ul').css('transform','translateX(0px)')
                } 
            })

            $('.arrow_left').on('click',function () {
                deleteHeadStyle(selected_item_index);
                selected_item_index--;
                console.log(selected_item_index);
                if(selected_item_index >= 0){   
                    addHeadStyle(selected_item_index);
                    if(selected_item_index <= len-3 && selected_item_index > 2) {        
                        $('.role_head_ul').css('transform','translateX('+ (-width - 10) * (selected_item_index - 2) +'px)')    
                    } else if (selected_item_index <= 2) {
                        $('.role_head_ul').css('transform','translateX(0px)');
                    }
                } else if (selected_item_index == -1) {
                    selected_item_index = len - 1;
                    addHeadStyle(selected_item_index);
                    $('.role_head_ul').css('transform','translateX('+ (-width - 10) * (len - headNumber) +'px)')
                }
            })

        },
        cart: function () {
            $('.close_cart').on('click',function(){
                $('.choose_role').css('display','none');
            });

            $('.goods_item').on('mouseenter',function(){
                $(this).addClass('active')
            })
            $('.goods_item').mouseleave(function(){
                $(this).removeClass('active');
            })


            $('.goods_item').click(function () {
                $('.role_right[type="cart"]').css('display','none');
                let item_type = $(this)[0].type;
                $('.role_right[type='+ item_type +']').css('display','block');
            })    
        }
        
    }
    ShopMode.init();
}())