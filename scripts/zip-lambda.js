const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Helper to recursively copy directories
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to download files following redirects
function downloadFile(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      file.close();
      fs.unlinkSync(dest);
      downloadFile(response.headers.location, dest, callback);
    } else if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => callback(null));
      });
    } else {
      file.close();
      fs.unlinkSync(dest);
      callback(new Error(`Failed to download: Status Code ${response.statusCode}`));
    }
  }).on('error', (err) => {
    file.close();
    fs.unlink(dest, () => {});
    callback(err);
  });
}

function start() {
  console.log("🚀 Starting AWS Lambda Standalone ZIP Packager...");

  const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
  if (!fs.existsSync(standaloneDir)) {
    console.error("❌ Standalone directory not found. Please run 'npm run build' first.");
    process.exit(1);
  }

  // 1. Copy public assets
  const publicSrc = path.join(__dirname, '..', 'public');
  const publicDest = path.join(standaloneDir, 'public');
  console.log("📦 Copying public assets...");
  if (fs.existsSync(publicSrc)) {
    copyDir(publicSrc, publicDest);
  }

  // 2. Copy static files
  const staticSrc = path.join(__dirname, '..', '.next', 'static');
  const staticDest = path.join(standaloneDir, '.next', 'static');
  console.log("📦 Copying compiled static assets...");
  if (fs.existsSync(staticSrc)) {
    copyDir(staticSrc, staticDest);
  }

  // 3. Download bootstrap binary
  const bootstrapDest = path.join(standaloneDir, 'bootstrap');
  const bootstrapUrl = "https://github.com/awslabs/aws-lambda-web-adapter/releases/download/0.8.4/bootstrap";
  console.log("📥 Downloading AWS Lambda Web Adapter bootstrap binary...");

  downloadFile(bootstrapUrl, bootstrapDest, (err) => {
    if (err) {
      console.error("❌ Failed to download bootstrap:", err);
      process.exit(1);
    }
    console.log("✅ Bootstrap binary downloaded successfully.");

    // 4. Install archiver package locally to zip files with correct permissions
    console.log("📦 Installing 'archiver' compression package locally...");
    try {
      execSync("npm install --no-save archiver", { stdio: 'inherit' });
    } catch (e) {
      console.error("❌ Failed to install archiver package:", e);
      process.exit(1);
    }

    // 5. Compress standalone folder into deployment.zip
    console.log("🤐 Compressing standalone contents into deployment.zip...");
    const archiver = require('archiver');
    const zipPath = path.join(__dirname, '..', 'deployment.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`\n🎉 Packaging complete! Created: ${zipPath}`);
      console.log(`📦 Final zip size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      console.log("✅ Executable permissions (0755) successfully set on 'bootstrap'.");
    });

    archive.on('error', (err) => {
      console.error("❌ Archiver error:", err);
      process.exit(1);
    });

    archive.pipe(output);

    archive.directory(standaloneDir, false, (entry) => {
      // Set the POSIX execution bit (0o755) on bootstrap
      if (entry.name === 'bootstrap') {
        entry.mode = 0o755;
      }
      return entry;
    });

    archive.finalize();
  });
}

start();
