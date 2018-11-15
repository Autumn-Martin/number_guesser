function displayGuess() {
  var guessInput = Math.round(Number(document.getElementById('guessInput').value));
  document.getElementById('guessDisplay').innerHTML = guessInput;
}

let randNum = Math.floor(Math.random() * 11);
const gameResponse = document.querySelector('.gameResponse')

function checkGuess() {
  let playerGuess = Math.round(Number(guessInput.value));
  if (playerGuess === randNum) {
    gameResponse.textContent = 'BOOM!';
  } else {
    gameResponse.textContent = 'Guess again!';
  }
}

guessSubmission.addEventListener('click', checkGuess);
guessSubmission.addEventListener('click', displayGuess);
