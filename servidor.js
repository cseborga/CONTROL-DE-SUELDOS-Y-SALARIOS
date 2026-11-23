const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DIR_ACTUAL = __dirname;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const ARCHIVO_DATOS = path.join(DIR_ACTUAL, 'datos.json');

// MIME types para archivos estáticos
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

// Obtener IPs locales de la máquina
function obtenerIPsLocales() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const nombre of Object.keys(interfaces)) {
    for (const iface of interfaces[nombre]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

// Cargar o inicializar datos.json
function obtenerODefinirDatosIniciales() {
  if (fs.existsSync(ARCHIVO_DATOS)) {
    try {
      const raw = fs.readFileSync(ARCHIVO_DATOS, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error al leer datos.json, restaurando estructura base:', err);
    }
  }

  // Datos iniciales de la constructora Morales Larrazábal M.L.
  const datosIniciales = {
    ultimaActualizacion: new Date().toISOString(),
    credencialesRRHH: {
      usuario: 'encargado_rrhh',
      pass: 'Bolivia2026*',
      nombre: 'Lic. Roberto Méndez',
      cargo: 'Responsable de Recursos Humanos'
    },
    listaObras: [
      {
        id: 'OBRA-00',
        nombre: 'Oficina Central (Administración & Gerencia)',
        tipo: 'Administrativa',
        ubicacion: 'La Paz - Zona Central',
        fechaInicio: '2020-01-01',
        fechaFin: '',
        presupuestoManoObra: 500000,
        estado: 'Permanente'
      },
      {
        id: 'OBRA-01',
        nombre: 'Obra Edificio Residencial Las Torres de Calacoto',
        tipo: 'Edificación Vertical',
        ubicacion: 'La Paz - Zona Sur (Calacoto)',
        fechaInicio: '2025-08-01',
        fechaFin: '2026-10-31',
        presupuestoManoObra: 350000,
        estado: 'Concluida'
      },
      {
        id: 'OBRA-02',
        nombre: 'Obra Puente Vehicular Bicentenario',
        tipo: 'Infraestructura Vial',
        ubicacion: 'Cochabamba - Sacaba',
        fechaInicio: '2026-02-01',
        fechaFin: '',
        presupuestoManoObra: 280000,
        estado: 'En Ejecución'
      },
      {
        id: 'OBRA-03',
        nombre: 'Obra Condominio Urbanístico Los Tajibos',
        tipo: 'Urbanización',
        ubicacion: 'Santa Cruz - Equipetrol Norte',
        fechaInicio: '2026-05-15',
        fechaFin: '',
        presupuestoManoObra: 420000,
        estado: 'En Ejecución'
      },
      {
        id: 'OBRA-04',
        nombre: 'Obra Pavimentación y Drenaje Av. Costanera',
        tipo: 'Vial y Drenaje',
        ubicacion: 'El Alto - Distrito 4',
        fechaInicio: '2026-06-01',
        fechaFin: '2026-11-30',
        presupuestoManoObra: 190000,
        estado: 'En Ejecución'
      }
    ],
    listaPersonal: [
      {
        codigo: 'EMP-001',
        ci: '4892301 LP',
        nombres: 'Carlos Alberto Mamani Condori',
        cargo: 'Gerente General / Representante Legal',
        tipoContrato: 'Planta',
        obra: 'Oficina Central (Administración & Gerencia)',
        fechaIngreso: '2022-01-15',
        fechaRetiro: '',
        sueldoBasico: 14500,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-002',
        ci: '5928103 SC',
        nombres: 'María Elena Flores Ramos',
        cargo: 'Contadora General',
        tipoContrato: 'Planta',
        obra: 'Oficina Central (Administración & Gerencia)',
        fechaIngreso: '2023-04-01',
        fechaRetiro: '',
        sueldoBasico: 8200,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-004',
        ci: '7482910 LP',
        nombres: 'Patricia Sofía Vargas Quispe',
        cargo: 'Encargada de Recursos Humanos',
        tipoContrato: 'Planta',
        obra: 'Oficina Central (Administración & Gerencia)',
        fechaIngreso: '2026-02-01',
        fechaRetiro: '',
        sueldoBasico: 6000,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-003',
        ci: '6819204 CB',
        nombres: 'Rodrigo Javier Gutiérrez Silva',
        cargo: 'Residente de Obra / Ing. Civil',
        tipoContrato: 'Planta',
        obra: 'Obra Edificio Residencial Las Torres de Calacoto',
        fechaIngreso: '2025-08-10',
        fechaRetiro: '2026-10-20',
        sueldoBasico: 9500,
        estado: 'Retirado / Fin Contrato',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-006',
        ci: '9182736 OR',
        nombres: 'Lucía Fernanda Mendoza Calle',
        cargo: 'Seguridad Industrial & Medio Ambiente (SISO)',
        tipoContrato: 'Planta',
        obra: 'Obra Edificio Residencial Las Torres de Calacoto',
        fechaIngreso: '2026-07-06',
        fechaRetiro: '',
        sueldoBasico: 5200,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-007',
        ci: '6271928 TJ',
        nombres: 'Fernando Andrés Choque Aliaga',
        cargo: 'Topógrafo de Obra',
        tipoContrato: 'Planta',
        obra: 'Obra Edificio Residencial Las Torres de Calacoto',
        fechaIngreso: '2026-10-14',
        fechaRetiro: '',
        sueldoBasico: 4800,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-005',
        ci: '8392019 SC',
        nombres: 'Alejandro David Torrico Morales',
        cargo: 'Ingeniero Estructural de Puente',
        tipoContrato: 'Consultor en Línea',
        obra: 'Obra Puente Vehicular Bicentenario',
        fechaIngreso: '2026-03-18',
        fechaRetiro: '',
        sueldoBasico: 8800,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-008',
        ci: '7192834 CH',
        nombres: 'Gabriela Belén Ortiz Paz',
        cargo: 'Especialista en Control de Calidad de Hormigones',
        tipoContrato: 'Consultor en Línea',
        obra: 'Obra Puente Vehicular Bicentenario',
        fechaIngreso: '2026-10-26',
        fechaRetiro: '',
        sueldoBasico: 4200,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      },
      {
        codigo: 'EMP-009',
        ci: '8291045 PO',
        nombres: 'Gustavo Adolfo Miranda Ríos',
        cargo: 'Encargado de Maquinaria Pesada',
        tipoContrato: 'Planta',
        obra: 'Obra Condominio Urbanístico Los Tajibos',
        fechaIngreso: '2026-11-09',
        fechaRetiro: '',
        sueldoBasico: 4500,
        estado: 'Activo',
        pin: '12345',
        anticipo1: { activo: false, tipo: 'monto', valor: 0 },
        anticipo2: { activo: false, tipo: 'monto', valor: 0 }
      }
    ],
    listaPermisos: [
      {
        correlativo: 'PER-ML-2026-0012',
        ci: '5928103 SC',
        nombres: 'María Elena Flores Ramos',
        cargo: 'Contadora General',
        obra: 'Oficina Central (Administración & Gerencia)',
        fecha: '2026-10-15',
        hora: '08:30',
        duracion: '4 Horas',
        tipo: 'Atención Médica CNS (Con Goce)',
        motivo: 'Consulta médica programada en el Policlínico de la Caja Nacional de Salud y entrega de certificación de baja.',
        estado: 'Autorizada',
        autorizadoPor: 'Lic. Roberto Méndez (Jefe de RRHH)',
        fechaAutorizacion: '14/10/2026 16:45',
        observacionRRHH: 'Autorizado con goce de haberes por citación médica CNS.'
      },
      {
        correlativo: 'PER-ML-2026-0013',
        ci: '6271928 TJ',
        nombres: 'Fernando Andrés Choque Aliaga',
        cargo: 'Topógrafo de Obra',
        obra: 'Obra Edificio Residencial Las Torres de Calacoto',
        fecha: '2026-10-16',
        hora: '14:00',
        duracion: '3 Horas',
        tipo: 'Comisión Oficial de Obra (Con Goce)',
        motivo: 'Calibración y verificación de estación total en laboratorio geodésico.',
        estado: 'Autorizada',
        autorizadoPor: 'Lic. Roberto Méndez (Jefe de RRHH)',
        fechaAutorizacion: '15/10/2026 11:20',
        observacionRRHH: 'Comisión oficial justificada por el Residente de Obra.'
      },
      {
        correlativo: 'PER-ML-2026-0014',
        ci: '8392019 SC',
        nombres: 'Alejandro David Torrico Morales',
        cargo: 'Ingeniero Estructural de Puente',
        obra: 'Obra Puente Vehicular Bicentenario',
        fecha: '2026-10-19',
        hora: '09:00',
        duracion: '2 Horas',
        tipo: 'Trámite Personal Particular (Sin Goce)',
        motivo: 'Trámite notarial personal urgente en ciudad de Cochabamba.',
        estado: 'Pendiente',
        autorizadoPor: '',
        fechaAutorizacion: '',
        observacionRRHH: 'En espera de revisión por RRHH.'
      }
    ],
    listaSanciones: [
      {
        id: 'SANC-001',
        correlativoMemo: 'MEM-RRHH-ML-2026-003',
        ci: '5928103 SC',
        fecha: '2026-10-08',
        tipo: 'Falta Injustificada a Obra',
        dias: 1,
        motivo: 'Ausencia injustificada de jornada completa a cierre de caja sin aviso previo.'
      },
      {
        id: 'SANC-002',
        correlativoMemo: 'MEM-RRHH-ML-2026-004',
        ci: '8392019 SC',
        fecha: '2026-10-12',
        tipo: 'Negligencia Laboral en Ejecución',
        dias: 2,
        motivo: 'Negligencia e inasistencia técnica durante el vaciado de losa estructural en el estribo norte del puente.'
      }
    ],
    programacionVacaciones: [
      { codigoEmp: 'EMP-001', fechaSalida: '2026-11-02', fechaRetorno: '2026-11-13', dias: 10 },
      { codigoEmp: 'EMP-002', fechaSalida: '2026-11-16', fechaRetorno: '2026-11-20', dias: 5 },
      { codigoEmp: 'EMP-006', fechaSalida: '2026-11-16', fechaRetorno: '2026-11-20', dias: 5 }
    ],
    listaFeriados: [
      { id: 'FER-01', fecha: '2026-01-01', nombre: 'Año Nuevo', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-02', fecha: '2026-01-22', nombre: 'Día del Estado Plurinacional de Bolivia', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-03', fecha: '2026-02-10', nombre: 'Efeméride Departamental de Oruro', tipo: 'Departamental', departamento: 'ORURO', esModificable: true },
      { id: 'FER-04', fecha: '2026-02-16', nombre: 'Lunes de Carnaval', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-05', fecha: '2026-02-17', nombre: 'Martes de Carnaval', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-06', fecha: '2026-04-03', nombre: 'Viernes Santo', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-07', fecha: '2026-04-15', nombre: 'Efeméride Departamental de Tarija', tipo: 'Departamental', departamento: 'TARIJA', esModificable: true },
      { id: 'FER-08', fecha: '2026-05-01', nombre: 'Día del Trabajo', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-09', fecha: '2026-05-25', nombre: 'Primer Grito Libertario (Chuquisaca)', tipo: 'Departamental', departamento: 'CHUQUISACA', esModificable: true },
      { id: 'FER-10', fecha: '2026-06-04', nombre: 'Corpus Christi', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-11', fecha: '2026-06-22', nombre: 'Año Nuevo Aymara Amazónico (Compensado lunes D.S. 1420)', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-12', fecha: '2026-07-16', nombre: 'Revolución de Julio (La Paz)', tipo: 'Departamental', departamento: 'LA PAZ', esModificable: true },
      { id: 'FER-13', fecha: '2026-08-06', nombre: 'Día de la Independencia de Bolivia', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-14', fecha: '2026-09-14', nombre: 'Efeméride Departamental de Cochabamba', tipo: 'Departamental', departamento: 'COCHABAMBA', esModificable: true },
      { id: 'FER-15', fecha: '2026-09-24', nombre: 'Gesta Libertaria de Santa Cruz', tipo: 'Departamental', departamento: 'SANTA CRUZ', esModificable: true },
      { id: 'FER-16', fecha: '2026-09-24', nombre: 'Creación del Departamento de Pando', tipo: 'Departamental', departamento: 'PANDO', esModificable: true },
      { id: 'FER-17', fecha: '2026-11-02', nombre: 'Día de Todos los Santos', tipo: 'Nacional', departamento: 'TODOS', esModificable: true },
      { id: 'FER-18', fecha: '2026-11-10', nombre: 'Gesta Libertaria de Potosí', tipo: 'Departamental', departamento: 'POTOSI', esModificable: true },
      { id: 'FER-19', fecha: '2026-11-18', nombre: 'Creación del Departamento del Beni', tipo: 'Departamental', departamento: 'BENI', esModificable: true },
      { id: 'FER-20', fecha: '2026-12-25', nombre: 'Navidad', tipo: 'Nacional', departamento: 'TODOS', esModificable: true }
    ],
    reglasAnticiposProyecto: {
      ant1Activo: false,
      ant1Tipo: 'porcentaje',
      ant1Valor: 30,
      ant2Activo: false,
      ant2Tipo: 'porcentaje',
      ant2Valor: 30
    },
    configAnticipos: {},
    feriadosDecretados: []
  };

  fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(datosIniciales, null, 2), 'utf8');
  return datosIniciales;
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // ENDPOINT: Obtener datos centralizados
  if (req.method === 'GET' && pathname === '/api/datos') {
      try {
        const datos = obtenerODefinirDatosIniciales();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(datos));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }
    // ENDPOINT: Exportar a Excel (sin fórmulas) usando exceljs
    if (req.method === 'GET' && pathname === '/exportar') {
      try {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Datos');
        sheet.columns = [
          { header: 'Código', key: 'codigo', width: 12 },
          { header: 'Nombre', key: 'nombres', width: 30 },
          { header: 'Cargo', key: 'cargo', width: 25 },
          { header: 'Obra', key: 'obra', width: 30 },
          { header: 'Sueldo Básico', key: 'sueldoBasico', width: 15 },
          { header: 'Estado', key: 'estado', width: 12 }
        ];
        const datos = JSON.parse(require('fs').readFileSync(ARCHIVO_DATOS, 'utf8'));
        if (Array.isArray(datos.listaPersonal)) {
          datos.listaPersonal.forEach(p => sheet.addRow(p));
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="planilla_sueldos.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }
    // ENDPOINT: Exportar a CSV (sin formato)
    if (req.method === 'GET' && pathname === '/exportar-csv') {
      try {
        const datos = JSON.parse(require('fs').readFileSync(ARCHIVO_DATOS, 'utf8'));
        const rows = [];
        rows.push(['Código','Nombre','Cargo','Obra','Sueldo Básico','Estado']);
        if (Array.isArray(datos.listaPersonal)) {
          datos.listaPersonal.forEach(p => rows.push([p.codigo,p.nombres,p.cargo,p.obra,p.sueldoBasico,p.estado]));
        }
        const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
        res.setHeader('Content-Type','text/csv');
        res.setHeader('Content-Disposition','attachment; filename="planilla_sueldos.csv"');
        res.end(csv);
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }
    try {
      const datos = obtenerODefinirDatosIniciales();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(datos));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ENDPOINT: Guardar datos centralizados en datos.json
  if (req.method === 'POST' && pathname === '/api/datos') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const datosRecibidos = JSON.parse(body);
        datosRecibidos.ultimaActualizacion = new Date().toISOString();
        
        // Escritura atómica
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(datosRecibidos, null, 2), 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, ok: true, timestamp: datosRecibidos.ultimaActualizacion }));
      } catch (err) {
        console.error('Error al guardar datos:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON inválido o error al guardar: ' + err.message }));
      }
    });
    return;
  }

  // ENDPOINT: Información de red del servidor
  if (req.method === 'GET' && pathname === '/api/info') {
    const ips = obtenerIPsLocales();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      empresa: 'Morales Larrazábal M.L. Consultoría y Construcción S.R.L.',
      puerto: PORT,
      ipsLocales: ips,
      urlPrincipal: `http://localhost:${PORT}`,
      urlsRed: ips.map(ip => `http://${ip}:${PORT}`)
    }));
    return;
  }

  // SERVIR ARCHIVOS ESTÁTICOS
  let filePath = path.join(FRONTEND_DIR, pathname === '/' ? 'index.html' : pathname);

  // Seguridad: evitar directory traversal
  if (!filePath.startsWith(DIR_ACTUAL)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Acceso denegado');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else {
    // Si no existe, servir index.html
    const fallback = path.join(FRONTEND_DIR, 'index.html');
    if (fs.existsSync(fallback)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(fallback).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Archivo no encontrado');
    }
  }
});

// Inicializar datos antes de arrancar
obtenerODefinirDatosIniciales();

server.listen(PORT, '0.0.0.0', () => {
  const ips = obtenerIPsLocales();
  console.log('\n=======================================================================');
  console.log('   MORALES LARRAZÁBAL M.L. CONSULTORÍA Y CONSTRUCCIÓN S.R.L.');
  console.log('    SERVIDOR CENTRAL DE PERSONAL, OBRAS Y PLANILLAS ACTIVO');
  console.log('=======================================================================');
  console.log(`\n💻 Acceso local en este equipo:`);
  console.log(`   👉 http://localhost:${PORT}`);
  if (ips.length > 0) {
    console.log(`\n🌐 Acceso compartido desde otras computadoras/celulares en la oficina:`);
    ips.forEach(ip => {
      console.log(`   👉 http://${ip}:${PORT}`);
    });
  }
  console.log(`\n📁 Base de datos persistente: ${ARCHIVO_DATOS}`);
  console.log('=======================================================================\n');
});
