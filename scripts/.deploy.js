/**
 * Insight Hunter — Cloudflare Pages Deployment Script
 * Uploads an entire folder as a ZIP and deploys it to Cloudflare Pages.
 *
 * Requirements:
 *   - Node.js 18+
 *   - npm install axios form-data archiver
 *
 * Environment variables required:
 *   CLOUDFLARE_API_TOKEN
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_PROJECT_NAME
 *
 * Usage:
 *   node deploy.js
 */

import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import archiver from "archiver";

// ------------------------------
// CONFIG
// ------------------------------
const FOLDER_TO_DEPLOY = "./insight-hunter-site"; // your generated site folder

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT_NAME = process.env.CLOUDFLARE_PROJECT_NAME;

if (!API_TOKEN || !ACCOUNT_ID || !PROJECT_NAME) {
  console.error("Missing environment variables.");
  console.error("Set CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_PROJECT_NAME");
  process.exit(1);
}

// ------------------------------
// ZIP THE FOLDER
// ------------------------------
const ZIP_PATH = "./site.zip";

async function zipFolder() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(ZIP_PATH);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve());
    archive.on("error", err => reject(err));

    archive.pipe(output);
    archive.directory(FOLDER_TO_DEPLOY, false);
    archive.finalize();
  });
}

// ------------------------------
// DEPLOY TO CLOUDFLARE PAGES
// ------------------------------
async function deploy() {
  console.log("Zipping site...");
  await zipFolder();

  console.log("Uploading to Cloudflare Pages...");

  const form = new FormData();
  form.append("file", fs.createReadStream(ZIP_PATH));

  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`;

  const response = await axios.post(url, form, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      ...form.getHeaders()
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  });

  console.log("Deployment triggered!");
  console.log("Deployment ID:", response.data.result.id);
  console.log("Environment:", response.data.result.environment);
  console.log("Preview URL:", response.data.result.url);
}

deploy().catch(err => {
  console.error("Deployment failed:");
  console.error(err.response?.data || err);
});
