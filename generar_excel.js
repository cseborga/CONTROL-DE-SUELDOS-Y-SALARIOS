const fs = require('fs');
const path = require('path');
const XLSX = require('./xlsx.full.min.js');
const {
  obtenerFeriadosBolivia,
  calcularDiasCalendarioTrabajados,
  calcularSueldoProrrateado30Dias,
  calcularDescuentosGestora,
  calcularAguinaldoNavidad,
  calcularEscalaVacacionesBolivia,
  calcularCargasPatronalesBolivia,
  calcularLiquidacionPorTipoContrato,
  calcularPagosParciales,
  calcularGastoTotalObra,
  numeroALetras
} = require('./feriados_bolivia.js');

console.log('Generando Planilla Excel para Morales Larrazábal M.L. Consultoría y Construcción S.R.L....');

const workbook = XLSX.utils.book_new();

const EMPRESA_NOMBRE = 'Morales Larrazábal M.L. Consultoría y Construcción S.R.L.';
const EMPRESA_NIT = '1028374029';
const anioPlanilla = 2026;
const mesPlanilla = 10;
const depto = 'LA PAZ';
const feriados = obtenerFeriadosBolivia(anioPlanilla, depto);

// Catálogo de Obras y Proyectos de Construcción con Fechas de Inicio y Finalización
let obrasCatalogo = [
  {
    id: 'OBRA-00',
    nombre: 'Oficina Central (Administración & Gerencia)',
    tipo: 'Administrativa Permanente',
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

// Personal asignado por Obra / Oficina Central diferenciado por Tipo de Contrato (Planta vs Consultor en Línea)
let personal = [
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
    estado: 'Activo'
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
    estado: 'Activo'
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
    estado: 'Activo'
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
    estado: 'Retirado / Fin Contrato'
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
    estado: 'Activo'
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
    estado: 'Activo'
  },

  // OBRA 2: PUENTE VEHICULAR BICENTENARIO
  {
    codigo: 'EMP-005',
    ci: '8392019 SC',
    nombres: 'Alejandro David Torrico Morales',
    cargo: 'Ingeniero Estructural de Puente',
    tipoContrato: 'Consultor en Línea', // CONSULTOR EN LÍNEA: SIN APORTES GESTORA NI CARGAS SOCIALES
    obra: 'Obra Puente Vehicular Bicentenario',
    fechaIngreso: '2026-03-18',
    fechaRetiro: '',
    sueldoBasico: 8800,
    estado: 'Activo'
  },
  {
    codigo: 'EMP-008',
    ci: '7192834 CH',
    nombres: 'Gabriela Belén Ortiz Paz',
    cargo: 'Control de Calidad de Hormigones',
    tipoContrato: 'Consultor en Línea', // CONSULTOR EN LÍNEA
    obra: 'Obra Puente Vehicular Bicentenario',
    fechaIngreso: '2026-10-26',
    fechaRetiro: '',
    sueldoBasico: 4200,
    estado: 'Activo'
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
    estado: 'Activo'
  }
];

// Registro de Sanciones / Faltas
let registroSanciones = {
  'EMP-002': 1,
  'EMP-005': 2
};

let configAnticipos = {};

// Sincronización automática con datos.json si existe
const rutaDatosJson = path.join(__dirname, 'datos.json');
if (fs.existsSync(rutaDatosJson)) {
  try {
    const raw = fs.readFileSync(rutaDatosJson, 'utf8');
    const d = JSON.parse(raw);
    if (Array.isArray(d.listaObras) && d.listaObras.length > 0) obrasCatalogo = d.listaObras;
    if (Array.isArray(d.listaPersonal) && d.listaPersonal.length > 0) personal = d.listaPersonal;
    if (d.configAnticipos) configAnticipos = d.configAnticipos;
    if (Array.isArray(d.listaSanciones)) {
      registroSanciones = {};
      d.listaSanciones.forEach(s => {
        const codigo = s.codigoEmp || (personal.find(p => p.ci === s.ci) || {}).codigo;
        if (codigo) {
          registroSanciones[codigo] = (registroSanciones[codigo] || 0) + parseFloat(s.dias || 0);
        }
      });
    }
    console.log(`[OK] Datos sincronizados desde datos.json (${personal.length} empleados, ${obrasCatalogo.length} obras).`);
  } catch (err) {
    console.warn('[ADVERTENCIA] Error leyendo datos.json:', err.message);
  }
}

// ==========================================
// HOJA 1: PARÁMETROS, EMPRESA Y GESTIÓN DE OBRAS
// ==========================================
const paramData = [
  ['MORALES LARRAZÁBAL M.L. CONSULTORÍA Y CONSTRUCCIÓN S.R.L.'],
  ['SISTEMA DE GESTIÓN DE PERSONAL, OBRAS Y PLANILLAS DE HABERES'],
  ['NIT:', EMPRESA_NIT, 'Gestión:', anioPlanilla, 'Operador:', 'Lic. Roberto Méndez (RRHH)'],
  [],
  ['CATÁLOGO OFICIAL DE OBRAS CONSTRUCTIVAS Y PROYECTOS'],
  ['Código', 'Nombre del Proyecto / Obra', 'Tipo de Proyecto', 'Ubicación', 'Fecha Inicio', 'Fecha Finalización', 'Presupuesto Mano de Obra (Bs)', 'Estado']
];

obrasCatalogo.forEach(o => {
  paramData.push([o.id, o.nombre, o.tipo, o.ubicacion, o.fechaInicio, o.fechaFin || 'En Ejecución', o.presupuestoManoObra, o.estado]);
});

paramData.push([]);
paramData.push(['RÉGIMEN LEGAL Y MODALIDADES DE CONTRATACIÓN']);
paramData.push(['Modalidad', 'Aporte Gestora (12.71%)', 'Cargas Patronales (16.71%)', 'Beneficios Sociales (16.66%)', 'Documento Emitido']);
paramData.push(['Personal de Planta', 'SÍ (Retención)', 'SÍ (Costo Constructora)', 'SÍ (Aguinaldo e Indemnización)', 'Boleta Oficial de Pago']);
paramData.push(['Consultor en Línea', 'NO (0% Exento)', 'NO (0% Sin Carga)', 'NO (Sin Beneficios Sociales)', 'Comprobante Oficial de Pago']);

const wsParam = XLSX.utils.aoa_to_sheet(paramData);
wsParam['!cols'] = [{ wch: 15 }, { wch: 45 }, { wch: 28 }, { wch: 25 }, { wch: 15 }, { wch: 18 }, { wch: 25 }, { wch: 18 }];
XLSX.utils.book_append_sheet(workbook, wsParam, '01_Parametros_Obras');

// ==========================================
// HOJA 2: REGISTRO DE PERSONAL Y CONTRATOS
// ==========================================
const personalData = [
  ['BASE DE DATOS DE PERSONAL Y CONTRATOS - ' + EMPRESA_NOMBRE],
  ['Diferenciación contractual: Personal de Planta (Beneficios de Ley) vs Consultores de Línea (Servicios sin beneficios)'],
  [],
  ['N°', 'Código', 'C.I.', 'Nombres y Apellidos', 'Cargo', 'Tipo Contrato', 'Obra / Frente de Trabajo', 'Fecha Ingreso', 'Fecha Fin Contrato', 'Sueldo / Honorario (Bs)', 'Estado']
];

personal.forEach((p, idx) => {
  personalData.push([
    idx + 1,
    p.codigo,
    p.ci,
    p.nombres,
    p.cargo,
    p.tipoContrato,
    p.obra,
    p.fechaIngreso,
    p.fechaRetiro || 'Vigente / Indefinido',
    p.sueldoBasico,
    p.estado
  ]);
});

const wsPersonal = XLSX.utils.aoa_to_sheet(personalData);
wsPersonal['!cols'] = [
  { wch: 5 }, { wch: 12 }, { wch: 14 }, { wch: 34 }, { wch: 32 }, { wch: 20 }, { wch: 42 }, { wch: 15 }, { wch: 20 }, { wch: 22 }, { wch: 20 }
];
XLSX.utils.book_append_sheet(workbook, wsPersonal, '02_Registro_Personal');

// ==========================================
// HOJA 3: GASTO TOTAL ACUMULADO POR OBRA
// ==========================================
const liquidacionObrasData = [
  [EMPRESA_NOMBRE.toUpperCase()],
  ['LIQUIDACIÓN DE GASTO TOTAL ACUMULADO EN MANO DE OBRA POR PROYECTO'],
  ['Cálculo de sueldos, honorarios y cargas patronales devengadas desde fecha de inicio hasta finalización de cada obra'],
  [],
  [
    'Código',
    'Nombre del Proyecto / Obra',
    'Fecha Inicio',
    'Fecha Finalización',
    'Duración (Meses)',
    'Días Totales',
    'Personal Asignado',
    'Costo Mensual Empresa (Bs)',
    'GASTO TOTAL ACUMULADO (Bs)',
    'Presupuesto Inicial (Bs)',
    '% Ejecución Presupuestaria'
  ]
];

obrasCatalogo.forEach(o => {
  const personalDeEstaObra = personal.filter(p => p.obra === o.nombre);
  const gastoInfo = calcularGastoTotalObra(o, personalDeEstaObra);
  const pct = o.presupuestoManoObra > 0 ? ((gastoInfo.gastoAcumuladoTotal / o.presupuestoManoObra) * 100).toFixed(1) + '%' : 'N/A';

  liquidacionObrasData.push([
    o.id,
    o.nombre,
    o.fechaInicio,
    o.fechaFin || 'En Ejecución',
    gastoInfo.mesesEquiv,
    gastoInfo.diasTotales,
    gastoInfo.personalCount,
    gastoInfo.costoMensualTotal,
    gastoInfo.gastoAcumuladoTotal,
    o.presupuestoManoObra,
    pct
  ]);
});

const wsLiqObras = XLSX.utils.aoa_to_sheet(liquidacionObrasData);
wsLiqObras['!cols'] = [
  { wch: 12 }, { wch: 45 }, { wch: 15 }, { wch: 18 }, { wch: 16 }, { wch: 14 }, { wch: 18 }, { wch: 25 }, { wch: 26 }, { wch: 24 }, { wch: 24 }
];
XLSX.utils.book_append_sheet(workbook, wsLiqObras, '03_Costo_Total_Obras');

// ==========================================
// HOJA 4: PLANILLA MENSUAL CON SUBTOTALES POR OBRA
// ==========================================
const planillaData = [
  ['MORALES LARRAZÁBAL M.L. CONSULTORÍA Y CONSTRUCCIÓN S.R.L.'],
  ['PLANILLA MENSUAL DE SUELDOS CON SUB-TOTALES POR OBRA Y OFICINA CENTRAL'],
  ['Período:', 'Octubre / 2026', 'Base Prorrateo:', '30 Días Comerciales Laborales'],
  [],
  [
    'N°',
    'C.I.',
    'Nombres y Apellidos',
    'Cargo',
    'Tipo Contrato',
    'Obra / Frente',
    'Ingreso',
    'Fin Contrato',
    'Días Cal.',
    'Días Sanción',
    'Días Efect.',
    'Básico (Bs)',
    'Total Ganado (Bs)',
    'Gestora 12.71% (Bs)',
    'Líquido Pagable (Bs)',
    'Documento / Observación'
  ]
];

let granBasico = 0, granGanado = 0, granGestora = 0, granLiquido = 0;
let correlativoGlobal = 1;
const resumenCostosPorObra = [];

obrasCatalogo.forEach(o => {
  const nombreObra = o.nombre;
  const grupo = personal.filter(p => p.obra === nombreObra);
  if (grupo.length === 0) return;

  planillaData.push([`>>> FRENTE DE TRABAJO: ${nombreObra.toUpperCase()}`]);

  let subBasico = 0, subGanado = 0, subGestora = 0, subLiquido = 0, subTrabajadores = 0;
  let subCargas = 0, subBenef = 0, subTotalEmpresa = 0;

  grupo.forEach(p => {
    const sancion = registroSanciones[p.codigo] || 0;
    const cal = calcularDiasCalendarioTrabajados(anioPlanilla, mesPlanilla, p.fechaIngreso, p.fechaRetiro, sancion);
    const sueldoProrr = calcularSueldoProrrateado30Dias(p.sueldoBasico, cal.diasEfectivos);
    const totalGanado = sueldoProrr;

    const liqCalc = calcularLiquidacionPorTipoContrato(totalGanado, p.tipoContrato);
    const descGestora = liqCalc.descuentosLey.totalDescuentosLey;
    const liquido = liqCalc.liquidoPagable;

    subBasico += p.sueldoBasico;
    subGanado += totalGanado;
    subGestora += descGestora;
    subLiquido += liquido;
    subTrabajadores++;

    subCargas += liqCalc.cargasPatronales.totalCargas;
    subBenef += liqCalc.cargasPatronales.totalBeneficios;
    subTotalEmpresa += liqCalc.cargasPatronales.costoTotalEmpresa;

    planillaData.push([
      correlativoGlobal++,
      p.ci,
      p.nombres,
      p.cargo,
      p.tipoContrato,
      p.obra,
      p.fechaIngreso,
      p.fechaRetiro || 'Vigente',
      cal.diasCalendario,
      cal.diasSancion,
      cal.diasEfectivos,
      p.sueldoBasico,
      totalGanado,
      descGestora,
      liquido,
      p.tipoContrato === 'Planta' ? 'Boleta de Pago' : 'Comprobante de Pago'
    ]);
  });

  // Fila de Subtotal por Obra
  planillaData.push([
    'SUBTOTAL',
    '',
    `SUBTOTAL ${nombreObra.toUpperCase()}`,
    `Personal: ${subTrabajadores}`,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    subBasico,
    subGanado,
    subGestora,
    subLiquido,
    'Subtotal Imputable al Proyecto'
  ]);
  planillaData.push([]); // Espacio

  granBasico += subBasico;
  granGanado += subGanado;
  granGestora += subGestora;
  granLiquido += subLiquido;

  resumenCostosPorObra.push({
    obra: nombreObra,
    personal: subTrabajadores,
    basico: subBasico,
    ganado: subGanado,
    descuentos: subGestora,
    liquido: subLiquido,
    cargasPatronales: subCargas,
    beneficiosSociales: subBenef,
    costoTotalObra: subTotalEmpresa
  });
});

// Fila de Gran Total Consolidado en Rojo Intenso (Normativa y requerimiento explícito)
planillaData.push([
  'TOTAL',
  '',
  'TOTAL CONSOLIDADO EMPRESA (MANO DE OBRA + CARGAS SOCIALES)',
  `Total Trabajadores: ${correlativoGlobal - 1}`,
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  granBasico,
  granGanado,
  granGestora,
  granLiquido,
  'Planilla Total Líquida a Transferir'
]);

const wsPlanilla = XLSX.utils.aoa_to_sheet(planillaData);
wsPlanilla['!cols'] = [
  { wch: 6 }, { wch: 14 }, { wch: 32 }, { wch: 30 }, { wch: 20 }, { wch: 40 }, { wch: 14 }, { wch: 16 },
  { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 16 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 32 }
];
XLSX.utils.book_append_sheet(workbook, wsPlanilla, '04_Planilla_Mensual_Obras');

// ==========================================
// HOJA 5: PAGOS PARCIALES Y ANTICIPOS (HASTA 3 AL MES)
// ==========================================
const pagosParcialesData = [
  [EMPRESA_NOMBRE.toUpperCase()],
  ['CONTROL DE PAGOS PARCIALES Y ANTICIPOS DE SUELDOS (HASTA 3 DESEMBOLSOS AL MES)'],
  ['Período:', 'Octubre / 2026', 'Modalidad:', 'Anticipos Opcionales y Editables (Monto o %) + Saldo Final de Cierre'],
  [],
  [
    'N°',
    'C.I.',
    'Funcionario',
    'Cargo',
    'Tipo Contrato',
    'Obra / Frente',
    'Total Ganado Mes (Bs)',
    '1er Anticipo',
    '2do Anticipo',
    'Retención Gestora (Planta)',
    'SALDO LÍQUIDO FINAL (Bs)',
    'TOTAL PAGADO EN EL MES (Bs)'
  ]
];

let sumGanadoP = 0, sumAnt1 = 0, sumAnt2 = 0, sumDescP = 0, sumSaldoP = 0, sumTotalPagadoP = 0;

personal.forEach((p, idx) => {
  const sancion = registroSanciones[p.codigo] || 0;
  const cal = calcularDiasCalendarioTrabajados(anioPlanilla, mesPlanilla, p.fechaIngreso, p.fechaRetiro, sancion);
  const totalGanado = calcularSueldoProrrateado30Dias(p.sueldoBasico, cal.diasEfectivos);

  const cfg = (configAnticipos && configAnticipos[p.codigo]) ? configAnticipos[p.codigo] : { ant1Activo: false, ant2Activo: false };
  let ant1 = 0;
  if (cfg.ant1Activo) {
    ant1 = (cfg.ant1Tipo === 'porcentaje') ? Math.round(totalGanado * (Number(cfg.ant1Valor) / 100) * 100) / 100 : Number(cfg.ant1Valor);
  }
  ant1 = Math.max(0, Math.min(ant1, totalGanado));

  let ant2 = 0;
  if (cfg.ant2Activo) {
    ant2 = (cfg.ant2Tipo === 'porcentaje') ? Math.round(totalGanado * (Number(cfg.ant2Valor) / 100) * 100) / 100 : Number(cfg.ant2Valor);
  }
  ant2 = Math.max(0, Math.min(ant2, Math.max(0, totalGanado - ant1)));

  const liqCalc = calcularLiquidacionPorTipoContrato(totalGanado, p.tipoContrato);
  const descGestora = liqCalc.descuentosLey.totalDescuentosLey;
  const saldoFinal = Math.max(0, Math.round((totalGanado - descGestora - ant1 - ant2) * 100) / 100);
  const totalPagado = Math.round((ant1 + ant2 + saldoFinal) * 100) / 100;

  sumGanadoP += totalGanado;
  sumAnt1 += ant1;
  sumAnt2 += ant2;
  sumDescP += descGestora;
  sumSaldoP += saldoFinal;
  sumTotalPagadoP += totalPagado;

  pagosParcialesData.push([
    idx + 1,
    p.ci,
    p.nombres,
    p.cargo,
    p.tipoContrato,
    p.obra,
    totalGanado,
    ant1,
    ant2,
    descGestora,
    saldoFinal,
    totalPagado
  ]);
});

pagosParcialesData.push([
  'TOTAL',
  '',
  'TOTAL DESEMBOLSOS PARCIALES EMPRESA (CONSOLIDADO)',
  '',
  '',
  '',
  sumGanadoP,
  sumAnt1,
  sumAnt2,
  sumDescP,
  sumSaldoP,
  sumTotalPagadoP
]);

const wsPagos = XLSX.utils.aoa_to_sheet(pagosParcialesData);
wsPagos['!cols'] = [
  { wch: 6 }, { wch: 14 }, { wch: 32 }, { wch: 28 }, { wch: 20 }, { wch: 40 },
  { wch: 22 }, { wch: 20 }, { wch: 20 }, { wch: 25 }, { wch: 24 }, { wch: 26 }
];
XLSX.utils.book_append_sheet(workbook, wsPagos, '05_Pagos_Parciales');

// ==========================================
// HOJA 6: CUADRO GENERAL DE COSTOS POR OBRA
// ==========================================
const cuadroCostosData = [
  [EMPRESA_NOMBRE.toUpperCase()],
  ['CUADRO FINANCIERO CONSOLIDADO DE GASTO DE PERSONAL POR OBRA Y OFICINA CENTRAL'],
  ['Mes:', 'Octubre / 2026', 'Finalidad:', 'Control de Costos de Mano de Obra e Imputación Presupuestaria por Proyecto'],
  [],
  [
    'N°',
    'Centro de Costo / Nombre de la Obra',
    'Personal Asignado',
    'Total Haber Básico (Bs)',
    'Total Ganado Prorrateado (Bs)',
    'Retenciones Ley Gestora (Bs)',
    'Líquido Pagable a Personal (Bs)',
    'Aportes Patronales Ley 16.71% (Bs)',
    'Provisiones Aguinaldo e Ind. 16.66% (Bs)',
    'COSTO TOTAL REAL DE MANO DE OBRA (Bs)',
    '% Participación en el Costo Total'
  ]
];

const totalCostoEmpresaGeneral = resumenCostosPorObra.reduce((acc, o) => acc + o.costoTotalObra, 0);

resumenCostosPorObra.forEach((o, idx) => {
  const pct = totalCostoEmpresaGeneral > 0 ? ((o.costoTotalObra / totalCostoEmpresaGeneral) * 100).toFixed(2) + '%' : '0%';
  cuadroCostosData.push([
    idx + 1,
    o.obra,
    o.personal,
    o.basico,
    o.ganado,
    o.descuentos,
    o.liquido,
    o.cargasPatronales,
    o.beneficiosSociales,
    o.costoTotalObra,
    pct
  ]);
});

// Fila de gran total
const sumPersonal = resumenCostosPorObra.reduce((a, b) => a + b.personal, 0);
const sumBasicoCostos = resumenCostosPorObra.reduce((a, b) => a + b.basico, 0);
const sumGanadoCostos = resumenCostosPorObra.reduce((a, b) => a + b.ganado, 0);
const sumDescCostos = resumenCostosPorObra.reduce((a, b) => a + b.descuentos, 0);
const sumLiqCostos = resumenCostosPorObra.reduce((a, b) => a + b.liquido, 0);
const sumCargasCostos = resumenCostosPorObra.reduce((a, b) => a + b.cargasPatronales, 0);
const sumBenefCostos = resumenCostosPorObra.reduce((a, b) => a + b.beneficiosSociales, 0);

cuadroCostosData.push([
  'TOTAL',
  'TOTAL CONSOLIDADO EMPRESA (MANO DE OBRA + CARGAS SOCIALES)',
  sumPersonal,
  sumBasicoCostos,
  sumGanadoCostos,
  sumDescCostos,
  sumLiqCostos,
  sumCargasCostos,
  sumBenefCostos,
  totalCostoEmpresaGeneral,
  '100.00%'
]);

const wsCostos = XLSX.utils.aoa_to_sheet(cuadroCostosData);
wsCostos['!cols'] = [
  { wch: 6 }, { wch: 45 }, { wch: 18 }, { wch: 22 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 26 }, { wch: 28 }, { wch: 30 }, { wch: 22 }
];
XLSX.utils.book_append_sheet(workbook, wsCostos, '06_Cuadro_Costos_Obras');

// ==========================================
// HOJA 7: AGUINALDO DE NAVIDAD
// ==========================================
const aguinaldoData = [
  ['PLANILLA OFICIAL DE AGUINALDO DE NAVIDAD - GESTIÓN ' + anioPlanilla],
  [EMPRESA_NOMBRE],
  ['Base Legal: Ley de 18 de Diciembre de 1944. Exclusivo para Personal de Planta con más de 3 meses.'],
  [],
  [
    'N°',
    'C.I.',
    'Nombres y Apellidos',
    'Cargo',
    'Tipo Contrato',
    'Obra / Frente',
    'Fecha Ingreso',
    'Fecha Retiro',
    'Meses',
    'Días',
    '¿Elegible?',
    'Sueldo Base (Bs)',
    'TOTAL AGUINALDO (Bs)'
  ]
];

personal.forEach((p, idx) => {
  const ag = (p.tipoContrato === 'Planta')
    ? calcularAguinaldoNavidad(p.fechaIngreso, anioPlanilla, p.sueldoBasico, false, p.fechaRetiro)
    : { mesesCompletos: 0, diasFraccion: 0, elegible: false, montoAguinaldo: 0 };

  aguinaldoData.push([
    idx + 1,
    p.ci,
    p.nombres,
    p.cargo,
    p.tipoContrato,
    p.obra,
    p.fechaIngreso,
    p.fechaRetiro || 'Vigente al 31/Dic',
    ag.mesesCompletos,
    ag.diasFraccion,
    p.tipoContrato === 'Planta' ? (ag.elegible ? 'SÍ' : 'NO') : 'Exento (Consultor)',
    p.tipoContrato === 'Planta' ? p.sueldoBasico : 0,
    ag.montoAguinaldo
  ]);
});

const wsAguinaldo = XLSX.utils.aoa_to_sheet(aguinaldoData);
wsAguinaldo['!cols'] = [
  { wch: 5 }, { wch: 14 }, { wch: 32 }, { wch: 28 }, { wch: 20 }, { wch: 40 }, { wch: 14 }, { wch: 18 },
  { wch: 10 }, { wch: 10 }, { wch: 18 }, { wch: 18 }, { wch: 22 }
];
XLSX.utils.book_append_sheet(workbook, wsAguinaldo, '07_Aguinaldo_Navidad');

// ==========================================
// HOJA 8: VACACIONES Y ESCALA LABORAL
// ==========================================
const vacData = [
  ['CONTROL DE VACACIONES Y ESCALA LABORAL BOLIVIA - ' + EMPRESA_NOMBRE],
  ['Escala Art. 33 LGT: 1 a 5 años = 15 días; 5 a 10 años = 20 días; 10+ años = 30 días hábiles'],
  [],
  ['N°', 'C.I.', 'Nombres', 'Tipo Contrato', 'Obra Asignada', 'Fecha Ingreso', 'Años Antigüedad', 'Días por Ley', 'Días Tomados', 'Saldo Pendiente']
];

personal.forEach((p, idx) => {
  const esc = calcularEscalaVacacionesBolivia(p.fechaIngreso, '2026-10-31');
  const tomados = (p.codigo === 'EMP-001' ? 10 : (p.codigo === 'EMP-002' ? 5 : 0));
  vacData.push([
    idx + 1,
    p.ci,
    p.nombres,
    p.tipoContrato,
    p.obra,
    p.fechaIngreso,
    esc.aniosAntig,
    p.tipoContrato === 'Planta' ? esc.diasDerecho : 0,
    tomados,
    p.tipoContrato === 'Planta' ? Math.max(0, esc.diasDerecho - tomados) : 0
  ]);
});

const wsVac = XLSX.utils.aoa_to_sheet(vacData);
wsVac['!cols'] = [
  { wch: 5 }, { wch: 14 }, { wch: 32 }, { wch: 20 }, { wch: 40 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 16 }
];
XLSX.utils.book_append_sheet(workbook, wsVac, '08_Vacaciones_Escala');

// Guardar archivo físico en la carpeta del proyecto
const rutaSalida = path.join(__dirname, 'Planilla_Personal_Bolivia.xlsx');
const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
fs.writeFileSync(rutaSalida, buffer);
console.log(`¡Éxito! Archivo Excel generado para ${EMPRESA_NOMBRE} en: ${rutaSalida}`);
