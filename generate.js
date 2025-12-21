 /*
 * Insight Hunter — Cloudflare Pages Site Generator
 * One-file script that builds the entire site structure,
 * writes all HTML pages, CSS, and optional functions.
 */

const fs = require("fs");
const path = require("path");

// Root folder
const ROOT = "insight-hunter-site";

// Helper to write files safely
function write(filePath, content) {
  const full = path.join(ROOT, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

// ------------------------------
// Shared CSS
// ------------------------------
const CSS = `
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #0b0d12;
  color: #e6faff;
}

.hero {
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
}

.hero h1 {
  font-size: 3rem;
  color: #00eaff;
  text-shadow: 0 0 20px rgba(0, 234, 255, 0.4);
  animation: neonPulse 3s ease-in-out infinite;
}

@keyframes neonPulse {
  0% { text-shadow: 0 0 20px rgba(0, 234, 255, 0.4); }
  50% { text-shadow: 0 0 40px rgba(0, 234, 255, 0.8); }
  100% { text-shadow: 0 0 20px rgba(0, 234, 255, 0.4); }
}

.versions-grid {
  display: grid;
  gap: 2rem;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.card {
  background: #11141c;
  border: 1px solid #1f2330;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
}

.card h2 {
  color: #00eaff;
  margin-bottom: 0.5rem;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  background: #00eaff;
  color: #000;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.site-header, .site-footer {
  padding: 1.5rem 2rem;
  background: #0f1218;
  border-bottom: 1px solid #1f2330;
  text-align: center;
}

.site-header a {
  color: #00eaff;
  margin: 0 1rem;
  text-decoration: none;
  font-weight: 600;
}

.site-footer {
  border-top: 1px solid #1f2330;
  margin-top: 4rem;
  color: #6f7a8a;
}
`;

// ------------------------------
// Shared Layout
// ------------------------------
const LAYOUT = `
<header class="site-header">
  <a href="/" class="logo">Insight Hunter</a>
  <nav>
    <a href="/full">Full</a>
    <a href="/fAFP">FAFP</a>
    <a href="/lite">Lite</a>
    <a href="/forms">Forms</a>
    <a href="/standard">Standard</a>
  </nav>
</header>
`;

// ------------------------------
// Pages
// ------------------------------
function page(title, tagline, body) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>

${LAYOUT}

<header class="hero">
  <h1>${title}</h1>
  <p>${tagline}</p>
</header>

<section class="content" style="padding:2rem;max-width:800px;margin:auto;">
${body}
  <a class="btn" href="/">← Back to Versions Hub</a>
</section>

<footer class="site-footer">
  <p>© Insight Hunter — All Rights Reserved</p>
</footer>

</body>
</html>
`;
}

// ------------------------------
// Write CSS
// ------------------------------
write("assets/styles.css", CSS);

// ------------------------------
// Write Main Landing Page
// ------------------------------
write("index.html", `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Insight Hunter — Versions Hub</title>
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>

${LAYOUT}

<header class="hero">
  <h1>Insight Hunter</h1>
  <p>Your intelligence platform, delivered in the edition that fits your workflow.</p>
</header>

<section class="versions-grid">
  <div class="card">
    <h2>Full Edition</h2>
    <p>The complete intelligence suite.</p>
    <a class="btn" href="/full">Explore</a>
  </div>

  <div class="card">
    <h2>FAFP Edition</h2>
    <p>Purpose-built for FAFP workflows.</p>
    <a class="btn" href="/fAFP">Explore</a>
  </div>

  <div class="card">
    <h2>Insight Lite</h2>
    <p>Fast, lightweight desktop companion.</p>
    <a class="btn" href="/lite">Explore</a>
  </div>

  <div class="card">
    <h2>Business Forms</h2>
    <p>Automated form workflows.</p>
    <a class="btn" href="/forms">Explore</a>
  </div>

  <div class="card">
    <h2>Standard Edition</h2>
    <p>Balanced, everyday intelligence.</p>
    <a class="btn" href="/standard">Explore</a>
  </div>
</section>

<footer class="site-footer">
  <p>© Insight Hunter — All Rights Reserved</p>
</footer>

</body>
</html>
`);

// ------------------------------
// Subpages
// ------------------------------
write("full/index.html", page(
  "Full Edition",
  "The complete intelligence suite.",
  `
  <h2>Overview</h2>
  <p>The Full Edition is your command center.</p>
  <h2>Features</h2>
  <ul>
    <li>All modules</li>
    <li>Automation</li>
    <li>RBAC + audit logs</li>
  </ul>
`
));

write("fAFP/index.html", page(
  "FAFP Edition",
  "Purpose-built for FAFP workflows.",
  `
  <h2>Overview</h2>
  <p>Streamlined, compliant workflows.</p>
  <h2>Features</h2>
  <ul>
    <li>FAFP forms</li>
    <li>Validation</li>
    <li>Lifecycle management</li>
  </ul>
`
));

write("lite/index.html", page(
  "Insight Lite",
  "Fast, lightweight desktop companion.",
  `
  <h2>Overview</h2>
  <p>Single-file, instant startup.</p>
  <h2>Features</h2>
  <ul>
    <li>Local-first</li>
    <li>Quick reports</li>
    <li>Minimal neon UI</li>
  </ul>

  <a id="download-btn" class="btn" href="#">Detecting your OS…</a>

  <script>
    const btn = document.getElementById("download-btn");
    const p = navigator.platform.toLowerCase();
    if (p.includes("mac")) { btn.href="/downloads/mac.dmg"; btn.innerText="Download for macOS"; }
    else if (p.includes("win")) { btn.href="/downloads/win.exe"; btn.innerText="Download for Windows"; }
    else { btn.href="/downloads/universal.zip"; btn.innerText="Download (Universal)"; }
  </script>
`
));

write("forms/index.html", page(
  "Business Forms",
  "Automated, consistent workflows.",
  `
  <h2>Overview</h2>
  <p>Turn paperwork into automation.</p>
  <h2>Features</h2>
  <ul>
    <li>Templates</li>
    <li>Storage + cleanup</li>
    <li>Contributor access</li>
  </ul>
`
));

write("standard/index.html", page(
  "Standard Edition",
  "Balanced, everyday intelligence.",
  `
  <h2>Overview</h2>
  <p>Core reporting and essential automation.</p>
  <h2>Features</h2>
  <ul>
    <li>Core engine</li>
    <li>Essential automations</li>
    <li>Clean UI</li>
  </ul>
`
));

// ------------------------------
// Optional API
// ------------------------------
write("functions/versions.js", `
export async function onRequest() {
  return new Response(JSON.stringify({
    full: "Available",
    fAFP: "Available",
    lite: "Available",
    forms: "Available",
    standard: "Available"
  }, null, 2), {
    headers: { "content-type": "application/json" }
  });
}
`);

console.log("Insight Hunter site generated successfully!");
