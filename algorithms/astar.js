import {create2DArr} from '../mazegenerator.js'

import {locateStartNode, locateEndNode} from './algorithmhelper.js'

export {aStar}

function aStar(speed) {
    let arr = create2DArr();

    let result = aStarUtil(speed);
    
    let path = result[0];

    let speedTotal = result[1];
    
    if (path) {
        for (let i = 2; i < path.length - 1; i ++) {
            setTimeout(() => {
                arr[path[i][0]][path[i][1]].classList.add('shortestPathNode');
                arr[path[i][0]][path[i][1]].classList.remove('weightedCell');
            }, speedTotal);
            speedTotal += (+speed + 3);
        }
    }

    return speedTotal
}

function aStarUtil(speed) {
    let queue = [];

    let matrix = create2DArr();

    let start = locateStartNode(matrix);
    
    let end = locateEndNode(matrix);

    let speedTotal = 0;

    queue.push([0, [null, start], 0]);

    while (queue.length > 0) {
        queue.sort((a, b) => a[2] - b[2])
        queue.sort((a, b) => a[0] - b[0])
        let path = queue.shift()[1];
        let pos = path[path.length-1]; // ... and then the last position from it
        let direction = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1],
        ];

        for (let i = 0; i < direction.length; i++) {

            let weight = manhattanDist(start, direction[i]) + manhattanDist(end, direction[i]);

            // Perform this check first:
            if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
                // return the path that led to the find
                highlightCurNode(matrix[pos[0]][pos[1]], speedTotal);
            
                speedTotal += +speed;

                highlightSearching(matrix[pos[0]][pos[1]], speedTotal);

                speedTotal += +speed;

                return [path.concat([end]), speedTotal]
            }

            if (direction[i][0] < 0 || direction[i][0] >= matrix.length 
                || direction[i][1] < 0 || direction[i][1] >= matrix[0].length 
                || matrix[direction[i][0]][direction[i][1]].classList.contains('visitedCell') || matrix[direction[i][0]][direction[i][1]].classList.contains('startNode') || matrix[direction[i][0]][direction[i][1]].classList.contains('selectedCell')) { 
                continue;
            }

            if (matrix[direction[i][0]][direction[i][1]].classList.contains('weightedCell')) {
                weight = 1;
            }
            
            matrix[direction[i][0]][direction[i][1]].classList.add('visitedCell');
            
            queue.push([weight, path.concat([direction[i]]), manhattanDist(locateEndNode(matrix), direction[i])]); 
        }
        if (matrix[pos[0]][pos[1]].classList.contains('startNode')) continue;

        highlightCurNode(matrix[pos[0]][pos[1]], speedTotal);
            
        speedTotal += +speed;

        highlightSearching(matrix[pos[0]][pos[1]], speedTotal);

        speedTotal += +speed;
    }

    return [null, speedTotal]
}

function manhattanDist(nodeA, nodeB) {
    return Math.abs(nodeA[0] - nodeB[0]) + Math.abs(nodeA[1] - nodeB[1])
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