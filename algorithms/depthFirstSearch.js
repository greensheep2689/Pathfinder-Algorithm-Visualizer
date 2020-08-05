import {create2DArr} from '../mazegenerator.js'

import {locateStartNode} from './algorithmhelper.js'

export {depthFirstSearch}

function depthFirstSearch() {
    let arr = create2DArr();

    let speed = 0;

    let startNodeInd = locateStartNode(arr);

    let startNodeX = startNodeInd[0];

    let startNodeY = startNodeInd[1];

    let visited = new Set();

    let stack = [];
    
    stack.push(startNodeX + ',' + startNodeY);
    
    while (stack.length > 0) {

        let elem = stack.pop();
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

        stack.push((col - 1) + ',' + row);
        stack.push(col + ',' + (row + 1));
        stack.push((col + 1) + ',' + row);
        stack.push(col + ',' + (row - 1));
        
    }

    return speed;
}
