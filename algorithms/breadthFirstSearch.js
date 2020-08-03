import {create2DArr} from '../mazegenerator.js'

export {breadthFirstSearch}

function breadthFirstSearch() {
    let arr = create2DArr();

    let speed = 0;

    let startNodeInd = locateStartNode(arr);

    let startNodeX = startNodeInd[0];

    let startNodeY = startNodeInd[1];

    let visited = new Set();

    let queue = [];
    
    queue.push(startNodeX + ',' + startNodeY);
    
    while (queue.length > 0) {

        let elem = queue.shift();
        let row = +elem.split(',')[1];
        let col = +elem.split(',')[0];
        
        if (row < 0 || col < 0 || row >= arr.length || col >= arr[0].length || visited.has(elem) || (arr[row][col].classList.contains('selectedCell') && !arr[row][col].classList.contains('startNode') && !arr[row][col].classList.contains('endNode'))) continue;

        visited.add(elem);

        if (arr[row][col].classList.contains('endNode')) break;

        if (!arr[row][col].classList.contains('startNode')) {
            setTimeout(() => {
                arr[row][col].classList.add('curNode');
            }, speed);
            speed += 5;
            setTimeout(() => {
                arr[row][col].classList.remove('curNode');
                arr[row][col].classList.add('highlightSearching');
            }, speed);
            speed += 5;
        }

        queue.push(col + ',' + (row - 1));
        queue.push((col + 1) + ',' + row);
        queue.push(col + ',' + (row + 1));
        queue.push((col - 1) + ',' + row);
    }
}

function locateStartNode(arr) {
    let startNodeX;

    let startNodeY;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j].classList.contains('startNode')) {
                startNodeX = j;
                startNodeY = i;
            }
        }
    }

    return [startNodeX, startNodeY]
}