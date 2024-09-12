//sidebar
function openNav() {
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('main');
    const element = document.getElementById('btnContainer');

    if (window.innerWidth <= 1000) {
        sidebar.style.width = "100vw";
        main.style.marginRight = "0";
    } else {
        sidebar.style.width = "300px";
        main.style.marginRight = "300px";
    }
    
    element.setAttribute('hidden', 'hidden');
}

// Add event listener to handle resizing
window.addEventListener('resize', openNav);

  
function closeNav() {
    document.getElementById('mySidebar').style.width = "0";
    document.getElementById('main').style.marginRight= "0";
    const element = document.getElementById('btnContainer');
    element.removeAttribute("hidden");
}

function toggleContent(contentId) {
    // Get all content sections
    const allContents = document.querySelectorAll('.content');
    
    // Get the selected content section
    const content = document.getElementById(contentId);
    
    // If the selected section is already visible, hide it (toggle off)
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        // Otherwise, hide all other sections and show the selected one
        allContents.forEach(content => {
            content.style.display = 'none';
        });

        content.style.display = 'block';
    }
}


//leaderboard
//my games
//settings
// Theme selection functions
function setLightTheme() {
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--primary-color', '#aaaaaa');  // Light grey
    document.documentElement.style.setProperty('--secondary-color', '#bbbbbb'); // Slightly darker grey
    document.documentElement.style.setProperty('--sidebar-color', '#dddddd');  // Lighter grey, closer to primary
    document.documentElement.style.setProperty('--text-color', '#333333');

    highlightSelectedTheme('light-theme-label');
}

function setDarkTheme() {
    document.documentElement.style.setProperty('--background-color', '#121212');  // Dark background
    document.documentElement.style.setProperty('--primary-color', '#333333');   // Darker grey for primary elements
    document.documentElement.style.setProperty('--secondary-color', '#1e1e1e'); // Slightly lighter grey
    document.documentElement.style.setProperty('--sidebar-color', '#1a1a1a');  // Very close to primary
    document.documentElement.style.setProperty('--text-color', '#e0e0e0');    // Light grey text

    highlightSelectedTheme('dark-theme-label');
}

// Board selection functions
function setStandardBoard() {
    document.documentElement.style.setProperty('--tile-color-1', '#cccccc');
    document.documentElement.style.setProperty('--tile-color-2', '#909090');
    document.documentElement.style.setProperty('--base-color', '#505050');

    highlightSelectedBoard('standard-board-label');
}

function setRedBoard() {
    document.documentElement.style.setProperty('--tile-color-1', '#ff9999');
    document.documentElement.style.setProperty('--tile-color-2', '#cc6666');
    document.documentElement.style.setProperty('--base-color', '#990000');

    highlightSelectedBoard('red-board-label');
}

function setBlueBoard() {
    document.documentElement.style.setProperty('--tile-color-1', '#99ccff');
    document.documentElement.style.setProperty('--tile-color-2', '#6699ff');
    document.documentElement.style.setProperty('--base-color', '#0033cc');

    highlightSelectedBoard('blue-board-label');
}

function setGreenBoard() {
    document.documentElement.style.setProperty('--tile-color-1', '#99ff99');
    document.documentElement.style.setProperty('--tile-color-2', '#66cc66');
    document.documentElement.style.setProperty('--base-color', '#009900');

    highlightSelectedBoard('green-board-label');
}

function setPinkBoard() {
    document.documentElement.style.setProperty('--tile-color-1', '#ffccff');
    document.documentElement.style.setProperty('--tile-color-2', '#ff99cc');
    document.documentElement.style.setProperty('--base-color', '#cc0099');

    highlightSelectedBoard('pink-board-label');
}

// Function to highlight the selected theme
function highlightSelectedTheme(selectedLabelId) {
    const themeLabels = document.querySelectorAll('#theme-form .theme-label');
    themeLabels.forEach(label => label.classList.remove('selected')); // Remove 'selected' class from all
    document.getElementById(selectedLabelId).classList.add('selected'); // Add 'selected' class to the clicked label
}

// Function to highlight the selected board
function highlightSelectedBoard(selectedLabelId) {
    const boardLabels = document.querySelectorAll('#board-form .board-label');
    boardLabels.forEach(label => label.classList.remove('selected')); // Remove 'selected' class from all
    document.getElementById(selectedLabelId).classList.add('selected'); // Add 'selected' class to the clicked label
}
