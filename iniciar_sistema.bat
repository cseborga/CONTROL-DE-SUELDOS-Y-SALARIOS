@echo off
chcp 65001 > nul
title Morales Larrazábal M.L. - Sistema de Personal y Planillas
color 4F

echo =======================================================================
echo    MORALES LARRAZÁBAL M.L. CONSULTORÍA Y CONSTRUCCIÓN S.R.L.
echo     SISTEMA DE SEGUIMIENTO DE PERSONAL Y COSTOS POR OBRA (BOLIVIA)
echo =======================================================================
echo.
echo [1/3] Iniciando Servidor Central de Red y Base de Datos (datos.json)...
start "Servidor Central - Morales Larrazábal M.L." /min agy-node "%~dp0servidor.js"
timeout /t 2 /nobreak > nul

echo.
echo [2/3] Abriendo Aplicación Centralizada en tu navegador web...
start "" "http://localhost:3000"

echo.
echo [3/3] El sistema está sincronizado en tiempo real.
echo       Cualquier usuario en la misma red Wi-Fi/LAN puede ingresar con la IP
echo       mostrada en la consola del servidor (ej. http://192.168.x.x:3000).
echo.
echo =======================================================================
echo Presiona ENTER si deseas abrir la Planilla Oficial en Excel (.xlsx),
echo o simplemente mantén abierta esta ventana para seguir operando.
echo =======================================================================
pause > nul

if exist "%~dp0Planilla_Personal_Bolivia.xlsx" (
    echo Abriendo Excel...
    start "" "%~dp0Planilla_Personal_Bolivia.xlsx"
) else (
    echo Generando archivo Excel sincronizado con datos.json...
    call agy-node "%~dp0generar_excel.js"
    start "" "%~dp0Planilla_Personal_Bolivia.xlsx"
)

exit
