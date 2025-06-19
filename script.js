document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const keyboardContainer = document.getElementById('keyboard-container');

    const GUESS_LENGTH = 5;
    const MAX_TRIES = 6;
    let currentRow = 0;
    let currentTile = 0;

    // The heart of the game: The Word List!
    const saiyanWords = [
        "GOKUU", "VEGETA", "BROLY", "TRUNKS", "BARDOK", "RADITZ",
        "NAPPA", "FUSION", "POTARA", "SCOUTER", "KAMEHA", "GALICK",
        "SPIRIT", "KAIŌKEN", "FRIEEZA", "CELL", "BUU", "GOHAN"
    ];

    let secretWord = saiyanWords[Math.floor(Math.random() * saiyanWords.length)].toUpperCase();
    console.log("Secret Word:", secretWord); // For testing!

    // Create the Game Board Tiles
    for (let i = 0; i < MAX_TRIES * GUESS_LENGTH; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        gameBoard.appendChild(tile);
    }
    const tiles = document.querySelectorAll('.tile');

    // Create the Keyboard
    const keys = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "ENTER", "Z", "X", "C", "V", "B", "N", "M", "«"
    ];

    keys.forEach(key => {
        // You can structure this better with rows if needed
        const keyElement = document.createElement('button');
        keyElement.textContent = key;
        keyElement.classList.add('key');
        if (key === "ENTER" || key === "«") {
            keyElement.classList.add('large');
        }
        keyElement.addEventListener('click', () => handleKeyPress(key));
        keyboardContainer.appendChild(keyElement);
    });
    
    // Handle Physical Keyboard Input
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleKeyPress('ENTER');
        } else if (e.key === 'Backspace') {
            handleKeyPress('«');
        } else if (e.key.match(/^[a-z]$/i)) {
            handleKeyPress(e.key.toUpperCase());
        }
    });

    function handleKeyPress(key) {
        if (key === 'ENTER') {
            submitGuess();
        } else if (key === '«') {
            deleteLetter();
        } else if (currentTile < GUESS_LENGTH) {
            addLetter(key);
        }
    }
    
    function addLetter(letter) {
        const tile = tiles[currentRow * GUESS_LENGTH + currentTile];
        tile.textContent = letter;
        currentTile++;
    }

    function deleteLetter() {
        if (currentTile > 0) {
            currentTile--;
            const tile = tiles[currentRow * GUESS_LENGTH + currentTile];
            tile.textContent = '';
        }
    }

    function submitGuess() {
        if (currentTile !== GUESS_LENGTH) {
            alert("Your power level is too low! (Not enough letters)");
            return;
        }

        let guess = "";
        for (let i = 0; i < GUESS_LENGTH; i++) {
            guess += tiles[currentRow * GUESS_LENGTH + i].textContent;
        }
        
        // Color the tiles based on correctness
        for (let i = 0; i < GUESS_LENGTH; i++) {
            const tile = tiles[currentRow * GUESS_LENGTH + i];
            const letter = tile.textContent;
            
            if (secretWord[i] === letter) {
                tile.classList.add('correct');
            } else if (secretWord.includes(letter)) {
                tile.classList.add('present');
            } else {
                tile.classList.add('absent');
            }
        }
        
        if (guess === secretWord) {
            setTimeout(() => alert("Your power is MAXIMUM!"), 100);
            return;
        }

        currentRow++;
        currentTile = 0;
        
        if (currentRow === MAX_TRIES) {
             setTimeout(() => alert(`You lost! The word was ${secretWord}`), 100);
        }
    }
});