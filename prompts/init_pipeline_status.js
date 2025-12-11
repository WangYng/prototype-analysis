const fs = require("fs");
const path = require("path");

(() => {
  const statusPath = path.join(__dirname, "..", "PIPELINE_STATUS.json");
  const imagesDir = path.join(__dirname, "..", "raw_images");

  if (fs.existsSync(statusPath)) {
    console.log("PIPELINE_STATUS.json already exists.");
    return;
  }

  const files = fs.readdirSync(imagesDir).filter(f => !f.startsWith("."));

  const json = {
    status: "INITIALIZING",
    total_images: files.length,
    current_index: 0,
    processed_images: []
  };

  fs.writeFileSync(statusPath, JSON.stringify(json, null, 2));
  console.log("Initialized PIPELINE_STATUS.json");
})();