const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const livesEl = document.getElementById('lives');
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('startButton');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

let bestScore = Number(localStorage.getItem('nebula-drift-best') || 0);
bestEl.textContent = bestScore;

const state = {
  running: false,
  score: 0,
  lives: 3,
  frame: 0,
  spawnTimer: 0,
  crystalTimer: 0,
  level: 1,
};

const player = {
  x: canvas.width / 2,
  y: canvas.height - 60,
  radius: 18,
  speed: 5.4,
};

const stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 2 + 1,
  speed: Math.random() * 0.8 + 0.2,
}));

const asteroids = [];
const crystals = [];

function resetPlayer() {
  player.x = canvas.width / 2;
  player.y = canvas.height - 60;
}

function setOverlay(message, buttonText = 'Start Game') {
  const card = overlay.querySelector('.card');
  card.innerHTML = `
    <p class="eyebrow">Arcade survival</p>
    <h1>${message}</h1>
    <p>${message === 'Game Over' ? 'The asteroid storm won this round.' : 'Collect glowing cores and avoid the asteroid storm.'}</p>
    <button id="startButton" type="button">${buttonText}</button>
  `;
  overlay.classList.add('visible');
  document.getElementById('startButton').addEventListener('click', startGame);
}

function spawnAsteroid() {
  const radius = 18 + Math.random() * 24;
  asteroids.push({
    x: 30 + Math.random() * (canvas.width - 60),
    y: -radius - Math.random() * 180,
    radius,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: 2 + Math.random() * 3.5 + state.level * 0.35,
    rotation: Math.random() * Math.PI * 2,
  });
}

function spawnCrystal() {
  crystals.push({
    x: 35 + Math.random() * (canvas.width - 70),
    y: 30 + Math.random() * (canvas.height - 120),
    radius: 10,
    pulse: Math.random() * Math.PI * 2,
  });
}

function updateHud() {
  scoreEl.textContent = state.score;
  bestEl.textContent = bestScore;
  livesEl.textContent = state.lives;
}

function resetGame() {
  state.running = false;
  state.score = 0;
  state.lives = 3;
  state.frame = 0;
  state.spawnTimer = 0;
  state.crystalTimer = 0;
  state.level = 1;
  asteroids.length = 0;
  crystals.length = 0;
  resetPlayer();
  updateHud();
}

function startGame() {
  resetGame();
  state.running = true;
  overlay.classList.remove('visible');
}

function endGame() {
  state.running = false;
  bestScore = Math.max(bestScore, state.score);
  localStorage.setItem('nebula-drift-best', String(bestScore));
  bestEl.textContent = bestScore;
  setOverlay('Game Over', 'Play Again');
}

function handleInput() {
  const horizontal = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0);
  const vertical = (keys.ArrowDown || keys.s ? 1 : 0) - (keys.ArrowUp || keys.w ? 1 : 0);

  player.x += horizontal * player.speed;
  player.y += vertical * player.speed;

  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
}

function update() {
  if (!state.running) {
    return;
  }

  state.frame += 1;
  state.spawnTimer += 1;
  state.crystalTimer += 1;

  if (state.spawnTimer > Math.max(25, 70 - state.level * 5)) {
    spawnAsteroid();
    state.spawnTimer = 0;
  }

  if (state.crystalTimer > 110) {
    spawnCrystal();
    state.crystalTimer = 0;
  }

  handleInput();
  state.level = 1 + Math.floor(state.score / 8);

  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].y += stars[i].speed * 1.4;
    if (stars[i].y > canvas.height) {
      stars[i].y = 0;
      stars[i].x = Math.random() * canvas.width;
    }
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.x += asteroid.speedX;
    asteroid.y += asteroid.speedY;
    asteroid.rotation += 0.04;

    if (asteroid.x < asteroid.radius || asteroid.x > canvas.width - asteroid.radius) {
      asteroid.speedX *= -1;
    }

    const dx = asteroid.x - player.x;
    const dy = asteroid.y - player.y;
    const dist = Math.hypot(dx, dy);

    if (dist < asteroid.radius + player.radius) {
      state.lives -= 1;
      asteroids.splice(i, 1);

      if (state.lives <= 0) {
        endGame();
        return;
      }

      updateHud();
      continue;
    }

    if (asteroid.y > canvas.height + asteroid.radius) {
      asteroids.splice(i, 1);
    }
  }

  for (let i = crystals.length - 1; i >= 0; i--) {
    const crystal = crystals[i];
    crystal.pulse += 0.08;

    const dx = crystal.x - player.x;
    const dy = crystal.y - player.y;
    const dist = Math.hypot(dx, dy);

    if (dist < crystal.radius + player.radius + 4) {
      state.score += 1;
      if (state.score > bestScore) {
        bestScore = state.score;
        localStorage.setItem('nebula-drift-best', String(bestScore));
      }
      crystals.splice(i, 1);
      updateHud();
      continue;
    }

    if (crystal.y > canvas.height + 25) {
      crystals.splice(i, 1);
    }
  }

  updateHud();
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);

  ctx.fillStyle = '#7dd8ff';
  ctx.shadowColor = '#77d9ff';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(13, 14);
  ctx.lineTo(0, 10);
  ctx.lineTo(-13, 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#8d7aff';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAsteroid(asteroid) {
  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.rotation);

  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    const radius = asteroid.radius * (0.72 + ((i % 2) * 0.3));
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#c7d0df';
  ctx.shadowColor = 'rgba(255,255,255,0.25)';
  ctx.shadowBlur = 8;
  ctx.fill();

  ctx.fillStyle = '#8b93a9';
  ctx.fillRect(-6, -6, 12, 12);
  ctx.restore();
}

function drawCrystal(crystal) {
  const pulse = 1 + Math.sin(crystal.pulse) * 0.18;
  ctx.save();
  ctx.translate(crystal.x, crystal.y);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = '#8ef1c1';
  ctx.shadowColor = '#8ef1c1';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(9, 0);
  ctx.lineTo(0, 12);
  ctx.lineTo(-9, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function draw() {
  drawBackground();

  for (const crystal of crystals) {
    drawCrystal(crystal);
  }

  for (const asteroid of asteroids) {
    drawAsteroid(asteroid);
  }

  drawPlayer();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key in keys) {
    keys[key] = true;
    event.preventDefault();
  }
  if (event.code in keys) {
    keys[event.code] = true;
    event.preventDefault();
  }
  if (event.code === 'Space' && !state.running) {
    startGame();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  if (key in keys) keys[key] = false;
  if (event.code in keys) keys[event.code] = false;
});

startButton.addEventListener('click', startGame);
resetGame();
setOverlay('Nebula Drift', 'Start Game');
loop();
