const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const port = 3000;

// Enable compression for all responses
app.use(compression({ level: 6 })); // Level 6 is a good balance between compression and speed

// Serve static files with cache headers
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // Cache assets for 1 day
  setHeaders: (res, path) => {
    // Set appropriate cache headers based on file type
    if (path.endsWith('.html')) {
      // Don't cache HTML files
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.match(/\.(css|js)$/)) {
      // Cache CSS and JS for 1 week
      res.setHeader('Cache-Control', 'public, max-age=604800');
    } else if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      // Cache images for 1 month
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    } else if (path.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
      // Cache fonts for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
}));

// Avoid redirects by handling root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Compression enabled: text, HTML, CSS, JavaScript, JSON, XML, and fonts`);
  console.log(`Press Ctrl+C to stop the server`);
});
