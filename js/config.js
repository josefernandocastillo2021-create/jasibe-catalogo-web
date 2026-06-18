/* === config.js — Configuración central del sitio ===
   Cambia estos valores en UN SOLO lugar y se aplican en toda la página. */

const CONFIG = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios (504 + número)
  whatsapp: '50494795701',
  // Cómo se muestra el número en pantalla
  whatsappDisplay: '9479-5701',
  // URL del Google Apps Script (termina en /exec)
  apiUrl: 'https://script.google.com/macros/s/AKfycbykmiuV_XFPOqE7qDzbji1lYmqRMC1yuZa3Pc6Caoa-OseiHWxO6qG-Hm4_2ImzDj1X/exec',
};

/* Aplica el número a los links y textos estáticos del HTML marcados con clases:
   - class="js-wa-link"  → le pone el href de WhatsApp (usa data-wa-msg si hay mensaje)
   - class="js-wa-text"  → muestra el número formateado */
document.addEventListener('DOMContentLoaded', () => {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  document.querySelectorAll('.js-wa-link').forEach(a => {
    const msg = a.dataset.waMsg;
    a.href = msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
  });
  document.querySelectorAll('.js-wa-text').forEach(el => {
    el.textContent = CONFIG.whatsappDisplay;
  });
});
