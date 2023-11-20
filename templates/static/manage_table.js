
let maxBlueCells = 2;
let blueCells = 0;

function createGrid() {
  // initialize variables for cell coloring

  // get grid dimensions from inputs
  const gridWidth = Number(document.getElementById("grid-width").value);
  const gridHeight = Number(document.getElementById("grid-height").value);

  // get container element and clear the previous grid
  const container = document.getElementById("container");
  container.innerHTML = "";

  // set container width and height based on grid size
  container.style.width = `${gridWidth * 25}px`;
  container.style.height = `${gridHeight * 25}px`;

  // Create grid cells and attach event listeners
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = Math.floor(i / gridWidth);
    cell.dataset.col = i % gridWidth;

    cell.addEventListener("mousedown", handleMouseDown);
    cell.addEventListener("mouseenter", handleMouseEnter);
    cell.addEventListener("contextmenu", handleContextMenu);

    container.appendChild(cell);
  }

  // Functions for mouse event handling
  function handleMouseDown(event) {
    const cell = this;
    if (!cell.classList.contains("red")) {
      if (cell.classList.contains("blue")) {
        cell.classList.remove("blue");
        blueCells--;
      } else if (blueCells < maxBlueCells) {
        cell.classList.add("blue");
        blueCells++;
      }
    }
    event.preventDefault(); // prevents text selection when dragging
  }

  function handleMouseEnter(event) {
    const cell = this;
    if (event.buttons === 1) { // check if the left mouse button is pressed
      if (!cell.classList.contains("blue")) {
        cell.classList.add("red");
      } else if (cell.classList.contains("red")) {
        cell.classList.remove("red");
      }
    }
  }

  function handleContextMenu(event) {
    event.preventDefault();
    const cell = this;
    if (cell.classList.contains("blue")) {
      cell.classList.remove("blue");
      blueCells--;
    } else if (cell.classList.contains("red")) {
      cell.classList.remove("red");
    } else {
      cell.classList.add("red");
    }
  }
}

function clearGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('red', 'blue', 'path');
  });
  blueCells = 0; 
}
