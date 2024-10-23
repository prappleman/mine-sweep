//sidebar
function openNav() {
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('main')
    const element = document.getElementById('btnContainer');

    const buttons = document.querySelectorAll('a');
    buttons.forEach(button => {
        button.style.transition = 'opacity 1s';
        button.style.opacity = '1';
    });

    if (window.innerWidth <= 1000) {
        sidebar.style.opacity = '1';
        sidebar.style.width = "100vw";

        main.style.marginRight = "0";
        main.style.transition = 'margin-right 1s';
    } else {
        sidebar.style.opacity = '1';
        sidebar.style.width = "400px";

        main.style.marginRight = "400px";
        main.style.transition = 'margin-right 1s';
    }
    
    element.style.opacity = '0';
}

// Add event listener to handle resizing
window.addEventListener('resize', openNav);

  
function closeNav() {

    const sidebar = document.getElementById('mySidebar');
    sidebar.style.opacity = '0';
    sidebar.style.width = '0';

    const main = document.getElementById('main')
    main.style.marginRight = '0';
    main.style.transition = 'margin-right 1s';


    const element = document.getElementById('btnContainer');
    element.style.opacity = '1';

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
    // Get all content sections and buttons that toggle content
    const allContents = document.querySelectorAll('.content');
    const contentButtons = document.querySelectorAll('a[onclick^="toggleContent"]');

    // Get the selected content section
    const content = document.getElementById(contentId);

    // Check if window height is less than or equal to 800px
    if (window.innerHeight <= 800) {
        // Check if the selected content is already visible (toggle back)
        if (content.classList.contains('show')) {
            // Hide the content and show all content toggling buttons
            content.classList.remove('show');
            content.style.maxHeight = '0';
            content.style.opacity = '0';

            // Show all content toggling buttons again
            contentButtons.forEach(button => {
                button.style.display = 'block';
                
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.padding = '15px 15px 15px';
                    button.style.margin = '10px 10px 10px';
                    button.style.maxHeight = '500px';
                    button.style.transition = 'opacity 0.5s, max-height 0.5s, padding 0.5s, margin 0.5s';
                }, 50);
            });
        } else {
            // Hide all content sections and content toggling buttons except the clicked one
            allContents.forEach(item => {
                item.classList.remove('show');
                item.style.maxHeight = '0';
                item.style.opacity = '0';
            });

            // Hide other content toggling buttons
            contentButtons.forEach(button => {
                if (!button.getAttribute('onclick').includes(contentId)) {
                    button.style.maxHeight = '0px';
                    button.style.opacity = '0';
                    button.style.padding = '0px 0px 0px';
                    button.style.margin = '0px 0px 0px';
                    button.style.transition = 'max-height 0.25s, opacity 0.5s, padding 0.25s, margin 0.25s';

                    setTimeout(() => {
                        button.style.display = 'none'; // Hide other content toggling buttons
                    }, 150);        
                }
            });

            // Show the selected content
            content.classList.add('show');
            content.style.maxHeight = '500px';  // Adjust max height as needed
            content.style.opacity = '1';


        }
    } else {

        // Hide all other content sections
        allContents.forEach(item => {
            if (item !== content) {
                // Set fast hide transition (0.2s)
                item.style.transition = 'opacity 0.35s, max-height 0.5s';
                // Set a timeout for the duration of the transition (500ms)
                setTimeout(() => {
                    item.classList.remove('show');
                }, 50); // 500ms matches the duration of the transition
            }
        });

        // Check if the selected content is already visible
        if (content.classList.contains('show')) {
            // Set fast hide transition (0.2s) and hide the content
            content.style.display = 'none';
            content.classList.remove('show');
        } else {
            // Set slow show transition (1s) and show the content
            content.style.display = 'block';
            content.classList.add('show');
        }
        
    }
}


function logoutButton () {
    localStorage.removeItem('token');  // Clear the token
    window.location.href = '/login.html';  // Redirect to login page
};

// Theme selection functions
function setLightTheme() {
    document.documentElement.style.setProperty('--background-color', '#fff');
    document.documentElement.style.setProperty('--primary-color', '#aaa');  // Light grey
    document.documentElement.style.setProperty('--secondary-color', '#333'); // Slightly darker grey

    highlightSelectedTheme('light-theme-label');
}

function setDarkTheme() {
    document.documentElement.style.setProperty('--background-color', '#111');  // Dark background
    document.documentElement.style.setProperty('--primary-color', '#222');   // Darker grey for primary elements
    document.documentElement.style.setProperty('--secondary-color', '#fff'); // Slightly lighter grey

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


document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Token check on page load, token:', token);  // Log token on page load
  
    const loggedInContent = document.getElementById('loggedInContent');
    const loggedOutContent = document.getElementById('loggedOutContent');
  
    if (!loggedInContent || !loggedOutContent) {
      console.error('Could not find content elements for logged-in or logged-out states.');
      return;
    }
  
    if (token) {
      // User is logged in, show logged-in content
      console.log('User is logged in, displaying logged-in content');
      loggedInContent.style.display = 'flex';
      loggedOutContent.style.display = 'none';
    } else {
      // User is not logged in, show logged-out content
      console.log('User is not logged in, displaying logged-out content');
      loggedInContent.style.display = 'none';
      loggedOutContent.style.display = 'flex';
    }
});
  

fetch('/api/games') // Fetch all games
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching all games');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched Game Data:', data); // Check the fetched data

        // Get the containers for displaying game data
        const myGamesContent = document.getElementById('myGamesContent');
        const leaderboardContent = document.getElementById('leaderboardContent');

        myGamesContent.innerHTML = ''; // Clear previous content for user's games
        leaderboardContent.innerHTML = ''; // Clear previous content for leaderboard

        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const userFirstName = user ? user.firstname : ''; // Get the user's first name

        // Function to convert time in H:MM:SS to total seconds
        const timeToSeconds = (time) => {
            const parts = time.split(':');
            const hours = parseInt(parts[0], 10) || 0; // Default to 0 if not present
            const minutes = parseInt(parts[1], 10) || 0;
            const seconds = parseInt(parts[2], 10) || 0;
            return (hours * 3600) + (minutes * 60) + seconds; // Convert to total seconds
        };

        // Sort all games by least mines left, and then by least time
        const sortedGames = data.sort((a, b) => {
            const minesA = parseInt(a.minesLeft, 10); // Convert to number
            const minesB = parseInt(b.minesLeft, 10); // Convert to number
            const timeA = timeToSeconds(a.totalTime); // Convert time to seconds
            const timeB = timeToSeconds(b.totalTime); // Convert time to seconds

            // First compare minesLeft
            if (minesA !== minesB) {
                return minesA - minesB; // Ascending order for minesLeft
            }
            // If minesLeft are equal, compare totalTime
            return timeA - timeB; // Ascending order for totalTime
        });

        console.log('Sorted Games:', sortedGames); // Check sorted games

        // Filter games for the specific user
        const userGames = sortedGames.filter(game => game.userFirstName === userFirstName);

        // Add the table with headers to myGamesContent
        const myGamesTable = `
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Mines</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="myGamesBody">
                </tbody>
            </table>
        `;
        myGamesContent.innerHTML = myGamesTable; // Set the entire table with thead and tbody

        // Add the table with headers to leaderboardContent
        const leaderboardTable = `
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Time</th>
                        <th>Mines</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="leaderboardBody">
                </tbody>
            </table>
        `;
        leaderboardContent.innerHTML = leaderboardTable; // Set the entire table with thead and tbody

        // Now get the <tbody> elements where rows will be appended
        const myGamesBody = document.getElementById('myGamesBody');
        const leaderboardBody = document.getElementById('leaderboardBody');

        // Now add the dynamic rows to myGamesContent
        if (userGames.length) {
            userGames.forEach(game => {
                const gameRow = document.createElement('tr'); // Create a table row
                gameRow.className = 'game-row'; // Add a class for styling if needed
                gameRow.innerHTML = `
                    <td>${game.totalTime}</td>
                    <td>${game.minesLeft}</td>
                    <td>${game.date}</td>
                `;
                myGamesBody.appendChild(gameRow); // Append the row to the existing tbody
            });
        } else {
            myGamesBody.innerHTML = '<tr><td colspan="3">No games found.</td></tr>';
        }

        // Similarly for leaderboardContent
        if (sortedGames.length) {
            sortedGames.forEach(game => {
                const leaderboardRow = document.createElement('tr'); // Create a table row
                leaderboardRow.className = 'game-row'; // Add a class for styling if needed
                leaderboardRow.innerHTML = `
                    <td>${game.userFirstName}</td>
                    <td>${game.totalTime}</td>
                    <td>${game.minesLeft}</td>
                    <td>${game.date}</td>
                `;
                leaderboardBody.appendChild(leaderboardRow); // Append the row to the leaderboard tbody
            });
        } else {
            leaderboardBody.innerHTML = '<tr><td colspan="4">No games found.</td></tr>';
        }
    })
    .catch(error => {
        console.error('Error fetching all game data:', error);
    });