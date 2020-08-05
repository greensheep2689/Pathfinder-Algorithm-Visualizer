import {create2DArr} from '../mazegenerator.js'

import {locateStartNode, locateEndNode} from './algorithmhelper.js'

export {breadthFirstSearch}

/*function breadthFirstSearch() {
    let arr = create2DArr();

    let speed = 0;

    let startNodeInd = locateStartNode(arr);

    let endNodeInd = locateEndNode(arr);

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
            speed += 3;
            setTimeout(() => {
                arr[row][col].classList.remove('curNode');
                arr[row][col].classList.add('highlightSearching');
            }, speed);
            speed += 3;
        }

        queue.push(col + ',' + (row - 1));
        queue.push((col + 1) + ',' + row);
        queue.push(col + ',' + (row + 1));
        queue.push((col - 1) + ',' + row);
    }

    return speed;
}*/

function breadthFirstSearch() {
    let arr = create2DArr();

    let result = breadthFirstSearchUtil();

    let path = result[0];

    let speed = result[1];
    
    for (let i = 1; i < path.length - 1; i ++) {
        setTimeout(() => arr[path[i][0]][path[i][1]].classList.add('shortestPathNode'), speed);
        speed += 8;
    }

    return speed
}

function breadthFirstSearchUtil() {
    let queue = [];

    let matrix = create2DArr();

    let start = locateStartNode(matrix);
    
    let end = locateEndNode(matrix);

    let speed = 0;

    queue.push([start]); // store a path, not just a position

    while (queue.length > 0) {
        let path = queue.shift(); // get the path out of the queue
        let pos = path[path.length-1]; // ... and then the last position from it
        let direction = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1]
        ];

        for (let i = 0; i < direction.length; i++) {
            // Perform this check first:
            if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
                // return the path that led to the find
                
                return [path.concat([end]), speed]
            }
            //console.log(direction[i][0], direction[i][1])
            if (direction[i][0] < 0 || direction[i][0] >= matrix.length 
                || direction[i][1] < 0 || direction[i][1] >= matrix[0].length 
                || matrix[direction[i][0]][direction[i][1]].classList.contains('visitedCell') || matrix[direction[i][0]][direction[i][1]].classList.contains('startNode') || matrix[direction[i][0]][direction[i][1]].classList.contains('selectedCell')) { 
                continue;
            }

            highlightSearching(matrix[direction[i][0]][direction[i][1]], speed);

            speed += 2.5

            matrix[direction[i][0]][direction[i][1]].classList.add('visitedCell');
            // extend and push the path on the queue
            queue.push(path.concat([direction[i]])); 
        }
    }
}

function highlightSearching(cell, speed) {
    setTimeout(() => cell.classList.add('highlightSearching'), speed);
}