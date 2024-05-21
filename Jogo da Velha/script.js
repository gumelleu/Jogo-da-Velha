const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.innerHTML = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        status.innerHTML = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerHTML = `É a vez do jogador ${currentPlayer}`;
}

function makeMove(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cells[cellIndex].innerText = currentPlayer;
    handleResultValidation();
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.innerHTML = `É a vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', () => makeMove(cell.dataset.index)));
resetButton.addEventListener('click', resetGame);

