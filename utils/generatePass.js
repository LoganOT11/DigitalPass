const generatePass = async (data) => {
  const zip = new JSZip();

  // Create a new pass.json with dynamic data from `data`
  const passJson = {
    formatVersion: 1,
    passTypeIdentifier: 'pass.com.yourcompany.membercard',
    serialNumber: data.membershipId,
    teamIdentifier: 'your-team-id',
    organizationName: 'Your Organization',
    description: 'Membership Card',
    logoText: 'Membership',
    foregroundColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    labelColor: 'rgb(0, 0, 0)',
    barcode: {
      format: 'PKBarcodeFormatQR',
      message: data.membershipId,
      messageEncoding: 'iso-8859-1'
    },
    expirationDate: data.expiration,  // Use data from request
    relevantDate: data.relevantDate,  // Use data from request if needed
  };

  // Add dynamic pass.json to the zip file
  zip.file('pass.json', JSON.stringify(passJson));

  // Add the images
  zip.file('logo.png', fs.readFileSync(logoPath));
  zip.file('icon.png', fs.readFileSync(iconPath));
  zip.file('background.png', fs.readFileSync(backgroundPath));

  // Generate manifest for all files
  const manifest = generateManifest([
    'assets/data/pass.json',
    'assets/images/logo.png',
    'assets/images/icon.png',
    'assets/images/background.png',
  ]);
  zip.file('manifest.json', JSON.stringify(manifest));

  // Create the final .pkpass file
  const pkpassBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  // Save the .pkpass file in the dist folder
  const distPath = path.join(__dirname, '..', 'dist', 'membership-card.pkpass');
  fs.writeFileSync(distPath, pkpassBuffer);

  console.log(`Pass generated successfully: ${distPath}`);
};
