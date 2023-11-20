function exportGrid() {
    const gridData = [];
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        const isBlue = cell.classList.contains("blue");
        const isRed = cell.classList.contains("red");
        gridData.push({ row, col, isBlue, isRed });
    });

    const jsonData = JSON.stringify(gridData);

    fetch("/", {
        method: "POST",
        body: jsonData,
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then((response) => response.json())
    .then((data) => {
        animateSearch(data.path);
    })
    .catch((error) => {
        console.error("Error: ", error);
    });
}
function animateSearch(path) {
    const cells = document.querySelectorAll(".cell");
    const delay = 20; // milliseconds

    function colorCell(row, col, color) {
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(color);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function animate() {
        for (const node of path) {
            const [row, col] = node;

            // Skip animating blue squares
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (cell.classList.contains("blue")) {
                continue;
            }

            // Highlight the current node being checked
            colorCell(row, col, "checking");
            await sleep(delay);

            // Remove the highlight and color the cell in the path
            cell.classList.remove("checking");
            colorCell(row, col, "path");

            await sleep(delay);
        }
    }

    animate();
}

