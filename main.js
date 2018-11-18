// ---- answer range ----
let minNumValue = 1 // default min
let maxNumValue = 10 // default max
let correctCount = 0
var randNum =  Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )

document.getElementById('playerMinNum').addEventListener('change', getNewMinNumValue)
document.getElementById('playerMaxNum').addEventListener('change', getNewMaxNumValue)

function getNewMinNumValue() {
  minNumValue = parseInt(document.getElementById('playerMinNum').value);
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

function getNewMaxNumValue() {
  maxNumValue = parseInt(document.getElementById('playerMaxNum').value);
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
      gameResponse.style.backgroundColor = '#ffffff'
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
