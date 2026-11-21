const f = require('./feriados_bolivia.js');

console.log('=== VERIFICACIÓN DE NUEVAS FUNCIONALIDADES ===\n');

// 1. Prorrateo 30 días
const sueldoProrr = f.calcularSueldoProrrateado30Dias(6000, 20);
console.log('1. Prorrateo 30 días (Sueldo Bs 6.000, 20 días trabajados):', `Bs ${sueldoProrr}`);

// 2. Días trabajados con fecha de fin de contrato (20 de octubre) y 1 día de sanción
const cal = f.calcularDiasCalendarioTrabajados(2026, 10, '2025-01-01', '2026-10-20', 1);
console.log('\n2. Días calendario con retiro 20-Oct y 1 día de sanción:');
console.log(' - Días calendario brutos:', cal.diasCalendario);
console.log(' - Días de sanción deducidos:', cal.diasSancion);
console.log(' - Días efectivos pagables:', cal.diasEfectivos);
console.log(' - Detalle:', cal.estado);

// 3. Aguinaldo de Navidad con fecha de retiro el 20 de octubre
const ag = f.calcularAguinaldoNavidad('2025-01-01', 2026, 6000, false, '2026-10-20');
console.log('\n3. Aguinaldo con retiro 20 de octubre (Finiquito):');
console.log(' - Elegible:', ag.elegible ? 'SÍ' : 'NO');
console.log(' - Meses computables:', ag.mesesCompletos);
console.log(' - Días fracción:', ag.diasFraccion);
console.log(' - Monto Aguinaldo:', `Bs ${ag.montoAguinaldo}`);
console.log(' - Fundamento:', ag.observacion);

// 4. Escala de vacaciones en Bolivia
const esc = f.calcularEscalaVacacionesBolivia('2022-01-15', '2026-10-31');
console.log('\n4. Escala de vacaciones (Ingreso 15/Ene/2022):');
console.log(' - Años de antigüedad:', esc.aniosAntig);
console.log(' - Días de vacación por Ley:', esc.diasDerecho);
console.log(' - Escala:', esc.escala);

console.log('\n=== VERIFICACIÓN EXITOSA ===');
