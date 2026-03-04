const sendBtn = document.getElementById('send');
const promptBox = document.getElementById('prompt');
const responseBox = document.getElementById('response');

sendBtn.addEventListener('click', async () => {
  const prompt = promptBox.value;
  if(!prompt) return alert("Type a question first!");

  responseBox.textContent = "Loading...";

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  responseBox.textContent = data.response || "No response received";
});
