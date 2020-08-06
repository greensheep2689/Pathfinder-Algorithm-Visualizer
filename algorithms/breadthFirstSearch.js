import {create2DArr} from '../mazegenerator.js'

import {locateStartNode, locateEndNode} from './algorithmhelper.js'

export {breadthFirstSearch}

function breadthFirstSearch(speed) {
    let arr = create2DArr();

    let result = breadthFirstSearchUtil(speed);
    
    let path = result[0];

    let speedTotal = result[1];
    
    if (path) {
        for (let i = 1; i < path.length - 1; i ++) {
            setTimeout(() => arr[path[i][0]][path[i][1]].classList.add('shortestPathNode'), speedTotal);
            speedTotal += (+speed + 3);
        }
    }

    return speedTotal
}

function breadthFirstSearchUtil(speed) {
    let queue = [];

    let matrix = create2DArr();

    let start = locateStartNode(matrix);
    
    let end = locateEndNode(matrix);

    let speedTotal = 0;

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
                
                return [path.concat([end]), speedTotal]
            }
            //console.log(direction[i][0], direction[i][1])
            if (direction[i][0] < 0 || direction[i][0] >= matrix.length 
                || direction[i][1] < 0 || direction[i][1] >= matrix[0].length 
                || matrix[direction[i][0]][direction[i][1]].classList.contains('visitedCell') || matrix[direction[i][0]][direction[i][1]].classList.contains('startNode') || matrix[direction[i][0]][direction[i][1]].classList.contains('selectedCell')) { 
                continue;
            }

            highlightCurNode(matrix[direction[i][0]][direction[i][1]], speedTotal);
            
            speedTotal += +speed;

            highlightSearching(matrix[direction[i][0]][direction[i][1]], speedTotal);

            speedTotal += +speed;
            
            matrix[direction[i][0]][direction[i][1]].classList.add('visitedCell');
            // extend and push the path on the queue
            queue.push(path.concat([direction[i]])); 
        }
    }

    return [null, speedTotal]
}

function highlightSearching(cell, speed) {
    setTimeout(() => {
        cell.classList.add('highlightSearching');
        cell.classList.remove('curNode');
    }, speed);
}

function highlightCurNode(cell, speed) {
    setTimeout(() => cell.classList.add('curNode')
    , speed);
}