const http = require('http');
const path = require('path');
const fs = require('fs');

// Helper to make a GET request
function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({status: res.statusCode, headers: res.headers, body: data}));
    }).on('error', err => reject(err));
  });
}

describe('API Endpoints', () => {
  const PORT = 4000; // use a test port
  let serverProcess;

  beforeAll(done => {
    // launch the server in a separate process
    const { spawn } = require('child_process');
    serverProcess = spawn('node', [path.join(__dirname, '..', 'backend', 'servidor.js')], {
      env: { ...process.env, PORT: PORT.toString() },
      stdio: 'ignore'
    });
    // wait a moment for server to start
    setTimeout(done, 1500);
  });

  afterAll(() => {
    serverProcess.kill();
  });

  test('GET /api/datos returns JSON with listaPersonal', async () => {
    const res = await httpGet(`http://localhost:${PORT}/api/datos`);
    expect(res.status).toBe(200);
    const json = JSON.parse(res.body);
    expect(Array.isArray(json.listaPersonal)).toBe(true);
  });

  test('GET /exportar returns Excel file', async () => {
    const res = await httpGet(`http://localhost:${PORT}/exportar`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });

  test('GET /exportar-csv returns CSV', async () => {
    const res = await httpGet(`http://localhost:${PORT}/exportar-csv`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/csv');
    expect(res.body).toContain('Código,Nombre');
  });
});
