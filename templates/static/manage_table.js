const board = document.getElementById('board');
const width = 10;
const height = 10;
const maxBlueCells = 2;
let blueCells = 0;
let isMouseDown = false;

for (let i = 0; i < width * height; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('mousedown', () => {
    isMouseDown = true;
    if (!cell.classList.contains('red')) {
      if (cell.classList.contains('blue')) {
        cell.classList.remove('blue');
        blueCells--;
      } else if (blueCells < maxBlueCells) {
        cell.classList.add('blue');
        blueCells++;
      }
    }
  });

  cell.addEventListener('mouseenter', () => {
    if (isMouseDown) {
      if (!cell.classList.contains('blue') && !cell.classList.contains('red')) {
        cell.classList.add('red');
      } else if (cell.classList.contains('red')) {
        cell.classList.remove('red');
      }
    }
  });

  cell.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  cell.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (!cell.classList.contains('blue')) {
      if (cell.classList.contains('red')) {
        cell.classList.remove('red');
      } else {
        cell.classList.add('red');
      }
    }
  });

  board.appendChild(cell);
}
