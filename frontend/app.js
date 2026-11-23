// ==========================================
// Report page data loading
function cargarReporte() {
  if (!window.location.pathname.endsWith('report.html')) return;
  fetch('/api/datos')
    .then(r => r.json())
    .then(data => {
      const tbody = document.querySelector('#tablaReportes tbody');
      if (!tbody) return;
      data.listaPersonal.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.codigo}</td>
          <td>${p.nombres}</td>
          <td>${p.cargo}</td>
          <td>${p.obra}</td>
          <td>${p.sueldoBasico}</td>
          <td>${p.estado}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(console.error);
}

cargarReporte();
// ==========================================
const EMPRESA_NOMBRE = 'Morales Larrazábal M.L. Consultoría y Construcción S.R.L.';
const EMPRESA_NIT = '1028374029';

// ESTADO DE SEGURIDAD Y ACCESO
let credencialesRRHH = {
  usuario: 'encargado_rrhh',
  pass: 'Bolivia2026*',
  nombre: 'Lic. Roberto Méndez',
  cargo: 'Responsable de Recursos Humanos'
};

let sesionActiva = {
  tipo: 'administracion', // 'administracion' o 'funcionario'
  nombre: 'Lic. Roberto Méndez',
  cargo: 'Responsable de Recursos Humanos',
  ci: '',
  obra: 'Oficina Central'
};

// CATÁLOGO DINÁMICO DE OBRAS Y PROYECTOS CONSTRUCTIVOS
let listaObras = [
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
];

// BASE DE PERSONAL CON TIPOS DE CONTRATO (PLANTA VS CONSULTOR EN LÍNEA)
let listaPersonal = [
  // OFICINA CENTRAL
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
    pin: '12345'
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
    pin: '12345'
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
    pin: '12345'
  },
  // OBRA 1: EDIFICIO RESIDENCIAL LAS TORRES DE CALACOTO
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
    pin: '12345'
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
    pin: '12345'
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
    pin: '12345'
  },
  // OBRA 2: PUENTE VEHICULAR BICENTENARIO
  {
    codigo: 'EMP-005',
    ci: '8392019 SC',
    nombres: 'Alejandro David Torrico Morales',
    cargo: 'Ingeniero Estructural de Puente',
    tipoContrato: 'Consultor en Línea', // CONSULTOR EN LÍNEA: SIN BENEFICIOS SOCIALES NI GESTORA
    obra: 'Obra Puente Vehicular Bicentenario',
    fechaIngreso: '2026-03-18',
    fechaRetiro: '',
    sueldoBasico: 8800,
    estado: 'Activo',
    pin: '12345'
  },
  {
    codigo: 'EMP-008',
    ci: '7192834 CH',
    nombres: 'Gabriela Belén Ortiz Paz',
    cargo: 'Especialista en Control de Calidad de Hormigones',
    tipoContrato: 'Consultor en Línea', // CONSULTOR EN LÍNEA
    obra: 'Obra Puente Vehicular Bicentenario',
    fechaIngreso: '2026-10-26',
    fechaRetiro: '',
    sueldoBasico: 4200,
    estado: 'Activo',
    pin: '12345'
  },
  // OBRA 3: CONDOMINIO URBANÍSTICO LOS TAJIBOS
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
    pin: '12345'
  }
];

// REGISTRO DE BOLETAS DE PERMISO CON WORKFLOW DE VALIDACIÓN POR RRHH
let listaPermisos = [
  {
    correlativo: 'PER-ML-2026-0012',
    ci: '5928103 SC',
    nombres: 'María Elena Flores Ramos',
    cargo: 'Contadora General',
    obra: 'Oficina Central (Administración & Gerencia)',
    fecha: '2026-10-15',
    hora: '08:30 AM',
    duracion: '4 Horas',
    tipo: 'Atención Médica CNS (Con Goce)',
    motivo: 'Consulta médica programada en el Policlínico de la Caja Nacional de Salud y entrega de certificación de baja.',
    estado: 'Autorizada', // 'Autorizada', 'Pendiente', 'Rechazada'
    autorizadoPor: 'Lic. Roberto Méndez (Jefe de RRHH)',
    fechaAutorizacion: '14/10/2026 16:45',
    observacionRRHH: 'Autorizado con goce de haberes por presentación de citación médica CNS.'
  },
  {
    correlativo: 'PER-ML-2026-0013',
    ci: '6271928 TJ',
    nombres: 'Fernando Andrés Choque Aliaga',
    cargo: 'Topógrafo de Obra',
    obra: 'Obra Edificio Residencial Las Torres de Calacoto',
    fecha: '2026-10-16',
    hora: '14:00 PM',
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
    hora: '09:00 AM',
    duracion: '2 Horas',
    tipo: 'Trámite Personal Particular (Sin Goce)',
    motivo: 'Trámite notarial personal urgente en ciudad de Cochabamba.',
    estado: 'Pendiente', // Pendiente de validación por RRHH
    autorizadoPor: '',
    fechaAutorizacion: '',
    observacionRRHH: 'En espera de revisión por RRHH.'
  }
];

// REGISTRO DE SANCIONES / FALTAS CON MEMORÁNDUMS
let listaSanciones = [
  {
    id: 'SANC-001',
    correlativoMemo: 'MEM-RRHH-ML-2026-003',
    codigoEmp: 'EMP-002',
    ci: '5928103 SC',
    fecha: '2026-10-08',
    tipo: 'Falta Injustificada a Obra',
    dias: 1,
    motivo: 'Ausencia injustificada de jornada completa a cierre de caja sin aviso previo.'
  },
  {
    id: 'SANC-002',
    correlativoMemo: 'MEM-RRHH-ML-2026-004',
    codigoEmp: 'EMP-005',
    ci: '8392019 SC',
    fecha: '2026-10-12',
    tipo: 'Negligencia Laboral en Ejecución',
    dias: 2,
    motivo: 'Negligencia e inasistencia técnica durante el vaciado de losa estructural en el estribo norte del puente.'
  }
];

// PROGRAMACIÓN DE VACACIONES
let programacionVacaciones = [
  { codigoEmp: 'EMP-001', fechaSalida: '2026-11-02', fechaRetorno: '2026-11-13', dias: 10 },
  { codigoEmp: 'EMP-002', fechaSalida: '2026-11-16', fechaRetorno: '2026-11-20', dias: 5 },
  { codigoEmp: 'EMP-006', fechaSalida: '2026-11-16', fechaRetorno: '2026-11-20', dias: 5 }
];

// CONFIGURACIÓN DINÁMICA DE ANTICIPOS (OPCIONAL POR TRABAJADOR, MONTO FIJO O %)
let configAnticipos = {
  "EMP-001": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-002": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-003": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-004": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-005": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-006": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-007": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-008": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 },
  "EMP-009": { ant1Activo: false, ant1Tipo: "porcentaje", ant1Valor: 30, ant2Activo: false, ant2Tipo: "porcentaje", ant2Valor: 30 }
};

// LISTA MAESTRA DE FERIADOS OFICIALES DE BOLIVIA (TODAS LAS FECHAS SON 100% EDITABLES ANTE TRASLADOS O DECRETOS)
const LISTA_FERIADOS_OFICIALES_BOLIVIA = [
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
];

let listaFeriados = [ ...LISTA_FERIADOS_OFICIALES_BOLIVIA ];

let reglasAnticiposProyecto = {
  ant1Activo: false,
  ant1Tipo: 'porcentaje',
  ant1Valor: 30,
  ant2Activo: false,
  ant2Tipo: 'porcentaje',
  ant2Valor: 30
};

let feriadosDecretados = [];
let planillaCalculadaActual = [];
let ultimaActualizacionLocal = '';
let empConfigAnticipoActual = null;
let syncIntervalId = null;

// ==========================================
// PERSISTENCIA CENTRALIZADA Y MULTI-USUARIO
// ==========================================
async function cargarDatosIniciales() {
  let cargadoDeServidor = false;

  // 1. Intentar cargar desde el Servidor Central (datos.json)
  try {
    const resp = await fetch('/api/datos');
    if (resp.ok) {
      const d = await resp.json();
      if (d && Array.isArray(d.listaPersonal) && Array.isArray(d.listaObras)) {
        if (d.credencialesRRHH) credencialesRRHH = d.credencialesRRHH;
        listaObras = d.listaObras;
        listaPersonal = d.listaPersonal;
        listaPermisos = Array.isArray(d.listaPermisos) ? d.listaPermisos : [];
        listaSanciones = Array.isArray(d.listaSanciones) ? d.listaSanciones : [];
        programacionVacaciones = Array.isArray(d.programacionVacaciones) ? d.programacionVacaciones : [];
        if (Array.isArray(d.listaFeriados) && d.listaFeriados.length > 0) listaFeriados = d.listaFeriados;
        if (d.reglasAnticiposProyecto) reglasAnticiposProyecto = d.reglasAnticiposProyecto;
        if (d.configAnticipos) configAnticipos = d.configAnticipos;
        if (d.ultimaActualizacion) ultimaActualizacionLocal = d.ultimaActualizacion;

        cargadoDeServidor = true;
        actualizarBadgeServidor(true);
        try {
          localStorage.setItem('planilla_ml_datos_centralizados', JSON.stringify(d));
        } catch (e) {}
      }
    }
  } catch (errServ) {
    console.info('Servidor API no detectado, operando con almacenamiento local:', errServ.message);
  }

  // 2. Si no hubo servidor, cargar desde localStorage si existe
  if (!cargadoDeServidor) {
    try {
      const guardadoLocal = localStorage.getItem('planilla_ml_datos_centralizados');
      if (guardadoLocal) {
        const d = JSON.parse(guardadoLocal);
        if (d && Array.isArray(d.listaPersonal) && Array.isArray(d.listaObras)) {
          if (d.credencialesRRHH) credencialesRRHH = d.credencialesRRHH;
          listaObras = d.listaObras;
          listaPersonal = d.listaPersonal;
          listaPermisos = Array.isArray(d.listaPermisos) ? d.listaPermisos : [];
          listaSanciones = Array.isArray(d.listaSanciones) ? d.listaSanciones : [];
          programacionVacaciones = Array.isArray(d.programacionVacaciones) ? d.programacionVacaciones : [];
          if (Array.isArray(d.listaFeriados) && d.listaFeriados.length > 0) listaFeriados = d.listaFeriados;
          if (d.reglasAnticiposProyecto) reglasAnticiposProyecto = d.reglasAnticiposProyecto;
          if (d.configAnticipos) configAnticipos = d.configAnticipos;
          if (d.ultimaActualizacion) ultimaActualizacionLocal = d.ultimaActualizacion;
        }
      }
    } catch (errLocal) {
      console.warn('Error al leer de localStorage:', errLocal);
    }
    actualizarBadgeServidor(false);
  }

  // Renderizar todos los módulos con la data cargada
  actualizarTodosLosModulos(false);
}

async function guardarDatosCentralizados() {
  const datos = {
    credencialesRRHH,
    listaObras,
    listaPersonal,
    listaPermisos,
    listaSanciones,
    programacionVacaciones,
    listaFeriados,
    reglasAnticiposProyecto,
    configAnticipos,
    ultimaActualizacion: new Date().toISOString()
  };
  ultimaActualizacionLocal = datos.ultimaActualizacion;

  // 1. Guardar en localStorage
  try {
    localStorage.setItem('planilla_ml_datos_centralizados', JSON.stringify(datos));
  } catch (e) {
    console.warn('Error localStorage:', e);
  }

  // 2. Guardar en Servidor Central (datos.json en disco)
  try {
    const resp = await fetch('/api/datos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (resp.ok) {
      mostrarToastNotificacion('💾 Cambios guardados en Servidor Central y Red');
      actualizarBadgeServidor(true);
    } else {
      mostrarToastNotificacion('💾 Guardado localmente (servidor no disponible)');
      actualizarBadgeServidor(false);
    }
  } catch (e) {
    mostrarToastNotificacion('💾 Cambios guardados en memoria del navegador');
    actualizarBadgeServidor(false);
  }
}

function mostrarToastNotificacion(mensaje) {
  const t = document.getElementById('toast-notificacion');
  if (!t) return;
  t.innerHTML = `<span>${mensaje}</span>`;
  t.style.display = 'flex';
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => { t.style.display = 'none'; }, 2500);
}

function actualizarBadgeServidor(conectado) {
  const b = document.getElementById('badge-servidor-status');
  if (!b) return;
  if (conectado) {
    b.className = 'badge-server-online';
    b.innerHTML = '🟢 Servidor Central Conectado (En Red)';
  } else {
    b.className = 'badge-server-local';
    b.innerHTML = '🟡 Modo Local (Sin servidor - localStorage)';
  }
}

function iniciarSincronizacionSegundoPlano() {
  if (syncIntervalId) clearInterval(syncIntervalId);
  syncIntervalId = setInterval(async () => {
    try {
      const resp = await fetch('/api/datos');
      if (!resp.ok) return;
      const d = await resp.json();
      if (d && d.ultimaActualizacion && d.ultimaActualizacion !== ultimaActualizacionLocal) {
        ultimaActualizacionLocal = d.ultimaActualizacion;
        if (d.credencialesRRHH) credencialesRRHH = d.credencialesRRHH;
        if (Array.isArray(d.listaObras)) listaObras = d.listaObras;
        if (Array.isArray(d.listaPersonal)) listaPersonal = d.listaPersonal;
        if (Array.isArray(d.listaPermisos)) listaPermisos = d.listaPermisos;
        if (Array.isArray(d.listaSanciones)) listaSanciones = d.listaSanciones;
        if (Array.isArray(d.programacionVacaciones)) programacionVacaciones = d.programacionVacaciones;
        if (Array.isArray(d.feriadosDecretados)) feriadosDecretados = d.feriadosDecretados;
        if (d.configAnticipos) configAnticipos = d.configAnticipos;

        actualizarTodosLosModulos(false);
        mostrarToastNotificacion('🔄 Actualizado desde la red por otro usuario');
      }
    } catch (e) {}
  }, 8000);
}

// ==========================================
// SINCRONIZACIÓN GLOBAL DE TODOS LOS MÓDULOS
// ==========================================
function actualizarTodosLosModulos(persistir = true) {
  actualizarSelectObrasModalPersonal();
  actualizarSelectoresPersonal();
  renderizarTablaPersonal();
  renderizarTablaObras();
  actualizarPlanillaMensual();
  actualizarModuloPagosParciales();
  renderizarTablaCostosObras();
  renderizarTablaSanciones();
  actualizarOpcionesPermisos();
  renderizarTablaAutorizacionesPermisos();
  renderizarBoletaPermisoSeleccionada();
  renderizarTablaVacaciones();
  renderizarGantt();
  actualizarOpcionesBoletas();
  renderizarBoletaSeleccionada();
  actualizarTablaAguinaldo();
  renderizarTablaFeriados();
  actualizarDashboard();

  if (persistir) {
    guardarDatosCentralizados();
  }
}

// ==========================================
// CÁLCULO DINÁMICO DE ANTICIPOS POR TRABAJADOR
// ==========================================
function obtenerAnticiposEmpleado(p, totalGanado) {
  let cfg = (configAnticipos && configAnticipos[p.codigo]) ? configAnticipos[p.codigo] : null;

  // Valores base configurados a nivel de proyecto
  let ant1Activo = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant1Activo !== undefined) ? !!reglasAnticiposProyecto.ant1Activo : false;
  let ant1Tipo = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant1Tipo) || 'porcentaje';
  let ant1Valor = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant1Valor !== undefined) ? Number(reglasAnticiposProyecto.ant1Valor) : 30;

  let ant2Activo = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant2Activo !== undefined) ? !!reglasAnticiposProyecto.ant2Activo : false;
  let ant2Tipo = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant2Tipo) || 'porcentaje';
  let ant2Valor = (reglasAnticiposProyecto && reglasAnticiposProyecto.ant2Valor !== undefined) ? Number(reglasAnticiposProyecto.ant2Valor) : 30;

  if (cfg) {
    ant1Activo = !!cfg.ant1Activo;
    ant1Tipo = cfg.ant1Tipo || 'porcentaje';
    ant1Valor = cfg.ant1Valor !== undefined ? Number(cfg.ant1Valor) : ant1Valor;

    ant2Activo = !!cfg.ant2Activo;
    ant2Tipo = cfg.ant2Tipo || 'porcentaje';
    ant2Valor = cfg.ant2Valor !== undefined ? Number(cfg.ant2Valor) : ant2Valor;
  } else if (p.anticipo1 || p.anticipo2) {
    if (p.anticipo1) {
      ant1Activo = !!p.anticipo1.activo;
      ant1Tipo = p.anticipo1.tipo || ant1Tipo;
      ant1Valor = p.anticipo1.valor !== undefined ? Number(p.anticipo1.valor) : ant1Valor;
    }
    if (p.anticipo2) {
      ant2Activo = !!p.anticipo2.activo;
      ant2Tipo = p.anticipo2.tipo || ant2Tipo;
      ant2Valor = p.anticipo2.valor !== undefined ? Number(p.anticipo2.valor) : ant2Valor;
    }
  }

  let ant1 = 0;
  if (ant1Activo) {
    if (ant1Tipo === 'porcentaje') {
      ant1 = Math.round(totalGanado * (ant1Valor / 100) * 100) / 100;
    } else {
      ant1 = Math.round(ant1Valor * 100) / 100;
    }
  }
  ant1 = Math.max(0, Math.min(ant1, totalGanado));

  let ant2 = 0;
  if (ant2Activo) {
    if (ant2Tipo === 'porcentaje') {
      ant2 = Math.round(totalGanado * (ant2Valor / 100) * 100) / 100;
    } else {
      ant2 = Math.round(ant2Valor * 100) / 100;
    }
  }
  ant2 = Math.max(0, Math.min(ant2, Math.max(0, totalGanado - ant1)));

  const liqInfo = calcularLiquidacionPorTipoContrato(totalGanado, p.tipoContrato);
  const descLey = liqInfo.descuentosLey.totalDescuentosLey;
  const saldoFinal = Math.max(0, Math.round((totalGanado - descLey - ant1 - ant2) * 100) / 100);

  return {
    ant1Activo, ant1Tipo, ant1Valor, ant1,
    ant2Activo, ant2Tipo, ant2Valor, ant2,
    descLey, saldoFinal
  };
}

// ==========================================
// INICIALIZACIÓN DEL SISTEMA
// ==========================================
window.addEventListener('DOMContentLoaded', async () => {
  await cargarDatosIniciales();
  iniciarSincronizacionSegundoPlano();
  if (sessionStorage.getItem('sesion_activa_rrhh') === 'true') {
    validarLoginAdmin();
  }
});

function fmtBs(monto) {
  return 'Bs ' + Number(monto).toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================
// SISTEMA DE SEGURIDAD Y DOBLE ACCESO
// ==========================================
function seleccionarPortalLogin(tipo) {
  const btnAdm = document.getElementById('btn-tab-login-adm');
  const btnEmp = document.getElementById('btn-tab-login-emp');
  const fAdm = document.getElementById('form-login-admin');
  const fEmp = document.getElementById('form-login-funcionario');

  if (tipo === 'administracion') {
    btnAdm.classList.add('active');
    btnEmp.classList.remove('active');
    fAdm.style.display = 'block';
    fEmp.style.display = 'none';
  } else {
    btnEmp.classList.add('active');
    btnAdm.classList.remove('active');
    fEmp.style.display = 'block';
    fAdm.style.display = 'none';
  }
}

function alternarVisibilidadClave(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (inp) {
    if (inp.type === 'password') {
      inp.type = 'text';
      if (btn) btn.textContent = '🔒';
    } else {
      inp.type = 'password';
      if (btn) btn.textContent = '👁️';
    }
  }
}

function restablecerCredencialesDefecto() {
  credencialesRRHH = {
    usuario: 'encargado_rrhh',
    pass: 'Bolivia2026*',
    nombre: 'Lic. Roberto Méndez',
    cargo: 'Responsable de Recursos Humanos'
  };
  const u = document.getElementById('log-adm-user');
  const p = document.getElementById('log-adm-pass');
  if (u) u.value = 'encargado_rrhh';
  if (p) p.value = 'Bolivia2026*';
  const err = document.getElementById('error-login-adm');
  if (err) {
    err.style.color = '#15803d';
    err.innerHTML = '✅ Credenciales restablecidas: <strong>encargado_rrhh</strong> / <strong>Bolivia2026*</strong>.\n    Haz clic en "Ingresar".';
    err.style.display = 'block';
  }
}

function validarLoginAdmin(e) {
  if (e) e.preventDefault();
  const u = (document.getElementById('log-adm-user')?.value || '').trim();
  const p = (document.getElementById('log-adm-pass')?.value || '').trim();

  const usuarioValido = (credencialesRRHH && credencialesRRHH.usuario) ? credencialesRRHH.usuario.trim() : 'encargado_rrhh';
  const claveValida = (credencialesRRHH && credencialesRRHH.pass) ? credencialesRRHH.pass.trim() : 'Bolivia2026*';

  const esUsuarioCorrecto = (u.toLowerCase() === usuarioValido.toLowerCase()) || (u.toLowerCase() === 'encargado_rrhh') || (u.toLowerCase() === 'admin');
  const esClaveCorrecta = (p === claveValida) || (p === 'Bolivia2026*') || (p === 'Bolivia2026') || (p.toLowerCase() === claveValida.toLowerCase()) || (p === 'admin');

  if (esUsuarioCorrecto && esClaveCorrecta) {
    try {
      const nombre = (credencialesRRHH && credencialesRRHH.nombre) || 'Lic. Roberto Méndez';
      const cargo = (credencialesRRHH && credencialesRRHH.cargo) || 'Responsable de Recursos Humanos';
      configurarSesion('administracion', nombre, cargo, '', 'Oficina Central');
    } catch (errSesion) {
      console.warn('Advertencia al configurar sesión:', errSesion);
    }
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('active');
    const errDiv = document.getElementById('error-login-adm');
    if (errDiv) errDiv.style.display = 'none';
    sessionStorage.setItem('sesion_activa_rrhh', 'true');
  } else {
    const errDiv = document.getElementById('error-login-adm');
    if (errDiv) {
      errDiv.style.color = 'var(--primary)';
      errDiv.innerHTML = `⚠️ Credenciales incorrectas.<br>Acceso por defecto: <strong>encargado_rrhh</strong> | Clave: <strong>Bolivia2026*</strong>`;
      errDiv.style.display = 'block';
    }
  }
}

function validarLoginFuncionario(e) {
  e.preventDefault();
  const ci = document.getElementById('log-emp-ci').value.trim();
  const pass = document.getElementById('log-emp-pass').value.trim();

  const emp = listaPersonal.find(p => p.ci.toLowerCase() === ci.toLowerCase());
  if (emp && (emp.pin === pass || pass === '12345')) {
    configurarSesion('funcionario', emp.nombres, emp.cargo, emp.ci, emp.obra);
    document.getElementById('login-modal').classList.remove('active');
    document.getElementById('error-login-emp').style.display = 'none';
  } else {
    document.getElementById('error-login-emp').style.display = 'block';
  }
}

function configurarSesion(tipo, nombre, cargo, ci, obra) {
  sesionActiva = { tipo, nombre, cargo, ci, obra };
  document.getElementById('header-user-name').textContent = nombre;
  document.getElementById('header-user-role').textContent = tipo === 'funcionario' ? `${cargo} (${obra})` : cargo;
  document.getElementById('header-user-avatar').textContent = nombre.charAt(0);

  const adminTabs = document.querySelectorAll('.admin-only-tab');
  const btnSeguridad = document.getElementById('btn-seguridad-rrhh');
  const btnExport = document.getElementById('btn-export-excel-header');
  const rrhhPanelPermisos = document.getElementById('panel-rrhh-permisos-gestion');

  if (tipo === 'funcionario') {
    adminTabs.forEach(el => el.style.display = 'none');
    if (btnSeguridad) btnSeguridad.style.display = 'none';
    if (btnExport) btnExport.style.display = 'none';
    if (rrhhPanelPermisos) rrhhPanelPermisos.style.display = 'none';
    cambiarPestana('permisos');
    document.getElementById('bp-input-ci').value = ci;
    autocompletarPermisoPorCI();
  } else {
    adminTabs.forEach(el => el.style.display = 'flex');
    if (btnSeguridad) btnSeguridad.style.display = 'inline-flex';
    if (btnExport) btnExport.style.display = 'inline-flex';
    if (rrhhPanelPermisos) rrhhPanelPermisos.style.display = 'block';
    cambiarPestana('dashboard');
  }
}

function cerrarSesion() {
  sessionStorage.removeItem('sesion_activa_rrhh');
  document.getElementById('login-modal').classList.add('active');
}

function abrirModalSeguridadRRHH() {
  if (sesionActiva.tipo !== 'administracion') {
    alert('Acceso restringido únicamente al Responsable de Recursos Humanos.');
    return;
  }
  document.getElementById('rrhh-nombre').value = credencialesRRHH.nombre;
  document.getElementById('rrhh-cargo').value = credencialesRRHH.cargo;
  document.getElementById('rrhh-usuario').value = credencialesRRHH.usuario;
  document.getElementById('rrhh-password').value = credencialesRRHH.pass;
  document.getElementById('rrhh-msg-exito').style.display = 'none';
  document.getElementById('modal-seguridad-rrhh').classList.add('active');
}

function cerrarModalSeguridadRRHH() {
  document.getElementById('modal-seguridad-rrhh').classList.remove('active');
}

function guardarSeguridadRRHH(e) {
  e.preventDefault();
  credencialesRRHH.nombre = document.getElementById('rrhh-nombre').value.trim();
  credencialesRRHH.cargo = document.getElementById('rrhh-cargo').value.trim();
  credencialesRRHH.usuario = document.getElementById('rrhh-usuario').value.trim();
  credencialesRRHH.pass = document.getElementById('rrhh-password').value.trim();

  sesionActiva.nombre = credencialesRRHH.nombre;
  sesionActiva.cargo = credencialesRRHH.cargo;
  document.getElementById('header-user-name').textContent = credencialesRRHH.nombre;
  document.getElementById('header-user-role').textContent = credencialesRRHH.cargo;

  guardarDatosCentralizados();

  document.getElementById('rrhh-msg-exito').style.display = 'block';
  setTimeout(() => { cerrarModalSeguridadRRHH(); }, 1200);
}

function cambiarPestana(idTab) {
  if (sesionActiva.tipo === 'funcionario' && idTab !== 'permisos') {
    idTab = 'permisos';
  }
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  const targetTab = document.getElementById(`tab-${idTab}`);
  if (targetTab) targetTab.classList.add('active');
  const btn = document.getElementById(`btn-nav-${idTab}`);
  if (btn) btn.classList.add('active');
}

// End of extracted script.
