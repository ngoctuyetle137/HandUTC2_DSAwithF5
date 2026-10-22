@echo off
chcp 65001 >nul
title UTC2Hand - C++ DSA Core Engine Demo
color 0E
echo ==============================================================================
echo   HE THONG PASS DO SINH VIEN UTC2HAND - CORE DSA ENGINE (C++)
echo   Truong DH Giao Thong Van Tai TP.HCM - Phan hieu UTC2
echo ==============================================================================
echo.

if not exist dsa_core_engine.exe (
    echo [THONG BAO] Dang bien dich dsa_core_engine.cpp bang trinh bien dich g++...
    g++ -std=c++17 -O2 dsa_core_engine.cpp -o dsa_core_engine.exe
    if errorlevel 1 (
        echo [LOI] Khong the bien dich. Vui long kiem tra lai g++ tren may.
        pause
        exit /b 1
    )
    echo [THANH CONG] Da tao xong file thuc thi dsa_core_engine.exe!
    echo.
)

dsa_core_engine.exe
pause

