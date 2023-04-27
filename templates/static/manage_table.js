/*
function createGrid() {
  // Get grid width and height from inputs
  var gridWidth = document.getElementById("grid-width").value;
  var gridHeight = document.getElementById("grid-height").value;
  var isMouseDown = false;
  let blueCells = 0;
  const maxBlueCells = 2;

  // Get container element
  var container = document.getElementById("container");

  // Clear previous grid, if any
  container.innerHTML = "";

  // Create grid cells
  for (var i = 0; i < gridWidth * gridHeight; i++) {
    var cell = document.createElement("div");
    cell.classList.add("cell");

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
      container.appendChild(cell);
  }

  // Set container width and height based on grid size
  container.style.width = gridWidth * 50 + "px";
  container.style.height = gridHeight * 50 + "px";
}
*/
function createGrid() {
  // Get grid width and height from inputs
  var gridWidth = document.getElementById("grid-width").value;
  var gridHeight = document.getElementById("grid-height").value;

  // Get container element
  var container = document.getElementById("container");

  // Clear previous grid, if any
  container.innerHTML = "";

  // Create grid cells
  for (var i = 0; i < gridWidth * gridHeight; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-row", Math.floor(i / gridWidth));
    cell.setAttribute("data-col", i % gridWidth);


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
    container.appendChild(cell);
  }

  // Set container width and height based on grid size
  container.style.width = gridWidth * 50 + "px";
  container.style.height = gridHeight * 50 + "px";

  // Initialize variables for mouse tracking and cell coloring
  var isMouseDown = false;
  var maxBlueCells = 2;
  var blueCells = 0;
}
