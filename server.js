// server.js
const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/SignInPage') {
      // Serve the landing.html page for the /landing route
      res.writeHead(200, { 'Content-Type': 'text/html' });
      createReadStream('public/SignInPage.html').pipe(res);
    } else {
      // For other routes (including the default root URL '/'), let Next.js handle the request
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
