window.onload = function() {
	$('.my-start-btn').click(start);
};

var timeLeft = 10;

function start() {
	$('.my-start-btn').css({'display' : 'none'});
	$('.trivia-body').css({'display' : 'block'});
	$('.trivia-body').html('<h1>Time Remaining: '+timeLeft+' Seconds</h1>');
	function decrement() {
		timeLeft--;
		console.log(timeLeft);
		var printMe = '<h1>Time Remaining: '+timeLeft+' Seconds</h1>';
		$('.trivia-body').html(printMe);
		if (timeLeft===0) {
			clearInterval(timer);
		}
	}

	var timer = setInterval(decrement,1000)
}

