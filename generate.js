const fs = require('fs');
const path = require('path');

const editions = [
  {
    slug: 'free',
    title: 'Insight Hunter Free',
    description: 'Instant financial clarity for solo founders and small teams.',
    features: [
      'Connect 1 bank account or ledger',
      'Auto-generated monthly P&L and cash flow',
      'Burn rate + runway calculator',
      'Exportable PDF summaries',
    ],
    seo: {
      title: 'Insight Hunter Free — Instant Financial Clarity',
      description: 'Insight Hunter Free gives solo founders and small teams instant visibility into cash flow, burn rate, and runway. No setup required.',
    },
  },
  {
    slug: 'standard',
    title: 'Insight Hunter Standard',
    description: 'Forecast, model, and report with confidence — no spreadsheets required.',
    features: [
      'Multi-account + multi-entity support',
      'Rolling 12-month forecasts',
      'Investor-ready dashboards',
      'Slack + email alerts',
      'API access for integrations',
    ],
    seo: {
      title: 'Insight Hunter Standard — Financial Forecasting for Startups',
      description: 'Insight Hunter Standard helps growing startups model revenue, manage burn, and deliver clean financial reports.',
    },
  },
  {
    slug: 'full',
    title: 'Insight Hunter Full (FAFP)',
    description: 'Audit-ready, policy-aligned financial intelligence at scale.',
    features: [
      'All Standard features included',
      'FAFP-compliant reporting templates',
      'Role-based access control (RBAC)',
      'Audit trails + compliance exports',
      'Secure contributor workflows',
    ],
    seo: {
      title: 'Insight Hunter Full — FAFP-Compliant Financial Intelligence',
      description: 'Insight Hunter Full delivers secure, scalable financial intelligence for CFOs and compliance teams.',
    },
  },
];

function generatePage({ slug, title, description, features, seo }) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}" />
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
  <header class="site-header">
    <a href="/" class="logo">Insight Hunter</a>
    <nav>
      <a href="/free">Free</a>
      <a href="/standard">Standard</a>
      <a href="/full">Full</a>
    </nav>
  </header>

  <main class="content">
    <h1>${title}</h1>
    <p>${description}</p>
    <ul>
      ${features.map(f => `<li>${f}</li>`).join('\n')}
    </ul>
    <p><a class="btn" href="/">← Back to Homepage</a></p>
  </main>

  <footer class="site-footer">
    <p>© Insight Hunter — All Rights Reserved</p>
  </footer>
</body>
</html>
  `.trim();

  fs.writeFileSync(path.join(__dirname, `dist/${slug}.html`), html);
}

function generateHomepage() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Insight Hunter — Intelligence at the Speed of Thought</title>
  <meta name="description" content="Insight Hunter transforms your workflows into real-time financial intelligence — from solo founders to full-scale finance teams." />
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
  <header class="site-header">
    <a href="/" class="logo">Insight Hunter</a>
    <nav>
      <a href="/free">Free</a>
      <a href="/standard">Standard</a>
      <a href="/full">Full</a>
    </nav>
  </header>

  <main class="hero">
    <h1>Clarity at the Speed of Thought</h1>
    <p>Turn workflows into real-time intelligence.</p>
    <p>
      <a class="btn" href="/free">Try Free</a>
      <a class="btn" href="/standard">Explore Editions</a>
    </p>
  </main>

  <section class="versions-grid">
    ${editions.map(e => `
      <div class="card">
        <h2>${e.title}</h2>
        <p>${e.description}</p>
        <a class="btn" href="/${e.slug}">Explore</a>
      </div>
    `).join('\n')}
  </section>

  <footer class="site-footer">
    <p>© Insight Hunter — Built in Georgia, trusted nationwide</p>
  </footer>
</body>
</html>
  `.trim();

  fs.writeFileSync(path.join(__dirname, 'dist/index.html'), html);
}

function buildSite() {
  if (!fs.existsSync('dist')) fs.mkdirSync('dist');
  generateHomepage();
  editions.forEach(generatePage);
}

buildSite();
