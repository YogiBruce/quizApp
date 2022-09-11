const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById(`progressText`);
const scoreText = document.getElementById(`score`);
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timer-count")
var timer;
var timerCount;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//QUESTIONS ARRAY
let questions = [
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 2
    },
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 2
    },
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 3
    },
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 2
    },
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 2
    },
    {
        question: "LOREM IPSUM?",
        choice1: "lorem ipsum",
        choice2: "ipsum lorem",
        choice3: "lorum ipsem",
        choice4: "lorip emsum",
        answer: 3
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

function startGame(){
    questionCounter =0;
    score = 0;
    timerCount = 30;
    availableQuestions = [...questions];
    getNewQuestion();
};

function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.innerHTML = timerCount;
      if (timerCount === 0) {
        alert("You have ran out of time");
        return window.location.assign(`end.html`);
      }
    }, 1000);
  }
  function getNewQuestion(){
    if (availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem(`mostRecentScore`, score)
        return window.location.assign(`end.html`);
    }

    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset[`number`];
        choice.innerText = currentQuestion[`choice` + number];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset[`number`];

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct"){
        incrementScore(CORRECT_BONUS);
    }
    
    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout( ()=> {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 500)
    

    
    });
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startTimer()
startGame()