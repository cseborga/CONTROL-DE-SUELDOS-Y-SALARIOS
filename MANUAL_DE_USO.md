# MANUAL DE OPERACIÓN Y NORMATIVA LABORAL DEL SISTEMA INTEGRAL
## MORALES LARRAZÁBAL M.L. CONSULTORÍA Y CONSTRUCCIÓN S.R.L.

Sistema de gestión de talento humano, control de proyectos constructivos, liquidación de haberes mensuales comerciales (base 30 días), validación obligatoria de boletas de permiso por RRHH, administración de personal de planta vs consultores en línea, gestión de hasta 3 pagos parciales mensuales con anticipos opcionales y editables, y base de datos persistente multiusuario en red local.

---

## 🔒 1. Gestión de Usuarios y Seguridad Estricta

Conforme a las políticas de control interno de la constructora:

1. **Creación y Actualización Exclusiva por RRHH:**
   - Únicamente el **Responsable de Recursos Humanos** tiene autorización para crear o modificar usuarios administrativos y actualizar periódicamente su contraseña de seguridad a través del panel **"🔐 Clave RRHH"**.
   - Campos configurables: *Nombre del Responsable, Cargo Oficial, Usuario y Contraseña de Seguridad*.
   - Credenciales administrativas iniciales:
     * **Usuario:** `encargado_rrhh`
     * **Contraseña:** `Bolivia2026*`

2. **Acceso Restringido para Funcionarios / Personal:**
   - Los empleados y obreros únicamente tienen acceso al módulo de **Boletas de Permiso** (`tab-permisos`).
   - Toda la información financiera, planillas de sueldos, cuadros de costos por obra, presupuestos, expedientes de sanciones y memorándums quedan **completamente bloqueados y ocultos** para los trabajadores regulares.
   - El funcionario ingresa mediante su número de **C.I.** y su clave personal (PIN predeterminado: `12345`).

---

## 📋 2. Workflow de Boletas de Permiso y Validación por RRHH

1. **Emisión por el Funcionario:**
   - El trabajador ingresa su número de Carnet de Identidad (C.I.).
   - El sistema autocompleta automáticamente: *Nombres y Apellidos, Cargo y Frente de Obra Asignado*.
   - El solicitante registra:
     * **Fecha del Permiso.**
     * **Hora de Inicio** (ej: `08:30 AM`, `14:00 PM`).
     * **Duración Solicitada** (ej: `3 Horas`, `Jornada Completa`).
     * **Tipo de Permiso** (Atención médica CNS, comisión oficial de obra, trámite particular, etc.).
     * **Motivo detallado.**

2. **Validación Obligatoria por Recursos Humanos:**
   - Toda boleta emitida por un funcionario nace en el sistema con estado **"PENDIENTE DE AUTORIZACIÓN"**.
   - En este estado, la boleta muestra de forma indeleble un sello de advertencia:
     > ⚠️ **NO VÁLIDA / PENDIENTE DE AUTORIZACIÓN POR RECURSOS HUMANOS**  
     > *Esta boleta no tiene validez laboral hasta ser autorizada en el sistema por el Responsable de RRHH. El abandono de funciones sin autorización es pasible a sanción disciplinaria.*
   - El Responsable de RRHH cuenta con una bandeja de validación con las opciones:
     * **[✅ Autorizar]:** Aprueba la boleta, genera el sello de validez legal con fecha, hora y firma digital de RRHH.
     * **[❌ Rechazar]:** Deniega el permiso por necesidades de obra.
     * **[⚠️ Sanción]:** Si el dependiente se ausentó sin la autorización oficial, el sistema permite derivar inmediatamente el caso al módulo de sanciones y emitir el Memorándum de llamada de atención con descuento de haber.

---

## 🏗️ 3. Catálogo Dinámico de Obras y Cálculo de Gasto Total Acumulado

El sistema permite al Responsable de RRHH dar de alta cualquier número de obras y proyectos que la empresa encare:

1. **Registro de Obras:**
   - *Código de Proyecto, Nombre de la Obra, Tipo de Proyecto (Edificación, Vial, Saneamiento, etc.), Ubicación Geográfica, Fecha de Inicio, Fecha de Finalización y Presupuesto Estimado de Mano de Obra*.

2. **Cálculo Automático del Gasto Total Acumulado:**
   - Una vez registrada la **Fecha de Finalización** (o para cualquier proyecto en ejecución), el sistema calcula con un solo clic el **gasto real acumulado de mano de obra**:
     $$\text{Meses Equivalentes} = \frac{\text{Días Transcurridos Entre Inicio y Fin}}{30.41}$$
     $$\text{Gasto Acumulado Obra} = \sum (\text{Costo Mensual Empresa de Cada Funcionario Asignado}) \times \text{Meses Equivalentes}$$
   - Desglosa sueldos básicos devengados, cargas patronales (16.71%), provisiones sociales (16.66% aguinaldo e indemnización) para personal de planta y honorarios de consultores en línea.
   - Presenta la comparación porcentual contra el presupuesto inicial de mano de obra.

---

## 👥 4. Dos Modalidades de Contratación: Planta vs Consultor en Línea

El sistema distingue formalmente el tratamiento laboral y tributario:

| Concepto | Personal de Planta (Código Laboral LGT) | Consultor en Línea (Servicios Civiles) |
| :--- | :--- | :--- |
| **Relación Jurídica** | Dependiente con todos los beneficios de ley | Prestación de servicios profesionales por producto |
| **Aporte Gestora (12.71%)** | **SÍ** (Retención obligatoria de largo plazo) | **NO** (0% Exento de retención laboral) |
| **Aporte Patronal (16.71%)** | **SÍ** (CNS 10%, Riesgo 1.71%, Solidario 3%, Vivienda 2%) | **NO** (Sin costo de carga patronal) |
| **Provisiones (16.66%)** | **SÍ** (Aguinaldo 8.33% e Indemnización 8.33%) | **NO** (Sin provisión de beneficios sociales) |
| **Líquido Pagable** | Total Ganado $-$ Descuentos de Ley | **Total Ganado (Honorario Íntegro Contractual)** |
| **Documento Emitido** | **Boleta Oficial de Pago de Remuneraciones** | **Comprobante Oficial de Pago - Consultoría** |

---

## 💵 5. Pagos Parciales & Anticipos Opcionales y Editables

Para mayor flexibilidad financiera de la constructora:

1. **Anticipos Opcionales:**
   - Por defecto, los anticipos están inactivos (0 anticipos, 100% pagado a fin de mes).
   - Se pueden activar individualmente para el funcionario que lo solicite.
2. **Modalidad Editable (Monto Fijo en Bs o Porcentaje %):**
   - **Anticipo 1:** Configurable como porcentaje (ej. 30%, 25%, 15%) o como monto exacto en Bolivianos (ej. Bs 1,500.00).
   - **Anticipo 2:** Configurable como porcentaje o monto fijo en Bolivianos.
   - **Cierre / Saldo Final:**
     $$\text{Saldo Final} = \max(0, \text{Total Ganado} - \text{Deducciones de Ley} - \text{Anticipo 1} - \text{Anticipo 2})$$
3. **Comprobantes y Documentos:**
   - Cada desembolso parcial genera su **Comprobante Oficial de Desembolso / Anticipo** con monto en bolivianos y en literal, correlativo institucional y espacio de firma.
   - En la **Boleta Oficial de Cierre**, se consolidan todos los anticipos otorgados junto con el aporte a la Gestora Pública, reflejando el saldo líquido exacto a transferir.

---

## 🔄 6. Sincronización Global de Todos los Módulos

El sistema cuenta con una función maestra de sincronización reactiva (`actualizarTodosLosModulos`):
- **Al agregar, editar o eliminar personal:**
  1. Se actualiza el Catálogo de Personal y el Dashboard institucional.
  2. Se recalculan los subtotales por obra y el consolidado general en la Planilla Mensual.
  3. Se actualiza la tabla de Pagos Parciales & Anticipos.
  4. Se actualizan automáticamente todos los selectores de búsqueda (Sanciones, Boletas, Vacaciones, Permisos).
  5. Se actualiza el visor de Boletas de Pago y Comprobantes de Consultoría.
  6. Se recalculan los Aguinaldos (meses computables y monto reservado).
  7. Se sincroniza la escala de Vacaciones y el Cronograma Visual de Cobertura (Gantt).
  8. Se actualiza el recuento de personal en la Gestión de Obras y el Cuadro Financiero de Costos.

---

## 💾 7. Base de Datos Centralizada y Acceso Multiusuario en Red Local

Para garantizar que todas las computadoras y celulares de la empresa compartan la misma información en tiempo real:

1. **Servidor Central (`servidor.js`):**
   - Ejecutado mediante `iniciar_sistema.bat`.
   - Almacena automáticamente todos los cambios en el archivo `datos.json` del servidor.
   - Expone la aplicación en la red Wi-Fi/LAN de la constructora (ej. `http://192.168.x.x:3000`).
2. **Sincronización en Segundo Plano:**
   - La aplicación consulta el servidor periódicamente (cada 8 segundos). Si otro usuario (ej. un empleado desde su celular) registra una boleta de permiso, el panel del Responsable de RRHH se actualiza automáticamente sin necesidad de recargar la página.
3. **Modo Espejo Local (Fallback):**
   - En caso de operar sin conexión al servidor central, el sistema guarda automáticamente en el almacenamiento local del navegador (`localStorage`), garantizando que nunca se pierda ningún dato.
4. **Copias de Seguridad (Backup JSON):**
   - El Responsable de RRHH puede presionar el botón **"💾 Copia de Seguridad"** para:
     * Descargar un archivo `.json` con toda la base de datos de personal, obras, anticipos, permisos y sanciones.
     * Restaurar o importar cualquier respaldo previo en segundos.
