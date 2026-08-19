# Mine Sweep

A browser minesweeper game with arcade high scores. Clear a 10×10 board as fast as you can, then enter a 3-letter name to post your time.

**[Play live](https://mine-sweep-three.vercel.app)** · [Source](https://github.com/prappleman/mine-sweep)

## Features

- Classic 10×10 grid with 10 mines
- First click is always safe
- Left click to reveal, right click to flag (press and hold on mobile)
- High-score board of fastest clears
- Arcade-style 3-letter initials after the first win

## Tech stack

| Layer | Tools |
| --- | --- |
| Front end | HTML, CSS, JavaScript |
| Server | Node.js, Express |
| Database | MongoDB |
| Hosting | Vercel |

## Getting started

**Requirements:** Node.js 18+ and a MongoDB database (for shared high scores).

```bash
git clone https://github.com/prappleman/mine-sweep.git
cd mine-sweep
npm install
```

Create a `.env` file in the project root:

```
MONGODB_URI=your-mongodb-connection-string
```

Start the server:

```bash
npm start
```

Open [http://localhost:3001](http://localhost:3001).

Without a database, the game still runs. High scores stay in the browser until MongoDB is connected.

## How to play

1. Reveal tiles without hitting a mine.
2. Flag suspected mines with right click.
3. Clear every safe tile to win.
4. After your first win, enter three letters (A–Z or 0–9) to save your time.

## License

MIT © Parker Rappleye
