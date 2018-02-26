# Hangman-Game

JS Code backup

// Waits for HTML to load before running code
window.onload = function () { 
    
    var listOfWords = ["Ohio", "Texas", "Maine", "Florida", "Iowa"];  
    var playerWins = 0;
    var playerGuessesLeft = 15;
    var playerGuessCorrect  = false;

    // Used for validation, checks to see if the user pressed a letter 
    var regexLettersOnly = /^[a-zA-Z]+$/;  

    //Pick a random string from the listOfStates array for the user to guess. Then make the random word uppercase for validation.
    var randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)]; 
    var goalWord = randomWord.toUpperCase();

    // Store the letters the player guesses as an array so it can be more easily maipulated
    var playerStatus = []; 
  

   




    // This loop will assing the playerStatus Array an underscore for each letter in goalWord
    for (i=0; i < goalWord.length; i++) { 
        playerStatus[i] = "_";
    }

    // This converts the playerStatus array into a string with the join method and adds a space to seperate each letter. Then writes the string to the document 
    document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");
    document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;




    console.log(goalWord); // for troubleshooting



    //This function will run when the user presses a key. Then assigns the pressed key to a string. Then converts to uppercase for validation
    document.onkeyup = function(event) {
        var pressedKey = event.key; 
        var guessedLetter = pressedKey.toUpperCase();

        //checks to make sure the pressed key is a letter.
        if (regexLettersOnly.test(guessedLetter)) { 

            // checks to make sure the pressed key matches a letter(s) in the goalWord, if it does then it replaces the corilating underscore with that letter 
            for (i=0; i < goalWord.length; i++){ 
                if (goalWord.charAt(i) === guessedLetter) {
                    playerStatus[i] = guessedLetter;
                    playerGuessCorrect = true;
                } 
            }

            // Updates the document with the new value of playerStatus
            document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");

            if (playerGuessCorrect !== true) {
                playerGuessesLeft = playerGuessesLeft -1;
            }

            // updates the document with the remaining number of guesses then sets guesses back to false
            document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;
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
