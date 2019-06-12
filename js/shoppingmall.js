(function () {
    var canvas = {};
    // 头像下标
    var selected_item_index = 0;
    var context = document.getElementById('role_canvas').getContext('2d');
    var ShopMode = {
        init: function () {
            this.totalEvents()
        },
        totalEvents: function () {
            this.windowScrollFn();
            this.addToCarFn();
            this.personAnimateFn();
            this.tabMouseEnter();
            this.picLiMouseEnter();
            this.textFn();
            this.changeImgLabel();
            this.headActive();
            this.cart();
            this.drawFirstCanvas();
        },
        windowScrollFn: function () {
            $(window).scroll(function () {
                var scrollHeight = $(window).scrollTop();
                if (scrollHeight >= 80) {
                    $('.top').css('display', 'none');
                    $('.top_scroll').css('display', 'block');
                } else {
                    $('.top').css('display', 'block');
                    $('.top_scroll').css('display', 'none');
                }
            });
        },
        addToCarFn: function () {
            $('.add_to_car').mouseenter(function () {
                $(this).addClass('active').siblings('p').show(1);
            });
            $('.add').mouseleave(function () {
                $(this).find('.add_to_car').removeClass('active');
                $(this).find('p').hide();
            });
        },
        personAnimateFn: function () {
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop >= 650) {
                    $('.person_animate').animate({
                        left: '0px',
                        bottom: '0px'
                    }, 1000);
                }
            })
        },
        tabMouseEnter: function () {
            $('.tab_list li').mouseenter(function () {
                $(this).siblings('li').removeClass('active');
                $(this).siblings('li').find('.yellow_bg').removeClass('active');
                $(this).addClass('active');
                $(this).find('.yellow_bg').addClass('active');
                var index = $(this).index();
                $('.pic_box').css("display", "none");
                $('.pic_box').eq(index).css("display", "block");
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
            $('.pic_list li').each(function () {
                if ($(this).index() > 0) {
                    $(this).find('.limited_time').css('display', 'none');
                }
            });
        },
        changeImgLabel: function () {
            $('.img_label').each(function () {
                var value = $(this).text();
                switch (value) {
                    case "皮肤":
                        $(this).css("background-image", "url(imgs/pifu_bg.png)");
                        break;
                    case "宠物":
                        $(this).css("background-image", "url(imgs/chongwu_bg.png)");
                        break;
                    case "道具":
                        $(this).css("background-image", "url(imgs/daoju_bg.png)");
                        break;
                    case "装饰":
                        $(this).css("background-image", "url(imgs/zhuangshi_bg.png)");
                        break;
                    case "角色":
                        $(this).css("background-image", "url(imgs/juese_bg.png)");
                        break;
                    default:
                        break;
                }
            })
        },
        // 界面加载完成后，画第一个canvas
        drawFirstCanvas: function() {
            window.onload = function () {
                ShopMode.beforeDraw();
                ShopMode.draw();
            }
        },
        headActive: function () {
            // 显示小头像的个数
            const headNumber = 5;
            let imgSrc;
            let len = $('.role_head_li').length;
            let width = $('.role_head_li').width();

            function headAddClass() {
                $('.role_head_li').eq(selected_item_index).find('img').addClass('active');
            }
            function headRemoveClass() {
                $('.role_head_li').eq(selected_item_index).find('img').removeClass('active');
            }
            
            // 鼠标进入的时候，当前头像active 其他头像取消active
            $('.role_head_li').mouseenter(function () {
                $(this).siblings('li').find('img').removeClass('active');
                $(this).find('img').addClass('active');
            })
            $('.role_head_li').mouseleave(function () {
                if ($(this).index === selected_item_index) {
                    return;
                } else {
                    $(this).find('img').removeClass('active');
                    headAddClass();
                }
            })
            // 点击小头像 重新画图 并且该小头像active  之前小头像remove active
            $('.role_head_li').click(function () {
                if ($(this).index() !== selected_item_index) {
                    headRemoveClass();
                    ShopMode.clearCanvas();
                    selected_item_index = $(this).index();
                    headAddClass();
                    ShopMode.beforeDraw();
                    ShopMode.draw();
                }
            })
            $('.arrow_right').on('click', function () {
                // 1.取消当前小头像的样式
                headRemoveClass();
                selected_item_index++;
                if (selected_item_index <= len - 1) {
                    headAddClass();
                    if (selected_item_index >= 3 && selected_item_index <= len - 3) {
                        $('.role_head_ul').css('transform', 'translateX(' + (-width - 10) * (selected_item_index - 2) + 'px)')
                    } else if (selected_item_index == len - 2) {
                        $('.role_head_ul').css('transform', 'translateX(' + (-width - 10) * (selected_item_index - 3) + 'px)')
                    }
                } else if (selected_item_index > len - 1) {
                    headRemoveClass();
                    selected_item_index = 0;
                    headAddClass();
                    $('.role_head_ul').css('transform', 'translateX(0px)')
                } 
                // 开始重绘canvas
                ShopMode.clearCanvas();
                ShopMode.beforeDraw();
                ShopMode.draw();
            })

            $('.arrow_left').on('click', function () {
                headRemoveClass();       
                selected_item_index--;
                if (selected_item_index >= 0) {
                    headAddClass();
                    if (selected_item_index <= len - 3 && selected_item_index > 2) {
                        $('.role_head_ul').css('transform', 'translateX(' + (-width - 10) * (selected_item_index - 2) + 'px)')
                    } else if (selected_item_index <= 2) {
                        $('.role_head_ul').css('transform', 'translateX(0px)');
                    }
                } else if (selected_item_index == -1) {
                    selected_item_index = len - 1;
                    headAddClass();
                    $('.role_head_ul').css('transform', 'translateX(' + (-width - 10) * (len - headNumber) + 'px)')
                }
                // 开始重绘canvas
                ShopMode.clearCanvas();
                ShopMode.beforeDraw();
                ShopMode.draw();
            })

        },
        cart: function () {
            $('.delete_goods').click(function (e) {
                e.stopPropagation();
                $(this).parent('li').removeClass('selected');
                $(this).css('display','none');
                $(this).siblings('.add_goods').css('display','block');
                delete canvas[$(this).parent('li').attr('type')];
                if(Object.keys(canvas).length == 1) {
                    $('.reset').removeClass('active').attr('disabled',true);
                }
                // 开始重绘canvas
                ShopMode.clearCanvas();
                ShopMode.beforeDraw();
                ShopMode.draw();
            }).mouseenter(function () {
                $(this).addClass('active');
            }).mouseleave(function () {
                $(this).removeClass('active');
            })
            $('.reset').click(function () {
                if(Object.keys(canvas).length>1) {
                    for(let key in canvas) {
                        if(key != 'role'){
                            delete canvas[key];
                        }
                    }
                    $('.goods_item').removeClass('selected');
                    $('.delete_goods').css('display','none');
                    $('.add_goods').css('display','block');
                    $(this).removeClass('active').attr('disabled',true);
                    ShopMode.clearCanvas();
                    ShopMode.beforeDraw();
                    ShopMode.draw();
                }
            });
            $('.close_cart').on('click', function () {
                $('.choose_role').css('display', 'none');
            });
            $('.goods_item').mouseleave(function () {
                if(!$(this).hasClass('selected')){
                    $(this).removeClass('active');
                }
            }).mouseenter(function () {
                if(!$(this).hasClass('selected')){
                    $(this).addClass('active');
                }
            });
            $('.goods_item').click(function () {
                $('.role_right[type="cart"]').css('display', 'none');
                let item_type = $(this)[0].type;
                $('.role_right[type=' + item_type + ']').css('display', 'block');
            });
            $('.arrow_back').click(function () {
                $('.role_right').css('display', 'none');
                $('.role_right[type="cart"]').css('display', 'block');
                
                if(Object.keys(canvas).length>1) {
                    $('.reset').addClass('active').attr('disabled',false);
                    let keyArr = [];
                    for(let key in canvas) {
                        if(key != 'role'){
                            keyArr.push(key);
                        }
                    }
                    keyArr.forEach(function(v){
                        $('.goods_item[type='+ v +']').addClass('selected');
                        $('.goods_item[type='+ v +']').find('.add_goods').css('display','none');
                        $('.goods_item[type='+ v +']').find('.delete_goods').css('display','block');
                    })
                }
            });
            $('.head_li>img').click(function () {
                // 饰品图片路径
                let imgSrc = $(this).attr('src');
                // 获取当前type， 把这个type加到canvas对象中
                let type = $(this).parents('.role_right').attr('type');    
                canvas[type] = imgSrc;  
                let index = ShopMode.beforeDraw();
                // 1，先把当前显示的图片隐藏
                $('.role_pic').eq(index).css('display', 'none');
                // 2. 画一个canvas
                ShopMode.draw();
            })
        },
        beforeDraw: function () {
            let roleImgSrc;
            let index;  
            // 获取到当前显示的角色图的路径
            $('.role_head_li').find('img').each(function (i,v) {
                if ($(v).hasClass('active')) {
                    roleImgSrc = $(v).attr('src');
                    index = i;
                }
            });
            canvas['role'] = roleImgSrc;
            return index;
        },
        draw: function() {
             // 点击饰品换装
            
            for(let key in canvas) {
                if(key === 'head') {
                    ShopMode.createImage(context,key,0,0);
                } else if (key === 'clothes'){
                    ShopMode.createImage(context,key,100,100);
                } else if (key === 'pants') {
                    ShopMode.createImage(context,key,150,150);         
                } else if (key === 'shoes') {
                    ShopMode.createImage(context,key,150,200);
                } else if (key === 'suit') {
                    ShopMode.createImage(context,key,200,200);
                } else if (key === 'role') {
                    ShopMode.createImage(context,key,185,220);
                }
            }
        },
        // 创建img对象并画图
        createImage: function (context,key,x,y) {
            let img = new Image();
            img.src = ''+ canvas[key] +'';
            img.onload = function () {
                context.drawImage(img, x, y);      
            }
        },
        // 清空canvas
        clearCanvas: function () {
            var c = document.getElementById('role_canvas');
            context.clearRect(0,0,c.width,c.height);
        }
    }
    ShopMode.init();
}())