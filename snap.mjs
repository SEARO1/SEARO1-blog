import { launch } from "puppeteer";
import { createServer } from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 4176;
const DIST = join(__dirname, "dist");
const OUT = join(__dirname, "screenshots");
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".ico": "image/x-icon" };
function resolvePath(url) {
  const clean = url.replace(/^\/SEARO1-blog/, "") || "/";
  if (clean === "/") return join(DIST, "index.html");
  const direct = join(DIST, clean.slice(1));
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const indexFile = join(DIST, clean.slice(1).replace(/\/?$/, ""), "index.html");
  if (existsSync(indexFile)) return indexFile;
  const altIndex = join(DIST, clean.slice(1).replace(/\/$/, ".html"));
  if (existsSync(altIndex)) return altIndex;
  return direct;
}
const server = createServer((req, res) => {
  const fp = resolvePath(req.url);
  try {
    const content = readFileSync(fp);
    res.writeHead(200, { "Content-Type": MIME[extname(fp)] || "text/plain" });
    res.end(content);
  } catch { res.writeHead(404); res.end("Not found"); }
});
server.listen(PORT, async () => {
  console.log("Server on http://localhost:" + PORT);
  const browser = await launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:" + PORT + "/SEARO1-blog/blog/ai-cache-hit-rate-importance/", { waitUntil: "networkidle0", timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: join(OUT, "ai-cache-post.png"), fullPage: true });
  console.log("OK: ai-cache-post");
  await browser.close();
  server.close();
  console.log("DONE");
});