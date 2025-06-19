document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const guessInput = document.getElementById('guess-input');
    const suggestionsBox = document.getElementById('suggestions-box');
    const submitButton = document.getElementById('submit-guess');
    const gridBody = document.getElementById('grid-body');
    const modal = document.getElementById('game-over-modal');
    const modalMessage = document.getElementById('game-over-message');
    const playAgainButton = document.getElementById('play-again-button');
    const winnerImage = document.getElementById('winner-image');
    
    // --- Game State ---
    let secretCharacter = null;
    let isGameOver = false;
    let guessedNames = new Set();

    // --- Game Initialization ---
    function initGame() {
        // NOTE: We are now using ALL_CHARACTERS from saiyan_data.js
        secretCharacter = ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)];
        console.log("Secret Character:", secretCharacter.name);
        isGameOver = false;
        guessedNames.clear();
        gridBody.innerHTML = '';
        guessInput.value = '';
        guessInput.disabled = false;
        submitButton.disabled = false;
        modal.classList.add('modal-hidden');
    }
    
    // --- Autocomplete Positioning and Logic ---
    function positionSuggestionsBox() {
        setTimeout(() => {
            const inputRect = guessInput.getBoundingClientRect();
            suggestionsBox.style.left = `${inputRect.left}px`;
            suggestionsBox.style.top = `${inputRect.bottom}px`;
            suggestionsBox.style.width = `${inputRect.width}px`;
        }, 0);
    }

    function updateSuggestions() {
        positionSuggestionsBox();
        const query = guessInput.value.toLowerCase().replace(/ /g, '_');
        suggestionsBox.innerHTML = '';
        const available = ALL_CHARACTERS.filter(c => !guessedNames.has(c.name));
        const suggestionsToShow = query.length === 0 
            ? available 
            : available.filter(c => c.name.toLowerCase().startsWith(query));

        suggestionsToShow.forEach(character => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `<img src="${character.image_url}" alt="${character.name}"><span>${character.name.replace(/_/g, ' ')}</span>`;
            div.addEventListener('click', () => {
                guessInput.value = character.name.replace(/_/g, ' ');
                suggestionsBox.style.display = 'none';
            });
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
    }

    guessInput.addEventListener('focus', updateSuggestions);
    guessInput.addEventListener('input', updateSuggestions);
    document.addEventListener('click', (e) => { if (!e.target.closest('.autocomplete-container')) { suggestionsBox.style.display = 'none'; } });
    window.addEventListener('resize', () => { if (suggestionsBox.style.display === 'block') { positionSuggestionsBox(); } });

    // --- Guess Handling ---
    function handleGuess() {
        if (isGameOver) return;
        const guessName = guessInput.value.toUpperCase().replace(/ /g, '_');
        const guessedChar = ALL_CHARACTERS.find(c => c.name === guessName);
        if (!guessedChar) { alert("Character not found!"); return; }
        if (guessedNames.has(guessName)) { alert("You've already guessed that character!"); return; }
        
        guessedNames.add(guessName);
        displayGuessRow(guessedChar);

        if (guessedChar.name === secretCharacter.name) { endGame(true); }
        guessInput.value = '';
        suggestionsBox.style.display = 'none';
        guessInput.blur();
    }

    submitButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleGuess(); });

    // --- Display and Comparison Logic ---
    const createCell = (value, className = '') => {
        const cell = document.createElement('div');
        cell.className = `grid-cell ${className}`;
        cell.innerHTML = value;
        return cell;
    };
    function displayGuessRow(guessedChar) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        const charCellContent = `<img src="${guessedChar.image_url}" alt="${guessedChar.name}"><span>${guessedChar.name.replace(/_/g, ' ')}</span>`;
        row.appendChild(createCell(charCellContent, 'character-cell'));
        
        const isCorrect = (attr) => guessedChar[attr] === secretCharacter[attr] ? 'correct' : 'incorrect';
        row.appendChild(createCell(guessedChar.race.replace('_', ' '), isCorrect('race')));
        row.appendChild(createCell(guessedChar.firstSaga.replace(/_/g, ' '), isCorrect('firstSaga')));
        row.appendChild(createCell(guessedChar.allegiance.replace('_', ' '), isCorrect('allegiance')));
        row.appendChild(comparePowerTier(guessedChar.powerTier, secretCharacter.powerTier));
        row.appendChild(createCell(guessedChar.hasTail, isCorrect('hasTail')));
        
        gridBody.prepend(row);
    }
    function comparePowerTier(guessedValue, secretValue) {
        let status = 'incorrect';
        let arrow = '';
        if (guessedValue === secretValue) { status = 'correct'; } 
        else if (guessedValue < secretValue) { arrow = '<span>⬆️</span>'; } 
        else { arrow = '<span>⬇️</span>'; }
        return createCell(`${guessedValue}${arrow}`, status);
    }
    function endGame(isWin) {
        isGameOver = true;
        guessInput.disabled = true;
        submitButton.disabled = true;
        setTimeout(() => {
            if (isWin) {
                winnerImage.src = secretCharacter.image_url;
                winnerImage.alt = secretCharacter.name;
                modalMessage.innerHTML = `It's over 9000! You guessed <strong>${secretCharacter.name.replace(/_/g, ' ')}</strong>!`;
            }
            modal.classList.remove('modal-hidden');
        }, 1000);
    }
    
    playAgainButton.addEventListener('click', initGame);
    initGame();
});