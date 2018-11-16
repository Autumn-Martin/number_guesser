# Number Guesser

### About
Number Guesser is a number guessing game where users can guess a number between 1 and 100.

### Getting Started

This project can be run locally with [live-server](https://www.npmjs.com/package/live-server).
Perform the following in the CLI:
* To install: `npm install -g live-server`
* To run: `live-server`

### Iteration 1
Zero State:
[X] An input field for guessing the number
[X] A button for submitting a guess
[X] A button for clearing the input field
[X] A button that resets the game
User’s Guess State:
[X] Display the user’s most recent guess
Display results and feedback
[X] If their guess is too high, it should display: “That is too high”
[X] If their guess is too low, it should display: “That is too low”
[X] If the guess is correct, it should display: “BOOM!”

### Iteration 2
[X] The input field should only accept numerical entries, within the defined min and max range
[X] The application should display an error message if the guess is not a number (e.g. parseInt() returns NaN).
[X] The application should display an error if the guess is outside of the range of possible answers.
[X] The clear button should be disabled if there is nothing to clear.
[-] The reset button should be disabled if there is nothing to reset.

### Iteration 3
[] Add additional inputs that allow the user to specify the minimum/maximum range.
Upon successful win, user’s range is updated:
[] Every time the user wins a round increase the maximum number by 10.
[] Every time the user wins a round decrease the minimum number by 10.
[] Appropriate UI is incorporated such that user understands what is happening.
(Pro-tip: You’ll need to adjust the input fields to accept the new minimum and maximum numbers.)
