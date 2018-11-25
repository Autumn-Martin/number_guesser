// ---------------------- answer range -----------------------------------------
// Assign default min--defined with ES6 let because it is expected to change.
let minNumValue = 1
// Assign default max--defined with ES6 let because it is expected to change.
let maxNumValue = 10
// 1st assignment of a random number between default min & max values--defined with ES6 let because it is expected to change if user inputs a range.
let randNum =  Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
// Event listener that listens for a change in input for element #playerMinNum. Upon change, runs the function getNewMinNumValue().
// (Generally used getElementById because it is more specific, reliable, & has better performance.)
document.getElementById('playerMinNum').addEventListener('change', getNewMinNumValue)
// Event listener that listens for a change in input for element #playerMaxNum. Upon change, runs the function getNewMaxNumValue().
document.getElementById('playerMaxNum').addEventListener('change', getNewMaxNumValue)

// Define function (with ES5 for nonanonymity & readability) to retrieve the new value as an integer & create a new random number within the resulting range.
function getNewMinNumValue() {
  // Get the input value and use parseInt to convert it from a string to an integer & round it if needed.
  minNumValue = parseInt(document.getElementById('playerMinNum').value);
  // reassign a random value, rounded down to an integer between the updated range min & max.
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}
// Define function (with ES5 for nonanonymity & readability) to retrieve the new value as an integer & create a new random number within the resulting range.
function getNewMaxNumValue() {
  // Get the input value and use parseInt to convert it from a string to an integer & round it if needed.
  maxNumValue = parseInt(document.getElementById('playerMaxNum').value);
  // Reassign a random value, rounded down to an integer between the updated range min & max.
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---------------------- check guess ------------------------------------------
// When user clicks on "Guess", this event listener calls the checkGuess function.
document.getElementById('submitGuessButton').addEventListener('click', checkGuess);
// This function contains the logic to check a users guess. Used ES5 syntax for nonanonymity & readability.
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

// This function (defined by ES5 for nonanonymity & readability) changes the view of the page after any guess.
function changeViewAfterAnyGuess() {
  // This line sets the text content of the element with id guessIntro to this string, which displays the string on the page.
  document.getElementById('guessIntro').textContent = 'Your last guess was';
  // This line changes the display of the #reset element from none to inline, causing the reset button to appear on the page now that it may be needed.
  document.getElementById('resetButton').style.display = 'inline';
  // This line changes the display of the #enterAnswerRangeBox element to none, so that users nolonger have the option to change the range after it has been set without reseting the game.
  document.getElementById('enterAnswerRangeBox').style.display = 'none';
  // This line changes the display of the #range element from none to block, so that a range appears at the top of the page now that it has been set.
  document.getElementById('range').style.display = 'block';
  // This line sets the text content of the #range element to this string and uses string interpolation to include the min and max values. This displays the string describing the range on the page.
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}

// This function (defineed by ES5 for nonanonymity & readability) prepares a different view for a user after a correct guess.
function changeViewAfterCorrectGuess() {
  // Hide guess button.
  document.getElementById('submitGuessButton').style.display = 'none';
  // Hide clear button.
  document.getElementById('clearButton').style.display = 'none';
  // Display continue button.
  document.getElementById('continueButton').style.display = 'inline';
  // Call describeNextAnswerRange() function.
  describeNextAnswerRange();
}

// This function (defined by ES5 for nonanonymity & readability) displays a message that explains the next range without increasing the current range.
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
// When user clicks on "Guess", this event listener calls the function, displayGuess().
document.getElementById('submitGuessButton').addEventListener('click', displayGuess);
// This function (defined by ES5 for nonanonymity & readability) displays the user's last guess if it was valid, 'nada' if the user entered nothing, or 'invalid' if the entry is non-numerical.
function displayGuess() {
  // Conditional for when user input is nothing (which causes the input value to equal an empty string).
  if (document.getElementById('guessInput').value === '') {
    // Display this text instead of the last input.
    document.getElementById('guessDisplay').textContent = 'nada'
  // Conditional for when user input is non-numerical.
    // 'NaN' or Not-a-Number is returned when the Number() function attempts to convert a non-numerical value to a number.
  } else if (isNaN(Number(document.getElementById('guessInput').value))) {
    // Display this text instead of the last input.
    document.getElementById('guessDisplay').textContent = 'invalid'
  // Conditional for when user input is valid.
  } else {
    // Define the integer value of user input (using ES6 let to denote that this value will change).
    let guessInput = parseInt(document.getElementById('guessInput').value);
    // Display the integer version of the last input (defined as guessInput above).
    document.getElementById('guessDisplay').textContent = guessInput;
  }
}

// ---------------------- clear input field & disable clear button -------------
// When user clicks on 'Clear', this event listener calls the function, clearInput().
document.getElementById('clearButton').addEventListener('click', clearInput);
// This function (defined by ES5 for nonanonymity & readability) removes any text currently residing in the guess input field, & disables the clear enableButton

function clearInput() {
  // Clear guess input field by setting its value equal to an empty string.
  document.getElementById('guessInput').value = '';
  // Call the function, disableButton(), while there is no need to click it.
  disableClearButton();
}

// This function (defined by ES5 for nonanonymity & readability) disables the clear button & lightens its color.
function disableClearButton() {
  // Disable the clear button.
  document.getElementById('clearButton').disabled = true
  // Change the color of the clear button from dark to light grey to signify that it is disabled.
  document.getElementById('clearButton').style.backgroundColor = '#D0D2D3'
}

// ---------------------- enable clear button when user begins typing ----------
// When a user types in the field for guess input, this event listener will call the function, enableButton().
document.getElementById('guessInput').addEventListener('keypress', enableClearButton)
// This function (defined by ES5 for nonanonymity & readability) re-enables the button to clear the guess input field.
function enableClearButton() {
  // Un-disable clear button.
  document.getElementById('clearButton').disabled = false
  // Reset clear button color to the darker appearance it has when not disabled.
  document.getElementById('clearButton').style.backgroundColor = '#929497'
}

// ---------------------- continue game ----------------------------------------
// When user clicks on continue, this event listener runs the continueGame() function.
document.getElementById('continueButton').addEventListener('click', continueGame)
// When user clicks on continue, this event listener runs the regenRandNum() function.
document.getElementById('continueButton').addEventListener('click', regenRandNum)
/* This function (defined by ES5 for nonanonymity & readability) initializes for the game to be continued by:
  broadening the range that contains the answer, clearing the last user input, & preparing the view for the user */
function continueGame() {
  // Calls the function to increase range.
  increaseRange();
  // Calls the function to reset view to continue game play.
  resetViewToContinueGamePlay();
  // Calls the function to clear last answer.
  clearLastAnswer();
}
// This function (defined by ES5 for nonanonymity & readability) broadens the range that contains the answer.
function increaseRange() {
  // Reassign minNumValue to equal itself subtracted by 10.
  minNumValue -= 10
  // Reassign maxNumValue to equal itself added by 10.
  maxNumValue += 10
}
// This function (defined by ES5 for nonanonymity & readability) removes the last answer from view.
function clearLastAnswer() {
  // Remove the last answer from view by setting it equal to an empty string.
  document.getElementById('guessInput').value = '';
}
// This function (defined by ES5 for nonanonymity & readability) resets the view to game play mode.
function resetViewToContinueGamePlay() {
  // Hide continue message.
  document.getElementById('continueMessage').style.display = 'none';
  // Show submit button.
  document.getElementById('submitGuessButton').style.display = 'inline';
  // Show clear button.
  document.getElementById('clearButton').style.display = 'inline';
  // Hide continue button.
  document.getElementById('continueButton').style.display = 'none';
  // Update range text content to new range.
  document.getElementById('range').textContent = `range: ${minNumValue} to ${maxNumValue}`;
}
// This function (defined by ES5 for nonanonymity & readability) creates a new random integer within the updated current range.
function regenRandNum() {
  // Reassign randNum to a new random integer within the current range.
  randNum = Math.floor( Math.random() * (maxNumValue - minNumValue) + minNumValue )
}

// ---------------------- reset game -------------------------------------------
// When user clicks on "Reset", this event listener will reload the page. Used ES6 syntax here to make this one line.
document.getElementById('resetButton').addEventListener('click', () => location.reload());
