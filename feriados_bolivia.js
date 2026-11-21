/**
 * Módulo de Feriados, Cómputo de Días y Cálculos Laborales de Bolivia
 * Normativa: Ley General del Trabajo, D.S. 2731, D.S. 1420, Ley 065 (Gestora) y Ley 18/Dic/1944
 */

// Cálculo del Domingo de Pascua (Algoritmo Meeus / Jones / Butcher)
function calcularDomingoPascua(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Función auxiliar para sumar/restar días a una fecha
function sumarDias(fecha, dias) {
  const resultado = new Date(fecha.getTime());
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

// Formatear fecha YYYY-MM-DD
function formatearFecha(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Obtiene la lista base de feriados de Bolivia para un año específico
 * Aplica el traslado de domingo a lunes según D.S. 1420 para feriados nacionales
 * Permite inyectar feriados adicionales decretados por el Estado
 */
function obtenerFeriadosBolivia(year, departamento = 'TODOS', feriadosAdicionales = []) {
  const feriados = [];

  // 1. Feriados Fijos Nacionales
  const feriadosFijos = [
    { mes: 0, dia: 1, nombre: 'Año Nuevo' },
    { mes: 0, dia: 22, nombre: 'Día del Estado Plurinacional de Bolivia' },
    { mes: 4, dia: 1, nombre: 'Día del Trabajo' },
    { mes: 5, dia: 21, nombre: 'Año Nuevo Aymara Amazónico y del Chaco' },
    { mes: 7, dia: 6, nombre: 'Día de la Independencia de Bolivia' },
    { mes: 10, dia: 2, nombre: 'Día de Todos los Santos' },
    { mes: 11, dia: 25, nombre: 'Navidad' }
  ];

  feriadosFijos.forEach(f => {
    let fecha = new Date(year, f.mes, f.dia);
    let trasladado = false;
    let fechaEfectiva = new Date(fecha);

    // D.S. 1420: Si cae en domingo, se traslada al lunes siguiente
    if (fecha.getDay() === 0) {
      fechaEfectiva = sumarDias(fecha, 1);
      trasladado = true;
    }

    feriados.push({
      id: `FIJO-${f.mes + 1}-${f.dia}`,
      fechaOriginal: formatearFecha(fecha),
      fecha: formatearFecha(fechaEfectiva),
      nombre: f.nombre + (trasladado ? ' (Compensado lunes)' : ''),
      tipo: 'Nacional',
      departamento: 'TODOS',
      trasladado,
      esModificable: true
    });
  });

  // 2. Feriados Móviles Nacionales (basados en Pascua)
  const pascua = calcularDomingoPascua(year);
  
  // Carnaval: Lunes y Martes (Pascua - 48 y - 47 días)
  const lunesCarnaval = sumarDias(pascua, -48);
  const martesCarnaval = sumarDias(pascua, -47);
  feriados.push({
    id: 'MOVIL-CARNAVAL-LUNES',
    fechaOriginal: formatearFecha(lunesCarnaval),
    fecha: formatearFecha(lunesCarnaval),
    nombre: 'Lunes de Carnaval',
    tipo: 'Nacional',
    departamento: 'TODOS',
    trasladado: false,
    esModificable: true
  });
  feriados.push({
    id: 'MOVIL-CARNAVAL-MARTES',
    fechaOriginal: formatearFecha(martesCarnaval),
    fecha: formatearFecha(martesCarnaval),
    nombre: 'Martes de Carnaval',
    tipo: 'Nacional',
    departamento: 'TODOS',
    trasladado: false,
    esModificable: true
  });

  // Viernes Santo: Pascua - 2 días
  const viernesSanto = sumarDias(pascua, -2);
  feriados.push({
    id: 'MOVIL-VIERNES-SANTO',
    fechaOriginal: formatearFecha(viernesSanto),
    fecha: formatearFecha(viernesSanto),
    nombre: 'Viernes Santo',
    tipo: 'Nacional',
    departamento: 'TODOS',
    trasladado: false,
    esModificable: true
  });

  // Corpus Christi: Pascua + 60 días (siempre jueves)
  const corpusChristi = sumarDias(pascua, 60);
  feriados.push({
    id: 'MOVIL-CORPUS-CHRISTI',
    fechaOriginal: formatearFecha(corpusChristi),
    fecha: formatearFecha(corpusChristi),
    nombre: 'Corpus Christi',
    tipo: 'Nacional',
    departamento: 'TODOS',
    trasladado: false,
    esModificable: true
  });

  // 3. Feriados Departamentales
  const feriadosDeptos = {
    'ORURO': { mes: 1, dia: 10, nombre: 'Efeméride Departamental de Oruro' },
    'TARIJA': { mes: 3, dia: 15, nombre: 'Efeméride Departamental de Tarija' },
    'CHUQUISACA': { mes: 4, dia: 25, nombre: 'Primer Grito Libertario (Chuquisaca)' },
    'LA PAZ': { mes: 6, dia: 16, nombre: 'Revolución de Julio (La Paz)' },
    'COCHABAMBA': { mes: 8, dia: 14, nombre: 'Efeméride Departamental de Cochabamba' },
    'SANTA CRUZ': { mes: 8, dia: 24, nombre: 'Gesta Libertaria de Santa Cruz' },
    'PANDO': { mes: 8, dia: 24, nombre: 'Creación del Departamento de Pando' },
    'POTOSI': { mes: 10, dia: 10, nombre: 'Gesta Libertaria de Potosí' },
    'BENI': { mes: 10, dia: 18, nombre: 'Creación del Departamento del Beni' }
  };

  const deptoUpper = departamento.toUpperCase();
  for (const [dep, info] of Object.entries(feriadosDeptos)) {
    if (deptoUpper === 'TODOS' || deptoUpper === dep) {
      let fecha = new Date(year, info.mes, info.dia);
      let trasladado = false;
      let fechaEfectiva = new Date(fecha);
      if (fecha.getDay() === 0) {
        fechaEfectiva = sumarDias(fecha, 1);
        trasladado = true;
      }
      feriados.push({
        id: `DEPTO-${dep}`,
        fechaOriginal: formatearFecha(fecha),
        fecha: formatearFecha(fechaEfectiva),
        nombre: info.nombre + (trasladado ? ' (Compensado lunes)' : ''),
        tipo: `Departamental (${dep})`,
        departamento: dep,
        trasladado,
        esModificable: true
      });
    }
  }

  // 4. Incorporar Feriados Adicionales / Decretados por el Estado
  if (Array.isArray(feriadosAdicionales) && feriadosAdicionales.length > 0) {
    feriadosAdicionales.forEach((fa, idx) => {
      if (fa.fecha && fa.fecha.startsWith(String(year))) {
        feriados.push({
          id: fa.id || `CUSTOM-${idx}-${fa.fecha}`,
          fechaOriginal: fa.fechaOriginal || fa.fecha,
          fecha: fa.fecha,
          nombre: fa.nombre || 'Feriado Decretado por el Estado',
          tipo: fa.tipo || 'Decreto Supremo / Excepcional',
          departamento: fa.departamento || 'TODOS',
          trasladado: fa.trasladado || false,
          esModificable: true
        });
      }
    });
  }

  // Ordenar cronológicamente
  feriados.sort((a, b) => a.fecha.localeCompare(b.fecha));
  return feriados;
}

/**
 * Verifica si una fecha dada es día hábil en Bolivia
 */
function esDiaHabil(date, listaFeriados, incluirSabados = false) {
  const diaSemana = date.getDay(); // 0 = Domingo, 6 = Sábado
  if (diaSemana === 0) return false;
  if (diaSemana === 6 && !incluirSabados) return false;

  const fechaStr = formatearFecha(date);
  const esFeriado = listaFeriados.some(f => f.fecha === fechaStr);
  return !esFeriado;
}

/**
 * Obtiene los días hábiles totales de un mes en Bolivia
 */
function obtenerDiasHabilesMes(year, month, listaFeriados, incluirSabados = false) {
  const diasEnMes = new Date(year, month, 0).getDate();
  const diasHabiles = [];

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const fecha = new Date(year, month - 1, dia);
    if (esDiaHabil(fecha, listaFeriados, incluirSabados)) {
      diasHabiles.push(formatearFecha(fecha));
    }
  }
  return diasHabiles;
}

/**
 * Cómputo legal coherente de finalización de vacaciones (Art. 33 D.R. LGT):
 * El usuario ingresa la Fecha de Inicio y los Días Hábiles Solicitados.
 * El sistema calcula automáticamente la Fecha de Conclusión (último día de vacación)
 * y la Fecha de Retorno / Reincorporación efectiva (siguiente día hábil de trabajo),
 * omitiendo fines de semana (sábados y domingos) y feriados.
 */
function calcularFechaFinVacacion(fechaInicioStr, diasSolicitados, listaFeriados = []) {
  if (!fechaInicioStr || !diasSolicitados || parseInt(diasSolicitados) <= 0) {
    return { ultimoDiaVacacion: '', fechaRetorno: '' };
  }
  const partes = fechaInicioStr.split('-');
  let cur = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
  let diasContados = 0;
  const numDias = parseInt(diasSolicitados);

  const feriadosSet = new Set((listaFeriados || []).map(f => (typeof f === 'string' ? f : f.fecha)));

  // Avanzar hasta contar los N días hábiles solicitados
  while (diasContados < numDias) {
    const diaSemana = cur.getDay(); // 0 = Domingo, 6 = Sábado
    const fStr = formatearFecha(cur);
    if (diaSemana !== 0 && diaSemana !== 6 && !feriadosSet.has(fStr)) {
      diasContados++;
      if (diasContados === numDias) break;
    }
    cur.setDate(cur.getDate() + 1);
  }

  const ultimoDia = formatearFecha(cur);

  // Fecha de reincorporación (primer día hábil siguiente)
  let retorno = new Date(cur.getTime());
  retorno.setDate(retorno.getDate() + 1);
  while (retorno.getDay() === 0 || retorno.getDay() === 6 || feriadosSet.has(formatearFecha(retorno))) {
    retorno.setDate(retorno.getDate() + 1);
  }

  const fechaRetorno = formatearFecha(retorno);
  return { ultimoDiaVacacion: ultimoDia, fechaRetorno: fechaRetorno };
}

/**
 * NUEVA FÓRMULA DE PRORRATEO SOLICITADA POR EL USUARIO:
 * Base 30 días comercial: (Sueldo Básico / 30) * Días Calendario Trabajados.
 * Considera:
 * - Fecha de Ingreso en cualquier día del año.
 * - Fecha de Terminación / Fin de Contrato.
 * - Días no trabajados intermedios (negligencia, faltas injustificadas, días de sanción).
 */
function calcularDiasCalendarioTrabajados(year, month, fechaIngresoStr, fechaRetiroStr = null, diasSancion = 0) {
  const diasEnMes = new Date(year, month, 0).getDate();
  const primerDiaMes = new Date(year, month - 1, 1);
  const ultimoDiaMes = new Date(year, month - 1, diasEnMes);

  const partesIngreso = fechaIngresoStr.split('-');
  const fechaIngreso = new Date(parseInt(partesIngreso[0]), parseInt(partesIngreso[1]) - 1, parseInt(partesIngreso[2]));

  let fechaRetiro = null;
  if (fechaRetiroStr && fechaRetiroStr.trim() !== '') {
    const partesRetiro = fechaRetiroStr.split('-');
    fechaRetiro = new Date(parseInt(partesRetiro[0]), parseInt(partesRetiro[1]) - 1, parseInt(partesRetiro[2]));
  }

  // 1. Si aún no ingresó en este mes
  if (fechaIngreso > ultimoDiaMes) {
    return {
      diasCalendario: 0,
      diasSancion: 0,
      diasEfectivos: 0,
      estado: 'Aún no ingresó'
    };
  }

  // 2. Si su contrato terminó antes de iniciar este mes
  if (fechaRetiro && fechaRetiro < primerDiaMes) {
    return {
      diasCalendario: 0,
      diasSancion: 0,
      diasEfectivos: 0,
      estado: 'Contrato concluido con anterioridad'
    };
  }

  // Período activo dentro del mes
  const fechaInicioActivo = (fechaIngreso > primerDiaMes) ? fechaIngreso : primerDiaMes;
  const fechaFinActivo = (fechaRetiro && fechaRetiro < ultimoDiaMes) ? fechaRetiro : ultimoDiaMes;

  if (fechaInicioActivo > fechaFinActivo) {
    return {
      diasCalendario: 0,
      diasSancion: 0,
      diasEfectivos: 0,
      estado: 'Sin actividad en el mes'
    };
  }

  // Cómputo de días calendario trabajados
  let diasBrutos = 0;
  const esMesCompleto = (fechaInicioActivo.getTime() === primerDiaMes.getTime() && fechaFinActivo.getTime() === ultimoDiaMes.getTime());

  if (esMesCompleto) {
    diasBrutos = 30; // Mes comercial estándar laboral
  } else {
    // Si ingresó o se retiró dentro del mes
    const difTiempo = fechaFinActivo.getTime() - fechaInicioActivo.getTime();
    let diasIntervalo = Math.round(difTiempo / (1000 * 60 * 60 * 24)) + 1;
    // Si el mes tiene 31 días y cubre todo o casi todo, no debe superar 30
    diasBrutos = Math.min(30, diasIntervalo);
  }

  // Descontar días de sanción o negligencia
  const sancionEfectiva = Math.min(diasBrutos, Math.max(0, diasSancion || 0));
  const diasEfectivos = Math.max(0, diasBrutos - sancionEfectiva);

  let estadoDesc = 'Mes Completo';
  if (fechaIngreso > primerDiaMes) {
    estadoDesc = `Ingreso: ${fechaIngresoStr}`;
  }
  if (fechaRetiro && fechaRetiro <= ultimoDiaMes) {
    if (estadoDesc === 'Mes Completo') {
      estadoDesc = `Término contrato: ${fechaRetiroStr}`;
    } else {
      estadoDesc += ` • Término contrato: ${fechaRetiroStr}`;
    }
  }
  if (sancionEfectiva > 0) {
    estadoDesc += ` • ${sancionEfectiva} d. sanción/falta`;
  }

  return {
    diasCalendario: diasBrutos,
    diasSancion: sancionEfectiva,
    diasEfectivos,
    esMesCompleto: esMesCompleto && sancionEfectiva === 0,
    estado: estadoDesc,
    fechaInicioActivo: formatearFecha(fechaInicioActivo),
    fechaFinActivo: formatearFecha(fechaFinActivo)
  };
}

/**
 * Prorrateo de sueldo: (Sueldo Básico / 30) * Días Efectivos
 */
function calcularSueldoProrrateado30Dias(sueldoBasico, diasEfectivos) {
  if (diasEfectivos <= 0) return 0;
  if (diasEfectivos === 30) return sueldoBasico;

  const prorrateado = (sueldoBasico / 30) * diasEfectivos;
  return Math.round(prorrateado * 100) / 100;
}

/**
 * Descuentos de Ley en Bolivia (Gestora Pública de la Seguridad Social de Largo Plazo)
 * Total 12.71%
 */
function calcularDescuentosGestora(totalGanado) {
  const aporteVejez = Math.round(totalGanado * 0.1000 * 100) / 100; // 10%
  const riesgoComun = Math.round(totalGanado * 0.0171 * 100) / 100; // 1.71%
  const comisionGestora = Math.round(totalGanado * 0.0050 * 100) / 100; // 0.5%
  const aporteSolidario = Math.round(totalGanado * 0.0050 * 100) / 100; // 0.5%
  
  const totalGestora = Math.round((aporteVejez + riesgoComun + comisionGestora + aporteSolidario) * 100) / 100; // 12.71%

  // Aporte Nacional Solidario (ANS)
  let ans = 0;
  if (totalGanado > 35000) ans += (totalGanado - 35000) * 0.10;
  if (totalGanado > 25000) ans += (totalGanado - 25000) * 0.05;
  if (totalGanado > 13000) ans += (totalGanado - 13000) * 0.01;
  ans = Math.round(ans * 100) / 100;

  return {
    aporteVejez,
    riesgoComun,
    comisionGestora,
    aporteSolidario,
    totalGestora,
    ans,
    totalDescuentosLey: Math.round((totalGestora + ans) * 100) / 100
  };
}

/**
 * Cómputo de Aguinaldo de Navidad según normativa boliviana
 * Actualizado con Fecha de Terminación de Contrato (Finiquito/Duodécimas por retiro)
 * Ley del 18 de diciembre de 1944 y D.S. 24504
 */
function calcularAguinaldoNavidad(fechaIngresoStr, gestion, promedioSueldo, esObrero = false, fechaRetiroStr = null) {
  const partesIngreso = fechaIngresoStr.split('-');
  const anioIngreso = parseInt(partesIngreso[0]);
  const mesIngreso = parseInt(partesIngreso[1]);
  const diaIngreso = parseInt(partesIngreso[2]);

  const fechaIngreso = new Date(anioIngreso, mesIngreso - 1, diaIngreso);
  const inicioDeGestion = new Date(gestion, 0, 1);
  let finDeGestion = new Date(gestion, 11, 31);

  // Si tiene fecha de terminación en la gestión
  let fechaRetiro = null;
  if (fechaRetiroStr && fechaRetiroStr.trim() !== '') {
    const partesRetiro = fechaRetiroStr.split('-');
    const anioRetiro = parseInt(partesRetiro[0]);
    if (anioRetiro === gestion) {
      fechaRetiro = new Date(anioRetiro, parseInt(partesRetiro[1]) - 1, parseInt(partesRetiro[2]));
      if (fechaRetiro < finDeGestion) {
        finDeGestion = fechaRetiro;
      }
    } else if (anioRetiro < gestion) {
      return {
        gestion,
        elegible: false,
        motivo: `Contrato concluido en ${anioRetiro} con anterioridad a la gestión ${gestion}`,
        mesesCompletos: 0,
        diasFraccion: 0,
        montoAguinaldo: 0
      };
    }
  }

  // Si ingresó después de la fecha de corte
  if (fechaIngreso > finDeGestion) {
    return {
      gestion,
      elegible: false,
      motivo: `Ingresó después del período computable de la gestión ${gestion}`,
      mesesCompletos: 0,
      diasFraccion: 0,
      montoAguinaldo: 0
    };
  }

  const fechaInicioEfectiva = (fechaIngreso > inicioDeGestion) ? fechaIngreso : inicioDeGestion;
  const fechaFinEfectiva = finDeGestion;

  let mesesCompletos = 0;
  let diasFraccion = 0;

  if (fechaInicioEfectiva.getTime() === inicioDeGestion.getTime() && fechaFinEfectiva.getMonth() === 11 && fechaFinEfectiva.getDate() === 31) {
    // Año completo
    mesesCompletos = 12;
    diasFraccion = 0;
  } else {
    // Cómputo por meses y días
    const mInicio = fechaInicioEfectiva.getMonth() + 1;
    const dInicio = fechaInicioEfectiva.getDate();
    const mFin = fechaFinEfectiva.getMonth() + 1;
    const dFin = fechaFinEfectiva.getDate();

    if (dInicio === 1 && (dFin >= 30 || (mFin === 2 && dFin >= 28))) {
      // Meses redondos
      mesesCompletos = mFin - mInicio + 1;
      diasFraccion = 0;
    } else {
      // Días fracción mes de inicio
      let diasInicio = 0;
      if (dInicio > 1) {
        diasInicio = Math.max(0, 30 - dInicio + 1);
      }
      // Días fracción mes de fin
      let diasFin = 0;
      if (dFin < 30) {
        diasFin = dFin;
      }

      // Meses completos intermedios
      const mesInicioCompleto = (dInicio === 1) ? mInicio : mInicio + 1;
      const mesFinCompleto = (dFin >= 30) ? mFin : mFin - 1;

      if (mesFinCompleto >= mesInicioCompleto) {
        mesesCompletos = mesFinCompleto - mesInicioCompleto + 1;
      } else {
        mesesCompletos = 0;
      }

      const totalDiasSueltos = (dInicio > 1 ? diasInicio : 0) + (dFin < 30 ? diasFin : 0);
      mesesCompletos += Math.floor(totalDiasSueltos / 30);
      diasFraccion = totalDiasSueltos % 30;
    }
  }

  // Verificación de elegibilidad mínima por ley:
  // Empleados: mínimo 3 meses (90 días)
  // Obreros: mínimo 1 mes (30 días)
  const totalEquivalenteDias = (mesesCompletos * 30) + diasFraccion;
  const minimoRequeridoDias = esObrero ? 30 : 90;
  const elegible = totalEquivalenteDias >= minimoRequeridoDias;

  let montoAguinaldo = 0;
  let observacion = '';

  if (!elegible) {
    observacion = `No cumple el mínimo legal de ${esObrero ? '1 mes (obrero)' : '3 meses (empleado)'} continuos de trabajo en la gestión (acumuló ${mesesCompletos} meses y ${diasFraccion} días).`;
  } else {
    // Fórmula oficial boliviana: (Promedio / 12 * Meses) + (Promedio / 360 * Días)
    const porMeses = (promedioSueldo / 12) * mesesCompletos;
    const porDias = (promedioSueldo / 360) * diasFraccion;
    montoAguinaldo = Math.round((porMeses + porDias) * 100) / 100;
    observacion = (mesesCompletos === 12 && diasFraccion === 0) 
      ? 'Gestión completa (1 sueldo íntegro sin descuentos)' 
      : `Duodécimas correspondientes a ${mesesCompletos} meses y ${diasFraccion} días trabajados` + (fechaRetiroStr ? ` (Retiro: ${fechaRetiroStr})` : '');
  }

  return {
    gestion,
    elegible,
    mesesCompletos,
    diasFraccion,
    totalEquivalenteDias,
    promedioSueldo,
    montoAguinaldo,
    observacion
  };
}

/**
 * Escala legal de vacaciones en Bolivia (Art. 33 Ley General del Trabajo)
 * 1 a 5 años de servicio: 15 días hábiles
 * 5 a 10 años de servicio: 20 días hábiles
 * 10 años o más: 30 días hábiles
 */
function calcularEscalaVacacionesBolivia(fechaIngresoStr, fechaReferenciaStr = null) {
  const partes = fechaIngresoStr.split('-');
  const fIngreso = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
  const fRef = fechaReferenciaStr ? new Date(fechaReferenciaStr) : new Date();

  const difMs = fRef.getTime() - fIngreso.getTime();
  const aniosAntig = Math.floor(difMs / (1000 * 60 * 60 * 24 * 365.25));

  let diasDerecho = 0;
  let escala = '';

  if (aniosAntig < 1) {
    diasDerecho = 0;
    escala = 'Menos de 1 año (Aún no consolida derecho a vacación)';
  } else if (aniosAntig >= 1 && aniosAntig < 5) {
    diasDerecho = 15;
    escala = '1 a 5 años de antigüedad (15 días hábiles)';
  } else if (aniosAntig >= 5 && aniosAntig < 10) {
    diasDerecho = 20;
    escala = '5 a 10 años de antigüedad (20 días hábiles)';
  } else {
    diasDerecho = 30;
    escala = '10 años o más de antigüedad (30 días hábiles)';
  }

  return {
    aniosAntig,
    diasDerecho,
    escala
  };
}

// Convertir número a texto literal en bolivianos
function numeroALetras(monto) {
  const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const dieces = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
  const veintis = ['', 'VEINTIUNO', 'VEINTIDOS', 'VEINTITRES', 'VEINTICUATRO', 'VEINTICINCO', 'VEINTISEIS', 'VEINTISIETE', 'VEINTIOCHO', 'VEINTINUEVE'];
  const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  function convertirGrupo(n) {
    let salida = '';
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (n === 100) return 'CIEN ';

    if (c > 0) salida += centenas[c] + ' ';

    if (d === 1) {
      salida += dieces[u] + ' ';
      return salida;
    } else if (d === 2 && u > 0) {
      salida += veintis[u] + ' ';
      return salida;
    } else if (d > 0) {
      salida += decenas[d] + (u > 0 ? ' Y ' : ' ');
    }

    if (u > 0 && d !== 1 && !(d === 2 && u > 0)) {
      salida += unidades[u] + ' ';
    }

    return salida;
  }

  const enteromonto = Math.floor(monto);
  const centavos = Math.round((monto - enteromonto) * 100);
  const centavosStr = String(centavos).padStart(2, '0') + '/100 BOLIVIANOS';

  if (enteromonto === 0) return `CERO ${centavosStr}`;

  let texto = '';
  const millones = Math.floor(enteromonto / 1000000);
  const miles = Math.floor((enteromonto % 1000000) / 1000);
  const resto = enteromonto % 1000;

  if (millones > 0) {
    texto += (millones === 1 ? 'UN MILLON ' : convertirGrupo(millones) + 'MILLONES ');
  }

  if (miles > 0) {
    texto += (miles === 1 ? 'MIL ' : convertirGrupo(miles) + 'MIL ');
  }

  if (resto > 0) {
    texto += convertirGrupo(resto);
  }

  return `${texto.trim()} ${centavosStr}`;
}

/**
 * Cargas Patronales en Bolivia (Aportes del Empleador - Total 16.71% + Provisiones 16.66%)
 * - Caja de Salud (CNS): 10.00%
 * - Riesgo Profesional (Gestora): 1.71%
 * - Aporte Solidario Patronal: 3.00%
 * - ProVivienda: 2.00%
 * Total Aportes Patronales directos: 16.71%
 * Provisión Aguinaldo: 8.33% (1/12)
 * Previsión Indemnización: 8.33% (1/12)
 * Costo Total Empresa sobre Mano de Obra: 133.37% del Total Ganado
 */
function calcularCargasPatronalesBolivia(totalGanado) {
  const cns = Math.round(totalGanado * 0.1000 * 100) / 100;
  const riesgoProf = Math.round(totalGanado * 0.0171 * 100) / 100;
  const aporteSolidario = Math.round(totalGanado * 0.0300 * 100) / 100;
  const provivienda = Math.round(totalGanado * 0.0200 * 100) / 100;
  const totalCargas = Math.round((cns + riesgoProf + aporteSolidario + provivienda) * 100) / 100;

  const provAguinaldo = Math.round(totalGanado * (1 / 12) * 100) / 100;
  const prevIndemnizacion = Math.round(totalGanado * (1 / 12) * 100) / 100;
  const totalBeneficios = Math.round((provAguinaldo + prevIndemnizacion) * 100) / 100;

  const costoTotalEmpresa = Math.round((totalGanado + totalCargas + totalBeneficios) * 100) / 100;

  return {
    cns,
    riesgoProf,
    aporteSolidario,
    provivienda,
    totalCargas,
    provAguinaldo,
    prevIndemnizacion,
    totalBeneficios,
    costoTotalEmpresa
  };
}

const TIPO_CONTRATO_PLANTA = 'Planta';
const TIPO_CONTRATO_CONSULTOR = 'Consultor en Línea';

/**
 * Cálculo de Liquidación Mensual diferenciada por Tipo de Contrato:
 * - Planta: Todos los beneficios de ley (12.71% Gestora, 16.71% Cargas Patronales + 16.66% Provisiones)
 * - Consultor en Línea: Sin descuentos de ley ni aportes patronales (Líquido Pagable = Total Ganado/Honorario)
 */
function calcularLiquidacionPorTipoContrato(totalGanado, tipoContrato = 'Planta') {
  const esConsultor = (tipoContrato === TIPO_CONTRATO_CONSULTOR || tipoContrato === 'Consultor');

  if (esConsultor) {
    return {
      tipoContrato: TIPO_CONTRATO_CONSULTOR,
      esConsultor: true,
      tipoDocumento: 'Comprobante de Pago - Consultoría en Línea',
      descuentosLey: {
        aporteVejez: 0,
        riesgoComun: 0,
        comisionGestora: 0,
        aporteSolidario: 0,
        totalGestora: 0,
        ans: 0,
        totalDescuentosLey: 0
      },
      cargasPatronales: {
        cns: 0,
        riesgoProf: 0,
        aporteSolidario: 0,
        provivienda: 0,
        totalCargas: 0,
        provAguinaldo: 0,
        prevIndemnizacion: 0,
        totalBeneficios: 0,
        costoTotalEmpresa: totalGanado
      },
      liquidoPagable: totalGanado,
      observacion: 'Contrato de Servicios por Consultoría en Línea. No sujeto a retención Gestora ni cargas patronales.'
    };
  }

  // Personal de Planta
  const desc = calcularDescuentosGestora(totalGanado);
  const cargas = calcularCargasPatronalesBolivia(totalGanado);
  const liq = Math.round((totalGanado - desc.totalDescuentosLey) * 100) / 100;

  return {
    tipoContrato: TIPO_CONTRATO_PLANTA,
    esConsultor: false,
    tipoDocumento: 'Boleta de Pago Oficial',
    descuentosLey: desc,
    cargasPatronales: cargas,
    liquidoPagable: Math.max(0, liq),
    observacion: 'Personal de Planta con beneficios sociales de ley completos (Ley General del Trabajo y Ley 065).'
  };
}

/**
 * Cómputo de Pagos Parciales (Hasta 3 Pagos al Mes):
 * - Pago 1 (Anticipo 1): Sin descuento de ley.
 * - Pago 2 (Anticipo 2): Sin descuento de ley.
 * - Pago 3 (Saldo Final / Cierre de Mes): Aplica todos los descuentos de ley (para Planta)
 *   y descuenta los anticipos previamente otorgados.
 */
function calcularPagosParciales(totalGanado, tipoContrato = 'Planta', anticipo1 = 0, anticipo2 = 0, otrosDescuentos = 0) {
  const liqInfo = calcularLiquidacionPorTipoContrato(totalGanado, tipoContrato);
  const totalDescuentosLey = liqInfo.descuentosLey.totalDescuentosLey;

  // Anticipos otorgados
  const a1 = Math.round(Math.max(0, anticipo1 || 0) * 100) / 100;
  const a2 = Math.round(Math.max(0, anticipo2 || 0) * 100) / 100;
  const otrosDesc = Math.round(Math.max(0, otrosDescuentos || 0) * 100) / 100;

  // Saldo final a desembolsar
  // Saldo Final = Total Ganado - Descuentos de Ley - Otros Descuentos - Anticipo 1 - Anticipo 2
  const saldoFinal = Math.round((totalGanado - totalDescuentosLey - otrosDesc - a1 - a2) * 100) / 100;

  return {
    totalGanado,
    tipoContrato: liqInfo.tipoContrato,
    esConsultor: liqInfo.esConsultor,
    tipoDocumento: liqInfo.tipoDocumento,
    anticipo1: a1,
    anticipo2: a2,
    otrosDescuentos: otrosDesc,
    totalDescuentosLey,
    descuentosLeyDetalle: liqInfo.descuentosLey,
    cargasPatronales: liqInfo.cargasPatronales,
    liquidoTotalMes: liqInfo.liquidoPagable,
    saldoFinal: Math.max(0, saldoFinal),
    costoTotalEmpresa: liqInfo.cargasPatronales.costoTotalEmpresa
  };
}

/**
 * Cómputo de Gasto Total Acumulado por Obra (Desde Inicio hasta Fin de Proyecto)
 * Permite saber el costo histórico o proyectado de mano de obra + cargas sociales
 * una vez definida la fecha de finalización de la obra.
 */
function calcularGastoTotalObra(obraInfo, personalAsignado = []) {
  if (!obraInfo.fechaInicio) {
    return {
      mesesDuracion: 0,
      diasDuracion: 0,
      totalSueldosBasicos: 0,
      totalCargasPatronales: 0,
      totalCostoManoObra: 0,
      personalCount: 0
    };
  }

  const partesIni = obraInfo.fechaInicio.split('-');
  const fIni = new Date(parseInt(partesIni[0]), parseInt(partesIni[1]) - 1, parseInt(partesIni[2]));
  
  let fFin = new Date();
  if (obraInfo.fechaFin && obraInfo.fechaFin.trim() !== '') {
    const partesFin = obraInfo.fechaFin.split('-');
    fFin = new Date(parseInt(partesFin[0]), parseInt(partesFin[1]) - 1, parseInt(partesFin[2]));
  }

  const difMs = Math.max(0, fFin.getTime() - fIni.getTime());
  const diasTotales = Math.round(difMs / (1000 * 60 * 60 * 24)) + 1;
  const mesesEquiv = Math.round((diasTotales / 30.4375) * 10) / 10;

  let costoMensualPlanta = 0;
  let costoMensualConsultores = 0;
  let totalSueldosBasicosMensual = 0;

  personalAsignado.forEach(emp => {
    const sueldo = emp.sueldoBasico || 0;
    totalSueldosBasicosMensual += sueldo;
    if (emp.tipoContrato === TIPO_CONTRATO_CONSULTOR || emp.tipoContrato === 'Consultor') {
      costoMensualConsultores += sueldo;
    } else {
      // Planta: 133.37% de costo total empresa
      const cargas = calcularCargasPatronalesBolivia(sueldo);
      costoMensualPlanta += cargas.costoTotalEmpresa;
    }
  });

  const costoMensualTotal = costoMensualPlanta + costoMensualConsultores;
  const gastoAcumuladoTotal = Math.round((costoMensualTotal * (diasTotales / 30)) * 100) / 100;

  return {
    obraNombre: obraInfo.nombre,
    fechaInicio: obraInfo.fechaInicio,
    fechaFin: obraInfo.fechaFin || 'En Ejecución',
    diasTotales,
    mesesEquiv,
    personalCount: personalAsignado.length,
    totalSueldosBasicosMensual: Math.round(totalSueldosBasicosMensual * 100) / 100,
    costoMensualTotal: Math.round(costoMensualTotal * 100) / 100,
    gastoAcumuladoTotal
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calcularDomingoPascua,
    obtenerFeriadosBolivia,
    esDiaHabil,
    obtenerDiasHabilesMes,
    calcularDiasCalendarioTrabajados,
    calcularSueldoProrrateado30Dias,
    calcularDescuentosGestora,
    calcularAguinaldoNavidad,
    calcularEscalaVacacionesBolivia,
    calcularCargasPatronalesBolivia,
    numeroALetras,
    TIPO_CONTRATO_PLANTA,
    TIPO_CONTRATO_CONSULTOR,
    calcularLiquidacionPorTipoContrato,
    calcularPagosParciales,
    calcularGastoTotalObra,
    calcularFechaFinVacacion
  };
}

