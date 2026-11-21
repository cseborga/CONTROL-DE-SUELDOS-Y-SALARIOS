# 🤖 AGENT EXECUTION PLAN: CLOUD MIGRATION, MVC REFACTORING & PORTABLE EXECUTABLE
## Morales Larrazábal M.L. Consultoría y Construcción S.R.L.

> **Target Audience:** Autonomous AI Coding Agents / Subagents.  
> **Execution Constraint:** Deterministic, non-destructive, zero-dummy-data, contract-driven, automated verification at every step.

---

## 🧭 System Invariants & Non-Negotiable Rules

1. **Zero Cooked Data Policy:** No fake or placeholder rows in production tables (`personal`, `obras`, `boletas_permiso`, `sanciones`, `vacaciones`, `anticipos`). Only immutable system catalogs are seeded (Bolivian official holidays and initial root HR administrator credentials).
2. **Bolivian Labor Standards Compliance (LGT):**
   - Commercial month standard: **30 days base** ($Sueldo \div 30 \times Días$).
   - Mandatory Planta Deductions: Gestora Pública **12.71%** (Vejez 10%, Riesgo Común 1.71%, Comisión 0.5%, Solidario 0.5%) + ANS where applicable.
   - Employer Burden: **16.71%** (CNS 10%, Riesgo Profesional 1.71%, Solidario 3%, Pro-Vivienda 2%).
   - Social Provisions: **16.66%** (Aguinaldo 8.33%, Indemnización 8.33%).
   - Consultores en Línea: **0% withholdings**, **0% employer burden**, **no vacation or aguinaldo**. Net payment equals gross contractual fee.
3. **Legacy Preservation:** Current monolithic files (`index.html`, `servidor.js`, `datos.json`) must NOT be deleted. They must be preserved as backups (`legacy/`) until all integration test assertions pass.
4. **Atomic Transactions:** Financial and attendance records must use explicit SQL transactions (`BEGIN ... COMMIT / ROLLBACK`).

---

## 📊 Technical Stack Decisions (Deterministic)

- **Database Engine:** PostgreSQL 15+ (Serverless on Neon Tech or Supabase Free Tier). Driver: `pg` (Pool with SSL rejectUnauthorized: false).
- **Backend API:** Node.js 20+ with Express.js, strict CORS, JSON schema validation.
- **API Documentation:** Scalar API Reference (`@scalar/express-api-reference`) serving OpenAPI 3.1 specs at `/docs`.
- **Frontend Architecture:** Clean MVC SPA (Vanilla ES6 modules, CSS Custom Properties, Chart.js, SheetJS).
- **Desktop Packaging:** Portable single-file Windows executable (`.exe`) bundling WebView2 launcher with static frontend assets, communicating via HTTPS to Cloud API.

---

## 🗺️ Directed Acyclic Graph (DAG) of Agent Phases

```mermaid
graph TD
    Phase1["Phase 1: Database Architecture & DDL (PostgreSQL)"]
    Phase2["Phase 2: Backend MVC & Bolivian Labor Engine"]
    Phase3["Phase 3: Scalar OpenAPI 3.1 & Automated Test Suite"]
    Phase4["Phase 4: Frontend Modularization (MVC Decoupling)"]
    Phase5["Phase 5: Cloud Deployment (Koyeb/Render + Neon)"]
    Phase6["Phase 6: Portable USB Executable (.exe) Generation"]
    Phase7["Phase 7: Comprehensive Documentation Artifacts"]

    Phase1 --> Phase2
    Phase2 --> Phase3
    Phase3 --> Phase4
    Phase4 --> Phase5
    Phase5 --> Phase6
    Phase6 --> Phase7
```

---

## 📋 Detailed Execution Phases

### PHASE 1: Database Architecture & Clean DDL (PostgreSQL)
* **Goal:** Create fully relational, normalized schema ensuring referential integrity and strict typing.
* **Outputs:** `backend/sql/01_schema.sql` and `backend/sql/02_seed_invariants.sql`.
* **Database Tables:**
  1. `usuarios_rrhh`: `id (UUID PK)`, `usuario (VARCHAR UNIQUE)`, `password_hash (VARCHAR)`, `nombre_completo`, `cargo`, `updated_at`.
  2. `obras`: `id (VARCHAR PK)`, `nombre (VARCHAR)`, `tipo`, `ubicacion`, `fecha_inicio (DATE)`, `fecha_fin (DATE NULL)`, `presupuesto_mano_obra (NUMERIC(14,2))`, `estado (VARCHAR)`.
  3. `personal`: `codigo (VARCHAR PK)`, `ci (VARCHAR UNIQUE)`, `nombres`, `cargo`, `tipo_contrato (VARCHAR: Planta|Consultor en Línea)`, `obra_id (FK)`, `fecha_ingreso (DATE)`, `fecha_retiro (DATE NULL)`, `sueldo_basico (NUMERIC(12,2))`, `estado`, `pin (VARCHAR)`.
  4. `feriados`: `id (VARCHAR PK)`, `fecha (DATE UNIQUE)`, `nombre`, `tipo (VARCHAR: Nacional|Departamental|Decretado)`, `decreto_normativo`, `aplica_a (VARCHAR)`.
  5. `boletas_permiso`: `correlativo (VARCHAR PK)`, `personal_ci (FK)`, `fecha (DATE)`, `hora_inicio`, `duracion`, `tipo_permiso`, `motivo (TEXT)`, `estado (VARCHAR: Pendiente|Autorizada|Rechazada)`, `autorizado_por`, `fecha_autorizacion (TIMESTAMP NULL)`, `observacion_rrhh`.
  6. `sanciones`: `id (VARCHAR PK)`, `personal_ci (FK)`, `fecha_falta (DATE)`, `motivo (TEXT)`, `dias_sancion (INT)`, `memorandum_codigo`, `descontar_en_planilla (BOOLEAN)`, `creado_por`.
  7. `config_anticipos`: `personal_codigo (FK PK)`, `ant1_activo (BOOLEAN)`, `ant1_tipo (VARCHAR)`, `ant1_valor (NUMERIC(10,2))`, `ant2_activo (BOOLEAN)`, `ant2_tipo (VARCHAR)`, `ant2_valor (NUMERIC(10,2))`.
  8. `vacaciones_programadas`: `id (UUID PK)`, `personal_ci (FK)`, `gestion (INT)`, `dias_solicitados (INT)`, `fecha_salida (DATE)`, `fecha_fin (DATE)`, `fecha_retorno (DATE)`, `estado`.
* **Seed Invariants:**
  - Initial Root HR User (`encargado_rrhh` / bcrypt hashed password).
  - Base project: `OBRA-00: Oficina Central (Administración & Gerencia)`.
  - Official 2026 Bolivian National & Departmental Holidays (20 official records).
* **Verification Command:** `node backend/scripts/verify_db_schema.js`. Must assert all 8 tables exist with 0 operational records.

---

### PHASE 2: Backend MVC & Bolivian Labor Engine
* **Goal:** Implement RESTful API using Express with pure separation of concerns.
* **Directory Structure:**
  ```text
  backend/
  ├── src/
  │   ├── config/ (db.js, constants.js)
  │   ├── models/ (PersonalModel.js, ObrasModel.js, etc.)
  │   ├── controllers/ (personalController.js, planillaController.js, etc.)
  │   ├── routes/ (v1/ router mount)
  │   ├── services/
  │   │   ├── bolivianLaborEngine.js   # Pure math for Gestora, Patronal, Provisiones, Aguinaldo
  │   │   └── bolivianCalendarEngine.js # Easter Meeus algorithm, weekend/holiday filtering
  │   ├── middlewares/ (authMiddleware.js, errorHandler.js, cors.js)
  │   └── app.js
  ```
* **Acceptance Criteria:**
  - `bolivianLaborEngine.js` must calculate cents rounded via standard accounting rules:
    $$\text{Gestora Total} = \text{round}(TG \times 0.1271, 2)$$
    $$\text{Patronal Total} = \text{round}(TG \times 0.1671, 2)$$
    $$\text{Provisiones} = \text{round}(TG \times 0.1666, 2)$$
  - Consultor calculation asserts `gestora === 0`, `patronal === 0`, `liquido === honorario`.
* **Verification Command:** `node backend/tests/test_labor_calculations.js` (Must run 20+ unit tests passing with zero assertions failing).

---

### PHASE 3: Scalar OpenAPI 3.1 & Automated Test Suite
* **Goal:** Expose interactive API documentation at `/docs` using `@scalar/express-api-reference` and validate all endpoints.
* **Endpoints Contract:**
  - `POST /api/v1/auth/login` $\rightarrow$ `{ token, usuario, role }`
  - `GET /api/v1/personal` $\rightarrow$ list of all active personnel
  - `POST /api/v1/personal` $\rightarrow$ create new employee (Planta/Consultor)
  - `GET /api/v1/obras` $\rightarrow$ list of projects with accumulated labor cost
  - `POST /api/v1/obras` $\rightarrow$ create project
  - `GET /api/v1/permisos` $\rightarrow$ list permits
  - `POST /api/v1/permisos` $\rightarrow$ employee requests permit (starts as `Pendiente`)
  - `PATCH /api/v1/permisos/:id/autorizar` $\rightarrow$ HR authorizes or rejects
  - `POST /api/v1/sanciones` $\rightarrow$ HR issues sanction & memorandum
  - `GET /api/v1/feriados` $\rightarrow$ read holiday calendar
  - `PUT /api/v1/feriados/:id` $\rightarrow$ edit holiday date/name
  - `GET /api/v1/planilla/mensual` $\rightarrow$ computes month payroll with subtotals per obra
  - `GET /api/v1/planilla/aguinaldos` $\rightarrow$ computes duodécimas for Planta only
* **Verification Command:** `node backend/tests/test_api_endpoints.js` (E2E API test asserting HTTP 200, 201, 400, 401, 403).

---

### PHASE 4: Frontend Modularization (MVC Decoupling)
* **Goal:** Split monolithic `index.html` into modern, maintainable MVC components without breaking any visual or operational feature.
* **Directory Structure:**
  ```text
  frontend/
  ├── public/
  │   ├── assets/ (Logo ML.jpg, favicon, icons)
  │   ├── css/
  │   │   ├── variables.css      # Morales Larrazábal Red & White color palette
  │   │   ├── layout.css         # Navigation, header, tab system
  │   │   ├── components.css     # Tables, badges, modals, cards
  │   │   └── print.css          # Printable Boletas, Memorandums, Comprobantes
  │   └── js/
  │       ├── api/ (client.js)   # Axios/Fetch wrapper with retry & token handling
  │       ├── models/ (store.js) # Reactive client-side state
  │       ├── controllers/       # UI event handlers per tab
  │       │   ├── personalUI.js
  │       │   ├── obrasUI.js
  │       │   ├── permisosUI.js
  │       │   ├── planillaUI.js
  │       │   └── feriadosUI.js
  │       └── views/             # Template renderers for tables and cards
  └── index.html                 # Clean semantic HTML mounting views
  ```
* **Acceptance Criteria:**
  - Branding matches 100% of the Morales Larrazábal identity.
  - "TOTAL CONSOLIDADO EMPRESA" row preserved with high contrast red highlighting.
  - Full SheetJS (`xlsx.full.min.js`) export functional from client.
* **Verification Command:** Headless browser audit or manual browser test script checking all 8 tabs.

---

### PHASE 5: Cloud Deployment (Koyeb / Render + Neon)
* **Goal:** Deploy production backend connected to managed serverless PostgreSQL.
* **Deployment Matrix:**
  - Primary target: **Koyeb** (Node.js web service, 0 min cold start) + **Neon PostgreSQL** (SSL pool).
  - Fallback target: **Render** + **Supabase**.
* **Environment Variables:**
  - `PORT=3000`
  - `DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require`
  - `JWT_SECRET=super_secret_enterprise_key`
  - `NODE_ENV=production`
  - `CORS_ORIGIN=*` (or specific portable origin)
* **Verification Command:** `curl -f https://<cloud-url>/api/v1/health` returning `{ status: "ok", db: "connected" }`.

---

### PHASE 6: Portable USB Executable (.exe) Generation
* **Goal:** Single standalone `.exe` runnable from USB flash drives on any 64-bit Windows machine.
* **Architecture:**
  - Launcher packaging static frontend files + WebView2 runtime bridge.
  - Preconfigured `config.json` defining Cloud API target URL:
    ```json
    {
      "apiUrl": "https://api-planilla-ml.koyeb.app",
      "offlineFallback": false,
      "timeoutMs": 15000
    }
    ```
  - App icon: Embedded `Logo ML.ico`.
  - Zero Windows Admin privileges required.
* **Output Artifact:** `dist/Planilla_Morales_Larrazabal_Portable.exe` (< 15 MB).
* **Verification Command:** Launch `.exe` in isolated clean Windows environment, verify immediate UI render and cloud handshake.

---

### PHASE 7: Documentation Artifacts
* **Goal:** Produce production-grade documentation for administrators, workers, and developers.
* **Files to Generate:**
  1. `README_INSTALACION.md`: Step-by-step cloud provisioning and USB executable copying guide.
  2. `README_FLUJOS_OPERATIVOS.md`: Complete workflow manual with mermaid diagrams for permits, sanctions, and payroll.
  3. `docs/API_SCALAR.md`: Guide to interacting with the Scalar documentation portal.

---

## 🔒 Automated Verification Checklist for Agents

| Phase | Check Item | Verification Command | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | Database DDL & Invariants | `node backend/scripts/verify_db.js` | 8 tables, 0 operational rows, 20 feriados |
| **2** | Labor Math Engine | `node backend/tests/test_math.js` | 100% assertions passed (Gestora 12.71%, etc.) |
| **3** | Scalar API Endpoints | `node backend/tests/test_api.js` | HTTP 200/201 on all valid payloads, /docs live |
| **4** | Modular Frontend | Browser DOM verification | All tabs render cleanly, 0 console errors |
| **5** | Cloud Live Endpoint | `curl -f https://<deploy>/api/v1/info` | Status 200, SSL valid |
| **6** | Portable Executable | Execute `.exe` on Windows | Window launches, connects to Cloud DB |

---
*Agent Directive: Execute phases sequentially. Never skip a verification check. If any assertion fails, halt and resolve immediately.*
