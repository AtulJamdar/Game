const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const gameOverElement = document.getElementById('game-over');
const reStartBtn = document.getElementById('Restart-btn')

let score = 0;
let gameActive = false;
let spawnInterval;
let moveInterval;

function createTarget() {
    const target = document.createElement('div');
    target.className = 'target';
    target.style.left = `${gameContainer.offsetWidth}px`;
    target.style.top = `${Math.random() * (gameContainer.offsetHeight - 50)}px`;

    target.addEventListener('click', () => {
        if (gameActive) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            target.remove();
        }
    });

    gameContainer.appendChild(target);
    return target;
}

function moveTarget(target) {
    let position = gameContainer.offsetWidth;

    function move() {
        position -= 5;
        target.style.left = `${position}px`;

        if (position < -50) {
            target.remove();
            clearInterval(moveInterval);
        }
    }

    moveInterval = setInterval(move, 20);
}

function startGame() {
    if (gameActive) return;

    gameActive = true;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    startBtn.style.display = 'none';
    gameOverElement.style.display = 'none';
    gameContainer.innerHTML = '';

    // Spawn targets every second
    spawnInterval = setInterval(() => {
        const target = createTarget();
        moveTarget(target);
    }, 1000);

    // End game after 30 seconds
    setTimeout(() => {
        gameActive = false;
        clearInterval(spawnInterval);
        startBtn.style.display = 'block';
        gameOverElement.style.display = 'block';
        gameContainer.innerHTML = '';
    }, 30000);
}



startBtn.addEventListener('click', startGame);
