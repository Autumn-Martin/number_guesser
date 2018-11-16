// ---- display last guess ----
function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').innerHTML = 'nada.'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').innerHTML = 'invalid'
  } else {
    var guessInput = Math.round(Number(document.getElementById('guessInput').value));
    document.getElementById('guessDisplay').innerHTML = guessInput;
  }
}

guessSubmission.addEventListener('click', checkGuess);
// ---- check guess ----
var maxNumValue = 10
var minNumValue = 1
let randNum = Math.floor(Math.random() * (maxNumValue + 1));
const gameResponse = document.querySelector('.gameResponse')

function checkGuess() {
  document.getElementById('guessIntro').innerHTML = 'Your last guess was'
  let playerGuess = Math.round(Number(guessInput.value));
  if (playerGuess === randNum) {
      gameResponse.textContent = 'BOOM!';
  } else if ((guessInput.value === '') || (isNaN(Number(guessInput.value)))) {
      gameResponse.textContent = 'Please enter a number.';
      gameResponse.style.backgroundColor = '#fad1e2';
  } else if (playerGuess > maxNumValue) {
      gameResponse.textContent = 'That number is above the range of possible values.'
      gameResponse.style.backgroundColor = '#fad1e2';
  } else if (playerGuess < minNumValue) {
      gameResponse.textContent = 'That number is below the range of possible values.'
      gameResponse.style.backgroundColor = '#fad1e2';
  } else if (playerGuess > randNum){
      gameResponse.textContent = 'That is too high.';
  } else if (playerGuess < randNum) {
      gameResponse.textContent = 'That is too low.';
  } else {
      gameResponse.textContent = 'Guess again!';
  }
}

guessSubmission.addEventListener('click', displayGuess);

// ---- clear input field ----
var clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', clearInput);

function clearInput() {
  document.getElementById('guessInput').value = '';
}

// ---- reset game ----
var resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', resetGame);

function resetGame() {
  location.reload()
}
