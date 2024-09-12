@echo off
title Starting ccIDE
start "" cmd /c "npm cache clean --force"
timeout 2
npm run dev