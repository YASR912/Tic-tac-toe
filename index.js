const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn');
const winMessage = document.querySelector('.win-message');

let currentPlayer = 'x'; // 'x' starts first
let gameBoard = ['', '', '', '', '', '', '', '', '']; // empty board
let isGameOver = false;

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) return 'tie'; // if no winner and the board is full

  return null;
}

function handleClick(index) {
  if (gameBoard[index] || isGameOver) return; // Cell already filled or game over

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer.toUpperCase(); // Display X or O in the cell
  cells[index].classList.add(currentPlayer); // Apply X or O class for styling

  const winner = checkWinner();

  if (winner) {
    if (winner === 'tie') {
      winMessage.textContent = "It's a draw🤝";
    } else {
      winMessage.textContent = `${winner.toUpperCase()} wins🤸‍♀️!`;
    }
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Switch player
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'x';
  winMessage.textContent = '';

  cells.forEach(cell => {
    cell.textContent = ''; // Clear the text content
    cell.classList.remove('x', 'o'); // Remove the classes for X and O
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

resetButton.addEventListener('click', resetGame);
