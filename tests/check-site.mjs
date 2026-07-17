import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import vm from "node:vm";

const root = resolve(new URL("../", import.meta.url).pathname);
const expectedPages = [
  "index.html", "que-es-rekrea.html", "galeria.html", "artistas.html",
  "artista-jerry.html", "artista-jessica.html", "artista-antonny.html",
  "artista-danna.html", "contacto.html"
];
const failures = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);

for (const page of expectedPages) {
  const path = join(root, page);
  if (!existsSync(path)) { fail(`Falta ${page}`); continue; }
  const html = readFileSync(path, "utf8");
  if (!html.includes('<html lang="es">')) fail(`${page}: falta lang=es`);
  if (!html.includes('id="contenido"')) fail(`${page}: falta el destino del salto al contenido`);
  if (!html.includes("assets/js/data.js")) fail(`${page}: no carga los datos compartidos`);
  if (!html.includes("assets/js/components.js")) fail(`${page}: no carga header/footer compartidos`);
}
pass(`${expectedPages.length} páginas requeridas presentes`);

const ignoredDirectories = new Set([".git", "dist", "node_modules"]);
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const sourceFiles = walk(root).filter((path) => [".html", ".css", ".js"].includes(extname(path)));
const referencePattern = /(?:src|href)=["']([^"'#]+)["']|url\(["']?([^"')]+)["']?\)/g;

for (const file of sourceFiles.filter((path) => extname(path) !== ".js")) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(referencePattern)) {
    const reference = match[1] || match[2];
    if (!reference || /^(?:https?:|data:|mailto:|tel:)/.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    const target = resolve(dirname(file), clean);
    if (!existsSync(target)) fail(`${file.replace(`${root}/`, "")}: ruta inexistente ${reference}`);
  }
}

for (const file of sourceFiles.filter((path) => extname(path) === ".js" && !path.includes("/tests/"))) {
  const text = readFileSync(file, "utf8");
  const literalPattern = /["'](assets\/[a-z0-9_./-]+|(?:index|galeria|artistas|contacto|que-es-rekrea|artista-[a-z]+)\.html)["']/gi;
  for (const match of text.matchAll(literalPattern)) {
    if (!existsSync(join(root, match[1]))) fail(`${file.replace(`${root}/`, "")}: ruta inexistente ${match[1]}`);
  }
}
pass("rutas locales de HTML y CSS verificadas");

const context = { window: {} };
vm.runInNewContext(readFileSync(join(root, "assets/js/data.js"), "utf8"), context);
const data = context.window.REKREA_DATA;
if (data.artworks.length !== 4) fail("La galería no contiene exactamente cuatro obras");
if (data.artists.length !== 4) fail("No existen exactamente cuatro perfiles de artistas");
for (const artwork of data.artworks) {
  if (!artwork.gallery.length || artwork.gallery.length < 2) fail(`${artwork.title}: carrusel incompleto`);
  for (const image of artwork.gallery) if (!existsSync(join(root, image.src))) fail(`${artwork.title}: falta ${image.src}`);
}
for (const artist of data.artists) {
  if (artist.images.length !== 2) fail(`${artist.name}: debe tener dos imágenes`);
  if (!existsSync(join(root, artist.page))) fail(`${artist.name}: falta su página`);
}
pass("datos, galerías y perfiles verificados");

const exactLinks = [
  "https://docs.google.com/forms/d/e/1FAIpQLScEYhL4VMKrsJV8Pbt_Q7vHS6Wk6JeTPR7oO3VU-YznD_Z_xQ/viewform?usp=header",
  "https://docs.google.com/forms/d/e/1FAIpQLSe5d6Bfn_pW2z4ByRZyh7njo8SAM-CGo2MoykTZju3cGsk1_Q/viewform?usp=publish-editor",
  "https://forms.gle/cdmT5LPEeaxm5kgL6",
  "https://wa.me/qr/MBHIIN5NL7MCE1",
  "https://www.instagram.com/rekrea_official?igsh=Y3AxNXpnbWtzNjN3&utm_source=qr",
  "https://www.facebook.com/share/1DXedvmZc1/?mibextid=wwXIfr",
  "https://www.tiktok.com/@rekre4?_r=1&_t=ZS-986LYnUuysC"
];
const dataSource = readFileSync(join(root, "assets/js/data.js"), "utf8");
for (const link of exactLinks) if (!dataSource.includes(link)) fail(`Falta el enlace oficial: ${link}`);
pass("siete destinos externos oficiales verificados");

const homeSource = readFileSync(join(root, "index.html"), "utf8");
const stylesSource = readFileSync(join(root, "assets/css/styles.css"), "utf8");
if (!homeSource.includes("www.youtube-nocookie.com/embed/RTSf86p1yM8")) fail("La portada no integra el video oficial de YouTube");
if (!homeSource.includes("autoplay=1&mute=1")) fail("El video oficial no está configurado para reproducción automática compatible");
if (stylesSource.includes("Fredoka")) fail("Todavía se referencia una tipografía distinta de Montserrat");
if (!stylesSource.includes('url("../patterns/pattern-green.svg")')) fail("No se está usando el patrón verde original");
if (!stylesSource.includes('url("../patterns/pattern-orange.svg")')) fail("No se está usando el patrón amarillo/naranja original");
pass("video, tipografía Montserrat y patrones originales verificados");

const officialIconAssets = [
  "metric-recycle.png", "metric-city.png", "metric-trash.png",
  "process-observe.png", "process-separate.png", "process-imagine.png", "process-create.png", "process-share.png",
  "step-1.png", "step-2.png", "step-3.png", "step-4.png", "step-5.png",
  "social-instagram.png", "social-tiktok.png", "social-facebook.png", "social-whatsapp.png"
];
for (const asset of officialIconAssets) {
  if (!existsSync(join(root, "assets/icons", asset))) fail(`Falta el recurso oficial assets/icons/${asset}`);
}
const aboutSource = readFileSync(join(root, "que-es-rekrea.html"), "utf8");
for (const asset of officialIconAssets.slice(0, 13)) {
  const pageSource = asset.startsWith("metric-") ? homeSource : aboutSource;
  if (!pageSource.includes(`assets/icons/${asset}`)) fail(`El recurso oficial ${asset} no está integrado en su sección`);
}
if (!stylesSource.includes("clip-path: inset(0 round 24px)")) fail("El visor de galería no recorta las imágenes dentro de su marco");
pass("iconos originales y límites visuales de la galería verificados");

const implementationFiles = sourceFiles.filter((file) => !file.includes("/tests/"));
const allSource = implementationFiles.map((file) => readFileSync(file, "utf8")).join("\n");
if (/\bonclick\s*=/.test(allSource)) fail("Se encontró JavaScript inline");
if (/transition\s*:\s*all\b/.test(allSource)) fail("Se encontró transition: all");
if (/\bTODO\b|lorem ipsum|continúa aquí/.test(allSource)) fail("Se encontró contenido incompleto o de relleno");
pass("restricciones de implementación verificadas");

if (failures.length) {
  console.error("\nErrores de validación:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
console.log("\nValidación completa: el sitio ReKrea está listo para revisión visual.");
