// script.js

// --- CONSTANTS & DATA ---
const CHALLENGE_MAX_GUESSES = 10;
const propertiesToCompare = ["gender", "hair_color", "race", "origin_planet", "series", "debut_saga", "debut_year"];
const sagasOrder = [ "Saga de Pilaf", "Saga del 21º Torneo Mundial", "Saga de la Red Ribbon", "Saga del 22º Torneo Mundial", "Saga de Piccolo Daimaō", "Saga de Piccolo Jr.", "Saga Saiyan", "Saga de Namek", "Saga de Garlic Jr.", "Saga de los Androides", "Saga de Cell", "Película: El Último Combate", "Película: El Árbol del Poder", "Película: El Super Guerrero Son Goku", "Película: Los Rivales Más Poderosos", "Película: Guerreros de Fuerza Ilimitada", "Película: El Poder Invencible", "Película: Los Guerreros de Plata", "Saga de Majin Buu", "Película: ¡El Renacer de la Fusión! Goku y Vegeta", "Película: El Ataque del Dragón", "Saga del Fin de Z", "Saga de las Bolas de Dragón Negras", "Saga de Baby", "Saga de Super Androide 17", "Saga de los Dragones Oscuros", "Saga de la Batalla de los Dioses", "Saga de la Resurrección de Freezer", "Saga del Universo 6", "Saga de Trunks del Futuro (Super)", "Saga de Supervivencia Universal", "Película: Dragon Ball Super: Broly" ];

// --- Game State ---
let secretCharacter;
let gameOver;
let guessesMade;
let gameStarted = false;
let currentLanguage = 'es';
let currentTheme = 'dark-mode';
let currentGameMode = 'infinite';
let currentDifficulty = 'normal';
let countdownInterval;
let selectedCharacterForGuess = null;
let stats; 

// --- UI STRINGS ---
const uiStrings = {
    es: { pageTitle: "Saiyandle", headerSubtitle: "Adivina el personaje secreto de Dragon Ball.", guessLabel: "Elige un personaje:", guessPlaceholder: "Escribe un nombre...", guessButton: "Adivinar", notFoundMessage: "Por favor, selecciona un personaje válido de la lista.", winMessage: "¡Correcto!", dailyChallengeCompleted: "¡Desafío diario completado!", playAgainButton: "Jugar de Nuevo", footerText: "© 2024 Saiyandle. Inspirado en Wordle.", tooltipToLight: "Cambiar a modo claro", tooltipToDark: "Cambiar a modo oscuro", modeDaily: "Modo Diario", modeInfinite: "Modo Infinito", nextChallengeIn: "Próximo desafío en:", tooltipStats: "Estadísticas", statsTitle: "Estadísticas", statsPlayed: "Jugadas", statsWinPercentage: "% Victorias", statsCurrentStreak: "Racha Actual", statsMaxStreak: "Mejor Racha", statsDistribution: "Distribución de Adivinanzas", shareButton: "Compartir", copied: "¡Copiado!", loseMessage: "¡No has acertado!", attemptsRemaining: "Intentos restantes:", difficultyNormal: "Normal", difficultyChallenge: "Desafío", winTitle: "¡Felicidades!", winTriesText: "Lo adivinaste en {tries} intentos.", closeButton: "Cerrar", thImage: "Imagen", thCharacter: "Personaje", thGender: "Género", thHairColor: "Color de Pelo", thRace: "Raza", thOriginPlanet: "Planeta de Origen", thSeries: "Serie", thDebutSaga: "Saga de Debut", thDebutYear: "Año de Debut" },
    en: { pageTitle: "Saiyandle", headerSubtitle: "Guess the secret Dragon Ball character.", guessLabel: "Choose a character:", guessPlaceholder: "Type a name...", guessButton: "Guess", notFoundMessage: "Please select a valid character from the list.", winMessage: "Correct!", dailyChallengeCompleted: "Daily challenge completed!", playAgainButton: "Play Again", footerText: "© 2024 Saiyandle. Inspired by Wordle.", tooltipToLight: "Switch to light mode", tooltipToDark: "Switch to dark mode", modeDaily: "Daily Mode", modeInfinite: "Infinite Mode", nextChallengeIn: "Next challenge in:", tooltipStats: "Statistics", statsTitle: "Statistics", statsPlayed: "Played", statsWinPercentage: "Win %", statsCurrentStreak: "Current Streak", statsMaxStreak: "Max Streak", statsDistribution: "Guess Distribution", shareButton: "Share", copied: "Copied!", loseMessage: "You didn't guess it!", attemptsRemaining: "Attempts remaining:", difficultyNormal: "Normal", difficultyChallenge: "Challenge", winTitle: "Congratulations!", winTriesText: "You guessed it in {tries} tries.", closeButton: "Close", thImage: "Image", thCharacter: "Character", thGender: "Gender", thHairColor: "Hair Color", thRace: "Race", thOriginPlanet: "Origin Planet", thSeries: "Series", thDebutSaga: "Debut Saga", thDebutYear: "Debut Year" },
    ca: { pageTitle: "Saiyandle", headerSubtitle: "Endevina el personatge secret de Dragon Ball.", guessLabel: "Tria un personatge:", guessPlaceholder: "Escriu un nom...", guessButton: "Endevina", notFoundMessage: "Si us plau, selecciona un personatge vàlid de la llista.", winMessage: "Correcte!", dailyChallengeCompleted: "Repte diari completat!", playAgainButton: "Juga de Nou", footerText: "© 2024 Saiyandle. Inspirat en Wordle.", tooltipToLight: "Canvia a mode clar", tooltipToDark: "Canvia a mode fosc", modeDaily: "Mode Diari", modeInfinite: "Mode Infinit", nextChallengeIn: "Pròxim repte en:", tooltipStats: "Estadístiques", statsTitle: "Estadístiques", statsPlayed: "Jugades", statsWinPercentage: "% Victòries", statsCurrentStreak: "Ratxa Actual", statsMaxStreak: "Millor Ratxa", statsDistribution: "Distribució d'Endevinalles", shareButton: "Compartir", copiat: "Copiat!", loseMessage: "No ho has encertat!", attemptsRemaining: "Intents restants:", difficultyNormal: "Normal", difficultyChallenge: "Desafío", winTitle: "Felicitats!", winTriesText: "Ho has endevinat en {tries} intents.", closeButton: "Tancar", thImage: "Imatge", thCharacter: "Personatge", thGender: "Gènere", thHairColor: "Color de Cabell", thRace: "Raça", thOriginPlanet: "Planeta d'Origen", thSeries: "Sèrie", thDebutSaga: "Saga de Debut", thDebutYear: "Any de Debut" }
};

// --- DOM Elements ---
const bodyEl = document.body;
const guessButtonEl = document.getElementById('guessButton');
const guessesTbody = document.getElementById('guesses-tbody');
const messageArea = document.getElementById('message-area');
const characterSearchInput = document.getElementById('character-search-input');
const filteredOptionsList = document.getElementById('filtered-options-list');
const themeToggleButton = document.getElementById('theme-toggle');
const themeIconEl = document.getElementById('theme-icon');
const themeTooltipEl = document.getElementById('theme-tooltip');
const currentModeTextEl = document.getElementById('current-mode-text');
const gameModeDropdownButtons = document.querySelectorAll('#game-mode-dropdown button');
const dailyCountdownContainer = document.getElementById('daily-countdown-container');
const dailyCountdownEl = document.getElementById('daily-countdown');
const difficultySelectorContainer = document.getElementById('difficulty-selector-container');
const difficultyButtons = document.querySelectorAll('.difficulty-button');
const guessesRemainingContainer = document.getElementById('guesses-remaining-container');
const guessesRemainingDisplay = document.getElementById('guesses-remaining-display');
const postGameContainer = document.getElementById('post-game-container');
const playAgainButtonEl = document.getElementById('playAgainButton');
const shareButtonEl = document.getElementById('shareButton');
const statsButton = document.getElementById('stats-button');
const statsModalOverlay = document.getElementById('stats-modal-overlay');
const statsCloseButton = document.getElementById('stats-close-button');
const winModalOverlay = document.getElementById('win-modal-overlay');
const winCloseButton = document.getElementById('win-close-button');
const winShareButton = document.getElementById('win-share-button');

// --- Statistics and Daily State Logic ---
function loadStats() {
    const defaultStats = { gamesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0, distribution: {} };
    for (let i = 1; i <= CHALLENGE_MAX_GUESSES; i++) { defaultStats.distribution[i] = 0; }
    const loadedStats = JSON.parse(localStorage.getItem('saiyandleDailyStats')) || defaultStats;
    if (!loadedStats.distribution) loadedStats.distribution = defaultStats.distribution;
    stats = loadedStats;
}
function saveStats() {
    localStorage.setItem('saiyandleDailyStats', JSON.stringify(stats));
}
function updateStats(isWin, guessCount) {
    if (currentGameMode !== 'daily' || currentDifficulty !== 'challenge') return;
    stats.gamesPlayed++;
    if (isWin) {
        stats.wins++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.distribution[guessCount]++;
    } else {
        stats.currentStreak = 0;
    }
    saveStats();
}
function getUTCDateString(date) { return date.toISOString().split('T')[0]; }
function getCharacterForDate(date, difficulty) {
    const epoch = new Date(Date.UTC(2024, 0, 1));
    const todayUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    let diffDays = Math.floor((todayUTC - epoch) / (1000 * 60 * 60 * 24));
    if (difficulty === 'challenge') diffDays += 1000;
    return dbCharacters[diffDays % dbCharacters.length];
}
function loadDailyState() {
    const stateKey = `saiyandleDailyState_${currentDifficulty}`;
    const savedState = JSON.parse(localStorage.getItem(stateKey));
    const todayStr = getUTCDateString(new Date());
    if (savedState && savedState.date === todayStr) {
        return savedState;
    }
    return { date: todayStr, characterId: getCharacterForDate(new Date(), currentDifficulty).id, guesses: [], won: false, gameOver: false };
}
function saveDailyState(state) {
    const stateKey = `saiyandleDailyState_${currentDifficulty}`;
    localStorage.setItem(stateKey, JSON.stringify(state));
}

// --- UI & Display Functions ---
function showStatsModal() {
    displayStats();
    statsModalOverlay.classList.add('visible');
}
function hideStatsModal() {
    statsModalOverlay.classList.remove('visible');
}
function displayStats() {
    const statsPlayedEl = document.getElementById('stats-played');
    const statsWinPercentageEl = document.getElementById('stats-win-percentage');
    const statsCurrentStreakEl = document.getElementById('stats-current-streak');
    const statsMaxStreakEl = document.getElementById('stats-max-streak');
    const statsDistributionContainer = document.getElementById('stats-distribution-container');
    statsPlayedEl.textContent = stats.gamesPlayed;
    statsWinPercentageEl.textContent = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;
    statsCurrentStreakEl.textContent = stats.currentStreak;
    statsMaxStreakEl.textContent = stats.maxStreak;
    statsDistributionContainer.innerHTML = '';
    const distributionValues = Object.values(stats.distribution).filter(val => typeof val === 'number');
    const maxDistribution = distributionValues.length > 0 ? Math.max(...distributionValues) : 0;
    for (let i = 1; i <= CHALLENGE_MAX_GUESSES; i++) {
        const count = stats.distribution[i] || 0;
        const percentage = maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;
        const barContainer = document.createElement('div'); barContainer.className = 'distribution-bar-container';
        const label = document.createElement('div'); label.className = 'distribution-label'; label.textContent = i;
        const bar = document.createElement('div'); bar.className = 'distribution-bar'; bar.style.width = `${Math.max(percentage, 5)}%`; bar.textContent = count;
        const dailyState = loadDailyState();
        if (dailyState.gameOver && dailyState.won && i === dailyState.guesses.length) {
            bar.classList.add('highlight');
        }
        barContainer.append(label, bar);
        statsDistributionContainer.appendChild(barContainer);
    }
}
function showWinModal() {
    document.getElementById('win-char-image').src = secretCharacter.image_url;
    document.getElementById('win-char-name').textContent = secretCharacter.name[currentLanguage] || secretCharacter.name.es;
    document.getElementById('win-tries-text').textContent = uiStrings[currentLanguage].winTriesText.replace('{tries}', guessesMade);
    document.getElementById('win-title').textContent = uiStrings[currentLanguage].winTitle;
    document.getElementById('win-share-button').textContent = uiStrings[currentLanguage].shareButton;
    document.getElementById('win-close-button').textContent = uiStrings[currentLanguage].closeButton;

    const gridContainer = document.getElementById('win-grid-container');
    gridContainer.innerHTML = '';
    const guessRows = guessesTbody.querySelectorAll('tr');
    guessRows.forEach(row => {
        const gridRow = document.createElement('div');
        gridRow.className = 'win-grid-row';
        const thumb = row.querySelector('.feedback-image').cloneNode(true);
        thumb.className = 'win-grid-thumbnail';
        const squaresContainer = document.createElement('div');
        squaresContainer.className = 'win-grid-squares';
        const cells = row.querySelectorAll('td');
        for (let i = 2; i < cells.length; i++) {
            const square = document.createElement('div');
            square.className = 'win-grid-square';
            square.classList.add(cells[i].dataset.resultClass || 'incorrect-cell');
            squaresContainer.appendChild(square);
        }
        gridRow.append(thumb, squaresContainer);
        gridContainer.appendChild(gridRow);
    });

    winModalOverlay.classList.add('visible');
}
function hideWinModal() {
    winModalOverlay.classList.remove('visible');
}
function generateShareText() {
    const isChallenge = currentGameMode === 'daily' || currentDifficulty === 'challenge';
    const title = `Saiyandle ${currentGameMode === 'daily' ? `Daily #${getUTCDateString(new Date())}` : 'Infinite'}`;
    const dailyState = loadDailyState();
    const guessCountText = isChallenge ? (gameOver && !dailyState.won ? `X/${CHALLENGE_MAX_GUESSES}` : `${guessesMade}/${CHALLENGE_MAX_GUESSES}`) : `${guessesMade} guesses`;
    let grid = '';
    Array.from(guessesTbody.children).forEach(row => {
        let rowGrid = '';
        row.querySelectorAll('td').forEach((cell, index) => {
            if (index < 2) return;
            if (cell.dataset.resultClass === 'correct-cell') rowGrid += '🟩';
            else if (cell.dataset.resultClass === 'partial-cell') rowGrid += '🟧';
            else rowGrid += '🟥';
        });
        if(rowGrid) grid += rowGrid + '\n';
    });
    return `${title} (${currentDifficulty}) - ${guessCountText}\n\n${grid}\nhttps://your-game-url.com`;
}
async function handleShare() {
    const shareText = generateShareText();
    try {
        await navigator.clipboard.writeText(shareText);
        const originalText = shareButtonEl.textContent;
        shareButtonEl.textContent = uiStrings[currentLanguage].copied || "Copied!";
        setTimeout(() => { shareButtonEl.textContent = originalText; }, 2000);
    } catch (err) { console.error('Failed to copy: ', err); }
}
function showFinalMessage(messageKey, character, isWin) {
    messageArea.dataset.status = isWin ? 'win' : 'loss';
    messageArea.innerHTML = '';
    const finalImage = document.createElement('img');
    finalImage.src = character.image_url;
    finalImage.onerror = function() { this.src = 'https://placehold.co/100x100/cccccc/333333?text=?'; };
    finalImage.classList.add('final-char-image');
    messageArea.appendChild(finalImage);
    const textElement = document.createElement('span');
    textElement.textContent = uiStrings[currentLanguage][messageKey].replace('{characterName}', character.name[currentLanguage] || character.name.es);
    messageArea.appendChild(textElement);
    const bgKey = isWin ? 'green' : 'red';
    const bgClass = currentTheme === 'light-mode' ? `bg-${bgKey}-200` : `bg-${bgKey}-700`;
    const textClass = currentTheme === 'light-mode' ? `text-${bgKey}-800` : `text-${bgKey}-100`;
    messageArea.className = `text-center text-xl font-bold p-4 rounded-md ${bgClass} ${textClass} flex flex-col items-center pop-in`;
}
function appendGuessToTable(guessedChar, currentSecretChar) {
    const guessRow = document.createElement('tr');
    const headers = [ uiStrings[currentLanguage].thImage, uiStrings[currentLanguage].thCharacter, uiStrings[currentLanguage].thGender, uiStrings[currentLanguage].thHairColor, uiStrings[currentLanguage].thRace, uiStrings[currentLanguage].thOriginPlanet, uiStrings[currentLanguage].thSeries, uiStrings[currentLanguage].thDebutSaga, uiStrings[currentLanguage].thDebutYear, ];
    
    const createCell = (frontContent, backContent, resultClass = '', arrow = '') => {
        const cell = document.createElement('td');
        cell.setAttribute('data-label', headers[guessRow.children.length]);
        cell.dataset.resultClass = resultClass;
        const cellInner = document.createElement('div');
        cellInner.className = 'cell-inner';
        const cellFront = document.createElement('div');
        cellFront.className = 'cell-face cell-front';
        cellFront.append(frontContent);
        const cellBack = document.createElement('div');
        cellBack.className = `cell-face cell-back ${resultClass}`;
        const backContentNode = backContent.cloneNode(true);
        if (arrow) {
            const arrowSpan = document.createElement('span');
            arrowSpan.className = 'arrow-indicator';
            arrowSpan.innerHTML = arrow;
            backContentNode.appendChild(arrowSpan);
        }
        cellBack.append(backContentNode);
        cellInner.append(cellFront, cellBack);
        cell.appendChild(cellInner);
        return cell;
    };
    
    const imgElement = document.createElement('img');
    imgElement.src = guessedChar.image_url;
    imgElement.alt = guessedChar.name[currentLanguage] || guessedChar.name.es;
    imgElement.onerror = function() { this.src = 'https://placehold.co/100x100/cccccc/333333?text=?'; };
    imgElement.classList.add('feedback-image');
    guessRow.appendChild(createCell(imgElement.cloneNode(true), imgElement.cloneNode(true)));
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = guessedChar.name[currentLanguage] || guessedChar.name.es;
    guessRow.appendChild(createCell(nameSpan.cloneNode(true), nameSpan.cloneNode(true)));

    propertiesToCompare.forEach((propKey) => {
        const guessedValue = (propKey === 'debut_year') ? (guessedChar.debut_year || 'N/A') : (guessedChar[propKey]?.[currentLanguage] || 'N/A');
        let resultClass = 'incorrect-cell';
        let arrow = "";
        if (propKey === 'debut_saga') {
            const comparisonGuessed = guessedChar[propKey]?.es || 'N/A_es';
            const comparisonSecret = currentSecretChar[propKey]?.es || 'N/A_es';
            if (comparisonGuessed.toLowerCase() === comparisonSecret.toLowerCase()) {
                resultClass = 'correct-cell';
            } else {
                const guessedIndex = sagasOrder.indexOf(comparisonGuessed);
                const secretIndex = sagasOrder.indexOf(comparisonSecret);
                if (guessedIndex !== -1 && secretIndex !== -1) {
                    if (secretIndex > guessedIndex) arrow = '▼';
                    else arrow = '▲';
                }
            }
        } else if (propKey === 'debut_year') {
            const secretValue = currentSecretChar.debut_year || 'N/A';
            if (guessedValue !== 'N/A' && secretValue !== 'N/A') {
                if (guessedValue === secretValue) {
                    resultClass = 'correct-cell';
                } else if (Math.abs(guessedValue - secretValue) <= 5) {
                    resultClass = 'partial-cell';
                }
                if (secretValue > guessedValue) arrow = `▲`;
                else if (secretValue < guessedValue) arrow = `▼`;
            }
        } else {
            const comparisonGuessed = guessedChar[propKey]?.es || 'N/A_es';
            const comparisonSecret = currentSecretChar[propKey]?.es || 'N/A_es';
            if (comparisonGuessed.toLowerCase() === comparisonSecret.toLowerCase()) {
                resultClass = 'correct-cell';
            }
        }
        const contentSpan = document.createElement('span');
        contentSpan.textContent = guessedValue;
        guessRow.appendChild(createCell(contentSpan, contentSpan, resultClass, arrow));
    });

    guessesTbody.prepend(guessRow);
    const cellsToAnimate = guessRow.querySelectorAll('td');
    cellsToAnimate.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('is-flipping');
        }, index * 120);
    });
    guessRow.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
function populateFilteredOptions(filterText) {
    let filteredChars = [];
    if (filterText.length > 0) {
        filteredChars = dbCharacters.filter(char =>
            (char.name[currentLanguage] || char.name.es).toLowerCase().includes(filterText.toLowerCase())
        );
    } else if (document.activeElement === characterSearchInput) {
        filteredChars = [...dbCharacters];
    }
    filteredOptionsList.innerHTML = '';
    filteredChars.forEach(character => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('filtered-option', 'tooltip-container');
        const img = document.createElement('img');
        img.src = character.image_url;
        img.alt = character.name[currentLanguage] || character.name.es;
        img.className = 'filtered-option-image';
        img.onerror = function() { this.src = 'https://placehold.co/40x40/cccccc/333333?text=?'; };
        const nameSpan = document.createElement('span');
        nameSpan.className = 'filtered-option-name';
        const fullName = character.name[currentLanguage] || character.name.es;
        nameSpan.textContent = fullName;
        optionDiv.appendChild(img);
        optionDiv.appendChild(nameSpan);
        optionDiv.style.visibility = 'hidden';
        document.body.appendChild(optionDiv);
        if (nameSpan.scrollWidth > nameSpan.clientWidth) {
            const tooltipSpan = document.createElement('span');
            tooltipSpan.className = 'tooltip-text';
            tooltipSpan.textContent = fullName;
            optionDiv.appendChild(tooltipSpan);
        }
        document.body.removeChild(optionDiv);
        optionDiv.style.visibility = 'visible';
        optionDiv.addEventListener('click', () => selectCharacter(character));
        filteredOptionsList.appendChild(optionDiv);
    });
    filteredOptionsList.classList.toggle('hidden', filteredChars.length === 0);
}
function selectCharacter(character) {
    selectedCharacterForGuess = character;
    characterSearchInput.value = character.name[currentLanguage] || character.name.es;
    filteredOptionsList.classList.add('hidden');
    guessButtonEl.disabled = false;
}
function updateCountdown() {
    if (currentGameMode !== 'daily') {
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }
    const now = new Date();
    const tomorrowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diff = tomorrowUTC - now;
    if (diff <= 0) {
        dailyCountdownEl.textContent = "00:00:00";
        location.reload();
        return;
    }
    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    dailyCountdownEl.textContent = `${h}:${m}:${s}`;
}
function updateGuessesRemaining() {
    const isChallenge = (currentGameMode === 'daily' || currentDifficulty === 'challenge');
    if (isChallenge) {
        const remaining = CHALLENGE_MAX_GUESSES - guessesMade;
        guessesRemainingDisplay.textContent = remaining;
        guessesRemainingContainer.style.display = 'block';
    } else {
        guessesRemainingContainer.style.display = 'none';
    }
}

// --- Core Game Flow ---
function resetUIForNewGame() {
    gameOver = false;
    gameStarted = false;
    guessesMade = 0;
    selectedCharacterForGuess = null;
    guessesTbody.innerHTML = '';
    messageArea.innerHTML = '';
    postGameContainer.style.display = 'none';
    characterSearchInput.value = "";
    characterSearchInput.disabled = false;
    guessButtonEl.disabled = true;
    if (countdownInterval) clearInterval(countdownInterval);
    dailyCountdownContainer.style.display = 'none';
    guessesRemainingContainer.style.display = 'none';
}

function prepareGame(mode) {
    resetUIForNewGame();
    if (mode === 'daily') {
        difficultySelectorContainer.style.display = 'flex';
        dailyCountdownContainer.style.display = 'flex';
        const isChallenge = currentDifficulty === 'challenge';
        guessesRemainingContainer.style.display = isChallenge ? 'block' : 'none';

        const dailyState = loadDailyState();
        secretCharacter = dbCharacters.find(c => c.id === dailyState.characterId);
        guessesMade = dailyState.guesses.length;
        
        dailyState.guesses.forEach(guessId => {
            const guessedChar = dbCharacters.find(c => c.id === guessId);
            if (guessedChar) appendGuessToTable(guessedChar, secretCharacter);
        });

        if (isChallenge) updateGuessesRemaining();

        if (dailyState.gameOver) {
            endGame(dailyState.won, false);
        } else {
            gameStarted = true;
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }
    } else { // Infinite mode
        difficultySelectorContainer.style.display = 'flex';
        if(currentDifficulty === 'challenge') {
            guessesRemainingContainer.style.display = 'block';
            updateGuessesRemaining();
        }
        secretCharacter = dbCharacters[Math.floor(Math.random() * dbCharacters.length)];
    }
}

function handleGuess() {
    if (!selectedCharacterForGuess) {
        characterSearchInput.classList.add('is-invalid-shake');
        characterSearchInput.addEventListener('animationend', () => {
            characterSearchInput.classList.remove('is-invalid-shake');
        }, { once: true });
        return;
    }
    if (!gameStarted) gameStarted = true;
    messageArea.innerHTML = '';
    guessesMade++;

    if (currentGameMode === 'daily') {
        const dailyState = loadDailyState();
        dailyState.guesses.push(selectedCharacterForGuess.id);
        saveDailyState(dailyState);
    }
    if(currentGameMode === 'daily' || currentDifficulty === 'challenge') {
        updateGuessesRemaining();
    }
    
    appendGuessToTable(selectedCharacterForGuess, secretCharacter);
    characterSearchInput.blur();
    
    if (selectedCharacterForGuess.id === secretCharacter.id) {
        winGame();
    } else if ((currentGameMode === 'daily' || currentDifficulty === 'challenge') && guessesMade >= CHALLENGE_MAX_GUESSES) {
        loseGame();
    }
    
    characterSearchInput.value = "";
    selectedCharacterForGuess = null;
    guessButtonEl.disabled = true;
}

function winGame() {
    if (currentGameMode === 'daily') {
        const dailyState = loadDailyState();
        dailyState.won = true;
        dailyState.gameOver = true;
        saveDailyState(dailyState);
        // Only update official stats if it's a challenge
        if (currentDifficulty === 'challenge') {
            updateStats(true, guessesMade);
        }
    }
    endGame(true, true);
}

function loseGame() {
    if (currentGameMode === 'daily') {
        const dailyState = loadDailyState();
        dailyState.gameOver = true;
        saveDailyState(dailyState);
        if (currentDifficulty === 'challenge') {
            updateStats(false, guessesMade);
        }
    }
    endGame(false, true);
}

function endGame(isWin, showAnimation) {
    gameOver = true;
    gameStarted = false;
    characterSearchInput.disabled = true;
    guessButtonEl.disabled = true;
    
    const messageKey = isWin 
        ? (currentGameMode === 'daily' ? 'dailyChallengeCompleted' : 'winMessage') 
        : 'loseMessage';
    
    const displayLogic = () => {
        showFinalMessage(messageKey, secretCharacter, isWin);
        playAgainButtonEl.style.display = currentGameMode === 'infinite' ? 'flex' : 'none';
        postGameContainer.style.display = 'flex';
        
        if (isWin) {
            showWinModal();
        }
    };

    if (showAnimation) {
        setTimeout(displayLogic, 1200);
    } else {
        displayLogic();
    }
    
    if (currentGameMode === 'daily') {
        if(countdownInterval) clearInterval(countdownInterval);
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// --- Settings & UI Updates ---
function applyTheme(theme) {
    bodyEl.classList.remove('light-mode', 'dark-mode');
    bodyEl.classList.add(theme);
    currentTheme = theme;
    localStorage.setItem('saiyandleTheme', theme);
    updateThemeToggleUI();
}
function updateThemeToggleUI() {
    themeIconEl.textContent = currentTheme === 'dark-mode' ? '☀️' : '🌙';
    themeTooltipEl.textContent = uiStrings[currentLanguage][currentTheme === 'dark-mode' ? 'tooltipToLight' : 'tooltipToDark'];
}
function setGameMode(mode) {
    currentGameMode = mode;
    localStorage.setItem('saiyandleGameMode', mode);
    updateUIForLanguage();
    prepareGame(mode);
}
function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    localStorage.setItem('saiyandleDifficulty', difficulty);
    difficultyButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    prepareGame(currentGameMode);
}
function updateUIForLanguage() {
    const strings = uiStrings[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (strings[key]) el.innerHTML = strings[key];
    });
    document.title = strings.pageTitle;
    characterSearchInput.placeholder = strings.guessPlaceholder;
    currentModeTextEl.textContent = strings[currentGameMode === 'daily' ? 'modeDaily' : 'modeInfinite'];
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
    updateThemeToggleUI();
}

// --- Initialization ---
function initialize() {
    dbCharacters.forEach(char => {
        const baseLang = 'es';
        ['en', 'ca'].forEach(lang => {
            if (!char.name[lang]) char.name[lang] = char.name[baseLang];
            propertiesToCompare.forEach(propKey => {
                if (propKey !== 'debut_year' && char[propKey] && typeof char[propKey] === 'object' && !char[propKey][lang]) {
                    char[propKey][lang] = char[propKey][baseLang];
                }
            });
        });
    });

    loadStats();
    applyTheme(localStorage.getItem('saiyandleTheme') || 'dark-mode');
    
    currentLanguage = localStorage.getItem('saiyandleLanguage') || 'es';
    updateUIForLanguage();

    const savedDifficulty = localStorage.getItem('saiyandleDifficulty') || 'normal';
    setDifficulty(savedDifficulty);

    const savedMode = localStorage.getItem('saiyandleGameMode') || 'infinite';
    setGameMode(savedMode);

    // --- EVENT LISTENERS ---
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => {
            localStorage.setItem('saiyandleLanguage', button.dataset.lang);
            location.reload();
        });
    });
    themeToggleButton.addEventListener('click', () => applyTheme(currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'));
    gameModeDropdownButtons.forEach(button => {
        button.addEventListener('click', () => setGameMode(button.dataset.mode));
    });
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
    });
    statsButton.addEventListener('click', showStatsModal);
    statsCloseButton.addEventListener('click', hideStatsModal);
    statsModalOverlay.addEventListener('click', (e) => {
        if (e.target === statsModalOverlay) {
            hideStatsModal();
        }
    });
    winCloseButton.addEventListener('click', hideWinModal);
    winModalOverlay.addEventListener('click', (e) => {
        if (e.target === winModalOverlay) {
            hideWinModal();
        }
    });
    winShareButton.addEventListener('click', handleShare);
    
    characterSearchInput.addEventListener('focus', () => {
        if (!characterSearchInput.disabled) {
            populateFilteredOptions(characterSearchInput.value);
        }
    });
    characterSearchInput.addEventListener('input', () => {
        populateFilteredOptions(characterSearchInput.value);
        if (selectedCharacterForGuess) {
            const currentName = selectedCharacterForGuess.name[currentLanguage] || selectedCharacterForGuess.name.es;
            if (characterSearchInput.value.toLowerCase() !== currentName.toLowerCase()) {
                selectedCharacterForGuess = null;
                guessButtonEl.disabled = true;
            }
        }
    });
    document.addEventListener('click', (event) => {
        if (!characterSearchInput.contains(event.target) && !filteredOptionsList.contains(event.target)) {
            filteredOptionsList.classList.add('hidden');
        }
    });
    guessButtonEl.addEventListener('click', handleGuess);
    playAgainButtonEl.addEventListener('click', () => {
        if (currentGameMode === 'infinite') {
            prepareGame('infinite');
        }
    });
    shareButtonEl.addEventListener('click', handleShare);
}

document.addEventListener('DOMContentLoaded', initialize);