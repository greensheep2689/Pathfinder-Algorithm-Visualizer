import {createGrid, clearGrid, highlightSelectedNode} from './helper.js'

import {generateMaze} from './mazegenerator.js'

import {breadthFirstSearch} from './algorithms/breadthFirstSearch.js'

let startNode;

let endNode;

let algoSelectionVal = algoSelection.value;

let functionObj = {
    'breadthFirstSearch': breadthFirstSearch,
    /*'aStar': aStar,
    'dijkstras': dijkstras,
    'depthFirstSearch': depthFirstSearch*/
}

gridContainer.addEventListener('drag', function(event) {
    event.preventDefault();
})

gridContainer.addEventListener('dragstart', function(event) {
    event.preventDefault();
})

gridContainer.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('startNode')) {
        gridContainer.addEventListener('mouseover', moveStartNode);
    } else if (event.target.classList.contains('endNode')) {
        gridContainer.addEventListener('mouseover', moveEndNode);
    } else {
        highlightSelectedNode(event);
        gridContainer.addEventListener('mouseover', highlightSelectedNode);
    }
})

gridContainer.addEventListener('mouseup', function() {
    gridContainer.removeEventListener('mouseover', moveStartNode);
    gridContainer.removeEventListener('mouseover', moveEndNode);
    gridContainer.removeEventListener('mouseover', highlightSelectedNode);
})

cleargridbtn.addEventListener('click', function() {
    clearGrid();
})

generatemazebtn.addEventListener('click', function() {
    clearGrid();
    generateMaze();
})

algoSelection.addEventListener('change', function() {
    algoSelectionVal = algoSelection.value;
})

runbtn.addEventListener('click', function() {
    functionObj[algoSelectionVal]();
})

function addStartAndEndNodes() {
    let rows = Array.from(document.querySelectorAll('tr'));

    let middleRow = rows[(rows.length - 1) / 2];
    
    let middleRowCells = Array.from(middleRow.querySelectorAll('td'));

    startNode = middleRowCells[Math.floor(middleRowCells.length * 0.25)];

    startNode.classList.add('startNode');

    endNode = middleRowCells[Math.floor(middleRowCells.length * 0.75)];

    endNode.classList.add('endNode');
}

function moveStartNode(event) {
    startNode.classList.remove('startNode');
    event.target.classList.add('unselectedCell');
    event.target.classList.add('startNode');
    startNode = event.target
}

function moveEndNode(event) {
    endNode.classList.remove('endNode');
    event.target.classList.add('unselectedCell');
    event.target.classList.add('endNode');
    endNode = event.target
}

createGrid();

addStartAndEndNodes();

