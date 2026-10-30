import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const indexHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");

// All known static and SPA routes
const routes = [
  "blog",
  "blog/test",
  "blog/montana-property-posting-guide-regulations-and-requirements",
  "blog/idaho-property-posting-guide-regulations-and-requirements",
  "about",
  "team",
  "t-post-sign",
  "retailers",
  "auth",
  "admin",
];

// Write physical index.html into each route folder
for (const route of routes) {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), indexHtml, "utf-8");
  console.log(`Generated: dist/${route}/index.html`);
}

// Also generate a 404.html fallback
fs.writeFileSync(path.join(distDir, "404.html"), indexHtml, "utf-8");
console.log("Generated: dist/404.html");
