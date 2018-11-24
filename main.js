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
      // Display this text.
      gameResponse.textContent = 'BOOM!';
      // Set a white background for this text (also overrides the previous background if it was pink).
      gameResponse.style.backgroundColor = '#ffffff';
      // Call the function, changeViewAfterCorrectGuess().
      changeViewAfterCorrectGuess();
  // Conditional for when user enters non-numerical values or nothing at all.
  } else if ((guessInput.value === '') || (isNaN(Number(guessInput.value)))) {
      // Display this text.
      gameResponse.textContent = 'Please enter a number.';
      // Set background for text to be pink to indicate an error.
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is above the max value of the range in which the answer resides.
  } else if (playerGuess > maxNumValue) {
      // Display this text.
      gameResponse.textContent = 'That number is above the range of possible values.'
      // Set background for text to be pink to indicate an error.
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is below the min value of the range in which the answer resides.
  } else if (playerGuess < minNumValue) {
      gameResponse.textContent = 'That number is below the range of possible values.'
      gameResponse.style.backgroundColor = '#fad1e2';
  // Conditional for when user enters a guess that is above the answer.
  } else if (playerGuess > randNum){
      // Display this text.
      gameResponse.textContent = 'That is too high.';
      // Set a white background for this text (also overrides the previous background if it was pink).
      gameResponse.style.backgroundColor = '#ffffff'
  // Conditional for when user enters a guess that is below the answer.
  } else if (playerGuess < randNum) {
      // Display this text.
      gameResponse.textContent = 'That is too low.';
      // Set a white background for this text (also overrides the previous background if it was pink).
      gameResponse.style.backgroundColor = '#ffffff'
  // Conditional for case when non other conditions are met.
  } else {
      // Display this text.
      gameResponse.textContent = 'Guess again!';
      // Set a pink background for this text to indicate an error.
      gameResponse.style.backgroundColor = '#fad1e2'
  }
}

// This function (defined by ES5 for nonanonymity) changes the view of the page after any guess.
function changeViewAfterAnyGuess() {
  // This line sets the text content of the element with id guessIntro to this string, which displays the string on the page.
  document.getElementById('guessIntro').textContent = 'Your last guess was';
  // This line changes the display of the #reset element from none to inline, causing the reset button to appear on the page now that it may be needed.
  document.getElementById('reset').style.display = 'inline';
  // This line changes the display of the #enterAnswerRangeBox element to none, so that users nolonger have the option to change the range after it has been set without reseting the game.
  document.getElementById('enterAnswerRangeBox').style.display = 'none';
  // This line changes the display of the #range element from none to block, so that a range appears at the top of the page now that it has been set.
  document.getElementById('range').style.display = 'block';
  // This line sets the text content of the #range element to this string and uses string interpolation to include the min and max values. This displays the string describing the range on the page.
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}

// This function (defineed by ES5 for nonanonymity) prepares a different view for a user after a correct guess.
function changeViewAfterCorrectGuess() {
  // Hide guess button.
  document.getElementById('guessSubmission').style.display = 'none';
  // Hide clear button.
  document.getElementById('clear').style.display = 'none';
  // Display continue button.
  document.getElementById('continue').style.display = 'inline';
  // Call describeNextAnswerRange() function.
  describeNextAnswerRange();
}

// This function (defined by ES5 for nonanonymity) displays a message that explains the next range without increasing the current range.
function describeNextAnswerRange() {
  // Assign the next min value, which will be decreased by 10, with ES6 let to denote that it will change.
  let nextMinValue = minNumValue - 10
  // Assign the next max value, which will be increased by 10, with ES6 let to denote that it will change.
  let nextMaxValue = maxNumValue + 10
  // Set text content of element #continueMessage to a string message that includes string interpolation of the next min & max values.
  document.getElementById('continueMessage').textContent = `Your next answer will be between ${nextMinValue} & ${nextMaxValue}!`;
  // Display element #continueMessage so that user will see its text content.
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
