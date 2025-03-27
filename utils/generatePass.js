const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const crypto = require('crypto');

// Path to your assets (images and data)
const logoPath = path.join(__dirname, '..', 'assets', 'images', 'logo.png');
const iconPath = path.join(__dirname, '..', 'assets', 'images', 'icon.png');
const backgroundPath = path.join(__dirname, '..', 'assets', 'images', 'background.png');
const passJsonPath = path.join(__dirname, '..', 'assets', 'data', 'pass.json');

// Function to generate the manifest
const generateManifest = (files) => {
  const manifest = {};
  files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const hash = crypto.createHash('sha1').update(fs.readFileSync(filePath)).digest('hex');
    manifest[file] = hash;
  });
  return manifest;
};

// Function to create the .pkpass file
const generatePkPass = async () => {
  const zip = new JSZip();

  // Add pass.json (the template you already created)
  const passJson = JSON.parse(fs.readFileSync(passJsonPath));
  zip.file('pass.json', JSON.stringify(passJson));

  // Add image files (logo, icon, background)
  zip.file('logo.png', fs.readFileSync(logoPath));
  zip.file('icon.png', fs.readFileSync(iconPath));
  zip.file('background.png', fs.readFileSync(backgroundPath));

  // Generate manifest for all files
  const manifest = generateManifest([
    'assets/data/pass.json',
    'assets/images/logo.png',
    'assets/images/icon.png',
    'assets/images/background.png'
  ]);
  
  zip.file('manifest.json', JSON.stringify(manifest));

  // Create the final .pkpass file
  const pkpassBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  // Save the .pkpass file in the dist folder
  const distPath = path.join(__dirname, '..', 'dist', 'membership-card.pkpass');
  fs.writeFileSync(distPath, pkpassBuffer);

  console.log(`Pass generated successfully: ${distPath}`);
};

// Run the pass generation function
generatePkPass();
