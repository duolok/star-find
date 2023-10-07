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
        console.log(data);
    })
    .catch((error) => {
        console.error("Error: ", error);
    });
}
