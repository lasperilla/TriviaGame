$(document).ready(function(){

	function start() {
		$('.my-start-btn').css({'display' : 'none'});
		$('.trivia-body').css({'display' : 'block'});
	}

	$('.my-start-btn').click(start);

	var timeLeft;

	var timer = {

		time : 120,
		decrement : function(){
			time--;
		}
		start : function(){
			while(time >=0) {
				timeLeft = setInterval(timer.decrement, 1000)
			}
		}


	}







});