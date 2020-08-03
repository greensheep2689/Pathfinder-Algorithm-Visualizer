export {generateMaze, create2DArr}

function create2DArr() {
    let rows = Array.from(document.querySelectorAll('tr'));

    let result = [];

    for (let i = 0; i < rows.length; i++) {
        result.push([...rows[i].querySelectorAll('td')]);
    }

    return result
}

function generateMaze() {
    let arr = create2DArr();

    let visited = new Set();
    
    let speed = 0;

    Array.from(document.querySelectorAll('td')).map((x) => {
        x.classList.remove('unselectedCell');
        x.classList.add('selectedCell');
    })

    function createMaze(x, y) {
        let allDir = [['right', [1, 0]] , ['left', [-1, 0]], ['up', [0, 1]], ['down', [0, -1]]];
        
        allDir = shuffle(allDir);

        while (allDir.length > 0) {
            let directionToTry = allDir.pop();

            let dir = directionToTry[0];

            let nodeX = x + (directionToTry[1][0] * 2);
            let nodeY = y + (directionToTry[1][1] * 2);

            if (isSelected(nodeX, nodeY) && arr[nodeY][nodeX].classList.contains('selectedCell') && !visited.has(arr[nodeY][nodeX])) {
                carvePath(dir, nodeX, nodeY);
                visited.add(arr[nodeY][nodeX]);
                createMaze(nodeX, nodeY);
            }
        }
    }

    function isSelected(x, y) {
        if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
            return true;
        } else {
            return false;
        }
    }

    function carvePath(dir, nodeX, nodeY) {
        setTimeout(() => {
            switch (dir) {
                case "right":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX - 1].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY][nodeX - 1].classList.add('unselectedCell');
                    break;
                case "left":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX + 1].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY][nodeX + 1].classList.add('unselectedCell');
                    break;
                case "up":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY - 1][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY - 1][nodeX].classList.add('unselectedCell');
                    break;
                case "down":
                    arr[nodeY][nodeX].classList.remove('selectedCell');
                    arr[nodeY + 1][nodeX].classList.remove('selectedCell');
                    arr[nodeY][nodeX].classList.add('unselectedCell');
                    arr[nodeY + 1][nodeX].classList.add('unselectedCell');
                    break;
            }
        }, speed)
        speed += 2.5;
    }

    createMaze(1, 1);
}


function shuffle(array) {
    let m = array.length, t, i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}