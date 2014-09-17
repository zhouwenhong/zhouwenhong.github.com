// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik M枚ller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());





(function VerticalAnimation(){
    var $doc = $(document),
        $spans = $('.area span'),
        topEnd = 470,
        verQueue = 'ver_queue',
        resetFlag = false,
        animateList = [];
    

    function start(){
        if(!$doc.queue(verQueue).length){
            reset();
        }

        $doc.queue(verQueue, animateList);
        queueList();
    }


    function queueList() {
        $doc.dequeue(verQueue);
    };


    function reset(){
        $spans.each(function(){
            $(this).css('top', 0);
        });
    }

    function move($elm){
        $elm.addClass('velocity-animating').css('top', '+=10');

        if(parseInt($elm.css('top')) < topEnd){
            requestAnimationFrame.call(window, function(){move($elm)});
        }else{
            $elm.removeClass('velocity-animating')
            queueList();
        }

    }

    function init(){
        var colors = ['#E75A49', '#1FCE6F', '#2C97DF', '#F3AC5C', '#996E99'];
        var colLen = colors.length - 1;
        var spanLen = $spans.length;

        $spans.each(function(i, elm){

            var $that = $(this);
            var animTmp = (function(i){
                return function(){
                    requestAnimationFrame.call(window, function(){move($that)});
                };

            })(i, $that);

            animateList.push(animTmp);

            $that.css('backgroundColor', colors[Math.round(Math.random()*colLen)]);
        });


        $('#start').click(function(){
            if($('.area .velocity-animating').length){
                return false;
            }

            start();
        });
    }


    init();

})();

/*
1. 运动中的动画不能中途停止，可以调用stop(false, true)来让动画跳到终点状态

*/