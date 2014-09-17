(function VerticalAnimation(){
	var $doc = $(document),
		$slide_1 = $('#slide_1'),
		$slide_2 = $('#slide_2'),
		$slide_3 = $('#slide_3'),
		$slide_4 = $('#slide_4'),
		$slide_5 = $('#slide_5'),
		verQueue = 'ver_queue',
		animateList = [];


	animateList = [
	    function () {
	        $('#slide_1').animate({
	            top: 300
	        }, 450, queueList);
	    },    
	    function () {
	        $('#slide_2').animate({
	            top: 300
	        }, 400, queueList);
	    },   
	    function () {
	        $('#slide_3').animate({
	            top: 300
	        }, 300, queueList);
	    },    
	    function () {
	        $('#slide_4').animate({
	            top: 300
	        }, 200, queueList);
	    },   
	    function () {
	        $('#slide_5').animate({
	            top: 300
	        }, 100, queueList);
	    }
	];
	

	function verAnimation(){
	    $doc.queue('ver_queue', animateList);
	    console.log($doc.queue(verQueue).length)
	    queueList();
	    console.log($doc.queue(verQueue).length)

	}


	function queueList() {
	    $doc.dequeue(verQueue);
	};


	function reset(){
		$doc.stop(verQueue, true, true);
		console.log("stop: "+ $doc.queue(verQueue).length)

		var dtd = $.Deferred();
		var tasks = function(){

			$slide_1.css('top', 0);
			$slide_2.css('top', 0);
			$slide_3.css('top', 0);
			$slide_4.css('top', 0);
			$slide_5.css('top', 0);

			dtd.resolve();
		}

		setTimeout(tasks, 0);
		return dtd.promise();
		
	}

	function init(){

		$('#start').click(function(){
			if($doc.queue(verQueue).length){
				return false;
			}else{
				$.when(reset()).done(verAnimation);
			}
			
		});

		$('#reset').click(function(){
			reset();
		});
	}


	init();

})();