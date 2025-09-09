// Get references to DOM elements
const statusDisplay = document.getElementById('status-display');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const cells = document.querySelectorAll('.cell');

// Game state variables
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
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

// --- Functions ---

// Function to handle a cell being clicked
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if the cell is already played or if the game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Update game state and UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    // Check for a win or draw
    handleResultValidation();
};

// Function to check the result after each move
const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Skip if any cell in the condition is empty
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won! 🎉`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes("")) {
        statusDisplay.textContent = `Game ended in a draw! 🤝`;
        gameActive = false;
        return;
    }

    // If no win or draw, switch the player
    handlePlayerChange();
};

// Function to switch the current player
const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
};

// Function to reset the game
const handleResetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

// --- Event Listeners ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);