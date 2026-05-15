// ==UserScript==
// @name         ManhwaWeb - Precision Farm v5.0
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Buscador de navegación por iconos y atributos para dispositivos lentos.
// @author       Auditor Técnico Cínico
// @match        *://*.manhwaweb.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm-Mobile.user.js
// @downloadURL  https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm-Mobile.user.js
// ==/UserScript==

(function() {
    'use strict';

    let seconds = 0;
    const TARGET = 65; 

    function createUI() {
        if (document.getElementById('lite-ui')) return;
        const ui = document.createElement('div');
        ui.id = 'lite-ui';
        ui.style = 'position:fixed;top:0;left:0;width:100%;z-index:2147483647;background:#000;color:#0f0;font-family:monospace;font-size:10px;text-align:center;border-bottom:1px solid #0f0;';
        document.body.appendChild(ui);
    }

    function findNextChapter() {
        const currentUrl = window.location.href.split('?')[0].split('#')[0];
        const allLinks = Array.from(document.querySelectorAll('a[href*="/leer/"]'));
        const nextSelectors = ['next', 'sig', 'forward', 'right', 'arrow'];

        for (let link of allLinks) {
            if (link.href === currentUrl) continue;

            const content = (link.className + link.id + link.innerHTML).toLowerCase();
            if (nextSelectors.some(s => content.includes(s))) {
                if (!content.includes('prev') && !content.includes('left') && !content.includes('back')) {
                    return link;
                }
            }
        }

        if (allLinks.length >= 2) {
            const lastLink = allLinks[allLinks.length - 1];
            if (lastLink.href !== currentUrl) return lastLink;
        }

        return null;
    }

    function runAudit() {
        const ui = document.getElementById('lite-ui');
        if (!ui) { createUI(); return; }

        if (window.location.href.includes('/leer/')) {
            seconds++;
            ui.innerText = `FARMEANDO: ${seconds}/${TARGET}s`;
            
            if (seconds % 2 === 0) window.scrollBy(0, 5);

            if (seconds >= TARGET) {
                seconds = 0;
                ui.innerText = 'LOCALIZANDO FLECHA...';
                
                const nextBtn = findNextChapter();
                if (nextBtn) {
                    ui.style.color = '#00ffff';
                    ui.innerText = 'SALTANDO...';
                    window.location.href = nextBtn.href;
                } else {
                    ui.style.color = 'red';
                    ui.innerText = 'ERROR: Flecha no detectada. Reintentando...';
                }
            }
        } else {
            seconds = 0;
            ui.innerText = 'MODO ESPERA';
        }
    }

    setInterval(runAudit, 1000);
})();
