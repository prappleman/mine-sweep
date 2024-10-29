# Minesweeper Game

Welcome to my **Minesweeper Game**! This is a modern take on the classic game where you can compete against friends, customize themes, and save your progress. You can log in, view your game records, and keep track of leaderboard standings as you improve your score!

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [How to Play](#how-to-play)
4. [Account and Game Records](#account-and-game-records)
5. [Themes](#themes)
6. [Leaderboard](#leaderboard)
7. [Technologies Used](#technologies-used)

## Features

- **Account Management**: Log in with your account to save and view your game records.
- **Leaderboard**: Compete against friends by tracking scores on a leaderboard.
- **Game Records**: Track your previous games, including win/loss status, time taken, and bombs cleared.
- **Themes**: Customize the theme of the site and board to your preference.
- **Minesweeper Game**: Traditional gameplay with a 10x10 grid and 10 hidden mines. Flags are limited, so place them wisely!

## Getting Started

1. **Play the Game**:
   - Visit the hosted site on Render: [Minesweeper Game on Render](https://mine-sweep.onrender.com)

2. **Clone the Repository (For Local Setup)**:
    ```bash
    git clone https://github.com/your-username/minesweeper-game.git
    cd minesweeper-game
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Setup MongoDB**:
   - Ensure MongoDB is installed and running.
   - Set up your MongoDB connection URL in a `.env` file:
     ```
     MONGODB_URI=your-mongo-db-uri
     ```

5. **Run the Game Locally**:
    ```bash
    npm start
    ```

6. **Access the Game**:
   - Open your browser and navigate to `http://localhost:3000`.

## How to Play

1. **Objective**: Clear the board without detonating any mines! Mark all mines with flags to win the game.
2. **Gameplay**:
   - Click on a cell to reveal it.
   - Right-click (or use the flag button) to place a flag on cells you think contain mines.
   - Flags are limited to the number of mines (10).
3. **Win Condition**: Clear all non-mine cells or correctly flag all mines.
4. **End of Game**:
   - If you reveal a mine, you lose the game.
   - Once the game ends, whether you win or lose, your time and score are saved.

## Account and Game Records

- **Sign In/Sign Up**: Create an account or log in to start tracking your games.
- **Game Records**: Each game saves your time, number of bombs cleared, and win/loss status. You can view a history of past games.
- **Leaderboard**: Your scores are sorted on the leaderboard alongside your friends. Compete to clear the board in the shortest time!

## Themes

Choose from different themes to customize the game interface:
- **Site Themes**: Light and Dark modes to suit your preference.
- **Board Themes**: Standard Grey, Purple, Blue, Orange, and Pink for a personalized board style.

## Leaderboard

After each game, your score is saved and added to the leaderboard, which ranks all players based on:
- **Time**: Shortest completion time for winning games.
- **Bombs Cleared**: High scores for clearing the most mines.

Challenge your friends to see who can get the best score!

## Technologies Used

- **MongoDB**: For storing user accounts, game records, and leaderboard data.
- **Node.js & Express**: Server-side handling of user authentication, data storage, and game logic.
- **HTML, CSS, JavaScript**: Front-end interface and traditional Minesweeper functionality.
- **Render**: Free hosting platform for deploying the site online.

Enjoy the challenge, and happy mine hunting!
