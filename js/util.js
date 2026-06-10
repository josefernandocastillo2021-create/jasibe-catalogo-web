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
