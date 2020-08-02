export {createGrid, clearGrid, highlightSelectedNode, create2DArr, highlightBorder, generateMaze}

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

function create2DArr() {
    let rows = Array.from(document.querySelectorAll('tr'));

    let result = [];

    for (let i = 0; i < rows.length; i++) {
        result.push([...rows[i].querySelectorAll('td')]);
    }

    return result
}

function highlightBorder() {
    let arr = create2DArr();

    let rowLength = arr[0].length;

    let columnLength = arr.length;

    let speed = 0;

    // go left

    for (let i = 0; i < rowLength; i++) {
        setTimeout(function() {
            arr[0][i].classList.remove('unselectedCell');
            arr[0][i].classList.add('selectedCell');
        }, speed);

        speed += 3;
    }

    // go down

    for (let i = 0; i < columnLength; i++) {
        setTimeout(function() {
            arr[i][rowLength - 1].classList.remove('unselectedCell');
            arr[i][rowLength - 1].classList.add('selectedCell');
        }, speed);

        speed += 3;
    }

    // go right

    for (let i = rowLength - 1; i >= 0; i--) {
        setTimeout(function() {
            arr[columnLength - 1][i].classList.remove('unselectedCell');
            arr[columnLength - 1][i].classList.add('selectedCell');
        }, speed);

        speed += 3;
    }

    // go up

    for (let i = columnLength - 1 ; i >= 0 ; i--) {
        setTimeout(function() {
            arr[i][0].classList.remove('unselectedCell');
            arr[i][0].classList.add('selectedCell');
        }, speed);

        speed += 3;
    }

    return speed
}

function generateMaze() {
    let arr = create2DArr();

    let visited = new Set();

    let speed = 0;

    speed = highlightBorder();
    console.log(arr);
    function depthFirstSearch(arr, row, col, visited) {
        let rowLength = arr[0].length;

        let columnLength = arr.length;

        let rowcolStr = row + '+' + col

        if (row < 0 || col < 0 || row >= rowLength || col >= columnLength || visited.has(rowcolStr)) return;
        
        setTimeout(() => {
            arr[col][row].classList.add('selectedCell');
            arr[col][row].classList.remove('unselectedCell');
        }, speed);

        speed += 3;
        
        visited.add(rowcolStr);
        depthFirstSearch(arr, row, col + 1, visited);
        depthFirstSearch(arr, row, col - 1, visited);
        depthFirstSearch(arr, row + 1, col, visited);
        depthFirstSearch(arr, row - 1, col, visited);
    }
    depthFirstSearch(arr, 0, 0, visited);
}