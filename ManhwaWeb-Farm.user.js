// ==UserScript==
// @name         ManhwaWeb - PC Ghost Farm
// @namespace    Violentmonkey Scripts
// @version      2.8
// @description  Spoofing de visibilidad para farmeo en segundo plano.
// @author       maxicabrera7
// @match        *://*.manhwaweb.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/main/ManhwaWeb-Farm.user.js
// @downloadURL  https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/main/ManhwaWeb-Farm.user.js
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

    // Variables de control de flujo
    let elapsed = 0;
    const getTargetTime = () => 55 + Math.floor(Math.random() * 15); // Rango: 55-70s
    let currentTarget = getTargetTime();

    // UI estático
    const ui = document.createElement('div');
    ui.id = 'pc-farm-ui';
    ui.style = 'position:fixed;top:0;right:0;z-index:999999;background:rgba(0,0,0,0.85);color:#0f0;font-family:monospace;padding:5px;font-size:12px;border:1px solid #0f0;pointer-events:none;';
    
    const init = () => {
        if (!window.location.href.includes('/leer/')) return;
        document.body.appendChild(ui);
        
        setInterval(() => {
            elapsed++;
            ui.innerText = `MODO FANTASMA: ${elapsed}/${currentTarget}s`;

            // Scroll simulado cada 5 segundos
            if (elapsed % 5 === 0) window.scrollBy(0, Math.random() * 50);

            // Verificación de salto de capítulo
            if (elapsed >= currentTarget) {
                const nextLink = Array.from(document.querySelectorAll('a[href*="/leer/"]'))
                    .find(l => {
                        const content = (l.className + l.innerHTML).toLowerCase();
                        return l.href !== window.location.href && (content.includes('next') || content.includes('sig'));
                    });

                if (nextLink) {
                    // Reiniciar variables antes de navegar (por si acaso)
                    elapsed = 0;
                    window.location.href = nextLink.href;
                } else {
                    // Si no hay siguiente, refrescar para no quedar estancado
                    location.reload();
                }
            }
        }, 1000);
    };

    // Inyección segura en el DOM
    if (document.body) init();
    else document.addEventListener('DOMContentLoaded', init);
})();