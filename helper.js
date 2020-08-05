export {createGrid, clearGrid, highlightSelectedNode, clearPath}

function createGrid() {
    for (let i = 0; i < 31; i++) {
        let row = document.createElement('tr');
        for (let i = 0; i < 67; i++) {
            let cell = document.createElement('td');
            cell.classList.add('unselectedCell')
            row.append(cell);
        }
    
        grid.append(row);
    }
}

function clearGrid() {
    let allCells = Array.from(document.querySelectorAll('td'));

    allCells.map(function(x) {
        x.classList.add('unselectedCell');
        x.classList.remove('selectedCell');
    });

    clearPath();
}

function highlightSelectedNode(event) {
    if (event.target.nodeName.toLowerCase() !== 'td' || event.target.classList.contains('startNode') || event.target.classList.contains('endNode')) return;
    
    if (event.target.classList.contains('selectedCell')) {
        event.target.classList.remove('selectedCell');
        event.target.classList.add('unselectedCell');
    } else {
        event.target.classList.remove('unselectedCell');
        event.target.classList.add('selectedCell');
    }
}

function clearPath() {
    Array.from(document.querySelectorAll('td')).map((x) => {
        x.classList.remove('highlightSearching');
        x.classList.remove('visitedCell');
        x.classList.remove('shortestPathNode');
    });
}