// ---- check guess ----
var maxNumValue = 10
var minNumValue = 1
let randNum = Math.floor(Math.random() * (maxNumValue + 1));
const gameResponse = document.getElementById('gameResponse')

function checkGuess() {
  document.getElementById('guessIntro').innerHTML = 'Your last guess was';
  document.getElementById('reset').style.display = 'inline';

  let playerGuess = parseInt(guessInput.value);

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

guessSubmission.addEventListener('click', checkGuess);

// ---- display last guess ----
function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').innerHTML = 'nada.'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').innerHTML = 'invalid'
  } else {
    var guessInput = parseInt(document.getElementById('guessInput').value);
    document.getElementById('guessDisplay').innerHTML = guessInput;
  }
}

guessSubmission.addEventListener('click', displayGuess);

// ---- clear input field & disable clear button ----
var clearButton = document.getElementById('clear');

clearButton.addEventListener('click', clearInput);

function clearInput() {
  document.getElementById('guessInput').value = '';
  disableButton();
}

function disableButton() {
  document.getElementById('clear').disabled = true
  document.getElementById('clear').style.backgroundColor = '#D0D2D3'
}

// ---- enable clear button when user begins typing ----
function enableButton() {
  document.getElementById('clear').disabled = false
  document.getElementById('clear').style.backgroundColor = '#929497'
}

var guessInput = document.getElementById('guessInput')

guessInput.addEventListener('keypress', enableButton)

// ---- reset game ----
var resetButton = document.getElementById('reset');

resetButton.addEventListener('click', resetGame);

function resetGame() {
  location.reload()
}
