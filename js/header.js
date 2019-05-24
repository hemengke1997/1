(function(){
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        //console.log(scrollHeight);
        if(scrollHeight >= 70) {
            $('.top').css('display','none');
            $('.top_scroll').css('display','block');
        } else {
            $('.top').css('display','block');
            $('.top_scroll').css('display','none');
        }
     });
}())