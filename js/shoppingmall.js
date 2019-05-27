(function () {
    var indexMode = {
        init: function(){
            this.totalEvents()
        },
        totalEvents: function() {
            this.windowScrollFn();
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
    }
    indexMode.init();
}())