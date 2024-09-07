var board = [];
var rows = 10;
var columns = 10;

var minesCount = 10;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;
var flagsUsed = 0;
var bombClicked = false;

var gameOver = false;

window.onload = function(){
    startGame();
    updateButton();
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + '-' + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    // Reset variables
    board = [];
    tilesClicked = 0;
    gameOver = false;
    flagEnabled = false;
    minesLocation = [];
    flagsUsed = 0;
    bombClicked = false;
    document.getElementById('mines-count').innerText = minesCount; // Reset mine count display
    document.getElementById('board').innerHTML = "";  // Clear the previous game board

    setMines(); // Reset mines
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.addEventListener('click', clickTile);
            document.getElementById('board').append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById('flag-button').style.backgroundColor = 'var(--tile-color-1)';  // Disabled color
    } else {
        flagEnabled = true;
        document.getElementById('flag-button').style.backgroundColor = 'var(--tile-color-2)';  // Enabled color
    }
    console.log('Flag state: ', flagEnabled);
}

function clickTile() {
    let tile = this;

    // Check if the game is over, the tile is already clicked, or if it has a flag
    if (gameOver || tile.classList.contains('tile-clicked')) {
        return;
    }

    if (flagEnabled) {
        // Place or remove a flag
        if (tile.innerText === '') {
            if (flagsUsed < minesCount) {  // Check if the number of flags is within the limit
                console.log('tile clicked')
                tile.innerText = '🚩';  // Place a flag
                flagsUsed += 1;  // Increase the flag count
                updateFlagCounter();  // Update the flag counter display
            }
        } else if (tile.innerText === '🚩') {
            console.log('tile clicked')
            tile.innerText = '';  // Remove the flag
            flagsUsed -= 1;  // Decrease the flag count
            updateFlagCounter();  // Update the flag counter display
        }
        return;
    }

    if (tile.innerText != '🚩'){
        // Handle tile click for game logic
        if (minesLocation.includes(tile.id)) {
            bombClicked = true;
            endGame();  // Call endGame if a mine is clicked
            return;
        } 
    }
    

    // Process tile click for non-mine tiles
    let coords = tile.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMines() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                if (bombClicked){
                    // Tile is not flagged
                    tile.innerText = '💣';  // Show bomb icon
                    tile.style.backgroundColor = 'red';  // Set background to red   
                } else {
                    // Tile is flagged
                    tile.style.backgroundColor = 'green';  // Set background to green
                }
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains('tile-clicked') || board[r][c].innerText === '🚩') {
        return;  // Skip if tile is already clicked or flagged
    }

    board[r][c].classList.add('tile-clicked');
    tilesClicked += 1;

    let minesFound = 0;

    minesFound += checkTile(r - 1, c - 1);
    minesFound += checkTile(r - 1, c);
    minesFound += checkTile(r - 1, c + 1);

    minesFound += checkTile(r, c - 1);
    minesFound += checkTile(r, c + 1);

    minesFound += checkTile(r + 1, c - 1);
    minesFound += checkTile(r + 1, c);
    minesFound += checkTile(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add('x' + minesFound.toString());
    }
    else {
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);

        checkMine(r, c - 1);
        checkMine(r, c + 1);

        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }

    if (tilesClicked == rows * columns - minesCount){
        endGame();
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + '-' + c.toString())) {
        return 1;
    }
    return 0;
}

function updateButton() {
    if (gameOver) {
        console.log('game is over')
        document.getElementById('flag-button').textContent = 'Retry';  // Change text to 'Retry'
        document.getElementById('flag-button').onclick = onRetryClick;  // Set retry functionality
    }else {
        document.getElementById('flag-button').textContent = '🚩';  // Change text back to '🚩'
        document.getElementById('flag-button').style.backgroundColor = flagEnabled ? 'var(--tile-color-2)' : 'var(--tile-color-1)';  // Style for flag toggle
        document.getElementById('flag-button').onclick = setFlag;  // Set flag functionality
    }
}

function onRetryClick() {
    gameOver = false; // Reset gameOver status
    flagEnabled = false; // Reset flag state
    tilesClicked = 0;  // Reset clicked tiles count
    document.getElementById('mines-count').innerText = minesCount; // Reset mines count display

    startGame();  // Restart the game by calling startGame
    updateButton();  // Update button back to flag functionality
    console.log('Retry clicked');
}

function endGame() {
    gameOver = true;
    revealMines();  // Reveal all mines
    updateButton();  // Update button state
    if (!bombClicked){
        document.getElementById('mines-count').innerText = 'Cleared';
    } else {
        document.getElementById('mines-count').innerText = 'Failed';
    }
    
}

function updateFlagCounter() {
    document.getElementById('flag-counter').innerText = `Flags Left: ${minesCount - flagsUsed}`;
}
