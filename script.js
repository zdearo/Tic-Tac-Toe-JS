const table = document.querySelectorAll('.square');
const history = [];
const historyList = document.getElementById('history');
let moveNumber = 0;
let currentPlayer = 'cross';
let currentPlayerDisplay = document.getElementById('current-player');

table.forEach((square, i) => {
  square.addEventListener('click', () => {
    if (table[i].innerHTML === '') {
      addMove(i);
      addHistory(i);
      verifyVictory();
      alterPlayer();
    }
  });
});

// Adiona um movimento na tabela e incrementa o número de movimentos
function addMove(index) {
  const move = document.createElement('div');
  move.classList.add(currentPlayer);
  table[index].appendChild(move);
  moveNumber++;
}

// Alterna o jogador atual entre 'cross' e 'circle' e atualiza o display
function alterPlayer() {
  currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
  currentPlayerDisplay.innerHTML = currentPlayer === 'cross' ? 'X' : 'O';
  currentPlayerDisplay.style.color = currentPlayer === 'cross' ? '#0000ff' : '#ff0000';
}

// Verifica se houve vitória de um dos jogadores e exibe um alerta com o vencedor, 
// caso não haja vitória, remove o último movimento após 7 movimentos
function verifyVictory() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let victoryFound = false;

  winningCombos.forEach(combo => {
    const [a, b, c] = combo;

    if (table[a].innerHTML && table[a].innerHTML === table[b].innerHTML && table[a].innerHTML === table[c].innerHTML) {
      [a, b, c].forEach(i => table[i].style.backgroundColor = '#4a6d42');
      let winningPlayer = currentPlayer;
      setTimeout(() => {
        alert(`Player ${winningPlayer} wins!`);
        resetGame();
      }, 100);
      victoryFound = true;
    }
  });

  if (!victoryFound && moveNumber >= 7) {
    table[history[moveNumber - 7].position].innerHTML = '';
  }
}

// Adiciona um item ao histórico de jogadas e exibe na tela o movimento realizado
function addHistory(position) {
  history.push({ moveNumber, player: currentPlayer, position });
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
