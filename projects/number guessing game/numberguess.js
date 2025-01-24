let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

guessButton.addEventListener("click", () => {
    const userGuess = parseInt(guessInput.value, 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    if (userGuess === randomNumber) {
        message.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts.`;
        guessButton.style.display = "none";
        restartButton.style.display = "inline-block";
    } else if (userGuess > randomNumber) {
        message.textContent = "Too high! Try again.";
    } else {
        message.textContent = "Too low! Try again.";
    }
});

restartButton.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = "Attempts: 0";
    message.textContent = "";
    guessInput.value = "";
    guessButton.style.display = "inline-block";
    restartButton.style.display = "none";
});
