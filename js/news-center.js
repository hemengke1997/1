(function () {
    window.onload = function () {
        var newsCenterMode = {
            init: function () {
                this.totalEvents();
            },
            totalEvents: function () {
                this.scrollFn();
                this.returnFn();
                this.firstTimeGetNews();
                this.getNewsList();

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
            // 点击返回，回到新闻列表
            returnFn: function () {
                $('.return_arrow').click(function () {
                    $('.news_body2').css('display', 'none');
                    $('.news_body1').css('display', 'block');
                    return false;
                });
            },
            // 第一次获取的新闻
            firstTimeGetNews: function () {
                $('.news_li').click(function () {
                    console.log(1);
                })
                $.ajax({
                    type: "get",
                    url: "http://api.paopao.vip/news/item",
                    dataType: "json",
                    success: function (response) {
                        var data = response.data.records;
                        if (response.data.count > 0) {
                            var all_li = '';
                            for (let i = 0; i < data.length; i++) {
                                all_li += '<li class="news_li" id="' + data[i]._id + '">' +
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
                                newsCenterMode.goToNewsDetails($(this));
                            })
                        }
                    }
                });
            },
            getNewsList: function () {
                $('.news_tab_item').click(function () {
                    // 切换tab样式
                    if (!$(this).hasClass('active')) {
                        $('.news_tab_item').removeClass('active');
                        $('.yl_bg').removeClass('active');
                        $(this).addClass('active');
                        $(this).find('.yl_bg').addClass('active');
                        var newsType = $(this).find('.zh_text').text();
                        // ajax请求
                        if (newsType == '最新') {
                            newsCenterMode.firstTimeGetNews();
                        } else {
                            $.ajax({
                                type: "get",
                                url: "http://api.paopao.vip/news/item",
                                dataType: "json",
                                success: function (response) {
                                    if (response.code === 0 && response.data.count > 0) {
                                        var data = response.data.records;
                                        var all_li = '';
                                        for (let i = 0, len = data.length; i < len; i++) {
                                            if (response.data.records[i].type == newsType) {
                                                all_li += '<li class="news_li" id="' + data[i]._id + '">' +
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
                                        })
                                    }
                                }
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
                return month + '-' + day;
            },
            goToNewsDetails: function (_this) {
                var _id = _this.attr('id');
                console.log(_id);
                $.ajax({
                    type: "get",
                    url: "http://api.paopao.vip/news/item/one",
                    data:{
                        id: _id
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                        console.log(_id);
                    }
                })
            }
        }
        newsCenterMode.init();
    }
}())