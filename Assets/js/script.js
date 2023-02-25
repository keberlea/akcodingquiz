//El= element

var bodyEl = document.body
var highscoresEl = document.getElementById('highscores')
var buttonEl = document.createElement('button')
//for question Display
var mainEl = document.getElementById('main')
var timerEl = document.getElementById('timer')
var startEl = document.getElementById('start')
var newMainEl = document.createElement('main')
var h2El = document.createElement('h2')
var h1El = document.createElement('h1')
var divEl1 = document.createElement('div')
var divEl2 = document.createElement('div')
var choice1El = document.createElement('button')
var choice2El = document.createElement('button')
var choice3El = document.createElement('button')
var correctChoiceEl = document.createElement('button')
var notifyEl = document.createElement('h2')

//for end display
var sectionEl = document.createElement('section')
var submitEl = document.createElement('input')
var inputEl = document.createElement('input')
var formEl = document.createElement('form')
var labelEl = document.createElement('label')

var timeLeft

// variables related to questions
var question //stores the chosen question
var position //needed for position of object in [questions]
var answer1 //stores an incorrect answer
var answer2 //stores an incorrect answer
var answer3 //stores an incorrect answer
var correctAnswer //stores the correct answer
var questionNumber = 0 //Question Number out of 6

var highscoresArr = JSON.parse(localStorage.getItem('highscore')) || []

//question bank
var questions = [
  (question0 = {
    question: 'Inside which HTML element do we put the JavaScript?',
    answer: '<script>',
    incorrect: ['<scripting>', '<js>', '<javascript>']
  }),
  (question1 = {
    question: "What is meant by 'this' keyword in JavaScript?",
    answer: 'It refers to the current object',
    incorrect: [
      'It refers to the previous object',
      'It refers to the variable that contains its value',
      'None of the above'
    ]
  }),
  (question2 = {
    question: 'Which of the following is a JavaScript Object?',
    answer: 'array',
    incorrect: ['string', 'number', 'if statement']
  }),
  (question3 = {
    question: 'Which tool is commonly used to debug code in JavaScript?',
    answer: 'all of the above',
    incorrect: ['console.log()', 'Chrome DevTools', '3rd-Party debuggers']
  }),
  (question4 = {
    question:
      'Which Array Method removes the last element of an array, and returns that element',
    answer: 'pop()',
    incorrect: ['push()', 'join()', 'slice()']
  }),
  (question5 = {
    question: 'Removes the first element of an array, and returns that element',
    answer: 'shift()',
    incorrect: ['join()', 'slice()', 'map()']
  })
]

startEl.addEventListener('click', start) //starts quiz on click
correctChoiceEl.addEventListener('click', notifyCorrect) //correct answer
choice1El.addEventListener('click', notifyIncorrect)
choice2El.addEventListener('click', notifyIncorrect)
choice3El.addEventListener('click', notifyIncorrect)

highscores()
function highscores () {
  sectionEl.setAttribute('style', 'display:none')
  highscoresEl.addEventListener('click', function (event) {
    var element = event.target 
    var state = element.getAttribute('data-state') //pulls current data-state value (hide/visible)
    if (state == 'hide') {
      //shows highscores
      element.setAttribute('data-state', 'visible') //change data-state to visible
      sectionEl.setAttribute('style', 'display:flex; gap: 1em; margin: 5vh 5vw') //display highscore interface
      mainEl.setAttribute('style', 'display:none;') //and hide quiz screen
      highscoresEl.textContent = 'Hide Highscores'

      sectionEl.innerHTML = '' //clears sectionEl if element exists
      highscoresDisplay() //displays new highscores UI
      renderHighscores() //retrieves highscores from local storage and appends to sectionEl
    } else {
      //hides highscores and returns to quiz
      element.setAttribute('data-state', 'hide') //change data-state to hide
      sectionEl.setAttribute('style', 'display:none') //hide highscore interface
      mainEl.setAttribute('style', 'display:flex;') //and display quiz screen
      highscoresEl.textContent = 'View Highscores'
    }
  })
}

function start () {
  mainEl.innerHTML = '' //clears screen
  questionDisplay() //generates layout for new question
  askQuestion() //displays new question with
  startTimer() //starts timer
}

function askAgain () {
  mainEl.innerHTML = '' //clear screen
  questionDisplay()
  askQuestion()
}

function questionDisplay () {
  var appendOption = [correctChoiceEl, choice1El, choice2El, choice3El]

  for (var i = 0; i < 4; i++) {
    //For loop appends options in randomized order
    var randomAppendOption =
      appendOption[Math.floor(Math.random() * appendOption.length)]
    var positionAppendOption = appendOption.indexOf(randomAppendOption)
    appendOption.splice(positionAppendOption, 1) //removes option from array once it has been added.
    divEl2.appendChild(randomAppendOption)
  }

  //adds classes/styles to elements
  divEl1.setAttribute('class', 'column')
  divEl1.setAttribute(
    'style',
    'justify-content:center; margin-top: 2em; gap: 2em;'
  )
  divEl2.setAttribute(
    'style',
    'display:flex; flex-wrap:wrap; justify-content:center; gap: 1em; margin:7%;'
  )
  h1El.setAttribute('style', 'max-width:none;')
  h2El.setAttribute('style', 'width: 280px; align-self:center;')
  choice1El.setAttribute(
    'style',
    'flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 16px; padding:1px;'
  )
  choice2El.setAttribute(
    'style',
    'flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 16px; padding:1px;'
  )
  choice3El.setAttribute(
    'style',
    'flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 16px; padding:1px;'
  )
  correctChoiceEl.setAttribute(
    'style',
    'flex: 0 1 33%; min-width:400px; height:68.75px; font-size: 16px; padding:1px;'
  )

  //appends elements
  mainEl.appendChild(divEl1)
  divEl1.appendChild(h2El)
  divEl1.appendChild(h1El)
  mainEl.appendChild(divEl2)
}

function askQuestion () {
  pullQuestionAndAnswer() //pulls random question and mathcing answer out from array
  h2El.textContent = 'Question ' + questionNumber + ' out of 6'
  h1El.textContent = question
  choice1El.textContent = answer1 //incorrect answer
  choice2El.textContent = answer2 //incorrect answer
  choice3El.textContent = answer3 //incorrect answer
  correctChoiceEl.textContent = correctAnswer //correct answer
}

function pullQuestionAndAnswer () {
  var questionSelection =
    questions[Math.floor(Math.random() * questions.length)] //selects random question
  position = questions.indexOf(questionSelection)

  question = questionSelection.question //pulls question
  correctAnswer = questionSelection.answer //pulls matching answer 

  answer1 = questionSelection.incorrect[Math.floor(Math.random() * this.length)] //selects incorrect answer options for multiple choice
  questionSelection.incorrect.splice(
    questionSelection.incorrect.indexOf(answer1),
    1
  ) //prevents displaying duplicate incorrect answer twice by removing them from the array

  answer2 = questionSelection.incorrect[Math.floor(Math.random() * this.length)] //selects incorrect answer options for multiple choice
  questionSelection.incorrect.splice(
    questionSelection.incorrect.indexOf(answer2),
    1
  ) //prevents displaying duplicate incorrect answer twice by removing them from the array

  answer3 = questionSelection.incorrect[Math.floor(Math.random() * this.length)] //selects incorrect answer options for multiple choice
  questionSelection.incorrect.splice(
    questionSelection.incorrect.indexOf(answer3),
    1
  ) //prevents displaying duplicate incorrect answer twice by removing them from the array;

  questionNumber++ //updates question number i.e. Question 1 out of 5, 2 out of 5, etc
}

function startTimer () {
  //starts 100 second countdown
  timeLeft = 100
  var timeInterval = setInterval(function () {
    timeLeft -= 1
    timerEl.textContent = 'Time Left: ' + timeLeft.toFixed(2) //displays countdown
    if (timeLeft <= 0 || questions.length < 2) {
      //If user runs out of time or clicks through all the answer, then...
      clearInterval(timeInterval) //timer stops
      quizEnd() //quiz ends
    }
  },1000)
}

function notifyCorrect () {
  //displays notification for correct selections
  var popupTimeCorrect = 1
  questions.splice(position, 1) //removes question from array so it cannot be asked again
  askAgain() //prompts next question
  var popupIntervalCorrect = setInterval(function () {
    //notification only appears for a brief period time
    popupTimeCorrect -= 0.02
    mainEl.appendChild(notifyEl)
    notifyEl.textContent = 'CORRECT!'
    if (popupTimeCorrect <= 0) {
      clearInterval(popupIntervalCorrect)
      notifyEl.remove()
    }
  }, 10)
}

function notifyIncorrect () {
  //displays notification for incorrect selections
  timeLeft-=10; //removes 10 sec for wrong answer
  var popupTimeIncorrect = 1
  questions.splice(position, 1) //removes question from array so it cannot be asked again.
  askAgain() //prompts next question
  var popupIntervalIncorrect = setInterval(function () {
    //notification only appears for a brief period time
    popupTimeIncorrect -= 0.03
    mainEl.appendChild(notifyEl)
    notifyEl.textContent = 'INCORRECT!'
    if (popupTimeIncorrect <= 0) {
      clearInterval(popupIntervalIncorrect)
      notifyEl.remove()
    }
  }, 10)
}

function endDisplay () {
  //generates display for end of quiz
  h1El.textContent = 'Quiz is over!'
  labelEl.textContent = 'Enter Initials: '
  h2El.textContent = 'Score: ' + timeLeft.toFixed(2)

  submitEl.setAttribute('type', 'submit')
  mainEl.setAttribute('style', 'align-content: center')
  formEl.setAttribute('class', 'row')
  formEl.setAttribute(
    'style',
    'gap:10px; align-items: center; background-color: #8a6c67; padding:10px;'
  )
  inputEl.setAttribute('style', 'color:black;')
  submitEl.setAttribute(
    'style',
    'background-color: #EE7D69; border-radius:5px;'
  )

  mainEl.appendChild(h1El)
  mainEl.appendChild(h2El)
  mainEl.appendChild(formEl)
  formEl.appendChild(labelEl)
  formEl.appendChild(inputEl)
  formEl.appendChild(submitEl)
}

function renderHighscores () {
  //display score from local storage
  if (highscoresArr !== null) {
    highscoresArr.sort(function (a, b) {
      //sorts the highscores from highest to lowest
      return b.score - a.score
    })

    for (var i = 0; i < highscoresArr.length; i++) {
      //iterates the number of time there is a saved score.
      var h2El1 = document.createElement('h2')
      h2El1.textContent =
        highscoresArr[i].initials + ' ' + highscoresArr[i].score //displays highscore from local storage
      sectionEl.appendChild(h2El1)
    }
  }
}

function quizEnd () {
  mainEl.innerHTML = ''
  endDisplay()
  submitEl.addEventListener('click', function (event) {
    //adds event listener to submit button
    event.preventDefault() //prevents page from refreshing if submit is clicked
    var scoreboard = {
      //object that will be stored into local storage
      score: timeLeft.toFixed(2),
      initials: inputEl.value.trim()
    }
    highscoresArr.push(scoreboard) //adds scoreboard object to array
    localStorage.setItem('highscore', JSON.stringify(highscoresArr)) //saves array to local storage
    highscoresArr = JSON.parse(localStorage.getItem('highscore')) || [] //pulls array from local storage
    sectionEl.innerHTML = '' //clears previous elements so new updated scoreboard will display with no duplicates

    sectionEl.setAttribute('class', 'column')
    bodyEl.appendChild(sectionEl)
    sectionEl.appendChild(document.createElement('h1')).textContent =
      'Highscores: '

    renderHighscores()

    //needed for display of scores at the end.
    var clearButtonEl = document.createElement('button')
    var requizButtonEl = document.createElement('button')
    var divEl3 = document.createElement('div')
    divEl3.setAttribute(
      'style',
      'display: flex; flex-direction:row; justify-content:center; gap: 25px'
    )
    sectionEl.appendChild(divEl3)
    divEl3.appendChild(clearButtonEl)
    divEl3.appendChild(requizButtonEl)

    clearButtonEl.setAttribute('style', 'padding: 1%')
    requizButtonEl.setAttribute('style', 'padding: 1%')

    clearButtonEl.textContent = 'Clear Highscores and Retake the Quiz'
    requizButtonEl.textContent = 'Retake the Quiz'
    highscoresEl.setAttribute('data-state', 'visible') //change data-state to hide
    sectionEl.setAttribute('style', 'display:flex; gap: 10px;') //hide highscore interface
    mainEl.setAttribute('style', 'display:none;')
    sectionEl.setAttribute('class', 'column')

    clearButtonEl.addEventListener('click', function () {
      //clears local storage and refreshes the page
      localStorage.clear()
      window.location.reload()
    })
    requizButtonEl.addEventListener('click', function () {
      //refreshes the page
      window.location.reload()
    })
  })
}

function highscoresDisplay () {
  //generates highscore interface
  sectionEl.setAttribute('class', 'column')
  bodyEl.appendChild(sectionEl)
  sectionEl.appendChild(document.createElement('h1')).textContent =
    'Highscores: '
}
