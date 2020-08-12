export {createGrid, clearGrid, highlightSelectedNode, clearPath, positionAnnotation, clearWeighted}

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
        x.classList.remove('weightedCell');
    });

    clearPath();
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

function clearPath() {
    Array.from(document.querySelectorAll('td')).map((x) => {
        x.classList.remove('highlightSearching');
        x.classList.remove('visitedCell');
        x.classList.remove('shortestPathNode');
    });
}

function clearWeighted() {
    Array.from(document.querySelectorAll('.weightedCell')).map((x) => {
        x.classList.remove('weightedCell');
    });
}

function positionAnnotation(event, algoSelectionVal) {
    if (event.target.classList.contains('startNode') || event.target.classList.contains('endNode')) {
        insertHTMLText('Drag me around!');
        annotationBubble.style.display = 'block';
        arrowdown.style.display = 'block';
        annotationBubble.style.left = event.target.getBoundingClientRect().left - Math.abs(annotationBubble.offsetWidth - event.target.offsetWidth)/2 + 'px';
        annotationBubble.style.top = event.target.getBoundingClientRect().top - Math.abs(annotationBubble.offsetHeight- event.target.offsetHeight)/2 - 32 + 'px';
        arrowdown.style.left = event.target.getBoundingClientRect().left - Math.abs(arrowdown.offsetWidth - event.target.offsetWidth)/2 + 'px';
        arrowdown.style.top = event.target.getBoundingClientRect().top - Math.abs(arrowdown.offsetHeight- event.target.offsetHeight)/2 - 8 + 'px';
    } else if (event.target.closest('#gridContainer')) {
        if (algoSelectionVal == 'breadthFirstSearch' || algoSelectionVal =='depthFirstSearch') {
            insertHTMLText('Draw on me by dragging on the cells!');
        } else {
            insertHTMLText('Draw on me by dragging on the cells \& double-click to add zero-resistance cells!');
        }
        
        annotationBubble.style.display = 'block';
        arrowdown.style.display = 'block';
        annotationBubble.style.left = gridContainer.getBoundingClientRect().left + Math.abs(annotationBubble.offsetWidth - gridContainer.offsetWidth)/2 + 'px';
        annotationBubble.style.top = gridContainer.getBoundingClientRect().top - 38 + 'px';
        arrowdown.style.left = gridContainer.getBoundingClientRect().left + Math.abs(arrowdown.offsetWidth - gridContainer.offsetWidth)/2 + 'px';
        arrowdown.style.top = gridContainer.getBoundingClientRect().top - 14 + 'px';
    } else if (event.target.id == "algoSelection") {
        let text;

        switch (algoSelectionVal) {
            case "breadthFirstSearch": 
                text = "Unweighted \& guarantees shortest path";
                break;
            case "depthFirstSearch":
                text = "Unweighted \& does not guarantee shortest path";
                break;
            case "dijkstras":
                text = "Weighted \& guarantees shortest path";
                break;
            case "aStar":
                text = "Weighted \& guarantees shortest path";
                break;
        }

        insertHTMLText(text);
        annotationBubble.style.display = 'block';
        arrowup.style.display = 'block';
        annotationBubble.style.left = event.target.getBoundingClientRect().left - Math.abs(annotationBubble.offsetWidth - event.target.offsetWidth)/2 + 'px';
        annotationBubble.style.top = event.target.getBoundingClientRect().top + 38 + 'px';
        arrowup.style.left = event.target.getBoundingClientRect().left + Math.abs(arrowup.offsetWidth - event.target.offsetWidth)/2 + 'px';
        arrowup.style.top = event.target.getBoundingClientRect().top + 33 + 'px';
    } else {
        arrowdown.style.display = 'none';
        arrowup.style.display = 'none';
        annotationBubble.style.display = 'none';
    }
}

function insertHTMLText(text) {
    annotationBubble.innerHTML = text
}