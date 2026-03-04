const player = document.getElementById('player');
let playerX = 50;
let playerY = 50;

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  if(e.key === "ArrowUp") playerY -= 2;
  if(e.key === "ArrowDown") playerY += 2;
  if(e.key === "ArrowLeft") playerX -= 2;
  if(e.key === "ArrowRight") playerX += 2;
  
  // Keep player within bounds
  if(playerX < 0) playerX = 0;
  if(playerX > 95) playerX = 95;
  if(playerY < 0) playerY = 0;
  if(playerY > 95) playerY = 95;

  player.style.left = playerX + "%";
  player.style.top = playerY + "%";
});

// NPCs move randomly
function moveNPC(npcId) {
  const npc = document.getElementById(npcId);
  let x = Math.random() * 90;
  let y = Math.random() * 90;
  npc.style.left = x + "%";
  npc.style.top = y + "%";
}

// Move NPCs every 2 seconds
setInterval(() => {
  moveNPC('npc1');
  moveNPC('npc2');
}, 2000);

// Clickable schools
document.getElementById('school1').addEventListener('click', () => {
  alert("Welcome to Dr. Abraham S. Borbor!");
});
document.getElementById('school2').addEventListener('click', () => {
  alert("Welcome to Morley School of Excellence!");
});
