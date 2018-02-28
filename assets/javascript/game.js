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

    // Store the letters the player guesses in arrays
    var playerStatus = []; 
    var playerWrongLetters = [];
    var playeRightLetters = [];

   function newGame () {
       
   }




    // This loop will create an underscore in the playerStatus array for each letter in goalWord, it will also determine the number of correct guesses needed to win
    for (i=0; i < goalWord.length; i++) { 
        playerStatus[i] = "_";
        guessesToWin++;
    }

    // This converts the playerStatus array into a string with the join method and adds a space to seperate each letter. Then writes the string to the document.
    document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");
    // These write the player's stats to the secreen when the page first loads
    document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;
    document.getElementById("wins_tag").innerHTML = "Wins: " + playerWins;



                    console.log(guessesToWin); // for troubleshooting
                    console.log(goalWord); // for troubleshooting



    //This function will run when the user presses a key. Then assigns the pressed key to a string. Then converts to uppercase for validation
    document.onkeyup = function(event) {
        var pressedKey = event.key; 
        var guessedLetter = pressedKey.toUpperCase();

        //checks to make sure the pressed key is a letter And that the user has not guessed it before.
        if (regexLettersOnly.test(guessedLetter) && playerWrongLetters.includes(guessedLetter) === false && playeRightLetters.includes(guessedLetter) === false) { 

            // checks to make sure the pressed key matches a letter(s) in the goalWord, if it does then it replaces the correlating underscore with that letter
            // and makes sure the user can't guess that same letter. 
            for (i=0; i < goalWord.length; i++) { 
                if (goalWord.charAt(i) === guessedLetter) {
                    playerStatus[i] = guessedLetter;
                    playeRightLetters.push(guessedLetter);
                    playerGuessCorrect = true;
                    correctGuesses++;
                } 
            }

            // Updates the document with the new value of playerStatus so that the user can see their correct guesses so far
            document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");

            // Keeps track of both the player's wrong guesses and how many guesses they have left 
            if (playerGuessCorrect !== true) {
                playerGuessesLeft = playerGuessesLeft -1;
                playerWrongLetters.push(guessedLetter);
            }

            // Check to see if player wins, then reset the game
            if (correctGuesses === guessesToWin) {
                playerWins++;

                guessesToWin = 0;
                playerGuessesLeft = 16;
                correctGuesses = 0;
                playerWrongLetters = []; 
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