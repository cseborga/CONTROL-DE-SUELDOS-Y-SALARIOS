// src/backend/routes/api.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Paths (relative to backend folder)
const ARCHIVO_DATOS = path.join(__dirname, '..', '..', 'datos.json');

// Helper to load data (same as original)
function cargarDatos() {
  if (fs.existsSync(ARCHIVO_DATOS)) {
    try {
      return JSON.parse(fs.readFileSync(ARCHIVO_DATOS, 'utf8'));
    } catch (_) { return {}; }
  }
  return {};
}

// GET /api/datos (with Last-Modified caching)
router.get('/datos', (req, res) => {
  try {
    const stats = fs.statSync(ARCHIVO_DATOS);
    const lastModified = stats.mtime.toUTCString();
    const ifModifiedSince = req.headers['if-modified-since'];
    if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified)) {
      return res.sendStatus(304);
    }
    const datos = cargarDatos();
    res.set('Last-Modified', lastModified);
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/datos (replace whole file)
router.post('/datos', express.json(), (req, res) => {
  try {
    fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export router
module.exports = router;
