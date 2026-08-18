const ROWS = 10;
const COLS = 10;
const MINE_COUNT = 10;
const NAME_KEY = "arcadeName";
const LOCAL_SCORES_KEY = "highScores";

const boardEl = document.getElementById("board");
const timerEl = document.getElementById("timer");
const minesEl = document.getElementById("mines-count");
const flagsEl = document.getElementById("flag-counter");
const pilotNameEl = document.getElementById("pilot-name");
const leaderboardEl = document.getElementById("leaderboard");
const nameModal = document.getElementById("name-modal");
const resultModal = document.getElementById("result-modal");
const letterInputs = [0, 1, 2].map((i) => document.getElementById(`letter-${i}`));

let tiles = [];
let mines = new Set();
let gameOver = false;
let won = false;
let started = false;
let startTime = 0;
let timerId = null;
let flagsUsed = 0;
let tilesClicked = 0;
let suppressClick = false;

function formatTime(ms) {
    const total = Math.max(0, Math.floor(ms));
    const minutes = Math.floor(total / 60000);
    const seconds = Math.floor((total % 60000) / 1000);
    const hundredths = Math.floor((total % 1000) / 10);
    return `${minutes}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

function getInitials() {
    return (localStorage.getItem(NAME_KEY) || "").toUpperCase();
}

function setInitials(value) {
    const initials = value.toUpperCase();
    localStorage.setItem(NAME_KEY, initials);
    pilotNameEl.textContent = initials;
}

function showModal(modal) {
    modal.hidden = false;
}

function hideModal(modal) {
    modal.hidden = true;
}

function updateFlagCount() {
    flagsEl.textContent = String(MINE_COUNT - flagsUsed);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

function startTimer() {
    startTime = Date.now();
    stopTimer();
    timerId = setInterval(() => {
        timerEl.textContent = formatTime(Date.now() - startTime);
    }, 10);
}

function tileId(r, c) {
    return `${r}-${c}`;
}

function parseId(id) {
    const [r, c] = id.split("-").map(Number);
    return { r, c };
}

function neighbors(r, c) {
    const cells = [];
    for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                cells.push([nr, nc]);
            }
        }
    }
    return cells;
}

function placeMines(safeR, safeC) {
    mines = new Set();
    const forbidden = new Set([tileId(safeR, safeC)]);
    neighbors(safeR, safeC).forEach(([r, c]) => forbidden.add(tileId(r, c)));

    while (mines.size < MINE_COUNT) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        const id = tileId(r, c);
        if (!forbidden.has(id)) {
            mines.add(id);
        }
    }
}

function adjacentMineCount(r, c) {
    return neighbors(r, c).reduce((sum, [nr, nc]) => sum + (mines.has(tileId(nr, nc)) ? 1 : 0), 0);
}

function startGame() {
    tiles = [];
    mines = new Set();
    gameOver = false;
    won = false;
    started = false;
    flagsUsed = 0;
    tilesClicked = 0;
    suppressClick = false;
    stopTimer();
    timerEl.textContent = "0:00.00";
    minesEl.textContent = String(MINE_COUNT);
    updateFlagCount();
    hideModal(resultModal);
    boardEl.innerHTML = "";

    for (let r = 0; r < ROWS; r += 1) {
        const row = [];
        for (let c = 0; c < COLS; c += 1) {
            const tile = document.createElement("button");
            tile.type = "button";
            tile.className = "tile";
            tile.id = tileId(r, c);
            tile.setAttribute("aria-label", `Tile ${r + 1}, ${c + 1}`);
            bindTileEvents(tile);
            boardEl.append(tile);
            row.push(tile);
        }
        tiles.push(row);
    }
}

function bindTileEvents(tile) {
    let pressTimer = null;
    let longPress = false;

    tile.addEventListener("click", (event) => {
        event.preventDefault();
        if (suppressClick || longPress) {
            suppressClick = false;
            longPress = false;
            return;
        }
        clickTile(tile);
    });

    tile.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(tile);
    });

    tile.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "touch") return;
        longPress = false;
        pressTimer = window.setTimeout(() => {
            longPress = true;
            suppressClick = true;
            toggleFlag(tile);
        }, 420);
    });

    const cancelPress = () => clearTimeout(pressTimer);
    tile.addEventListener("pointerup", cancelPress);
    tile.addEventListener("pointerleave", cancelPress);
    tile.addEventListener("pointercancel", cancelPress);
}

function toggleFlag(tile) {
    if (gameOver || tile.classList.contains("revealed")) return;

    if (tile.classList.contains("flagged")) {
        tile.classList.remove("flagged");
        flagsUsed -= 1;
    } else if (flagsUsed < MINE_COUNT) {
        tile.classList.add("flagged");
        flagsUsed += 1;
    }

    updateFlagCount();
}

function clickTile(tile) {
    if (gameOver || tile.classList.contains("revealed") || tile.classList.contains("flagged")) {
        return;
    }

    const { r, c } = parseId(tile.id);

    if (!started) {
        placeMines(r, c);
        startTimer();
        started = true;
    }

    if (mines.has(tile.id)) {
        finishGame(false);
        return;
    }

    reveal(r, c);
    if (tilesClicked === ROWS * COLS - MINE_COUNT) {
        finishGame(true);
    }
}

function reveal(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;

    const tile = tiles[r][c];
    if (tile.classList.contains("revealed") || tile.classList.contains("flagged")) return;

    tile.classList.add("revealed");
    tilesClicked += 1;

    const count = adjacentMineCount(r, c);
    if (count > 0) {
        tile.textContent = String(count);
        tile.classList.add(`x${count}`);
        return;
    }

    neighbors(r, c).forEach(([nr, nc]) => reveal(nr, nc));
}

function finishGame(isWin) {
    gameOver = true;
    won = isWin;
    stopTimer();
    const elapsed = started ? Date.now() - startTime : 0;
    timerEl.textContent = formatTime(elapsed);

    tiles.flat().forEach((tile) => {
        const isMine = mines.has(tile.id);
        const isFlagged = tile.classList.contains("flagged");

        if (isMine && !isFlagged) {
            tile.classList.add(isWin ? "mine-safe" : "mine");
            tile.textContent = isWin ? "" : "💣";
        } else if (isFlagged && !isMine) {
            tile.classList.remove("flagged");
            tile.classList.add("wrong");
        }
    });

    const resultKicker = document.getElementById("result-kicker");
    const resultTitle = document.getElementById("result-title");
    const resultCopy = document.getElementById("result-copy");

    if (isWin) {
        resultKicker.textContent = "Cleared";
        resultTitle.textContent = "You win";
        resultCopy.textContent = `Time ${formatTime(elapsed)} · Saved to the board as ${getInitials()}`;
        submitScore(elapsed);
    } else {
        resultKicker.textContent = "Mine hit";
        resultTitle.textContent = "Boom";
        resultCopy.textContent = "Right click flags. Left click digs. Try a cleaner run.";
    }

    showModal(resultModal);
}

function getLocalScores() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY) || "[]");
    } catch (error) {
        return [];
    }
}

function saveLocalScore(entry) {
    const scores = [...getLocalScores(), entry]
        .sort((a, b) => a.timeMs - b.timeMs)
        .slice(0, 10);
    localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(scores));
    return scores;
}

async function submitScore(timeMs) {
    const initials = getInitials() || "AAA";
    const entry = { initials, timeMs, won: true };

    saveLocalScore(entry);
    renderLeaderboard(getLocalScores());

    try {
        const response = await fetch("/game/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });
        if (response.ok) {
            await loadLeaderboard();
        }
    } catch (error) {
        console.error("Could not save score to server:", error);
    }
}

function renderLeaderboard(scores) {
    if (!scores.length) {
        leaderboardEl.innerHTML = '<li class="empty-scores">No clears yet. Be the first.</li>';
        return;
    }

    leaderboardEl.innerHTML = scores
        .slice(0, 10)
        .map((score, index) => `
            <li>
                <span class="rank">${String(index + 1).padStart(2, "0")}</span>
                <span class="player">${score.initials}</span>
                <span class="time">${formatTime(score.timeMs)}</span>
            </li>
        `)
        .join("");
}

async function loadLeaderboard() {
    try {
        const response = await fetch("/game/scores");
        if (!response.ok) throw new Error("Leaderboard unavailable");
        const scores = await response.json();
        if (scores.length) {
            renderLeaderboard(scores);
            return;
        }
    } catch (error) {
        console.error(error);
    }
    renderLeaderboard(getLocalScores());
}

function currentTypedName() {
    return letterInputs.map((input) => (input.value || "").toUpperCase()).join("");
}

function fillNameInputs(name) {
    const padded = (name || "").toUpperCase().padEnd(3, "").slice(0, 3);
    letterInputs.forEach((input, index) => {
        input.value = padded[index] || "";
    });
}

function setupNameEntry() {
    letterInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            const next = input.value.replace(/[^a-zA-Z0-9]/g, "").slice(-1).toUpperCase();
            input.value = next;
            if (next && index < 2) {
                letterInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && index > 0) {
                letterInputs[index - 1].focus();
            }
            if (event.key === "Enter") {
                saveName();
            }
        });
    });
}

function openNameModal() {
    fillNameInputs(getInitials());
    showModal(nameModal);
    letterInputs[0].focus();
}

function saveName() {
    const name = currentTypedName();
    if (!/^[A-Z0-9]{3}$/.test(name)) {
        letterInputs[0].focus();
        return;
    }
    setInitials(name);
    hideModal(nameModal);
}

function init() {
    setupNameEntry();
    minesEl.textContent = String(MINE_COUNT);
    const initials = getInitials();
    if (/^[A-Z0-9]{3}$/.test(initials)) {
        setInitials(initials);
        hideModal(nameModal);
    } else {
        openNameModal();
    }

    boardEl.addEventListener("contextmenu", (event) => event.preventDefault());
    startGame();
    loadLeaderboard();

    document.getElementById("save-name").addEventListener("click", saveName);
    document.getElementById("pilot-btn").addEventListener("click", openNameModal);
    document.getElementById("new-game").addEventListener("click", startGame);
    document.getElementById("play-again").addEventListener("click", startGame);
}

init();
