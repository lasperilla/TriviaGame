window.onload = function() {
    $('.my-start-btn').click(start);
};

var timeLeft = 30;
var userAnswersArr = [];
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

//array of objects, one object per Q&A
var triviaArr = [{
	    question: 'Which cast member has scored a perfect score of 300 at bowling?',
	    answer: 'Miwa Kumamoto',
	    choice1: 'Neri Miyano',
	    choice2: 'Ayano Kakihara',
	    choice3: 'Azuna Moroboshi'
	}, {
	    question: 'Which cast member speaks 5 languages and regularly streams on Twitch?',
	    answer: 'Kaori Horiuchi',
	    choice1: 'Kurumi Kawai',
	    choice2: 'Jun Kitakami',
	    choice3: 'Kita Yatta'
	}, {
	    question: 'Which cast member speaks is a famous Japanese competitive eater?',
	    answer: 'Azuki Moeno',
	    choice1: 'Tomomi Arimura',
	    choice2: 'Merumo Hisaoka',
	    choice3: 'Yuki Shiraishi'
	},  {
	    question: 'Which is not a cast member mascot?',
	    answer: 'Mr. Sparkle',
	    choice1: 'Tawashii',
	    choice2: 'Gomachan'
	}
];

//shuffle choice function and put them into an array of arrays
var shuffledAnswerArr = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var grabKeys = [];
var grabValues = [];
var tempTriviaObj = {};

for (var i = 0; i < triviaArr.length; i++) {
	//grab keys in each object
	grabKeys = Object.keys(triviaArr[i]);
	tempTriviaObj = triviaArr[i];

	//splice out question
	for (var j = 0; j < grabKeys.length; j++) {
		if (grabKeys[j] === 'question') {
			grabKeys.splice(j, 1)

		}
	}
	// console.log('grabKeys ' +grabKeys)
	//make an array, calling of all the values of object with the array of keys with question spliced out
	for (var j = 0; j < grabKeys.length; j++) {
		var getValue = 'tempTriviaObj.'+grabKeys[j]
		// console.log(eval(getValue))
		grabValues.push(eval(getValue)); 
		// console.log('grabValues ' +grabValues)
	}
	
	
	shuffledAnswerArr.push(shuffle(grabValues));

	grabValues = [];


};


function start() {
    $('.my-start-btn').css({ 'display': 'none' });
    $('.trivia-body').css({ 'display': 'block' });
    $('.trivia-body h1').html('<h1>Time Remaining: ' + timeLeft + ' Seconds</h1>');

    //timer
    function decrement() {
        timeLeft--;
        // console.log(timeLeft);
        var printMe = 'Time Remaining: ' + timeLeft + ' Seconds';
        $('.trivia-body h1').html(printMe);
        if (timeLeft === 0) {
            clearInterval(timer);
            	// alert('time');

			for (var i = 0; i < triviaArr.length; i++) {

				var groupName = 'question'+eval(i+1);
				var result = $('input[data-group="'+groupName+'"]:checked').val();
				userAnswersArr.push(result);
				console.log(userAnswersArr);
			}

			for (var i = 0; i < triviaArr.length; i++) {
				if (triviaArr[i].answer === userAnswersArr[i]) {
					correctAnswers++;
				} else if (userAnswersArr[i] === undefined) {
					unanswered++;
				} else {
					incorrectAnswers++;
				}
			}

			$('.trivia-body').html("<h1>Results:<h1>"+ "<p>Correct Answers: "+correctAnswers+"</p>"+"<p>Incorrect Answers: "+incorrectAnswers+"</p>"+"<p>Unanswered Questions: "+unanswered+"</p>")
			if (correctAnswers === triviaArr.length) {
				$('.trivia-body').prepend('<div><iframe width="374" height="210" src="https://www.youtube.com/embed/oe2Gcuu8mEE?autoplay=1" frameborder="0" allowfullscreen></iframe></div>')
			}
        }
    }

    var timer = setInterval(decrement, 1000);

    //for length of our array containing our trivia, creat i number of sets of questions and answers, format them
    //the way we want them displayed on the page, then push them in our questions div
	// function makeRadioButtons(array) {

	// };

    for (var i = 0; i < triviaArr.length; i++) {
    	var html = '<div><p><h2>'+triviaArr[i].question+ '</h2></p>';
    	// console.log(html)
    	$(".questions").append(html);

		for (var j = 0; j < shuffledAnswerArr[i].length; j++) {
		$('.questions').append('<input type="radio" data-group="question'+eval(i+1)+'" value="'+shuffledAnswerArr[i][j]+'"> '+shuffledAnswerArr[i][j]+ '  ');
		// $('input[name="'+array+'"]').attr("group", i);
		};

    	// makeRadioButtons(shuffledAnswerArr[i]);

    };

};//end of start()

//When timer is done, evaluate answers and score
// if (timeLeft === 0) {
// 	alert('time');

// 	for (var i = 0; i < triviaArr.length; i++) {

// 		var groupName = 'group '+i
// console.log("$('input[name="+groupName+"]:checked').val();")
		
// 	}

// };



// for (var i = 0; i < shuffledAnswerArr.length; i++) {
// 	var groupName = 'question shuffledAnswerArr['+i+']';
// 	$('input[name=name_of_your_radiobutton]:checked').val();
	
// }



