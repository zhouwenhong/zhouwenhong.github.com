$('#start').one('click', function(){
	$('img').velocity({
		rotateZ: '+=360deg'
	}, {
		easing: "linear", 
		duration: 3600, 
		loop: true
	});
});

