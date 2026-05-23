const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".wasm": "application/wasm",
  ".riv": "application/octet-stream",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function resolveRequest(url) {
  const decodedPath = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = decodedPath === "/" ? "/index.html" : decodedPath;
  const fullPath = path.normalize(path.join(root, requested));

  if (!fullPath.startsWith(root)) return null;
  return fullPath;
}

if (process.argv.includes("--check")) {
  [
    "index.html",
    "motion-stack-megalab.html",
    "gsap-theater.html",
    "case-studies.html",
    "lab-notes.html",
    "motion-stack-megalab.css",
    "motion-stack-megalab.js"
  ].forEach(file => {
    if (!fs.existsSync(path.join(root, file))) {
      throw new Error(`Missing required file: ${file}`);
    }
  });
  console.log("Static motion landing page is ready.");
  process.exit(0);
}

http.createServer((req, res) => {
  const filePath = resolveRequest(req.url || "/");

  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500);
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(contents);
  });
}).listen(port, () => {
  console.log(`Motion Stack Megalab running at http://localhost:${port}`);
});
