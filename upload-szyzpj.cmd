@echo off
setlocal
set "GITBIN=C:\Users\90634\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe"
set "GIT_EXEC_PATH=C:\Users\90634\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin"
set "PATH=%GIT_EXEC_PATH%;%PATH%"
set "GIT_TERMINAL_PROMPT=1"
set "GCM_INTERACTIVE=always"
set "SITE=%~dp0szyzpj-upload-small"
if not exist "%GITBIN%" goto missing
if not exist "%SITE%\.git" goto missing
cd /d "%SITE%"
echo Uploading the prepared portfolio to Steve511nb/szyzpj.
echo Complete GitHub sign-in in your browser if requested.
echo No force push will be used.
"%GITBIN%" -c "safe.directory=%SITE%" -c http.sslBackend=openssl -c credential.helper=manager push https://github.com/Steve511nb/szyzpj.git HEAD:main
if errorlevel 1 goto failed
echo.
echo Upload completed. Enable GitHub Pages at:
echo https://github.com/Steve511nb/szyzpj/settings/pages
echo Select: Deploy from a branch / main / root / Save.
pause
exit /b 0
:missing
echo Required Git program or prepared repository was not found.
pause
exit /b 1
:failed
echo.
echo Upload did not complete. Keep this window open and share the error message.
echo Do not share passwords or access tokens.
pause
exit /b 1
