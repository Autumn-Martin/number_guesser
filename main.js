// ---------------------- answer range -----------------------------------------
let minNumValue = 1 // default min
let maxNumValue = 10 // default max
let randNum =  Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )

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

// ---------------------- check guess ------------------------------------------
document.getElementById('submitGuessButton').addEventListener('click', checkGuess);

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
  document.getElementById('guessIntro').textContent = 'Your last guess was';
  document.getElementById('resetButton').style.display = 'inline';
  document.getElementById('enterAnswerRangeBox').style.display = 'none';
  document.getElementById('range').style.display = 'block';
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}

function changeViewAfterCorrectGuess() {
  document.getElementById('submitGuessButton').style.display = 'none';
  document.getElementById('clearButton').style.display = 'none';
  document.getElementById('continueButton').style.display = 'inline';
  describeNextAnswerRange();
}

function describeNextAnswerRange() {
  let nextMinValue = minNumValue - 10
  let nextMaxValue = maxNumValue + 10
  document.getElementById('continueMessage').textContent = `Your next answer will be between ${nextMinValue} & ${nextMaxValue}!`;
  document.getElementById('continueMessage').style.display = 'inline';
}

// ---------------------- display last guess -----------------------------------
document.getElementById('submitGuessButton').addEventListener('click', displayGuess);

function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').textContent = 'nada'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').textContent = 'invalid'
  } else {
    let guessInput = parseInt(document.getElementById('guessInput').value);
    document.getElementById('guessDisplay').textContent = guessInput;
  }
}

// ---------------------- clear input field & disable clear button -------------
document.getElementById('clearButton').addEventListener('click', clearInput);

function clearInput() {
  document.getElementById('guessInput').value = '';
  disableClearButton();
}

function disableClearButton() {
  document.getElementById('clearButton').disabled = true
  document.getElementById('clearButton').style.backgroundColor = '#D0D2D3'
}

// ---------------------- enable clear button when user begins typing ----------
document.getElementById('guessInput').addEventListener('keypress', enableClearButton)

function enableClearButton() {
  document.getElementById('clearButton').disabled = false
  document.getElementById('clearButton').style.backgroundColor = '#929497'
}

// ---------------------- continue game ----------------------------------------
document.getElementById('continueButton').addEventListener('click', continueGame)
document.getElementById('continueButton').addEventListener('click', regenRandNum)

function continueGame() {
  increaseRange();
  resetViewToContinueGamePlay();
  clearLastAnswer();
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
  document.getElementById('submitGuessButton').style.display = 'inline';
  document.getElementById('clearButton').style.display = 'inline';
  document.getElementById('continueButton').style.display = 'none';
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}

function regenRandNum() {
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---------------------- reset game -------------------------------------------
document.getElementById('resetButton').addEventListener('click', () => location.reload());
