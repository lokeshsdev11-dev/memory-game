const cardSymbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🍉', '🍑'];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const pairsDisplay = document.getElementById('pairs');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const winMessage = document.getElementById('win-message');
const finalMovesDisplay = document.getElementById('final-moves');

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createCard(symbol, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = '?';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = symbol;

    card.appendChild(cardBack);
    card.appendChild(cardFront);

    card.addEventListener('click', () => handleCardClick(card));

    return card;
}

function initGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;

    movesDisplay.textContent = moves;
    pairsDisplay.textContent = `0/${cardSymbols.length}`;
    winMessage.classList.add('hidden');

    const cardPairs = [...cardSymbols, ...cardSymbols];
    const shuffledCards = shuffleArray(cardPairs);

    shuffledCards.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(card) {
    if (!canFlip) return;
    if (card.classList.contains('flip')) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flip');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsDisplay.textContent = `${matchedPairs}/${cardSymbols.length}`;
        flippedCards = [];
        canFlip = true;

        if (matchedPairs === cardSymbols.length) {
            setTimeout(showWinMessage, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function showWinMessage() {
    finalMovesDisplay.textContent = moves;
    winMessage.classList.remove('hidden');
}

restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

initGame();
