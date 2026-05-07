// ==UserScript==
// @name         ManhwaWeb - PC Ghost Farm v6.5
// @namespace    http://tampermonkey.net/
// @version      6.5.1
// @description  Spoofing de visibilidad para farmeo en segundo plano.
// @author       Auditor Técnico Cínico
// @match        *://*.manhwaweb.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/main/script.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Spoofing de visibilidad
    Object.defineProperties(document, {
        'visibilityState': { get: () => 'visible' },
        'hidden': { get: () => false }
    });
    
    window.addEventListener('visibilitychange', (e) => e.stopImmediatePropagation(), true);
    window.addEventListener('blur', (e) => e.stopImmediatePropagation(), true);

    const TARGET_SECONDS = 65; 
    let elapsed = 0;

    // UI: Crear una sola vez, no en cada ciclo del loop
    const ui = document.createElement('div');
    ui.id = 'pc-farm-ui';
    ui.style = 'position:fixed;top:0;right:0;z-index:999999;background:rgba(0,0,0,0.8);color:#0f0;font-family:monospace;padding:5px;font-size:12px;border:1px solid #0f0;';
    
    const init = () => {
        if (!window.location.href.includes('/leer/')) return;
        document.body.appendChild(ui);
        
        setInterval(() => {
            elapsed++;
            ui.innerText = `MODO FANTASMA: ${elapsed}/${TARGET_SECONDS}s`;

            if (elapsed % 5 === 0) window.scrollBy(0, Math.random() * 50);

            if (elapsed >= TARGET_SECONDS) {
                elapsed = 0;
                const next = Array.from(document.querySelectorAll('a[href*="/leer/"]'))
                    .find(l => {
                        const content = (l.className + l.innerHTML).toLowerCase();
                        return l.href !== window.location.href && (content.includes('next') || content.includes('sig'));
                    });
                window.location.href = next ? next.href : window.location.href;
            }
        }, 1000);
    };

    // Esperar a que el body exista
    if (document.body) init();
    else document.addEventListener('DOMContentLoaded', init);
})();
