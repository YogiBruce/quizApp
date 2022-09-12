//SETS HTML ELEMENTS TO BE USED 
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById(`finalScore`);
const mostRecentScore = localStorage.getItem(`mostRecentScore`);
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//VARIABLE WITH VALUE FOR SETTING HIGH SCORE LIST LIMIT
const MAX_HIGH_SCORES = 5;

//DISPLAYS SCORE FROM COMPLETED GAME
finalScore.innerText = mostRecentScore

//DISABLES SAVE SCORE WHEN NO ENTRY IN NAME
username.addEventListener ("keyup", () => {
    saveScoreBtn.disabled = !username.value; 
});

//SAVES SCORE WHILE PREVENTING PAGE FROM AUTO-REFRESHING
saveHighScore = (e) => {
    console.log("clicked the button");
    e.preventDefault();

    //ADDS SCORE TO HIGH SCORES ARRAY
    const score = {
       score: mostRecentScore,
       name: username.value
    };
    highScores.push(score);
    
    //REMOVES ALL BUT HIGHEST 5 SCORES FROM ARRAY AND SAVES NEW STRING INTO STORAGE FOR HIGH SCORES
    highScores.sort((a,b) =>  b.score - a.score)
    highScores.splice(5);

    localStorage.setItem(`highScores`, JSON.stringify(highScores));
    window.location.assign("highscores.html")

}