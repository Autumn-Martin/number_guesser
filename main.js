// ---------------------- answer range -----------------------------------------
// Assign default min--defined with ES6 let because it is expected to change.
let minNumValue = 1
// Assign default max--defined with ES6 let because it is expected to change.
let maxNumValue = 10
// 1st assignment of a random number between default min & max values--defined with ES6 let because it is expected to change if user inputs a range.
let randNum =  Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
// Event listener that listens for a change in input for element #playerMinNum. Upon change, runs the function getNewMinNumValue().
// Generally used getElementById because it is more specific, reliable, & has better performance.
document.getElementById('playerMinNum').addEventListener('change', getNewMinNumValue)
// Event listener that listens for a change in input for element #playerMaxNum. Upon change, runs the function getNewMaxNumValue().
document.getElementById('playerMaxNum').addEventListener('change', getNewMaxNumValue)

// Define function (with ES5 to not be anonymous) to retrieve the new value as an integer & create a new random number within the resulting range.
function getNewMinNumValue() {
  // Get the input value and use parseInt to convert it from a string to an integer & round it if needed.
  minNumValue = parseInt(document.getElementById('playerMinNum').value);
  // reassign a random value, rounded down to an integer between the updated range min & max.
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}
// Define function (with ES5 to not be anonymous) to retrieve the new value as an integer & create a new random number within the resulting range.
function getNewMaxNumValue() {
  // Get the input value and use parseInt to convert it from a string to an integer & round it if needed.
  maxNumValue = parseInt(document.getElementById('playerMaxNum').value);
  // Reassign a random value, rounded down to an integer between the updated range min & max.
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---------------------- check guess ------------------------------------------
// When user clicks on "Guess", this event listener calls the checkGuess function.
document.getElementById('guessSubmission').addEventListener('click', checkGuess);
// This function contains the logic to check a users guess. Used ES5 syntax--did not want anonymous function.
function checkGuess() {
  // Call the function, changeViewAfterAnyGuess()
  changeViewAfterAnyGuess();
  // Define the element #guessResponse with ES6 const for use below & to denote that this will not be reassigned,
  const gameResponse = document.getElementById('guessResponse');
  // Parse the value of user guess input as an integer & define the result with ES6 let for use below & to denote that this will be reassigned.
  let playerGuess = parseInt(guessInput.value);
  // Conditional for when user guesses correctly.
  if (playerGuess === randNum) {
      gameResponse.textContent = 'BOOM!';
      gameResponse.style.backgroundColor = '#ffffff';
      changeViewAfterCorrectGuess();
  // Conditional for when user enters non-numerical values or nothing at all.
  } else if ((guessInput.value === '') || (isNaN(Number(guessInput.value)))) {
      gameResponse.textContent = 'Please enter a number.';
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is above the max value of the range in which the answer resides.
  } else if (playerGuess > maxNumValue) {
      gameResponse.textContent = 'That number is above the range of possible values.'
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is below the min value of the range in which the answer resides.
  } else if (playerGuess < minNumValue) {
      gameResponse.textContent = 'That number is below the range of possible values.'
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is above the answer.
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

// This function (defined by ES5 for nonanonymity) changes the view of the page after any guess.
function changeViewAfterAnyGuess() {
  // This line sets the inner HTML of the element with id guessIntro to this string, which displays the string on the page.
  document.getElementById('guessIntro').textContent = 'Your last guess was';
  // This line changes the display of the #reset element from none to inline, causing the reset button to appear on the page now that it may be needed.
  document.getElementById('reset').style.display = 'inline';
  // This line changes the display of the #enterAnswerRangeBox element to none, so that users nolonger have the option to change the range after it has been set without reseting the game.
  document.getElementById('enterAnswerRangeBox').style.display = 'none';
  // This line changes the display of the #range element from none to block, so that a range appears at the top of the page now that it has been set.
  document.getElementById('range').style.display = 'block';
  // This line sets the inner HTML of the #range element to this string and uses string interpolation to include the min and max values. This displays the string describing the range on the page.
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
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
  document.getElementById('continueMessage').textContent = `Your next answer will be between ${nextMinValue} & ${nextMaxValue}!`;
  document.getElementById('continueMessage').style.display = 'inline';
}

// ---------------------- display last guess -----------------------------------
document.getElementById('guessSubmission').addEventListener('click', displayGuess);

function displayGuess() {
  if (document.getElementById('guessInput').value === '') {
    document.getElementById('guessDisplay').textContent = 'nada'
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    document.getElementById('guessDisplay').textContent = 'invalid'
  } else {
    var guessInput = parseInt(document.getElementById('guessInput').value);
    document.getElementById('guessDisplay').textContent = guessInput;
  }
}

// ---------------------- clear input field & disable clear button -------------
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

// ---------------------- enable clear button when user begins typing ----------
document.getElementById('guessInput').addEventListener('keypress', enableButton)

function enableButton() {
  document.getElementById('clear').disabled = false
  document.getElementById('clear').style.backgroundColor = '#929497'
}

// ---------------------- continue game ----------------------------------------
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
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}

function regenRandNum() {
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---------------------- reset game -------------------------------------------
// When user clicks on "Reset", this event listener will reload the page. Used ES6 syntax here to make this one line.
document.getElementById('reset').addEventListener('click', () => location.reload());
