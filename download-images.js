// Script simple pour télécharger des images locales et remplacer les URLs
// Utilisation: node download-images.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  { id: 'p1', url: 'https://picsum.photos/id/237/800/600', file: 'sneakers.jpg' },
  { id: 'p2', url: 'https://picsum.photos/id/238/800/600', file: 'headphones.jpg' },
  { id: 'p3', url: 'https://picsum.photos/id/239/800/600', file: 'watch.jpg' },
  { id: 'p4', url: 'https://picsum.photos/id/240/800/600', file: 'backpack.jpg' }
];

const outDir = path.join(__dirname, 'assets', 'products');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function download(item, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(item.url, (res) => {
      // Follow redirects (301, 302, 303, 307, 308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (redirectCount > 5) return reject(new Error('Too many redirects'));
        item.url = res.headers.location;
        return resolve(download(item, redirectCount + 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${item.url}' (${res.statusCode})`));
      }
      const filePath = path.join(outDir, item.file);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve({ ...item, path: filePath }));
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  try {
    console.log('Downloading images to', outDir);
    const results = [];
    for (const item of downloads) {
      process.stdout.write(`Downloading ${item.file} ... `);
      const r = await download(item);
      console.log('OK');
      results.push(r);
    }

    // Update src/screens/ProductsScreen.js to use require for downloaded images
    const prodFile = path.join(__dirname, 'src', 'screens', 'ProductsScreen.js');
    let content = fs.readFileSync(prodFile, 'utf8');

    for (const r of results) {
      // Replace the exact URL string occurrence with a require(...) call
      const urlLiteral = r.url.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp("image:\\s*'" + urlLiteral + "'", 'g');
      const replaceWith = `image: require('../../assets/products/${r.file}')`;
      content = content.replace(regex, replaceWith);
    }

    fs.writeFileSync(prodFile, content, 'utf8');
    console.log('Updated src/screens/ProductsScreen.js to use local images.');
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
