@echo off
REM ------------------------------------------------------------------------------
REM generatePublicTree.bat
REM ------------------------------------------------------------------------------
REM This script lists the folder structure and files within the current
REM "public" folder. It outputs the results to publicFolderTree.txt.
REM ------------------------------------------------------------------------------
cd /D "%~dp0"

(
  echo -----------------------------------------------------
  echo  Public Folder Tree for Your Next.js Project
  echo -----------------------------------------------------
  echo.
  echo This file lists all subfolders and files under the:
  echo %CD%
  echo.
  echo -----------------------------------------------------
  echo.
  tree . /F /A
) > publicFolderTree.txt

echo Done! The tree is saved as publicFolderTree.txt
pause
