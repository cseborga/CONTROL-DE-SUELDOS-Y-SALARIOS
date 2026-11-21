const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Agregar Modales de Configuración de Anticipos y de Backup antes de </main> o antes de <script>
const modalesExtra = `
  <!-- MODAL: CONFIGURAR ANTICIPOS INDIVIDUALES (OPCIONALES Y EDITABLES EN BS O %) -->
  <div class="modal-overlay" id="modal-config-anticipo">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--primary);">💵 Configuración de Pagos Parciales & Anticipos</h3>
        <button onclick="cerrarModalConfigAnticipo()" style="background:none; border:none; font-size:1.25rem; cursor:pointer;">✕</button>
      </div>
      <div class="modal-body">
        <form id="form-config-anticipo" onsubmit="guardarConfiguracionAnticipo(event)">
          <input type="hidden" id="ant-ci-target">
          
          <div style="background:#fef2f2; border:1px solid #fecaca; padding:0.85rem; border-radius:6px; margin-bottom:1.25rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#7f1d1d;" id="ant-modal-nombre">Trabajador: ...</div>
            <div style="font-size:0.75rem; color:#52525b; margin-top:0.2rem;" id="ant-modal-detalles">Cargo • Obra • Tipo Contrato</div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--primary); margin-top:0.35rem;" id="ant-modal-sueldo">Total Ganado Mensual: Bs 0.00</div>
          </div>

          <!-- BLOQUE 1ER ANTICIPO -->
          <div style="border:1px solid var(--border-color); border-radius:6px; padding:1rem; margin-bottom:1rem; background:#fff;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <label style="font-weight:800; font-size:0.85rem; color:var(--primary); display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
                <input type="checkbox" id="ant1-activo" onchange="recalcularModalAnticipos()" style="width:16px; height:16px; cursor:pointer;">
                Habilitar 1er Pago Parcial (Anticipo 1)
              </label>
              <span id="ant1-badge-status" class="badge badge-neutral">Inactivo (Bs 0.00)</span>
            </div>

            <div id="ant1-campos" style="display:none; margin-top:0.75rem;">
              <div class="grid-2">
                <div class="form-group">
                  <label>Tipo de Cálculo:</label>
                  <select id="ant1-tipo" onchange="recalcularModalAnticipos()">
                    <option value="porcentaje">Porcentaje del Sueldo (%)</option>
                    <option value="monto">Monto Fijo en Bolivianos (Bs)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label id="ant1-lbl-valor">Valor (%):</label>
                  <input type="number" step="0.01" min="0" id="ant1-valor" value="30" oninput="recalcularModalAnticipos()" required>
                </div>
              </div>
              <div style="text-align:right; font-size:0.8rem; font-weight:700; color:#7f1d1d; margin-top:0.4rem;" id="ant1-monto-calc">
                Monto resultante: Bs 0.00
              </div>
            </div>
          </div>

          <!-- BLOQUE 2DO ANTICIPO -->
          <div style="border:1px solid var(--border-color); border-radius:6px; padding:1rem; margin-bottom:1rem; background:#fff;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <label style="font-weight:800; font-size:0.85rem; color:var(--primary); display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
                <input type="checkbox" id="ant2-activo" onchange="recalcularModalAnticipos()" style="width:16px; height:16px; cursor:pointer;">
                Habilitar 2do Pago Parcial (Anticipo 2)
              </label>
              <span id="ant2-badge-status" class="badge badge-neutral">Inactivo (Bs 0.00)</span>
            </div>

            <div id="ant2-campos" style="display:none; margin-top:0.75rem;">
              <div class="grid-2">
                <div class="form-group">
                  <label>Tipo de Cálculo:</label>
                  <select id="ant2-tipo" onchange="recalcularModalAnticipos()">
                    <option value="porcentaje">Porcentaje del Sueldo (%)</option>
                    <option value="monto">Monto Fijo en Bolivianos (Bs)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label id="ant2-lbl-valor">Valor (%):</label>
                  <input type="number" step="0.01" min="0" id="ant2-valor" value="30" oninput="recalcularModalAnticipos()" required>
                </div>
              </div>
              <div style="text-align:right; font-size:0.8rem; font-weight:700; color:#7f1d1d; margin-top:0.4rem;" id="ant2-monto-calc">
                Monto resultante: Bs 0.00
              </div>
            </div>
          </div>

          <!-- RESUMEN FINANCIERO DE LIQUIDACIÓN -->
          <div style="background:#fafafa; border:1px solid var(--border-color); padding:0.85rem; border-radius:6px; font-size:0.78rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <span>Total Ganado Mensual:</span>
              <strong id="ant-sum-ganado" class="mono">Bs 0.00</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; color:#7f1d1d;">
              <span>(-) Desembolso 1er Anticipo:</span>
              <strong id="ant-sum-ant1" class="mono">Bs 0.00</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; color:#7f1d1d;">
              <span>(-) Desembolso 2do Anticipo:</span>
              <strong id="ant-sum-ant2" class="mono">Bs 0.00</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; color:#7f1d1d;">
              <span>(-) Descuentos de Ley Gestora (Planta):</span>
              <strong id="ant-sum-desc" class="mono">Bs 0.00</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1.5px solid #d4d4d8; padding-top:0.35rem; font-weight:800; font-size:0.85rem; color:var(--primary);">
              <span>(=) SALDO LÍQUIDO FINAL A FIN DE MES:</span>
              <strong id="ant-sum-saldo" class="mono">Bs 0.00</strong>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="cerrarModalConfigAnticipo()">Cancelar</button>
        <button class="btn btn-primary" onclick="document.getElementById('form-config-anticipo').requestSubmit()">💾 Guardar Configuración de Anticipos</button>
      </div>
    </div>
  </div>

  <!-- MODAL: GESTIÓN DE COPIAS DE SEGURIDAD (RESPALDO / RESTAURAR / RESET) -->
  <div class="modal-overlay" id="modal-backup">
    <div class="modal-box">
      <div class="modal-header">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--primary);">💾 Copias de Seguridad & Sincronización</h3>
        <button onclick="cerrarModalBackup()" style="background:none; border:none; font-size:1.25rem; cursor:pointer;">✕</button>
      </div>
      <div class="modal-body">
        <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1.25rem;">
          El sistema guarda automáticamente todos los cambios en el servidor central (<code>datos.json</code>) y en la memoria local del navegador (<code>localStorage</code>). Desde aquí puedes descargar una copia de seguridad o restaurarla.
        </div>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div style="background:#fef2f2; border:1px solid #fecaca; padding:1rem; border-radius:6px;">
            <strong style="color:#7f1d1d; font-size:0.85rem;">📥 Descargar Copia de Seguridad Completa (JSON):</strong>
            <p style="font-size:0.75rem; color:#52525b; margin:0.35rem 0 0.75rem 0;">Descarga un archivo con toda la base de datos (personal, obras, permisos, sanciones, vacaciones y configuraciones).</p>
            <button class="btn btn-primary btn-sm" onclick="descargarBackupJSON()">📥 Descargar Backup (.json)</button>
          </div>

          <div style="background:#fafafa; border:1px solid var(--border-color); padding:1rem; border-radius:6px;">
            <strong style="color:var(--text-main); font-size:0.85rem;">📤 Restaurar desde Copia de Seguridad (JSON):</strong>
            <p style="font-size:0.75rem; color:#52525b; margin:0.35rem 0 0.75rem 0;">Carga un archivo de respaldo previamente descargado para restaurar el sistema al estado de esa copia.</p>
            <input type="file" id="backup-file-input" accept=".json" style="font-size:0.75rem; margin-bottom:0.5rem;" onchange="importarBackupJSON(event)">
          </div>

          <div style="background:#fff; border:1px solid #fca5a5; padding:1rem; border-radius:6px;">
            <strong style="color:#991b1b; font-size:0.85rem;">🔄 Restablecer Datos de Ejemplo Iniciales:</strong>
            <p style="font-size:0.75rem; color:#52525b; margin:0.35rem 0 0.75rem 0;">Si deseas reiniciar los datos al estado de ejemplo inicial de la constructora.</p>
            <button class="btn btn-outline-red btn-sm" onclick="restablecerDatosEjemplo()">🔄 Restablecer a Datos de Fábrica</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="cerrarModalBackup()">Cerrar</button>
      </div>
    </div>
  </div>

  <!-- TOAST FLOTANTE DE NOTIFICACIÓN DE GUARDADO -->
  <div id="toast-notificacion" style="position:fixed; bottom:24px; right:24px; z-index:9999; background:#18181b; color:#fff; padding:0.75rem 1.25rem; border-radius:8px; font-size:0.8rem; font-weight:700; box-shadow:0 10px 15px -3px rgba(0,0,0,0.3); display:none; align-items:center; gap:0.5rem; border-left:4px solid var(--primary); transition:all 0.3s ease;">
    <span>💾 Cambios guardados</span>
  </div>
`;

// Insertar modales antes de <script>
if (!content.includes('modal-config-anticipo')) {
  content = content.replace('  <script>', modalesExtra + '\n  <script>');
}

// 2. Modificar el header para incluir el indicador de estado del servidor y el botón de backup
const headerSearch = `<div style="display: flex; align-items: center; gap: 0.75rem;">`;
const headerReplacement = `<div style="display: flex; align-items: center; gap: 0.75rem;">
        <span id="badge-servidor-status" class="badge badge-success" style="font-size:0.7rem; padding:0.3rem 0.6rem;">🟢 Servidor Activo</span>
        <button class="btn btn-outline btn-sm admin-only-tab" onclick="abrirModalBackup()" title="Respaldos y base de datos">💾 Respaldos</button>`;

if (!content.includes('badge-servidor-status')) {
  content = content.replace(headerSearch, headerReplacement);
}

// 3. Modificar la cabecera de la pestaña Pagos Parciales para agregar botón de configuración global
const pagosHeaderSearch = `<button class="btn btn-outline-red btn-sm" onclick="imprimirResumenPagosParciales()">
              🖨️ Imprimir Resumen de Desembolso
            </button>`;
const pagosHeaderReplacement = `<button class="btn btn-outline btn-sm" onclick="aplicarAnticiposGlobalesModal()">
              ⚙️ Configuración Rápida
            </button>
            <button class="btn btn-outline-red btn-sm" onclick="imprimirResumenPagosParciales()">
              🖨️ Imprimir Resumen de Desembolso
            </button>`;

if (!content.includes('aplicarAnticiposGlobalesModal')) {
  content = content.replace(pagosHeaderSearch, pagosHeaderReplacement);
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Fase 1: Modales y encabezados integrados exitosamente en index.html');
