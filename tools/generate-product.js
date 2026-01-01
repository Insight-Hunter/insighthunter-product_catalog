import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = "src/content/products";
const OUTPUT_DIR = "src/pages";
const MANIFEST_FILE = "src/data/products.json";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadProducts() {
  const files = fs.readdirSync(CONTENT_DIR);
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return data;
  });
}

function validateProduct(p) {
  const required = ["title", "slug", "category", "features"];
  const missing = required.filter((key) => !p[key]);

  if (missing.length) {
    throw new Error(
      `Product "${p.slug}" is missing required fields: ${missing.join(", ")}`
    );
  }
}

function generateProductPage(p) {
  const dir = path.join(OUTPUT_DIR, p.slug);
  ensureDir(dir);

  const file = path.join(dir, "index.astro");

  if (fs.existsSync(file)) return false; // already exists

  const template = `---
import ProductLayout from "../../layouts/ProductLayout.astro";
import ProductHero from "../../components/ProductHero.astro";
import FeatureList from "../../components/FeatureList.astro";
import CTAButtons from "../../components/CTAButtons.astro";
import DownloadButton from "../../components/DownloadButton.astro";

const data = ${JSON.stringify(p, null, 2)};
---

<ProductLayout title={data.title} tagline={data.tagline}>
  <ProductHero
    image={data.image}
    title={data.title}
    description={data.tagline}
  />

  <FeatureList features={data.features} />

  {data.downloads && (
    <DownloadButton
      mac={data.downloads.mac}
      windows={data.downloads.windows}
      linux={data.downloads.linux}
    />
  )}

  {data.ctaLabel && (
    <CTAButtons
      primary={{ href: data.ctaLink, label: data.ctaLabel }}
    />
  )}
</ProductLayout>
`;

  fs.writeFileSync(file, template);
  return true;
}

function generateManifest(products) {
  ensureDir("src/data");

  const manifest = products.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    downloads: p.downloads || null,
  }));

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
}

function run() {
  console.log("🔍 Loading products...");
  const products = loadProducts();

  console.log(`📦 Found ${products.length} products`);

  products.forEach((p) => {
    validateProduct(p);

    const created = generateProductPage(p);
    if (created) {
      console.log(`✨ Generated page for: ${p.slug}`);
    } else {
      console.log(`✔ Page already exists: ${p.slug}`);
    }
  });

  console.log("🗂 Generating manifest...");
  generateManifest(products);

  console.log("🎉 Product generation complete!");
}

run();
