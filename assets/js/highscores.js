//SETS ELEMENT IDS AS VARIABLE FOR PLACE TO DISPLAY
const highScoresList = document.getElementById(`highScoresList`);
const highScores = (JSON.parse(localStorage.getItem('highScores')) || []);

//FUNCTION TO CALL NAME AND SCORE FROM LOCAL STORAGE
highScoresList.innerHTML = highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");
