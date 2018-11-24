// ----------- answer range ----------------------
// assign default min--defined with ES6 let because it is expected to change
let minNumValue = 1
// assign default max--defined with ES6 let because it is expected to change
let maxNumValue = 10
// 1st assignment of a random number between default min & max values--defined with ES6 let because it is expected to change if user inputs a range
let randNum =  Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
// Event listener that listens for a change in input for element #playerMinNum. Upon change, runs the function getNewMinNumValue()
document.getElementById('playerMinNum').addEventListener('change', getNewMinNumValue)
// Event listener that listens for a change in input for element #playerMaxNum. Upon change, runs the function getNewMaxNumValue()
document.getElementById('playerMaxNum').addEventListener('change', getNewMaxNumValue)

// function to retrieve the new value as an integer & create a new random number within the resulting range
function getNewMinNumValue() {
  // get the input value and use parseInt to convert it from a string to an integer & round it if needed
  minNumValue = parseInt(document.getElementById('playerMinNum').value);
  // reassign a random value, rounded down to an integer between the updated range min & max
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}
// function to retrieve the new value as an integer & create a new random number within the resulting range
function getNewMaxNumValue() {
  // get the input value and use parseInt to convert it from a string to an integer & round it if needed.
  maxNumValue = parseInt(document.getElementById('playerMaxNum').value);
  // reassign a random value, rounded down to an integer between the updated range min & max
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---- check guess ----
document.getElementById('guessSubmission').addEventListener('click', checkGuess);

function checkGuess() {
  changeViewAfterAnyGuess();

  const gameResponse = document.getElementById('guessResponse');
  let playerGuess = parseInt(guessInput.value);

  if (playerGuess === randNum) {
      gameResponse.textContent = 'BOOM!';
      gameResponse.style.backgroundColor = '#ffffff';
      changeViewAfterCorrectGuess();
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
      gameResponse.style.backgroundColor = '#ffffff'
  } else if (playerGuess < randNum) {
      gameResponse.textContent = 'That is too low.';
      gameResponse.style.backgroundColor = '#ffffff'
  } else {
      gameResponse.textContent = 'Guess again!';
      gameResponse.style.backgroundColor = '#fad1e2'
  }
}

function changeViewAfterAnyGuess() {
  document.getElementById('guessIntro').innerHTML = 'Your last guess was';
  document.getElementById('reset').style.display = 'inline';
  document.getElementById('enterAnswerRangeBox').style.display = 'none';
  document.getElementById('range').style.display = 'block';
  document.getElementById('range').innerHTML = `range: ${minNumValue} to ${maxNumValue}`;
}

function changeViewAfterCorrectGuess() {
  document.getElementById('guessSubmission').style.display = 'none';
  document.getElementById('clear').style.display = 'none';
  document.getElementById('continue').style.display = 'inline';
  describeNextAnswerRange();
}

function describeNextAnswerRange() {
  var nextMinValue = minNumValue - 10
  var nextMaxValue = maxNumValue + 10
  document.getElementById('continueMessage').innerHTML = `Your next answer will be between ${nextMinValue} & ${nextMaxValue}!`;
  document.getElementById('continueMessage').style.display = 'inline';
}

// ---- display last guess ----
document.getElementById('guessSubmission').addEventListener('click', displayGuess);

function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').innerHTML = 'nada'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').innerHTML = 'invalid'
  } else {
    var guessInput = parseInt(document.getElementById('guessInput').value);
    document.getElementById('guessDisplay').innerHTML = guessInput;
  }
}

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
document.getElementById('guessInput').addEventListener('keypress', enableButton)

function enableButton() {
  document.getElementById('clear').disabled = false
  document.getElementById('clear').style.backgroundColor = '#929497'
}

// ---- continue game ----
document.getElementById('continue').addEventListener('click', continueGame)
document.getElementById('continue').addEventListener('click', regenRandNum)

function continueGame() {
  increaseRange();
  clearLastAnswer();
  resetViewToContinueGamePlay();
}

function increaseRange() {
  minNumValue -= 10
  maxNumValue += 10
}

function clearLastAnswer() {
  document.getElementById('guessInput').value = '';
}

function resetViewToContinueGamePlay() {
  document.getElementById('continueMessage').style.display = 'none';
  document.getElementById('guessSubmission').style.display = 'inline';
  document.getElementById('clear').style.display = 'inline';
  document.getElementById('continue').style.display = 'none';
  document.getElementById('range').innerHTML = `range: ${minNumValue} to ${maxNumValue}`;
}

function regenRandNum() {
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---- reset game ----
document.getElementById('reset').addEventListener('click', resetGame);

function resetGame() {
  location.reload()
}
