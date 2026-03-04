const sendBtn = document.getElementById('send');
const promptBox = document.getElementById('prompt');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', async () => {
  const prompt = promptBox.value.trim();
  if (!prompt) return;

  addMessage('user', prompt);
  promptBox.value = '';
  addMessage('bot', 'Loading...');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error('API request failed');

    const data = await res.json();
    updateLastBotMessage(data.response || "No response received");

  } catch (err) {
    updateLastBotMessage("Error: Unable to get response. Check API key or logs.");
    console.error(err);
  }
});

function addMessage(type, text) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(text) {
  const botBubbles = document.querySelectorAll('.bot');
  botBubbles[botBubbles.length - 1].textContent = text;
}

// 3D Liberian Flag
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('flag-background').appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('assets/liberia-flag.glb', (gltf) => {
  const flag = gltf.scene;
  scene.add(flag);
  flag.position.z = -5;
  function animate() {
    requestAnimationFrame(animate);
    flag.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
  animate();
});
camera.position.z = 5;
