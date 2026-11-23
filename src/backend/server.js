/**
 * Planilla Personal Bolivia – Backend Server (Express version)
 */
const express = require('express');
const path = require('path');
const logger = require('./logger');

// Config
const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..'); // src/backend -> project root
const FRONTEND_DIR = path.join(ROOT_DIR, 'src', 'frontend');
const ARCHIVO_DATOS = path.join(ROOT_DIR, 'datos.json');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(FRONTEND_DIR));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.use('/api', require('./routes/api'));

// Fallback for SPA (serve index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  logger.info('Servidor escuchando en puerto %d', PORT);
});
