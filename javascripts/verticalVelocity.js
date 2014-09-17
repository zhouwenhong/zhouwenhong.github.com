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

    function init(){
        var colors = ['#E75A49', '#1FCE6F', '#2C97DF', '#F3AC5C', '#996E99'];
        var colLen = colors.length - 1;
        var spanLen = $spans.length;

        $spans.each(function(i){

            var $that = $(this);
            var animTmp = (function(i){
                return function(){
                    $that.velocity({
                        top: topEnd
                    }, 200 + (spanLen-i)*30, 'easeOutQuint', queueList);
                };

            })(i);

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