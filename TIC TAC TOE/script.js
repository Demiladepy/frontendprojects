// Constants for the two classes representing the players
const X_CLASS = 'x';
const O_CLASS = 'o';

// All possible winning combinations for the game board
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Get references to all the board cells and game elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusText = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

// Variable to track whose turn it is
let oTurn;

// Initialize the game
startGame();

// Event listener to restart the game when the "Restart" button is clicked
restartButton.addEventListener('click', startGame);

// Function to start or restart the game
function startGame() {
  oTurn = false; // X always starts first
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true }); // Allow each cell to be clicked only once
  });
  setStatusText(`X's turn`); // Set initial status message
}

// Function to handle when a cell is clicked
function handleClick(e) {
  const cell = e.target; // Get the clicked cell
  const currentClass = oTurn ? O_CLASS : X_CLASS; // Set current class based on whose turn it is
  placeMark(cell, currentClass); // Place the mark (X or O) on the cell

  // Check if there is a win or draw after placing the mark
  if (checkWin(currentClass)) {
    setStatusText(`${currentClass.toUpperCase()} Wins!`); // Display winner message
    endGame(); // Disable further clicks
  } else if (isDraw()) {
    setStatusText("Draw!"); // Display draw message
    endGame(); // Disable further clicks
  } else {
    swapTurns(); // Switch turns
    setStatusText(`${oTurn ? "O" : "X"}'s turn`); // Update status message
  }
}

// Function to place a mark (X or O) on a cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass); // Add the respective class (X or O) to the cell
}

// Function to switch between players
function swapTurns() {
  oTurn = !oTurn; // Switch the turn (true = O's turn, false = X's turn)
}

// Function to set the status message (e.g., "X's turn", "O wins", etc.)
function setStatusText(message) {
  statusText.textContent = message; // Update the status text
}

// Function to check if the current player has won
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// Function to check if the game is a draw (all cells filled, no winner)
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

// Function to end the game by disabling further clicks on cells
function endGame() {
  cellElements.forEach(cell => cell.removeEventListener('click', handleClick));
}
