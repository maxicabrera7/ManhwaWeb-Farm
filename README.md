# ManhwaWeb - PC Ghost Farm

Userscript diseñado para la automatización de lectura y farmeo de puntos en ManhwaWeb mediante el spoofing del motor de visibilidad del navegador.

## 🚀 Funcionalidades Técnicas

- **Visibility Spoofing**: Sobrescribe `document.visibilityState` y `document.hidden` para engañar a los scripts de detección de pestañas activas.
- **Event Suppression**: Bloquea la propagación de eventos `visibilitychange` y `blur`.
- **Anti-Pattern Jitter**: Implementa un generador de tiempo aleatorio (55-70s) por capítulo para evadir heurísticas básicas de detección de bots.
- **Simulación de Actividad**: Ejecuta scrolls aleatorios automáticos para simular interacción humana frente al servidor.
- **Auto-Navegación**: Escaneo del DOM para detección de enlaces de "Siguiente capítulo" con fallback de recarga en caso de error de red o fin de serie.

## 🛠 Instalación

1. Instala la extensión **Violentmonkey** (recomendado) o Tampermonkey en tu navegador.
2. Haz clic en el siguiente enlace para instalar el script directamente desde la rama principal:
   - [Instalar ManhwaWeb Ghost Farm PC users](https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm.user.js)
   - [Instalar ManhwaWeb Ghost Farm Mobile users](https://raw.githubusercontent.com/maxicabrera7/ManhwaWeb-Farm/refs/heads/main/ManhwaWeb-Farm-Mobile.user.js)
3. Asegúrate de que las actualizaciones automáticas estén activadas en tu gestor de scripts.

## ⚠️ Disclaimer

Este script se entrega "tal cual", para fines educativos y de auditoría de flujo de trabajo. El uso de herramientas de automatización puede violar los términos de servicio de la plataforma. El autor no se hace responsable de suspensiones de cuenta o baneos de IP derivados del uso negligente de esta herramienta.

