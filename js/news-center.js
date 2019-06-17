(function () {
    window.onload = function () {
        var currentPage = 1;
        const pSize = 6;
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
                        $('.news_body1').css('display', 'none');
                        newsCenterMode.goToNewsDetails(id, type_id);

                    } else {
                        $('.news_body1').css('display', 'block');
                        var type = (msg[0].split('='))[1];
                        $('.news_tab_item').each(function () {
                            if ($(this).attr('type') === type) {
                                $(this).click();
                            }
                        });
                    }
                } else {
                    $('.news_body1').css('display', 'block');
                    $('.news_tab_item').eq(0).click();
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
                // var url = decodeURI(window.location.href);
                // if(url.split('?').length <= 1){
                //     $.ajax({
                //         type: "get",
                //         url: "http://api.paopao.vip/news/item",
                //         dataType: "json",
                //         success: function (response) {
                //             var data = response.data.records;
                //             if (response.data.count > 0) {
                //                 var all_li = '';
                //                 for (let i = 0; i < data.length; i++) {
                //                     all_li += '<li class="news_li" id="' + data[i]._id + '" type_id="' + data[i].type_id + '">' +
                //                         '<div class="container">' +
                //                         '<div class="news_text">' +
                //                         '<span class="news_logo">' + data[i].type + '</span>' +
                //                         '<div class="news_text_head">' + data[i].name + '</div>' +
                //                         '<div class="news_text_body">' + data[i].description + '</div>' +
                //                         '</div>' +
                //                         '<div class="news_date">' + newsCenterMode.getDate(data[i].itime) + '</div>' +
                //                         '<div class="news_arrow"></div>' +
                //                         '</div>' +
                //                         '</li>';

                //                 }
                //                 $('.news_body1').css('display','block');
                //                 $('.news_detail').html(all_li);
                //                 $('.news_li').first().addClass('active');
                //                 $('.news_li').mouseenter(function () {
                //                     $('.news_li').removeClass('active');
                //                     $(this).addClass('active');
                //                     $(this).find('.container').css('left', '-50px');
                //                     $(this).find('.news_date').css('display', 'none');
                //                     $(this).find('.news_arrow').css('display', 'block');
                //                 }).mouseleave(function () {
                //                     $(this).find('.container').css('left', '0px');
                //                     $(this).find('.news_date').css('display', 'block');
                //                     $(this).find('.news_arrow').css('display', 'none');
                //                 });
                //                 $('.news_li').click(function () {
                //                     $('.news_body1').css('display', 'none');
                //                     newsCenterMode.goToNewsDetails($(this).attr('id'), $(this).attr('type_id'));
                //                     $('.news_body2').css('display', 'block');
                //                 });
                //             }
                //         }
                //     });
                // }
            },
            clickNewsList: function () {
                $('.news_tab_item').click(function () {
                    var newURL = decodeURI(window.location.href).split('?')[0];
                    history.pushState({}, '', newURL);
                    var type = $(this).find('.zh_text').text();
                    // if (!$(this).hasClass('active')) {
                        $('.news_tab_item').removeClass('active');
                        $('.yl_bg').removeClass('active');
                        $(this).addClass('active');
                        $(this).find('.yl_bg').addClass('active');
                        newsCenterMode.getNewsList(type, $(this));
                    //}
                     
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
                            var arr = [];
                            // 得到相应type的记录数
                            if(type == '最新'){
                                for(let i=0;i<data.length;i++){
                                    arr.push(data[i]);
                                }
                                for(let i=0;i<50;i++){
                                    arr.push(data[1]);
                                }
                            }
                            for(let i=0;i<data.length;i++){
                                if(data[i].type == type){
                                    arr.push(data[i]);
                                }
                            }
                            
                            // 显示第一页的内容
                            newsCenterMode.goPage(arr,1);

                             
                        }
                    }
                });
            },
           
            goPage: function(arr,currentPage){
                // 分页显示
                // arr 保存记录的数组
                // pSize每页显示的行数 先定死6个
                // all_li 新闻列表
           
                var all_li = '';
                var dataLength = arr.length;
                // 总页数
                const totalPage = Math.ceil(dataLength/pSize);
                var startRow = (currentPage-1)*pSize + 1;
                var endRow = currentPage * pSize;
                endRow = (endRow>dataLength) ? dataLength : endRow;
                var commonHTML = '<span class="btn-prev-page">上一页</span>' + 
                '<ul class="pagination-ul">' + 
                '</ul>' + 
                '<span class="btn-next-page">下一页</span>';
                $('.pagination').html(commonHTML);
                // 新闻列表画出来了
                for(let i=startRow;i<=endRow;i++){
                    all_li += '<li class="news_li" id="' + arr[i-1]._id + '" type_id="' + arr[i-1].type_id + '">' +
                    '<div class="container">' +
                    '<div class="news_text">' +
                    '<span class="news_logo">' + arr[i-1].type + '</span>' +
                    '<div class="news_text_head">' + arr[i-1].name + '</div>' +
                    '<div class="news_text_body">' + arr[i-1].description + '</div>' +
                    '</div>' +
                    '<div class="news_date">' + newsCenterMode.getDate(arr[i-1].itime) + '</div>' +
                    '<div class="news_arrow"></div>' +
                    '</div>' +
                    '</li>';
                    
                }
                $('.news_detail').html(all_li);
                // 先把分页的显示效果做了
                var pageItem = '';
                if(totalPage == 1){
                    pageItem = '<li class="page-item">'+ totalPage +'</li>';
                    $('.pagination-ul').append(pageItem);
                    $('.btn-prev-page').addClass('disabled');
                    $('.btn-next-page').addClass('disabled');
                } else if (currentPage == totalPage){
                    $('.btn-next-page').addClass('disabled');
                }
                if(totalPage > 1 && totalPage <= 5){
                    for(let i=1;i<=totalPage;i++){
                        pageItem += '<li class="page-item" value="'+ i +'">'+ i +'</li>';
                    }
                    $('.pagination-ul').append(pageItem);
                }
                if(totalPage > 5) {
                    for(let i=1;i<=5;i++){
                        pageItem += '<li class="page-item" value="'+ i +'">'+ i +'</li>';
                    }
                    pageItem += '<li class="page-item">...</li>';
                    $('.pagination-ul').append(pageItem);
                    
                }
                $('.page-item').eq(currentPage-1).addClass('selected');
                $('.page-item').click(function () { 
                    currentPage = $(this).attr('value');
                    if(currentPage!=0){
                        newsCenterMode.goPage(arr,currentPage);
                        clickPageItem();
                    }
                    
                })

                // 上一页点击事件
                $('.btn-prev-page').click(function () {
                    if(currentPage==1){
                        return;
                    } else {
                        currentPage--;
                        newsCenterMode.goPage(arr,currentPage);
                        if(totalPage>5){
                            render();
                        }
                    }
                })
                // 下一页点击事件
                $('.btn-next-page').click(function () {
                    if(currentPage==totalPage){
                        return;
                    } else {
                        currentPage++; 
                        newsCenterMode.goPage(arr,currentPage);
                        if(totalPage>5){
                            render();
                        }
                    }
                })


                
                if(currentPage == 1) {
                    $('.btn-prev-page').addClass('disabled');       
                }

                $('.news_li').mouseenter(function () {
                    $('.news_li').removeClass('active');
                    $(this).addClass('active');
                    $(this).find('.container').css('left', '-50px');
                    $(this).find('.news_date').css('display', 'none');
                    $(this).find('.news_arrow').css('display', 'block');
                }).mouseleave(function () {
                    $(this).removeClass('active');
                    $(this).find('.container').css('left', '0px');
                    $(this).find('.news_date').css('display', 'block');
                    $(this).find('.news_arrow').css('display', 'none');
                });
                $('.news_li').click(function () {
                    $('.news_body1').css('display', 'none');
                    newsCenterMode.goToNewsDetails($(this).attr('id'), $(this).attr('type_id'));
                    $('.news_body2').css('display', 'block');
                });


                // 分页列表的JS渲染效果  
                function render() {
                    if(currentPage > 3 && currentPage <= totalPage - 3){
                        pageItem = '<li class="page-item">...</li>';
                        for(let i=currentPage-2;i<=currentPage+2;i++){
                            pageItem += '<li class="page-item" value="'+ i +'">'+ i +'</li>';
                        }
                        pageItem += '<li class="page-item">...</li>';
                        $('.pagination-ul').html(pageItem);
                        $('.page-item').each(function () {
                            if($(this).attr('value')==currentPage){
                                $(this).addClass('selected');
                            }
                        })
                    }
                    if(currentPage > totalPage - 3){
                        pageItem = '<li class="page-item">...</li>';
                        for(let i=totalPage-4;i<=totalPage;i++){
                            pageItem += '<li class="page-item" value="'+ i +'">'+ i +'</li>';
                        }
                        $('.pagination-ul').html(pageItem);
                        $('.page-item').each(function () {
                            if($(this).attr('value')==currentPage){
                                $(this).addClass('selected');
                            }
                        })
                    }
                }
                // 分页列表 点击页码时的JS效果
                function clickPageItem() {
                    if(currentPage > 3 && currentPage <= totalPage - 3){
                        pageItem = '';
                        for(let i=currentPage-2;i<=currentPage+2;i++){
                            pageItem += '<li class="page-item" value="'+ i +'">'+ i +'</li>';
                        }
                        pageItem += '<li class="page-item">...</li>';
                        $('.pagination-ul').html(pageItem);
                        $('.page-item').each(function () {
                            if($(this).attr('value')==currentPage){
                                $(this).addClass('selected');
                            }
                        })
                        $('.page-item').click(function () {
                            console.log(11111);
                        })
                    }
                    if(currentPage > totalPage - 3) {
                        
                    }
                    
                }
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
                                var newURL = (window.location.href).split('?')[0];
                                history.pushState({}, '', newURL);
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