const path = require('path');
const express = require('express');
const cspHeaders = require('./headers');

const PORT = 3000;

const app = express();
app.use(cspHeaders);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`frontend-server listening on http://localhost:${PORT}`);
});
