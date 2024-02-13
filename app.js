const strikeButton = document.getElementById("stri");
const resetButton = document.getElementById("replay");
const Team1Score = document.getElementById("st1");
const Team1Wickets = document.getElementById("wt1");
const Team2Score = document.getElementById("st2");
const Team2Wickets = document.getElementById("wt2");
var team1Score = 0;
var team1Wickets = 0;
var team2Score = 0;
var team2Wickets = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function gameOver() {
  gameOverAudio.play();
  if (team1Score > team2Score) alert("IND wins");
  if (team2Score > team1Score) alert("PAK wins");
  if (team2Score === team1Score) alert("It is draw!");
}

function updateScore() {
  Team1Score.textContent = team1Score;
  Team1Wickets.textContent = team1Wickets;
  Team2Score.textContent = team2Score;
  Team2Wickets.textContent = team2Wickets;
}

resetButton.onclick = () => {
  window.location.reload();
};

strikeButton.onclick = () => {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn == 2) {
    team2BallsFaced++;
    document.querySelector(
      `#t2balls div:nth-child(${team2BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team2Wickets++;
    }
    else {
      team2Score += randomElement;
    }
    if (
      team2BallsFaced === 6 ||
      team2Wickets === 2 ||
      team2Score > team1Score
    ) {
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(
      `#t1balls div:nth-child(${team1BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team1Wickets++;
    } else {
      team1Score += randomElement;
    }
    if (team1BallsFaced === 6 || team1Wickets === 2) turn = 2;
  }
  updateScore();
};
