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
        question: "Who is not one of the original 9 members of Wu-Tang?",
        choice1: "Inspectah Deck",
        choice2: "Cappadonna",
        choice3: "Ghostface Killah",
        choice4: "Raekwon",
        answer: 2
    },
    {
        question: "Which borough of New York city is Wu-Tang from?",
        choice1: "The Bronx",
        choice2: "Queens",
        choice3: "Staten Island",
        choice4: "Brooklyn",
        answer: 3
    },
    {
        question: "What is the name of the club that Wu-Tang rushed the stage to drop their first single, \"Protect Ya Neck\"?",
        choice1: "Tunnel",
        choice2: "Palladium",
        choice3: "Club Expo",
        choice4: "The Fever",
        answer: 4
    },
    {
        question: "Which Wu-Tang member recorded lyrics for the album The W from a jail telephone while incarcerated?",
        choice1: "RZA",
        choice2: "ODB",
        choice3: "UGod",
        choice4: "GZA",
        answer: 2
    },
    {
        question: "Who is the only commercially acclaimed 90's West Coast artist to be featured on a Wu-Tang track?",
        choice1: "Snoop Dogg",
        choice2: "Dr. Dre",
        choice3: "Ice Cube",
        choice4: "2Pac",
        answer: 1
    },
    {
        question: "Method Man proclaims \"Hey you! Get off my cloud!\" in his self-titled song in a nod to which famous 70\'s Rock-n-Roll band?",
        choice1: "The Who",
        choice2: "Pink Floyd",
        choice3: "The Rolling Stones",
        choice4: "Led Zeppelin",
        answer: 3
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

function startGame(){
    questionCounter =0;
    score = 0;
    timerCount = 45;
    availableQuestions = [...questions];
    getNewQuestion();
};

function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.innerHTML = timerCount;
      if (timerCount === 0) {
        alert("\"YOU BEST PROTECT YA NECK\" -Wu Tang ");
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