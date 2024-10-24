var board = [];
var rows = 10;
var columns = 10;

var timer = 0;
var timerInterval = null;
var firstClick = false;

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
    minesCount = 10;
    firstClick = false;  // Reset firstClick for a new game
    timer = 0;  // Reset timer
    clearInterval(timerInterval);  // Clear any previous timer interval
    document.getElementById('timer').innerText = `0:00:00`;  // Reset timer display
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
        document.getElementById('flag-button').style.border = 'solid var(--base-color)';
        document.getElementById('flag-button').style.backgroundColor = 'var(--tile-color-2)';
    } else {
        flagEnabled = true;
        document.getElementById('flag-button').style.border = 'solid var(--secondary-color)';
        document.getElementById('flag-button').style.backgroundColor = 'var(--primary-color)';
    }
    console.log('Flag state: ', flagEnabled);
}

function clickTile() {
    let tile = this;

    // Check if the game is over, the tile is already clicked, or if it has a flag
    if (gameOver || tile.classList.contains('tile-clicked')) {
        return;
    }

    if (!firstClick) {
        startTimer();
        firstClick = true;  // Set this so the timer only starts once
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
                    if (tile.innerText != '🚩'){
                        tile.innerText = '💣';  // Show bomb icon
                        tile.style.backgroundColor = 'var(--lose-color)';  // Set background to red 
                    } else {
                        tile.style.backgroundColor = 'var(--win-color)';  // Set background to green
                        minesCount -= 1;
                    }
                } else {
                    tile.style.backgroundColor = 'var(--win-color)';  // Set background to green
                    minesCount -= 1;
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
    revealMines();  
    updateButton();  
    clearInterval(timerInterval);  
    document.getElementById('mines-count').innerText = minesCount; // Reset mine count display

    // Get the end time
    const endTime = Date.now();
    const totalElapsedTime = endTime - startTime; 

    let minutes = Math.floor(totalElapsedTime / 60000); 
    let seconds = Math.floor((totalElapsedTime % 60000) / 1000); 
    let milliseconds = Math.floor((totalElapsedTime % 1000) / 10); 

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (milliseconds < 10) {
        milliseconds = '0' + milliseconds;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userFirstName = user ? user.FirstName : '';

    const gameData = {
        totalTime: `${minutes}:${seconds}:${milliseconds}`,
        minesLeft: minesCount,
        userFirstName: userFirstName, // Correctly accessing userFirstName
    };

    console.log('MINE Sending game data to server:', gameData ); // Log the data being sent

    fetch('https://mine-sweep.onrender.com/game/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(gameData),
    })
    .then(response => {
        if (response.ok) {
            console.log('MINE Game data saved successfully!'); // Log success
        } else {
            console.error('Error saving game data:', response.statusText); // Log the error message
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error); // Log any fetch errors
    });
}



function updateFlagCounter() {
    document.getElementById('flag-counter').innerText = `Flags: ${minesCount - flagsUsed}`;
}

function startTimer() {
    startTime = Date.now();  // Store the start time
    timerInterval = setInterval(function() {
        // Calculate the elapsed time
        let elapsedTime = Date.now() - startTime;

        // Convert elapsed time to total seconds
        let totalSeconds = Math.floor(elapsedTime / 1000); // Total seconds
        let minutes = Math.floor(totalSeconds / 60); // Calculate minutes
        let seconds = totalSeconds % 60; // Calculate seconds
        let milliseconds = Math.floor((elapsedTime % 1000) / 10); // Get milliseconds (two digits)

        // Format seconds and milliseconds to always be two digits
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (milliseconds < 10) {
            milliseconds = '0' + milliseconds;
        }

        // Update the timer display
        document.getElementById('timer').innerText = `${minutes}:${seconds}:${milliseconds}`;
    }, 10);  // Update every 10 milliseconds

    // Optionally, if you want to provide a way to stop the timer:
    return timerInterval; // Return the interval ID if needed for stopping the timer later
}
