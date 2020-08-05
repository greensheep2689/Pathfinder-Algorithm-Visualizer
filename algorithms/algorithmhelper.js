export {locateStartNode, locateEndNode}

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

    return [startNodeY, startNodeX]
}

function locateEndNode(arr) {
    let startNodeX;

    let startNodeY;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j].classList.contains('endNode')) {
                startNodeX = j;
                startNodeY = i;
            }
        }
    }

    return [startNodeY, startNodeX]
}