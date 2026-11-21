# 🏗️ Sistema de Seguimiento de Personal, Obras y Planilla Laboral Bolivia
### **Morales Larrazábal M.L. Consultoría y Construcción S.R.L.**

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white)
![Normativa](https://img.shields.io/badge/Normativa-Ley%20General%20del%20Trabajo%20(Bolivia)-D52B1E)
![Licencia](https://img.shields.io/badge/Licencia-Propiedad%20Privada-darkred)

Sistema integral de gestión de talento humano, control financiero de mano de obra en proyectos constructivos, liquidación de haberes mensuales comerciales (base 30 días), administración de personal de planta vs. consultores en línea, validación de permisos con firma institucional y emisión de boletas y memorándums según la legislación laboral boliviana.

---

## 🏛️ Identidad Corporativa y Normativa Aplicada

Desarrollado exclusivamente para la empresa constructora **Morales Larrazábal M.L. Consultoría y Construcción S.R.L.**, implementando la normativa vigente del Estado Plurinacional de Bolivia:

* **Ley General del Trabajo (LGT) y D.S. 2731:** Jornada laboral, descanso semanal, escala de vacaciones por días hábiles (Art. 33 LGT).
* **Ley 065 de Pensiones (Gestora Pública):** Retención laboral del **12.71%** (Aporte de Vejez 10%, Riesgo Común 1.71%, Comisión Gestora 0.5%, Aporte Solidario 0.5%) y Aporte Nacional Solidario (ANS).
* **Cargas Sociales Patronales (16.71%):** Caja Nacional de Salud (10%), Riesgo Profesional (1.71%), Fondo Solidario Patronal (3%) y Aporte Patronal de Vivienda (2%).
* **Beneficios Sociales y Provisiones (16.66%):** Provisión de Aguinaldo de Navidad (8.33%) y Previsión para Indemnización por tiempo de servicios (8.33%).
* **Ley del 18 de Diciembre de 1944 y D.S. 24504:** Cómputo de Aguinaldo de Navidad por duodécimas a partir de 3 meses trabajados.
* **Decreto Supremo 1420:** Regulación de feriados nacionales con traslado automático de domingo a lunes.

---

## 🚀 Módulos del Sistema

| Módulo | Descripción | Restricciones / Reglas |
| :--- | :--- | :--- |
| **🔐 Control de Acceso y Roles** | Doble nivel de acceso: Responsable de RRHH (control total) vs. Funcionarios (acceso restringido mediante C.I. + PIN). | Información financiera y salarial bloqueada para funcionarios regulares. |
| **🏗️ Catálogo Dinámico de Obras** | Registro de proyectos y frentes de trabajo con fecha de inicio, fecha de fin y presupuesto de mano de obra. | Calcula el costo real devengado acumulado de mano de obra por proyecto. |
| **👥 Maestro de Personal Bimodal** | Administración de **Personal de Planta** y **Consultores en Línea**. | Planta: Sujeto a descuentos de ley y aportes patronales.<br>Consultor: Exento de aportes, honorario íntegro como líquido pagable. |
| **📋 Boletas de Permiso** | Solicitud digital por C.I. (médico, comisión, personal). | **Validación obligatoria por RRHH:** Nace como *Pendiente*; requiere autorización expresa para entrar en vigencia. |
| **⚠️ Sanciones y Memorándums** | Expediente disciplinario por faltas o abandono de funciones. | Emisión de memorándum y descuento automático de días en planilla mensual. |
| **💵 Pagos Parciales & Anticipos** | Desembolso de hasta 2 anticipos mensuales opcionales y editables (en % o monto fijo en Bs). | Emite comprobantes individuales de anticipo y consolida saldos en la boleta final. |
| **📊 Planilla Mensual (Base 30 Días)** | Liquidación comercial con prorrateo de días trabajados, subtotales por obra y Oficina Central. | Refleja el "TOTAL CONSOLIDADO EMPRESA" con alto contraste institucional. |
| **🏖️ Vacaciones & Diagrama Gantt** | Programación automática basada en días hábiles (excluye fines de semana y feriados). | **Exclusivo para Personal de Planta**. Muestra alertas para no dejar obras sin personal. |
| **🎁 Aguinaldo de Navidad** | Cómputo por duodécimas según fecha de ingreso y terminación de contrato. | **Exclusivo para Personal de Planta** (mínimo 3 meses trabajados). |
| **📅 Feriados y Decretos** | Calendario oficial con soporte para feriados nacionales, departamentales y decretos extraordinarios. | Permite edición de fechas y adición de decretos con persistencia centralizada. |

---

## 📁 Estructura del Repositorio

```text
├── .env.example                  # Plantilla de variables de entorno para Cloud
├── .gitignore                    # Reglas de exclusión para Git
├── .gitattributes                # Normalización de saltos de línea (CRLF/LF)
├── LICENSE                       # Licencia propietaria corporativa
├── README.md                     # Documentación principal del repositorio
├── MANUAL_DE_USO.md              # Manual operativo de funciones y normativa
├── PLAN_DE_ACCION_MIGRACION.md   # Especificación técnica para despliegue Cloud y arquitectura MVC
│
├── index.html                    # Aplicación Web SPA (Frontend)
├── servidor.js                   # Servidor API HTTP local en Node.js
├── datos.json                    # Persistencia de datos centralizada
├── feriados_bolivia.js           # Motor de cálculo de feriados y días hábiles
├── generar_excel.js              # Generador automatizado de planillas en formato Excel
├── iniciar_sistema.bat           # Script de inicio rápido en Windows
├── Logo ML.jpg                   # Identidad visual corporativa
└── xlsx.full.min.js              # Librería SheetJS para exportación cliente
```

---

## ⚡ Inicio Rápido (Entorno Local)

### Prerrequisitos
* **Node.js** 18+ o superior instalado en el sistema.

### Ejecución
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-organizacion/planilla-personal-bolivia.git
   cd planilla-personal-bolivia
   ```
2. Iniciar el servidor local:
   ```bash
   node servidor.js
   ```
   *Alternativamente en Windows: Doble clic en `iniciar_sistema.bat`.*
3. Abrir en el navegador:
   ```text
   http://localhost:3000
   ```
4. Credenciales de acceso predeterminadas:
   * **Administración (RRHH):** Usuario: `encargado_rrhh` | Contraseña: `Bolivia2026*`
   * **Funcionarios:** Ingreso mediante su número de Carnet de Identidad (C.I.) y PIN predeterminado (`12345`).

---

## 🗺️ Hoja de Ruta (Roadmap hacia la Nube & Ejecutable Portable)

El proyecto cuenta con un plan de acción para agentes de IA detallado en [`PLAN_DE_ACCION_MIGRACION.md`](PLAN_DE_ACCION_MIGRACION.md):
- [x] Especificación de arquitectura MVC (Model-View-Controller).
- [ ] Fase 1: Esquema relacional PostgreSQL y scripts DDL limpios.
- [ ] Fase 2: Backend modular Express y documentación de endpoints con **Scalar** (`/docs`).
- [ ] Fase 3: Despliegue en la nube gratuita (Koyeb/Render + Neon PostgreSQL).
- [ ] Fase 4: Compilación del ejecutable portable para memorias USB (`.exe` liviano con WebView2).

---

## 📄 Derechos Reservados

**Morales Larrazábal M.L. Consultoría y Construcción S.R.L.**  
La Paz — Bolivia | Gestión 2026.
