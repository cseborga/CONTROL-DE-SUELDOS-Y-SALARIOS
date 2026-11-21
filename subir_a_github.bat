@echo off
chcp 65001 > nul
title Preparar y Subir Proyecto a GitHub - Morales Larrazabal S.R.L.
color 0C

echo ======================================================================
echo    MORALES LARRAZABAL M.L. CONSULTORIA Y CONSTRUCCION S.R.L.
echo         ASISTENTE PARA PREPARAR Y SUBIR PROYECTO A GITHUB
echo ======================================================================
echo.

:: 1. Verificar si git esta instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Git no se encuentra instalado en este equipo o no esta en el PATH.
    echo.
    echo ¿Desea instalar Git automaticamente usando winget? (S/N)
    set /p INSTALAR="> "
    if /i "%INSTALAR%"=="S" (
        echo.
        echo [*] Descargando e instalando Git para Windows...
        winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
        echo.
        echo [OK] Instalacion finalizada. Por favor reinicie esta consola para continuar.
        pause
        exit /b
    ) else (
        echo.
        echo Por favor instale Git manualmente desde https://git-scm.com/downloads y vuelva a ejecutar este script.
        pause
        exit /b
    )
)

echo [OK] Git detectado correctamente en el sistema.
echo.

:: 2. Inicializar repositorio si no existe
if not exist ".git" (
    echo [*] Inicializando repositorio Git local...
    git init
    git branch -M main
) else (
    echo [*] Repositorio Git ya existente.
)

:: 3. Configurar usuario local si no esta configurado
git config user.name >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo Ingrese su nombre para los commits de Git (ej: Daniel Morales):
    set /p GIT_USER="> "
    git config user.name "%GIT_USER%"
)

git config user.email >nul 2>nul
if %errorlevel% neq 0 (
    echo Ingrese su correo para los commits de Git (ej: daniel@empresa.com):
    set /p GIT_EMAIL="> "
    git config user.email "%GIT_EMAIL%"
)

echo.
echo [*] Agregando archivos al area de preparacion (staging)...
git add .

echo.
echo [*] Creando commit inicial...
git commit -m "feat: initial commit - Sistema Morales Larrazabal M.L. SRL"

echo.
echo ======================================================================
echo             VINCULACION CON REPOSITORIO REMOTO EN GITHUB
echo ======================================================================
echo.
echo Para subir el codigo, crea un repositorio nuevo y vacio en tu cuenta de GitHub:
echo   1. Ingresa a https://github.com/new
echo   2. Asigna un nombre al repositorio (ej: planilla-morales-larrazabal)
echo   3. Selecciona Privado o Publico (NO agregues README, .gitignore ni licencia)
echo   4. Copia la URL del repositorio (HTTPS o SSH).
echo.
echo Pega la URL del repositorio de GitHub (o presiona ENTER para omitir la subida por ahora):
set /p REPO_URL="> "

if not "%REPO_URL%"=="" (
    git remote remove origin >nul 2>nul
    git remote add origin %REPO_URL%
    echo.
    echo [*] Subiendo rama main a GitHub...
    git push -u origin main
    echo.
    if %errorlevel% equ 0 (
        echo ======================================================================
        echo  [EXITO] ¡Proyecto subido exitosamente a GitHub!
        echo ======================================================================
    ) else (
        echo [!] Hubo un error al subir a GitHub. Verifica tus credenciales o token de acceso.
    )
) else (
    echo.
    echo [INFO] El repositorio local quedo listo y commiteado.
    echo Puedes subirlo mas tarde ejecutando:
    echo   git remote add origin TU_URL_DE_GITHUB
    echo   git push -u origin main
)

echo.
pause
