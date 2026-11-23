# Planilla Personal Bolivia – Reorganización MVC

## Estructura del proyecto
```
planilla_personal_bolivia/
├─ backend/            # Servidor Node.js
│   └─ servidor.js      # Sirve archivos estáticos desde `../frontend`
├─ frontend/           # UI estática
│   ├─ index.html       # Entrada principal
│   └─ app.js           # Lógica JavaScript extraída del HTML (MVC)
├─ datos.json          # Base de datos local (JSON)
├─ README-REORG.md    # Este documento
└─ ...                # Otros scripts y recursos auxiliares
```

## Cómo iniciar la aplicación
1. **Instalar Node.js** (si no está instalado).
2. Desde la raíz del proyecto:
   ```powershell
   cd backend
   node servidor.js
   ```
3. Abrir en el navegador `http://localhost:3000`.
   - La consola del navegador mostrará `Frontend de planilla de personal inicializado correctamente.`

## Qué cambió en la fase 1
- Se extrajo el script inline de `frontend/index.html` a `frontend/app.js`.
- El servidor (`backend/servidor.js`) sirve estáticamente la carpeta `frontend` mediante `path.join(__dirname, '..', 'frontend')`.
- Se actualizó el HTML para cargar `<script src="app.js"></script>`.
- Los cambios fueron commit‑eados y push‑eados a GitHub.

## Próximos pasos (Fase 2)
- Verificar que todas las rutas de assets (`<link>`, `<img>`, etc.) apunten a ubicaciones dentro de `frontend/`.
- Ejecutar una prueba funcional (abrir en el navegador y confirmar que la UI se carga sin errores).
- Documentar cualquier ajuste adicional.
