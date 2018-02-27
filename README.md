# Hangman-Game

HTML BACK UP:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Hangman Game</title>

    <link rel="stylesheet" type="text/css" href="assets\css\reset.css" />
    <!-- <link rel="stylesheet" type="text/css" href="assets\css\style.css" /> -->
    <script src="assets\javascript\game.js"></script>
</head>
<body>
    
<div id="wrapper">
    <h1>US States Hangman Game</h1>

    <div id="picture"></div> <!-- write pic here when user wins -->

    <div id="game_text">
        <p>Press any key to get started!</p>

        <p id="wins_tag"></p>

        <p>Current Word</p>

        <p id="word_underscores"></p>

        <p id="guesses_remaining"></p>

        <p id="guessed_letters"></p>

        <p id="win_or_lose"></p>

    </div>
</div>

</body>
</html>




JS Code backup

// Waits for HTML to load before running code
window.onload = function () { 
    
    var listOfWords = ["Ohio", "Texas", "Maine", "Florida", "Iowa"];  
    var playerWins = 0;
    var playerGuessesLeft = 15;
    var guessesToWin = 0;
    var correctGuesses = 0;
    var playerGuessCorrect  = false;

    // Used for validation, checks to see if the user pressed a letter 
    var regexLettersOnly = /^[a-zA-Z]+$/;  

    //Pick a random string from the listOfStates array for the user to guess. Then make the random word uppercase for validation.
    var randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)]; 
    var goalWord = randomWord.toUpperCase();

    // Store the letters the player guesses in arrays so it can be more easily maipulated
    var playerStatus = []; 
    var playerWrongLetters = [];

   




    // This loop will assing the playerStatus Array an underscore for each letter in goalWord, it will also determine the number of correct guesses needed to win
    for (i=0; i < goalWord.length; i++) { 
        playerStatus[i] = "_";
        guessesToWin++;
    }

    // This converts the playerStatus array into a string with the join method and adds a space to seperate each letter. Then writes the string to the document 
    document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");
    document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;
    document.getElementById("wins_tag").innerHTML = "Wins: " + playerWins;



                    console.log(guessesToWin); // for troubleshooting
                    console.log(goalWord); // for troubleshooting



    //This function will run when the user presses a key. Then assigns the pressed key to a string. Then converts to uppercase for validation
    document.onkeyup = function(event) {
        var pressedKey = event.key; 
        var guessedLetter = pressedKey.toUpperCase();

        //checks to make sure the pressed key is a letter And that the user has not guessed it befor.
        if (regexLettersOnly.test(guessedLetter) && playerWrongLetters.includes(guessedLetter) === false) { 

            // checks to make sure the pressed key matches a letter(s) in the goalWord, if it does then it replaces the corilating underscore with that letter 
            for (i=0; i < goalWord.length; i++) { 
                if (goalWord.charAt(i) === guessedLetter) {
                    playerStatus[i] = guessedLetter;
                    playerGuessCorrect = true;
                    correctGuesses++;
                } 
            }

            // Updates the document with the new value of playerStatus
            document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");

            // Keep track of player wrong guesses 
            if (playerGuessCorrect !== true) {
                playerGuessesLeft = playerGuessesLeft -1;
                playerWrongLetters.push(guessedLetter);
            }

            // Check to see if player wins, then reset the game
            if (correctGuesses === guessesToWin) {
                guessesToWin = 0;
                playerGuessesLeft = 16;
                correctGuesses = 0;
                playerWrongLetters = [];
                playerWins++;
                document.getElementById("guessed_letters").innerHTML = playerWrongLetters.join();
                document.getElementById("win_or_lose").innerHTML = "You win! Congratulations! Press any key to play again.";
                document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: ";
                document.getElementById("wins_tag").innerHTML = "Wins: " + playerWins;
                
                for (i=0; i < goalWord.length; i++) { 
                    playerStatus[i] = "_";
                    guessesToWin++;
                } 
            } 

            // Check to see if the player looses, then resets the game
            if (playerGuessesLeft === 0) {
                guessesToWin = 0;
                playerGuessesLeft = 16;
                correctGuesses = 0;
                playerWrongLetters = [];
                document.getElementById("guessed_letters").innerHTML = playerWrongLetters.join();
                document.getElementById("win_or_lose").innerHTML = "You lost. Try again! Press any key to play again.";
                document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: ";
                
                for (i=0; i < goalWord.length; i++) { 
                    playerStatus[i] = "_";
                    guessesToWin++;
                }
            } 

            // Updates the document with the remaining number of guesses then sets guesses back to false
            document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;
            document.getElementById("guessed_letters").innerHTML = playerWrongLetters.join(" ");
            playerGuessCorrect = false;
        } 
    }
}


/*

Code I might use:

1. For Loop to check player's answer that I know works

            

2. if (pressedKey.length === 1 && ... ) // add this into the if statement to see if more then one letter was pressed

REFERANCE:
what is regex: https://www.coursera.org/learn/web-development/lecture/3skTp/html-form-validation-javascript
wait for window to load: https://www.youtube.com/watch?v=fXGUEkHPRLg
get player guess to count: https://www.youtube.com/watch?v=tbLCMFp9QK4

*/
