@echo off
chcp 65001 > nul
title Morales Larrazabal M.L. - Sistema de Personal y Planillas
color 4F

echo =======================================================================
echo    MORALES LARRAZABAL M.L. CONSULTORIA Y CONSTRUCCION S.R.L.
echo     SISTEMA DE SEGUIMIENTO DE PERSONAL Y COSTOS POR OBRA (BOLIVIA)
echo =======================================================================
echo.

:: Detectar comando Node disponible (node o agy-node)
set NODE_CMD=
where node >nul 2>nul
if %errorlevel% equ 0 (
    set NODE_CMD=node
) else (
    where agy-node >nul 2>nul
    if %errorlevel% equ 0 (
        set NODE_CMD=agy-node
    ) else if exist "%APPDATA%\Antigravity\bin\agy-node.cmd" (
        set NODE_CMD="%APPDATA%\Antigravity\bin\agy-node.cmd"
    )
)

if "%NODE_CMD%"=="" (
    echo [ERROR] No se encontro Node.js instalado en el sistema.
    echo Por favor instale Node.js desde https://nodejs.org/ para ejecutar el servidor.
    echo.
    echo Abriendo la aplicacion directamente en el navegador en modo local...
    timeout /t 3 /nobreak > nul
    start "" "%~dp0index.html"
    pause
    exit /b
)

echo [1/3] Iniciando Servidor Central de Red y Base de Datos (datos.json)...
start "Servidor Central - Morales Larrazabal M.L." /min %NODE_CMD% "%~dp0servidor.js"
timeout /t 2 /nobreak > nul

echo.
echo [2/3] Abriendo Aplicacion Centralizada en tu navegador web...
start "" "http://localhost:3000"

echo.
echo [3/3] El sistema esta sincronizado en tiempo real.
echo       Cualquier usuario en la misma red Wi-Fi/LAN puede ingresar con la IP
echo       mostrada en la consola del servidor (ej. http://192.168.x.x:3000).
echo.
echo =======================================================================
echo Presiona ENTER si deseas abrir la Planilla Oficial en Excel (.xlsx),
echo o simplemente manten abierta esta ventana para seguir operando.
echo =======================================================================
pause > nul

if exist "%~dp0Planilla_Personal_Bolivia.xlsx" (
    echo Abriendo Excel...
    start "" "%~dp0Planilla_Personal_Bolivia.xlsx"
) else (
    echo Generando archivo Excel sincronizado con datos.json...
    call %NODE_CMD% "%~dp0generar_excel.js"
    start "" "%~dp0Planilla_Personal_Bolivia.xlsx"
)

exit
