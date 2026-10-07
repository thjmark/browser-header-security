const LOGIN_ORIGIN = 'http://localhost:4000';
const API_ORIGIN = 'http://localhost:4001';

const loginSection = document.getElementById('login-section');
const boardSection = document.getElementById('board-section');
const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');
const logoutBtn = document.getElementById('logout-btn');
const refreshBtn = document.getElementById('refresh-btn');
const messageList = document.getElementById('message-list');
const addForm = document.getElementById('add-form');
const addStatus = document.getElementById('add-status');

function renderMessages(messages) {
  messageList.innerHTML = '';
  for (const entry of messages) {
    const li = document.createElement('li');
    // Intentionally unsanitized: entries are rendered as raw HTML so
    // exercises 3/4 (stored XSS) have something to exploit and then fix via
    // CSP. This is a deliberate vulnerability, not an oversight.
    li.innerHTML = entry.text;
    messageList.appendChild(li);
  }
}

async function tryLoadMessages() {
  try {
    const res = await fetch(`${API_ORIGIN}/list`, { credentials: 'include' });
    const data = await res.json();
    if (!data.ok) return false;
    renderMessages(data.messages);
    return true;
  } catch (err) {
    return false;
  }
}

function showBoard() {
  loginSection.hidden = true;
  boardSection.hidden = false;
}

function showLogin() {
  loginSection.hidden = false;
  boardSection.hidden = true;
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  loginStatus.textContent = '';
  try {
    const res = await fetch(`${LOGIN_ORIGIN}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.ok) {
      showBoard();
      await tryLoadMessages();
    } else {
      loginStatus.textContent = data.error || 'login failed';
    }
  } catch (err) {
    loginStatus.textContent = 'login request failed: ' + err.message;
  }
});

logoutBtn.addEventListener('click', async () => {
  await fetch(`${LOGIN_ORIGIN}/logout`, { method: 'POST', credentials: 'include' });
  showLogin();
});

refreshBtn.addEventListener('click', tryLoadMessages);

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const textInput = document.getElementById('entry-text');
  const text = textInput.value;
  addStatus.textContent = '';
  try {
    const res = await fetch(`${API_ORIGIN}/list`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data.ok) {
      textInput.value = '';
      renderMessages(data.messages);
    } else {
      addStatus.textContent = data.error || 'failed to post';
    }
  } catch (err) {
    addStatus.textContent = 'failed to post: ' + err.message;
  }
});

// On load, try the board directly in case a session cookie already exists.
tryLoadMessages().then((ok) => {
  if (ok) {
    showBoard();
  } else {
    showLogin();
  }
});
