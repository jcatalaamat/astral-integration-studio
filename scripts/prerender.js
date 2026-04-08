import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const ROUTES = [
  '/',
  '/work',
  '/about',
  '/contact',
  '/insights',
  '/insights/the-linktree-problem',
  '/insights/six-tools-one-platform',
  '/insights/catch-them-before-they-scale',
  '/tools',
  '/tools/life-os',
  '/tools/content-studio',
  '/access',
  '/practitioners',
  '/schools',
  '/retreats',
  '/communities',
  '/organizations',
  '/how-it-works',
  '/pricing',
];

// Simple static file server for the dist folder
function createStaticServer(dir) {
  return createServer((req, res) => {
    let filePath = join(dir, req.url === '/' ? 'index.html' : req.url);

    // SPA fallback: if file doesn't exist, serve index.html
    if (!existsSync(filePath) || filePath.endsWith('/')) {
      filePath = join(dir, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = filePath.split('.').pop();
      const mimeTypes = {
        html: 'text/html',
        js: 'application/javascript',
        css: 'text/css',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        woff2: 'font/woff2',
        woff: 'font/woff',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerender() {
  console.log('Starting prerender...');

  const server = createStaticServer(DIST);
  await new Promise((resolve) => server.listen(4173, resolve));
  console.log('Static server running on http://localhost:4173');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    console.log(`  Prerendering ${route}...`);
    const page = await browser.newPage();

    await page.goto(`http://localhost:4173${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit for React to fully render
    await page.waitForSelector('#root > *', { timeout: 10000 });

    const html = await page.content();

    // Write the prerendered HTML to the correct file path
    const outputPath = route === '/'
      ? join(DIST, 'index.html')
      : join(DIST, route, 'index.html');

    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputPath, html);
    console.log(`  ✓ ${outputPath}`);

    await page.close();
  }

  await browser.close();
  server.close();

  // Copy prerendered index.html as 404.html for GitHub Pages
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
  writeFileSync(join(DIST, '404.html'), indexHtml);
  console.log('  ✓ 404.html updated');

  console.log(`\nPrerendered ${ROUTES.length} routes successfully!`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
