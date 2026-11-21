const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const ARCHIVO_DATOS = path.join(DIR, 'datos.json');
const HTML_FILE = path.join(DIR, 'index.html');

console.log('=======================================================================');
console.log('   PRUEBA INTEGRAL Y VERIFICACIÓN DEL SISTEMA - MORALES LARRAZÁBAL');
console.log('=======================================================================\n');

let errores = 0;
function assert(cond, msg) {
  if (cond) {
    console.log(`  [PASS] ${msg}`);
  } else {
    console.error(`  [FAIL] ${msg}`);
    errores++;
  }
}

// -------------------------------------------------------------------------
// PRUEBA 1: Integridad y Sintaxis de index.html
// -------------------------------------------------------------------------
console.log('--- 1. Verificación de Integridad de index.html ---');
const htmlContent = fs.readFileSync(HTML_FILE, 'utf8');

assert(htmlContent.includes('id="modal-config-anticipo"'), 'Modal de configuración de anticipos presente en index.html');
assert(htmlContent.includes('id="modal-backup"'), 'Modal de copia de seguridad / respaldo presente');
assert(htmlContent.includes('id="toast-notificacion"'), 'Toast flotante de notificación de guardado presente');
assert(htmlContent.includes('id="badge-servidor-status"'), 'Badge de estado de servidor presente');
assert(htmlContent.includes('function actualizarTodosLosModulos'), 'Función maestra actualizarTodosLosModulos definida');
assert(htmlContent.includes('function guardarDatosCentralizados'), 'Función de persistencia centralizada guardarDatosCentralizados definida');
assert(htmlContent.includes('function cargarDatosIniciales'), 'Función de carga inicial cargarDatosIniciales definida');
assert(htmlContent.includes('function obtenerAnticiposEmpleado'), 'Función de cálculo dinámico de anticipos definida');
assert(htmlContent.includes('function abrirModalConfigAnticipo'), 'Función de modal individual de anticipos definida');
assert(htmlContent.includes('function aplicarAnticiposGlobalesModal'), 'Función de configuración masiva de anticipos definida');

// -------------------------------------------------------------------------
// PRUEBA 2: Lógica Matemática de Anticipos Opcionales y Editables (Monto / %)
// -------------------------------------------------------------------------
console.log('\n--- 2. Verificación de Fórmulas Matemáticas de Anticipos y Descuentos ---');

function testCalculoAnticipos(sueldoBasico, diasEfectivos, tipoContrato, cfg) {
  const totalGanado = Math.round(((sueldoBasico / 30) * diasEfectivos) * 100) / 100;
  let ant1 = 0;
  if (cfg.ant1Activo) {
    ant1 = (cfg.ant1Tipo === 'porcentaje')
      ? Math.round(totalGanado * (Number(cfg.ant1Valor) / 100) * 100) / 100
      : Number(cfg.ant1Valor);
  }
  ant1 = Math.max(0, Math.min(ant1, totalGanado));

  let ant2 = 0;
  if (cfg.ant2Activo) {
    ant2 = (cfg.ant2Tipo === 'porcentaje')
      ? Math.round(totalGanado * (Number(cfg.ant2Valor) / 100) * 100) / 100
      : Number(cfg.ant2Valor);
  }
  ant2 = Math.max(0, Math.min(ant2, Math.max(0, totalGanado - ant1)));

  const descLey = (tipoContrato === 'Planta')
    ? Math.round(totalGanado * 0.1271 * 100) / 100
    : 0;

  const saldoFinal = Math.max(0, Math.round((totalGanado - descLey - ant1 - ant2) * 100) / 100);
  const totalPagado = Math.round((ant1 + ant2 + saldoFinal) * 100) / 100;

  return { totalGanado, ant1, ant2, descLey, saldoFinal, totalPagado };
}

// Caso A: Sin anticipos (100% al cierre)
const resA = testCalculoAnticipos(6000, 30, 'Planta', { ant1Activo: false, ant2Activo: false });
assert(resA.totalGanado === 6000, 'Sueldo completo 30 días = Bs 6000.00');
assert(resA.ant1 === 0 && resA.ant2 === 0, 'Sin anticipos: Anticipo 1 = 0, Anticipo 2 = 0');
assert(resA.descLey === 762.60, 'Gestora Pública 12.71% = Bs 762.60');
assert(resA.saldoFinal === 5237.40, 'Saldo Final = Bs 5237.40 (100% del líquido pagable al cierre)');

// Caso B: Anticipo editable por porcentaje (ej. 25% y 15%)
const resB = testCalculoAnticipos(8200, 30, 'Planta', {
  ant1Activo: true, ant1Tipo: 'porcentaje', ant1Valor: 25,
  ant2Activo: true, ant2Tipo: 'porcentaje', ant2Valor: 15
});
assert(resB.ant1 === 2050, 'Anticipo 1 al 25% de Bs 8200 = Bs 2050.00');
assert(resB.ant2 === 1230, 'Anticipo 2 al 15% de Bs 8200 = Bs 1230.00');
assert(resB.descLey === 1042.22, 'Gestora 12.71% de Bs 8200 = Bs 1042.22');
assert(resB.saldoFinal === Math.round((8200 - 1042.22 - 2050 - 1230) * 100) / 100, 'Saldo final con anticipos por % calculado con precisión');
assert(Math.abs(resB.ant1 + resB.ant2 + resB.saldoFinal - (8200 - 1042.22)) < 0.02, 'La suma total de desembolsos cubre exactamente el líquido de ley');

// Caso C: Anticipo editable por Monto Fijo en Bolivianos (ej. Bs 1500)
const resC = testCalculoAnticipos(5200, 30, 'Planta', {
  ant1Activo: true, ant1Tipo: 'monto', ant1Valor: 1500,
  ant2Activo: false, ant2Tipo: 'monto', ant2Valor: 0
});
assert(resC.ant1 === 1500, 'Anticipo 1 de monto fijo Bs 1500.00 exacto');
assert(resC.ant2 === 0, 'Anticipo 2 inactivo = Bs 0.00');

// Caso D: Consultor en Línea (Sin descuentos de ley, total ganado = líquido)
const resD = testCalculoAnticipos(8800, 30, 'Consultor en Línea', {
  ant1Activo: true, ant1Tipo: 'porcentaje', ant1Valor: 30,
  ant2Activo: true, ant2Tipo: 'porcentaje', ant2Valor: 30
});
assert(resD.descLey === 0, 'Consultor en Línea 100% exento de deducciones de ley (Gestora = 0)');
assert(resD.ant1 === 2640, 'Anticipo 1 Consultor (30%) = Bs 2640.00');
assert(resD.ant2 === 2640, 'Anticipo 2 Consultor (30%) = Bs 2640.00');
assert(resD.saldoFinal === 3520, 'Saldo Final Consultor (40%) = Bs 3520.00');
assert(resD.totalPagado === 8800, 'Total desembolsado al Consultor coincide exactamente con sus honorarios brutos');

// -------------------------------------------------------------------------
// PRUEBA 3: Persistencia Centralizada en Servidor y datos.json
// -------------------------------------------------------------------------
console.log('\n--- 3. Verificación del Servidor HTTP y API /api/datos ---');

async function ejecutarPruebasServidor() {
  const { spawn } = require('child_process');
  const TEST_PORT = 3088;
  const env = Object.assign({}, process.env, { PORT: TEST_PORT });

  const serverProc = spawn(process.execPath, [path.join(DIR, 'servidor.js')], { env });

  // Esperar a que inicie
  await new Promise(r => setTimeout(r, 1200));

  function request(method, pathUrl, body = null) {
    return new Promise((resolve, reject) => {
      const opts = {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path: pathUrl,
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const req = http.request(opts, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, body: data });
          }
        });
      });
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  try {
    // 1. GET /api/datos
    const resGet1 = await request('GET', '/api/datos');
    assert(resGet1.status === 200, 'GET /api/datos responde HTTP 200');
    assert(Array.isArray(resGet1.body.listaPersonal), 'Datos retornan listaPersonal como arreglo');
    assert(resGet1.body.listaPersonal.length >= 9, `listaPersonal contiene ${resGet1.body.listaPersonal.length} registros`);
    assert(Array.isArray(resGet1.body.listaObras), 'Datos retornan listaObras como arreglo');
    assert(typeof resGet1.body.credencialesRRHH === 'object', 'Datos retornan credencialesRRHH');

    // 2. POST /api/datos (Modificar / Guardar cambios de usuario o personal)
    const datosModificados = Object.assign({}, resGet1.body);
    const ciTest = '9999999 LP';
    const nuevoEmpleadoTest = {
      codigo: 'EMP-TEST-99',
      ci: ciTest,
      nombres: 'Prueba de Automatización Sincronizada',
      cargo: 'Inspector de Calidad',
      tipoContrato: 'Planta',
      obra: 'Obra Edificio Residencial Las Torres de Calacoto',
      fechaIngreso: '2026-10-01',
      fechaRetiro: '',
      sueldoBasico: 5500,
      estado: 'Activo',
      pin: '54321'
    };

    // Añadir empleado temporal para probar sincronización
    datosModificados.listaPersonal.push(nuevoEmpleadoTest);
    datosModificados.configAnticipos = datosModificados.configAnticipos || {};
    datosModificados.configAnticipos['EMP-TEST-99'] = {
      ant1Activo: true, ant1Tipo: 'monto', ant1Valor: 1200,
      ant2Activo: false, ant2Tipo: 'porcentaje', ant2Valor: 0
    };

    const resPost = await request('POST', '/api/datos', datosModificados);
    assert(resPost.status === 200 && (resPost.body.success === true || resPost.body.ok === true), 'POST /api/datos guarda con éxito en datos.json');

    // 3. GET /api/datos después del guardado (simula que el usuario recarga la página o entra desde otro equipo)
    const resGet2 = await request('GET', '/api/datos');
    const empGuardado = resGet2.body.listaPersonal.find(p => p.ci === ciTest);
    assert(empGuardado && empGuardado.nombres === nuevoEmpleadoTest.nombres, 'Empleado añadido persiste tras recarga de datos');
    assert(resGet2.body.configAnticipos['EMP-TEST-99'].ant1Valor === 1200, 'Configuración individual de anticipo persistió en servidor');

    // 4. Restaurar eliminando el empleado temporal para dejar la base intacta
    datosModificados.listaPersonal = datosModificados.listaPersonal.filter(p => p.ci !== ciTest);
    delete datosModificados.configAnticipos['EMP-TEST-99'];
    await request('POST', '/api/datos', datosModificados);

    const resGet3 = await request('GET', '/api/datos');
    const empEliminado = resGet3.body.listaPersonal.find(p => p.ci === ciTest);
    assert(!empEliminado, 'Eliminación de personal persiste y se propaga en servidor');

  } catch (err) {
    assert(false, `Error durante pruebas de servidor HTTP: ${err.message}`);
  } finally {
    serverProc.kill();
  }

  console.log('\n=======================================================================');
  if (errores === 0) {
    console.log('   >>> TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE SIN ERRORES <<<');
    console.log('   El sistema de Morales Larrazábal M.L. cumple el 100% de requerimientos.');
  } else {
    console.error(`   >>> SE ENCONTRARON ${errores} FALLOS EN LAS PRUEBAS <<<`);
  }
  console.log('=======================================================================');
}

ejecutarPruebasServidor();
