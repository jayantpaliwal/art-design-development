const iconGen = require('icon-gen');
const path = require('path');

const iconPath = 'src/assets/art-design.png'; // Replace with the path to your image
const outputPath = 'src/assets/Icons'; // Replace with the desired output directory

// Define icon sizes for .icns file
const iconSizes = [
  { width: 16, height: 16 },
  { width: 32, height: 32 },
  { width: 128, height: 128 },
  { width: 256, height: 256 },
  { width: 512, height: 512 },
];

// Generate .icns file
iconGen(iconPath, path.join(outputPath, 'app_icon.icns'), iconSizes)
  .then(() => {
    console.log('.icns file generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating .icns file:', err);
  });
