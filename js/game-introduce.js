(function(){
    var indexMode = {
        init: function() {
            this.totalEvents();
        },
        totalEvents: function () {
            this.windowScrollFn();
            this.changeGameCharacterFn();
        },
        windowScrollFn: function () {
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
        changeGameCharacterFn: function () {
            $('.character_list li').click(function () {
                var index = $(this).index();
                $('.character_desc').css('display','none');
                $('.character_desc').eq(index).css('display','block');
            })
        }
    }
    indexMode.init();
}())