const timerEl = document.querySelector("#timer");
const startEl = document.getElementById('start');


// variables related to questions
var question;           //stores the chosen question
var position;           //needed for position of object in [questions]
var answer1;            //stores an incorrect answer
var answer2;            //stores an incorrect answer
var answer3;            //stores an incorrect answer
var correctAnswer;      //stores the correct answer
var questionNumber = 0; //Question Number out of 5


//question bank
var questions = [
    question0 = {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        incorrect: ["<scripting>","<js>", "<javascript>"]
    },
    question1 = {
        question: "What is meant by 'this' keyword in JavaScript?",
        answer: "It refers to the current object",
        incorrect: ["It refers to the previous object","It refers to the variable that contains its value","None of the above"]
    },
    question2 = {
        question: "Which of the following is a JavaScript Object?",
        answer: "array",
        incorrect: ["string","number","if statement"]
    },
    question3 = {
        question: "Which tool is commonly used to debug code in JavaScript?",
        answer: "all of the above",
        incorrect: ["console.log()","Chrome DevTools", "3rd-Party debuggers"]
    },
    question4 = {
        question: "Which Array Method removes the last element of an array, and returns that element",
        answer: "pop()",
        incorrect: ["push()", "join()", "slice()"],
    },
    question5 = {
        question: "Removes the first element of an array, and returns that element",
        answer: "shift()",
        incorrect: ["join()", "slice()", "map()"],
    }
];


function startTimer(){  //starts 100 second times
    timeLeft = 100;
    var timeInterval = setInterval(function(){
        timeLeft -= 0.1;
        timerEl.textContent = "Time Left:" + timeLeft.toFixed(2);
        if (timeLeft <= 0){
            timeLeft--;
            clearInterval(timeInterval);
        };
    },1000)
    }


/*   function startTimer () {            //starts 100 second countdown
        timeLeft=100;
        var timeInterval = setInterval(function() {
            timeLeft-=0.01;
            timerEl.textContent = "Time Left: " + timeLeft.toFixed(2);       //displays countdown
            if ((timeLeft <= 0) || (questions.length < 2)) {    //If user runs out of time or clicks through all the answer, then...
                clearInterval(timeInterval);                    //timer stops
                quizEnd();                                      //quiz ends
            }
        }, 10)
    }; 
    */


    function start() {
        mainEl.innerHTML = ""       //clears screen
        questionDisplay();          //generates layout for new question
        askQuestion();              //displays new question with 
        startTimer();               //starts timer
    };



    function questionDisplay() {
        var appendOption = [correctChoiceEl, choice1El, choice2El, choice3El];
        
        for (var i = 0; i < 4; i++) {       //For loop appends options in randomized order
            var randomAppendOption = appendOption[Math.floor(Math.random()*appendOption.length)];
            var positionAppendOption = appendOption.indexOf(randomAppendOption);
            appendOption.splice(positionAppendOption, 1);   //prevents the same button from being added twice by removing it from array once it has been added.
            divEl2.appendChild(randomAppendOption);
        }
    }