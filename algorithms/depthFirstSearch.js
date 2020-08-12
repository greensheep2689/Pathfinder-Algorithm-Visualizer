import {create2DArr} from '../mazegenerator.js'

import {locateStartNode, locateEndNode} from './algorithmhelper.js'

export {depthFirstSearch}

function depthFirstSearch(speed) {
    let arr = create2DArr();

    let result = depthFirstSearchUtil(speed);
    
    let path = result[0];

    let speedTotal = result[1];
    
    if (path) {
        for (let i = 1; i < path.length - 2; i ++) {
            setTimeout(() => arr[path[i][0]][path[i][1]].classList.add('shortestPathNode'), speedTotal);
            speedTotal += (+speed + 3);
        }
    }
    return speedTotal
}

function depthFirstSearchUtil(speed) {
    let stack = [];

    let matrix = create2DArr();

    let start = locateStartNode(matrix);
    
    let end = locateEndNode(matrix);

    let speedTotal = 0;

    stack.push([start]); // store a path, not just a position

    while (stack.length > 0) {
        let path = stack.pop(); // get the path out of the stack
        let pos = path[path.length-1]; // ... and then the last position from it
        let direction = [
            [pos[0], pos[1] - 1],
            [pos[0], pos[1] + 1],
            [pos[0] + 1, pos[1]],
            [pos[0] - 1, pos[1]],
        ];

        if (pos[0] == end[0] && pos[1] == end[1]) {
            // return the path that led to the find
            
            return [path.concat([end]), speedTotal]
        }

        if (pos[0] < 0 || pos[0] >= matrix.length 
            || pos[1] < 0 || pos[1] >= matrix[0].length 
            || matrix[pos[0]][pos[1]].classList.contains('visitedCell') || matrix[pos[0]][pos[1]].classList.contains('selectedCell')) { 
            continue;
        }

        matrix[pos[0]][pos[1]].classList.add('visitedCell');

        highlightCurNode(matrix[pos[0]][pos[1]], speedTotal);

        speedTotal += +speed;

        highlightSearching(matrix[pos[0]][pos[1]], speedTotal);

        speedTotal += +speed;

        for (let i = 0; i < direction.length; i++) {
            // Perform this check first:
            // extend and push the path on the stack
            stack.push(path.concat([direction[i]])); 
        }
    }

    return [null, speedTotal]
}

function highlightSearching(cell, speed) {
    if (cell.classList.contains('startNode') || cell.classList.contains('endNode')) return;
    setTimeout(() => {
        cell.classList.add('highlightSearching');
        cell.classList.remove('curNode');
    }, speed);
}

function highlightCurNode(cell, speed) {
    if (cell.classList.contains('startNode') || cell.classList.contains('endNode')) return;
    setTimeout(() => cell.classList.add('curNode')
    , speed);
}