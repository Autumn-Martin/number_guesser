function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').innerHTML = 'nada.'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').innerHTML = 'not a number.'
  } else {
    var guessInput = Math.round(Number(document.getElementById('guessInput').value));
    document.getElementById('guessDisplay').innerHTML = guessInput;
  }
}

let randNum = Math.floor(Math.random() * 11);
const gameResponse = document.querySelector('.gameResponse')

function checkGuess() {
  document.getElementById('guessIntro').innerHTML = 'Your last guess was'
  let playerGuess = Math.round(Number(guessInput.value));
  if (playerGuess === randNum) {
    gameResponse.textContent = 'BOOM!';
  } else if ((guessInput.value === '') || (isNaN(Number(guessInput.value)))) {
    gameResponse.textContent = 'Please enter a number.';
  } else if (playerGuess > randNum){
    gameResponse.textContent = 'That is too high.';
  } else if (playerGuess < randNum) {
    gameResponse.textContent = 'That is too low.';
  } else {
    gameResponse.textContent = 'Guess again!';
  }
}

guessSubmission.addEventListener('click', checkGuess);
guessSubmission.addEventListener('click', displayGuess);

var clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function() {
  document.getElementById('guessInput').value = '';
});

var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);

function resetGame() {
  location.reload()
}
