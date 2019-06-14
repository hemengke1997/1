(function () {
    window.onload = function () {
        var newsCenterMode = {
            init: function () {
                this.totalEvents();
            },
            totalEvents: function () {
                this.scrollFn();
                this.firstTimeGetNews();
                this.clickNewsList();
                this.getURL();
            },
            getURL: function () {
                // decodeURI  解决中文乱码问题
                var url = decodeURI(window.location.href);
                if (url.split('?').length > 1) {
                    var url = url.split('?');
                    var msg = url[1].split('&&');
                    if (msg.length > 1) {
                        
                        for (let i = 0; i < msg.length; i++) {
                            if (msg[i].split('=')[0] === 'id') {
                                var id = msg[i].split('=')[1];
                            }
                            if (msg[i].split('=')[0] === 'type_id') {
                                var type_id = msg[i].split('=')[1];
                            }
                        }
                        $('.news_body1').css('display','none');
                        newsCenterMode.goToNewsDetails(id, type_id);

                    } else {
                        $('.news_body1').css('display','block');
                        var type = (msg[0].split('='))[1];
                        $('.news_tab_item').each(function () {
                            if($(this).attr('type')===type){
                                $(this).click();
                            }
                        });
                    }
                }
            },
            // 滑轮滚动一定距离，头部变化
            scrollFn: function () {
                $(window).scroll(function () {
                    var scrollHeight = $(window).scrollTop();
                    //console.log(scrollHeight);
                    if (scrollHeight >= 80) {
                        $('.top').css('display', 'none');
                        $('.top_scroll').css('display', 'block');
                    } else {
                        $('.top').css('display', 'block');
                        $('.top_scroll').css('display', 'none');
                    }
                });
            },
            // 第一次获取的新闻
            firstTimeGetNews: function () {
                var url = decodeURI(window.location.href);
                if(url.split('?').length <= 1){
                    $.ajax({
                        type: "get",
                        url: "http://api.paopao.vip/news/item",
                        dataType: "json",
                        success: function (response) {
                            var data = response.data.records;
                            if (response.data.count > 0) {
                                var all_li = '';
                                for (let i = 0; i < data.length; i++) {
                                    all_li += '<li class="news_li" id="' + data[i]._id + '" type_id="' + data[i].type_id + '">' +
                                        '<div class="container">' +
                                        '<div class="news_text">' +
                                        '<span class="news_logo">' + data[i].type + '</span>' +
                                        '<div class="news_text_head">' + data[i].name + '</div>' +
                                        '<div class="news_text_body">' + data[i].description + '</div>' +
                                        '</div>' +
                                        '<div class="news_date">' + newsCenterMode.getDate(data[i].itime) + '</div>' +
                                        '<div class="news_arrow"></div>' +
                                        '</div>' +
                                        '</li>';
    
                                }
                                $('.news_body1').css('display','block');
                                $('.news_detail').html(all_li);
                                $('.news_li').first().addClass('active');
                                $('.news_li').mouseenter(function () {
                                    $('.news_li').removeClass('active');
                                    $(this).addClass('active');
                                    $(this).find('.container').css('left', '-50px');
                                    $(this).find('.news_date').css('display', 'none');
                                    $(this).find('.news_arrow').css('display', 'block');
                                }).mouseleave(function () {
                                    $(this).find('.container').css('left', '0px');
                                    $(this).find('.news_date').css('display', 'block');
                                    $(this).find('.news_arrow').css('display', 'none');
                                });
                                $('.news_li').click(function () {
                                    $('.news_body1').css('display', 'none');
                                    newsCenterMode.goToNewsDetails($(this).attr('id'), $(this).attr('type_id'));
                                    $('.news_body2').css('display', 'block');
                                });
                            }
                        }
                    });
                }
            },
            clickNewsList: function () {
                $('.news_tab_item').click(function () {
                    var newURL = decodeURI(window.location.href).split('?')[0];
                    history.pushState({}, '', newURL);
                    var type = $(this).find('.zh_text').text();
                    if (!$(this).hasClass('active')) {
                        $('.news_tab_item').removeClass('active');
                        $('.yl_bg').removeClass('active');
                        $(this).addClass('active');
                        $(this).find('.yl_bg').addClass('active');
                        newsCenterMode.getNewsList(type, $(this));
                    }
                });
            },
            getNewsList: function (type, _this) {
                // ajax请求
               
                    $.ajax({
                        type: "get",
                        url: "http://api.paopao.vip/news/item",
                        dataType: "json",
                        // async: false,
                        success: function (response) {
                            if (response.code === 0 && response.data.count > 0) {
                                var data = response.data.records;
                                var all_li = '';
                                for (let i = 0, len = data.length; i < len; i++) {
                                    if (response.data.records[i].type == type) {
                                        all_li += '<li class="news_li" id="' + data[i]._id + '" type_id="' + data[i].type_id + '">' +
                                            '<div class="container">' +
                                            '<div class="news_text">' +
                                            '<span class="news_logo">' + data[i].type + '</span>' +
                                            '<div class="news_text_head">' + data[i].name + '</div>' +
                                            '<div class="news_text_body">' + data[i].description + '</div>' +
                                            '</div>' +
                                            '<div class="news_date">' + newsCenterMode.getDate(data[i].itime) + '</div>' +
                                            '<div class="news_arrow"></div>' +
                                            '</div>' +
                                            '</li>';
                                    }
                                }
                                $('.news_detail').html(all_li);
                                $('.news_li').first().addClass('active');
                                $('.news_li').mouseenter(function () {
                                    $('.news_li').removeClass('active');
                                    $(this).addClass('active');
                                    $(this).find('.container').css('left', '-50px');
                                    $(this).find('.news_date').css('display', 'none');
                                    $(this).find('.news_arrow').css('display', 'block');
                                }).mouseleave(function () {
                                    $(this).find('.container').css('left', '0px');
                                    $(this).find('.news_date').css('display', 'block');
                                    $(this).find('.news_arrow').css('display', 'none');
                                });
                                $('.news_li').click(function () {
                                    $('.news_body1').css('display', 'none');
                                    newsCenterMode.goToNewsDetails($(this).attr('id'), $(this).attr('type_id'));
                                    $('.news_body2').css('display', 'block');
                                });

                            }
                        }
                    });

                


            },
            getDate: function (time) {
                let date = new Date(time * 1000);
                let year = date.getFullYear();
                let month = ((date.getMonth() + 1) >= 10) ? date.getMonth() + 1 : '0' + (date.getMonth() + 1).toString();
                let day = (date.getDay() >= 10) ? date.getDay() : '0' + (date.getDay().toString());
                return year + '-' + month + '-' + day;
            },
            goToNewsDetails: function (id, type_id) {
                var _id = id;
                var type_id = type_id;
                var newsType;
                $.ajax({
                    type: "get",
                    url: "http://api.paopao.vip/news/item/one",
                    data: {
                        id: _id
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response.code == 0) {
                            $.ajax({
                                type: "get",
                                url: "http://api.paopao.vip/news/type",
                                dataType: "json",
                                async: false,
                                success: function (response) {
                                    var records = response.data.records;
                                    for (var i = 0; i < records.length; i++) {
                                        if (records[i]._id == type_id) {
                                            newsType = records[i].type;
                                        }
                                    }
                                }
                            });
                            var data = response.data;
                            var all_li = '';
                            all_li += '<div class="title_box">' +
                                '<span class="return_arrow"></span>' +
                                '<div class="det_head">' +
                                '<h2>' + data.title + '</h2>' +
                                '<div class="det_head_bottom">' +
                                '<div class="det_type">' + newsType + '</div>' +
                                '<div class="det_date">' + newsCenterMode.getDate(data.itime) + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="det_body">' +
                                '<div class="det_body_top">' + data.content + '</div>' +
                                '<div class="det_body_middle">' +
                                '<img src="' + data.pic + '" alt="">'
                            '</div>'
                            '</div>';
                            $('.news_body2').html(all_li);
                            $('.return_arrow').click(function () {
                                $('.news_body2').css('display', 'none');
                                $('.news_body1').css('display', 'block');
                            });

                        }
                    }
                })
            }
        }
        newsCenterMode.init();
    }
}())