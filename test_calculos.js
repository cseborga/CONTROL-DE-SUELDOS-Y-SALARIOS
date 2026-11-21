const {
  obtenerFeriadosBolivia,
  obtenerDiasHabilesMes,
  obtenerDiasHabilesTrabajados,
  calcularSueldoProrrateado,
  calcularDescuentosGestora,
  calcularAguinaldoNavidad,
  numeroALetras
} = require('./feriados_bolivia.js');

console.log('=== TEST DE CÁLCULOS LABORALES BOLIVIA 2026 ===\n');

// 1. Feriados 2026
const feriados2026 = obtenerFeriadosBolivia(2026, 'LA PAZ');
console.log(`Total Feriados en La Paz (2026): ${feriados2026.length}`);
feriados2026.slice(0, 5).forEach(f => console.log(` - ${f.fecha}: ${f.nombre} (${f.tipo})`));

// 2. Días hábiles de Octubre 2026
const diasHabilesOct = obtenerDiasHabilesMes(2026, 10, feriados2026);
console.log(`\nDías hábiles totales en Octubre 2026: ${diasHabilesOct.length}`);

// 3. Empleado que ingresa el 14 de Octubre de 2026 con sueldo Bs 6.000
const fechaIngreso = '2026-10-14';
const trabOct = obtenerDiasHabilesTrabajados(2026, 10, fechaIngreso, feriados2026);
console.log(`\nEmpleado ingresado el: ${fechaIngreso}`);
console.log(`Días hábiles trabajados en octubre: ${trabOct.diasTrabajados} de ${diasHabilesOct.length}`);

const sueldoBasico = 6000;
const sueldoProrrateado = calcularSueldoProrrateado(sueldoBasico, trabOct.diasTrabajados, diasHabilesOct.length);
console.log(`Sueldo básico pactado: Bs ${sueldoBasico.toFixed(2)}`);
console.log(`Sueldo prorrateado ganado: Bs ${sueldoProrrateado.toFixed(2)}`);

// 4. Descuentos Gestora
const desc = calcularDescuentosGestora(sueldoProrrateado);
console.log(`\nDescuentos Gestora Pública (12.71%):`);
console.log(` - Vejez (10%): Bs ${desc.aporteVejez.toFixed(2)}`);
console.log(` - Riesgo Común (1.71%): Bs ${desc.riesgoComun.toFixed(2)}`);
console.log(` - Comisión (0.5%): Bs ${desc.comisionGestora.toFixed(2)}`);
console.log(` - Aporte Solidario (0.5%): Bs ${desc.aporteSolidario.toFixed(2)}`);
console.log(` - Total Gestora: Bs ${desc.totalGestora.toFixed(2)}`);
const liquido = sueldoProrrateado - desc.totalGestora;
console.log(`Líquido Pagable: Bs ${liquido.toFixed(2)}`);
console.log(`En letras: ${numeroALetras(liquido)}`);

// 5. Aguinaldo
console.log('\n=== CÁLCULO DE AGUINALDO GESTIÓN 2026 ===');
const casos = [
  { nombre: 'Juan Pérez (Antiguo)', fecha: '2023-05-10', sueldo: 5000 },
  { nombre: 'Ana Gómez (Ingreso 18-Mar-2026)', fecha: '2026-03-18', sueldo: 5000 },
  { nombre: 'Carlos Ruiz (Ingreso 25-Oct-2026)', fecha: '2026-10-25', sueldo: 5000 }
];

casos.forEach(c => {
  const ag = calcularAguinaldoNavidad(c.fecha, 2026, c.sueldo);
  console.log(`\nTrabajador: ${c.nombre} (Ingreso: ${c.fecha})`);
  console.log(` - Elegible: ${ag.elegible ? 'SÍ' : 'NO'}`);
  console.log(` - Meses: ${ag.mesesCompletos}, Días: ${ag.diasFraccion}`);
  console.log(` - Monto Aguinaldo: Bs ${ag.montoAguinaldo.toFixed(2)}`);
  console.log(` - Detalle: ${ag.observacion}`);
});
