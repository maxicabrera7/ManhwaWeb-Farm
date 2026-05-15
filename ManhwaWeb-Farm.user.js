// ==UserScript==
// @name         ManhwaWeb - PC Ghost Farm
// @namespace    Violentmonkey Scripts
// @version      3.0
// @description  Farm points in manhwaweb.com
// @author       maxicabrera7
// @match        *://*.manhwaweb.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm.user.js
// @downloadURL  https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Protocolo de invisibilidad
    Object.defineProperties(document, {
        'visibilityState': { get: () => 'visible' },
        'hidden': { get: () => false }
    });
    
    window.addEventListener('visibilitychange', (e) => e.stopImmediatePropagation(), true);
    window.addEventListener('blur', (e) => e.stopImmediatePropagation(), true);

    let elapsed = 0;
    const getTargetTime = () => 55 + Math.floor(Math.random() * 15);
    let currentTarget = getTargetTime();

    const init = () => {
        if (!window.location.href.includes('/leer/')) return;

        const ui = document.createElement('div');
        ui.id = 'pc-farm-ui';
        // Estilo de terminal técnica
        Object.assign(ui.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '10000',
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            color: '#00ff41', // Verde matriz
            fontFamily: 'Consolas, monospace',
            padding: '10px',
            fontSize: '11px',
            border: '1px solid #00ff41',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 255, 65, 0.2)',
            pointerEvents: 'none',
            minWidth: '180px'
        });
        document.body.appendChild(ui);
        
        setInterval(() => {
            elapsed++;
            
            // Cálculo de barra de progreso
            const progressPercent = Math.min((elapsed / currentTarget) * 100, 100);
            const progressBar = '[' + '='.repeat(Math.floor(progressPercent / 10)) + '-'.repeat(10 - Math.floor(progressPercent / 10)) + ']';
            
            // Indicador de latido (animación simple)
            const heartbeat = elapsed % 2 === 0 ? '●' : '○';

            ui.innerHTML = `
                <div style="border-bottom: 1px solid #00ff41; margin-bottom: 5px; font-weight: bold;">
                    ${heartbeat} GHOST_FARM_OS v3.0
                </div>
                <div>ESTADO: <span style="color:#fff">PROCESANDO...</span></div>
                <div>PROGRESO: ${progressBar}</div>
                <div>TIEMPO: ${elapsed}s / ${currentTarget}s</div>
                <div style="font-size: 9px; margin-top: 5px; color: #888;">
                    URL: ${window.location.pathname.split('/').pop()}
                </div>
            `;

            if (elapsed % 5 === 0) window.scrollBy(0, Math.random() * 50);

            if (elapsed >= currentTarget) {
                const nextLink = Array.from(document.querySelectorAll('a[href*="/leer/"]'))
                    .find(l => {
                        const content = (l.className + l.innerHTML + l.innerText).toLowerCase();
                        return l.href !== window.location.href && 
                               (content.includes('next') || content.includes('sig') || content.includes('arrow-right'));
                    });

                if (nextLink) {
                    ui.innerHTML += `<div style="color: yellow;">> SALTANDO...</div>`;
                    elapsed = 0;
                    window.location.href = nextLink.href;
                } else {
                    location.reload();
                }
            }
        }, 1000);
    };

    if (document.body) init();
    else document.addEventListener('DOMContentLoaded', init);
})();