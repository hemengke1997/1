$(function(){
    var left = $(".left");
    var right = $(".right");
    var pic = $(".sliderbox ul li");
    var sliderbox = $('.sliderbox');
    var _index = 0;
    var timer = null;
    var flag = true;
    var imgWidth = $('.sliderbox img:first-child').eq(0).width();
    left.click(function () { 
        flag = false;
        clearInterval(timer);
        if(_index == 0){
          return;
        }
        _index--;
        selectPic(_index);
    });
    right.click(function(){
        flag = false;
        // clearInterval(timer);
        go()
        if(_index == pic.length-1){
            _index=0;
            return;
        }
       // _index++;
        selectPic(_index);
    });
    pic.mouseenter(function(){
        console.log(flag,timer)
        clearInterval(timer);
        flag = false;
    }).mouseleave(function () { 
        console.log(555)
        flag = true;
        slider(true)
    });
    function slider(flag){
       // flag = flag || true;
        if(flag) {
            timer = setInterval(go, 3000);
            console.log(timer,"222")
        }
    }
    //自动轮播
    slider(flag);
    function go() {debugger
        _index++;
        selectPic(_index);
        if(_index == pic.length - 1){
            flag = false;
            clearInterval(timer);
            //return;
        }  
        
         
    }
    function selectPic(num) {
        console.log(num,"num")
        sliderbox.animate({
            left: -num * $('.sliderbox img:first-child').eq(num-1).width(),
        },3000)
    };

    //新闻tab
    $('.tab ul>li').mouseenter(function () { 
        $(this).addClass('active').siblings('li').removeClass('active');
        var index = $(this).index();
        console.log(index);
        $('.tab-ul').eq(index).addClass('selected').siblings('ul').removeClass('selected');
     })

});