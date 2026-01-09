const fs = require("fs");
const path = require("path");

(() => {
  const statusPath = path.join(__dirname, "..", "PIPELINE_STATUS.json");
  const imagesDir = path.join(__dirname, "..", "raw_images");

  if (!fs.existsSync(statusPath)) {
    console.error("PIPELINE_STATUS.json not found. Please run init_pipeline_status.js first.");
    process.exit(1);
  }

  if (!fs.existsSync(imagesDir)) {
    console.error("raw_images directory not found.");
    process.exit(1);
  }

  const status = JSON.parse(fs.readFileSync(statusPath, "utf8"));
  const files = fs.readdirSync(imagesDir)
    .filter(f => !f.startsWith("."))
    .sort();

  const { current_index, total_images } = status;

  if (current_index >= total_images) {
    console.log("All images have been processed.");
    process.exit(0);
  }

  if (current_index >= files.length) {
    console.error("Current index exceeds available files.");
    process.exit(1);
  }

  const nextImagePath = path.join(imagesDir, files[current_index]);
  console.log(nextImagePath);
})();

