"use strict";

const express = require("express");
const path = require("path");

const app = express();

// Render (and most hosts) provide PORT. Fall back locally.
const PORT = process.env.PORT || 3000;

// Serve everything in the repo root as static files (index.html, css, js, images, etc.)
app.use(express.static(__dirname, { extensions: ["html"] }));

// Optional: if someone hits "/", explicitly serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Fallback for any other route: try to serve an .html file with the same name,
// otherwise fall back to index.html.
app.get("*", (req, res) => {
  const reqPath = decodeURIComponent(req.path);

  // Prevent path traversal
  const safePath = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const candidate = path.join(__dirname, safePath);

  // If the URL already ends with .html, try it directly; otherwise try adding .html
  const htmlCandidate = candidate.endsWith(".html") ? candidate : candidate + ".html";

  res.sendFile(htmlCandidate, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "index.html"));
    }
  });
});

app.listen(PORT, () => {
  console.log(`h3k-site server listening on port ${PORT}`);
});
