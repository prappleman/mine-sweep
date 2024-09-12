//sidebar
function openNav() {
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('main');
    const element = document.getElementById('btnContainer');

    const buttons = document.querySelectorAll('a');
    buttons.forEach(button => {
            button.style.transition = 'opacity 1s';
            button.style.opacity = '1';
        });

    if (window.innerWidth <= 1000) {
        sidebar.style.width = "100vw";
        main.style.marginRight = "0";
    } else {
        sidebar.style.width = "400px";
        main.style.marginRight = "400px";
    }
    
    element.setAttribute('hidden', 'hidden');
}

// Add event listener to handle resizing
window.addEventListener('resize', openNav);

  
function closeNav() {
    document.getElementById('mySidebar').style.width = "0";
    document.getElementById('main').style.marginRight = "0";

    const element = document.getElementById('btnContainer');
    element.removeAttribute("hidden");

    const allContents = document.querySelectorAll('.content');
    allContents.forEach(content => {
        content.classList.remove('show');
    });

    const buttons = document.querySelectorAll('a');
    buttons.forEach(button => {
        button.style.transition = 'opacity 1s';
        button.style.opacity = '0';
    });
}

function toggleContent(contentId) {
    // Get all content sections
    const allContents = document.querySelectorAll('.content');

    // Get the selected content section
    const content = document.getElementById(contentId);

    // Hide all other content sections
    allContents.forEach(item => {
        if (item !== content) {
            // Set fast hide transition (0.2s)
            item.style.transition = 'opacity 0.5s, max-height 0.5s';
            item.classList.remove('show');
        }
    });

    // Check if the selected content is already visible
    if (content.classList.contains('show')) {
        // Set fast hide transition (0.2s) and hide the content
        content.style.transition = 'opacity 0.5s, max-height 1s';
        content.classList.remove('show');
    } else {
        // Set slow show transition (1s) and show the content
        content.style.transition = 'opacity 0.5s, max-height 1s';
        content.classList.add('show');
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
