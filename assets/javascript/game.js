// Waits for HTML to load before running code
window.onload = function () { 
    
    var listOfWords = ["Ohio", "Texas", "Maine", "Florida", "Iowa", "Illinois", "Georgia"];  
    var playerWins = 0;
    var playerLosses = 0;
    var playerGuessesLeft = 15;
    var guessesToWin = 0;
    var correctGuesses = 0;
    var playerGuessCorrect  = false;

    // Used for validation, checks to see if the user pressed a letter 
    var regexLettersOnly = /^[a-zA-Z]/;  

    //Pick a random string from the listOfStates array for the user to guess. Then make the random word uppercase for validation.
    var randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)]; 
    var goalWord = randomWord.toUpperCase();

    // Store the letters the player guesses in arrays
    var playerStatus = []; 
    var playerWrongLetters = [];
    var playeRightLetters = [];

   // Call to start a new game
   function newGame (endGameMessage) {
        guessesToWin = 0;
        playerGuessesLeft = 15;
        correctGuesses = 0;
        playerWrongLetters = []; 
        playeRightLetters = [];
        playerStatus = [];
        randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
        goalWord = randomWord.toUpperCase(); 
        document.getElementById("guessed_letters").innerHTML = playerWrongLetters.join();
        document.getElementById("win_or_lose").innerHTML = endGameMessage;
        document.getElementById("wins_tag").innerHTML = "Wins: " + playerWins;
        document.getElementById("losses_tag").innerHTML = "Losses: " + playerLosses;
    
        for (i=0; i < goalWord.length; i++) { 
            playerStatus[i] = "_";
            guessesToWin++;
        } 

        document.getElementById("word_underscores").innerHTML = playerStatus.join(" ");

        console.log(goalWord); // for troubleshooting
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
    document.getElementById("losses_tag").innerHTML = "Losses: " + playerLosses;



                    console.log(goalWord); // for troubleshooting



    //This function will run when the user presses a key. Then assigns the pressed key to a string. Then converts to uppercase for validation
    document.onkeyup = function(event) {
        var pressedKey = event.key; 
        var guessedLetter = pressedKey.toUpperCase();

        //checks to make sure the pressed key is a single letter. And that the user has not guessed it before
        if (guessedLetter.length < 2 && regexLettersOnly.test(guessedLetter) === true 
            && playerWrongLetters.includes(guessedLetter) === false && playeRightLetters.includes(guessedLetter) === false) { 

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
                newGame("You win! Congratulations! Press any key to play again.");
            } 

            // Check to see if the player looses, then resets the game
            if (playerGuessesLeft === 0) {
                playerLosses++;
                newGame("You lost. Try again! Press any key to play again.");
            } 

            // Updates the document with the remaining number of guesses then sets guesses back to false
            document.getElementById("guesses_remaining").innerHTML = "Guesses Remaining: " + playerGuessesLeft;
            document.getElementById("guessed_letters").innerHTML = playerWrongLetters.join(" ");
            playerGuessCorrect = false;
        } 
    }
}


