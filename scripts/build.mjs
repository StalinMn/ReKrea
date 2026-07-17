import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(new URL("../", import.meta.url).pathname);
const output = join(root, "dist");
const publicOutput = join(output, "client");
const pages = [
  "index.html",
  "que-es-rekrea.html",
  "galeria.html",
  "artistas.html",
  "artista-jerry.html",
  "artista-jessica.html",
  "artista-antonny.html",
  "artista-danna.html",
  "contacto.html"
];

rmSync(output, { recursive: true, force: true });
mkdirSync(publicOutput, { recursive: true });

for (const page of pages) cpSync(join(root, page), join(publicOutput, page));
cpSync(join(root, "assets"), join(publicOutput, "assets"), { recursive: true });
mkdirSync(join(output, ".openai"), { recursive: true });
cpSync(join(root, ".openai", "hosting.json"), join(output, ".openai", "hosting.json"));
mkdirSync(join(output, "server"), { recursive: true });
cpSync(join(root, "hosting", "worker.js"), join(output, "server", "index.js"));

if (!existsSync(join(publicOutput, "index.html"))) throw new Error("La compilación no contiene client/index.html");
if (!existsSync(join(output, "server", "index.js"))) throw new Error("La compilación no contiene el adaptador de Sites");
console.log(`Compilación estática lista: ${pages.length} páginas en dist/client/`);
