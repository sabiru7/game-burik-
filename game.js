const player = document.getElementById("player");
const monster = document.getElementById("monster");
const gameArea = document.getElementById("gameArea");
const timerDisplay = document.getElementById("timer");

let playerPos = { x: 50, y: 50 };
let monsterPos = { x: 500, y: 300 };
let speed = 5;
let timeSurvived = 0;
let gameOver = false;

// Update position
function updatePosition() {
  player.style.left = playerPos.x + "px";
  player.style.top = playerPos.y + "px";
  monster.style.left = monsterPos.x + "px";
  monster.style.top = monsterPos.y + "px";
}

// Monster follows player
function moveMonster() {
  if (monsterPos.x < playerPos.x) monsterPos.x += 2;
  if (monsterPos.x > playerPos.x) monsterPos.x -= 2;
  if (monsterPos.y < playerPos.y) monsterPos.y += 2;
  if (monsterPos.y > playerPos.y) monsterPos.y -= 2;
}

// Collision detection
function checkCollision() {
  const dx = playerPos.x - monsterPos.x;
  const dy = playerPos.y - monsterPos.y;
  return Math.sqrt(dx * dx + dy * dy) < 30;
}

// Game loop
function gameLoop() {
  if (gameOver) return;
  moveMonster();
  updatePosition();
  if (checkCollision()) {
    alert("You were caught! You survived for " + timeSurvived + " seconds.");
    gameOver = true;
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  switch (e.key) {
    case "ArrowUp":
      if (playerPos.y > 0) playerPos.y -= speed;
      break;
    case "ArrowDown":
      if (playerPos.y < gameArea.clientHeight - 30) playerPos.y += speed;
      break;
    case "ArrowLeft":
      if (playerPos.x > 0) playerPos.x -= speed;
      break;
    case "ArrowRight":
      if (playerPos.x < gameArea.clientWidth - 30) playerPos.x += speed;
      break;
  }
});

// Timer
setInterval(() => {
  if (!gameOver) {
    timeSurvived++;
    timerDisplay.textContent = timeSurvived;
  }
}, 1000);

// Start game
updatePosition();
gameLoop();