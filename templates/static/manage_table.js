function createGrid() {
  // Initialize variables for cell coloring
  let maxBlueCells = 2;
  let blueCells = 0;
  // Get grid dimensions from inputs
  const gridWidth = Number(document.getElementById("grid-width").value);
  const gridHeight = Number(document.getElementById("grid-height").value);

  // Get container element and clear the previous grid
  const container = document.getElementById("container");
  container.innerHTML = "";

  // Set container width and height based on grid size
  container.style.width = `${gridWidth * 25}px`;
  container.style.height = `${gridHeight * 25}px`;

  // Set a variable for mouse press
  var isMouseDown = false;

  // Create grid cells and attach event listeners
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = Math.floor(i / gridWidth);
    cell.dataset.col = i % gridWidth;

    cell.addEventListener("mousedown", handleMouseDown);
    cell.addEventListener("mouseenter", handleMouseEnter);
    cell.addEventListener("mouseup", handleMouseUp);
    cell.addEventListener("contextmenu", handleContextMenu);

    container.appendChild(cell);
  }

  // Functions for mouse event handling
  function handleMouseDown() {
    isMouseDown = true;
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
  }

  function handleMouseEnter() {
    if (isMouseDown) {
      const cell = this;
      if (!cell.classList.contains("blue")) {
        cell.classList.add("red");
      }
    }
  }

  function handleMouseUp() {
    isMouseDown = false;
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
