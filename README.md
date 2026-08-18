# Minesweeper Game

Arcade-style minesweeper: enter a 3-letter name, clear the board, and chase the fastest time on the high-score list.

## Getting Started

1. **Play the Game**:
   - [Minesweeper on Vercel](https://mine-sweep-three.vercel.app)

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/prappleman/mine-sweep.git
    cd mine-sweep
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Setup MongoDB** (for shared high scores):
     ```
     MONGODB_URI=your-mongo-db-uri
     ```

5. **Run locally**:
    ```bash
    npm start
    ```
    Then open `http://localhost:3001`.

## How to Play

- Enter a 3-character name (A–Z, 0–9), like old arcade cabinets.
- Left click a tile to dig.
- Right click a tile to flag. On a phone, press and hold.
- Clear every safe tile to post a time on the high-score board.

## Technologies Used

- MongoDB for the high-score list
- Node.js and Express
- HTML, CSS, and JavaScript
- Vercel hosting
