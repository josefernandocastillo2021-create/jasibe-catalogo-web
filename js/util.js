/* === util.js — Utilidades compartidas de seguridad ===
   Neutralizan datos del Sheet antes de insertarlos en el HTML,
   evitando inyección de código (XSS). */

/* Para texto visible y atributos: <h3>${escaparHTML(x)}</h3>  alt="${escaparHTML(x)}" */
function escaparHTML(valor) {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Para argumentos dentro de un onclick="fn('${escaparArg(x)}')"
   (cadena JS anidada dentro de un atributo HTML con comillas dobles) */
function escaparArg(valor) {
  return String(valor ?? '')
    .replace(/\\/g, '\\\\')   // backslash primero
    .replace(/'/g, "\\'")      // no romper la cadena JS
    .replace(/"/g, '&quot;')   // no romper el atributo HTML
    .replace(/</g, '\\x3C')    // defensivo
    .replace(/\r?\n/g, '\\n');
}

/* === Stock / cantidad disponible ===
   La columna CANTIDAD DISPONIBLE del Sheet llega como `cantidad`.
   - vacío  → null  (producto sin control de stock, no se muestra nada)
   - número → se aplica la lógica de "stock bajo" / "agotado" */
const STOCK_UMBRAL = 5; // a partir de aquí o menos se considera "stock bajo"

function parsearCantidad(valor) {
  if (valor === '' || valor === null || valor === undefined) return null;
  const n = parseInt(valor);
  return isNaN(n) ? null : n;
}

function estaAgotado(cantidad) {
  return cantidad !== null && cantidad <= 0;
}

/* Devuelve el HTML de la etiqueta de stock (o '' si no aplica) */
function etiquetaStock(cantidad) {
  if (cantidad === null) return '';
  if (cantidad <= 0) return '<span class="stock stock--agotado">Agotado</span>';
  if (cantidad <= STOCK_UMBRAL) return `<span class="stock stock--bajo">¡Solo quedan ${cantidad}!</span>`;
  return '';
}
