const table = document.querySelectorAll('.square');
const history = [];
const historyList = document.getElementById('history');
let moveNumber = 0;
let currentPlayer = 'cross';
let currentPlayerDisplay = document.getElementById('current-player');


table.forEach((square, i) => {
  square.addEventListener('click', () => {
    // Se a casa estiver vazia, adiciona a jogada
      if (table[i].innerHTML === '') {
        addMove(i)
        addHistory(i);
        verifyVictory()
        alterPlayer();
      }
  });
});

// Adiciona a jogada na tabela
async function addMove(index) {
  const move = document.createElement('div');
  move.classList.add(currentPlayer);
  table[index].appendChild(move);
  moveNumber++;
}

// Alterna o jogador atual
function alterPlayer() {
  currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
  currentPlayerDisplay.innerHTML = currentPlayer === 'cross' ? 'X' : 'O';
  currentPlayerDisplay.style.color = currentPlayer === 'cross' ? '#0000ff' : '#ff0000';
}

// Verifica se houve vitória
async function verifyVictory(){
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let victoryFound = false;

  // Itera sobre os combos vencedores e verifica se algum foi completado
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;

    //Se o combo foi completado, pinta os quadrados e exibe o alerta de vitória
    if (table[a].innerHTML && table[a].innerHTML === table[b].innerHTML && table[a].innerHTML === table[c].innerHTML) {
      table[a].style.backgroundColor = '#4a6d42';
      table[b].style.backgroundColor = '#4a6d42';
      table[c].style.backgroundColor = '#4a6d42';
      let winningPlayer = currentPlayer;
      setTimeout(() => {
        alert(`Player ${winningPlayer} wins!`);
        resetGame();
      }, 100);
      victoryFound = true;
    }
  });

  // Se não houve vencedor e o jogo está no 9º movimento, apaga a jogada mais antiga
  if (!victoryFound && moveNumber >= 7) {
    console.log('moveNumber', moveNumber);
    table[history[moveNumber - 7].position].innerHTML = '';
  }
}

// Adiciona a jogada no histórico
function addHistory(position) {
  history.push({ moveNumber: moveNumber, player: currentPlayer, position: position });
  const historyItem = document.createElement('li');
  historyItem.innerHTML = `Move ${moveNumber}: ${currentPlayer === 'cross' ? 'X' : 'O'} at position ${position}`;
  historyList.appendChild(historyItem);
}

// Reinicia o jogo
function resetGame() {
  table.forEach(square => {
    square.innerHTML = '';
    square.style.backgroundColor = '';
  });
  history.length = 0;
  moveNumber = 0;
  currentPlayer = 'cross';
  currentPlayerDisplay.innerHTML = 'X';
  currentPlayerDisplay.style.color = '#0000ff';
  historyList.innerHTML = '';
}