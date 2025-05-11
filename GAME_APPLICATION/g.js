const board = document.getElementById('board');
const turnDisplay = document.getElementById('player-turn');
const rollButton = document.getElementById('roll-dice');
const diceValue = document.getElementById('dice-value');

let playerPositions = [1, 1];
let currentPlayer = 0;

const snakes = {
  16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
  64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
  1: 38, 4: 14, 9: 31, 21: 42, 28: 84,
  36: 44, 51: 67, 71: 91, 80: 100
};

function createBoard() {
  board.innerHTML = '';
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `cell-${i}`;
    cell.textContent = i;
    board.appendChild(cell);
  }
}

function updatePlayerPieces() {
  document.querySelectorAll('.piece').forEach(p => p.remove());

  playerPositions.forEach((pos, idx) => {
    const cell = document.getElementById(`cell-${pos}`);
    if (cell) {
      const piece = document.createElement('div');
      piece.classList.add('piece', `player${idx + 1}`);
      cell.appendChild(piece);
    }
  });
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceValue.innerHTML = `You rolled a 🎲 <strong>${roll}</strong>!`;

  let newPosition = playerPositions[currentPlayer] + roll;

  if (newPosition > 100) newPosition = playerPositions[currentPlayer];

  setTimeout(() => {
    if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
    } else if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
    }

    playerPositions[currentPlayer] = newPosition;
    updatePlayerPieces();

    if (newPosition === 100) {
      alert(`Player ${currentPlayer + 1} wins! 🎉`);
      resetGame();
      return;
    }

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    turnDisplay.textContent = `Player ${currentPlayer + 1}'s Turn ${currentPlayer === 0 ? '🔴' : '🟡'}`;
  }, 500);
}

function resetGame() {
  playerPositions = [1, 1];
  currentPlayer = 0;
  updatePlayerPieces();
  turnDisplay.textContent = "Player 1's Turn 🔴";
  diceValue.textContent = '';
}

rollButton.addEventListener('click', rollDice);
createBoard();
updatePlayerPieces();
