const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Define valid username and password
const validUsername = 'admin';
const validPassword = 'password';

// Create a server
const server = http.createServer((req, res) => {
  const { method, headers } = req;
  const parsedUrl = url.parse(req.url);
  const { pathname } = parsedUrl;

  if (pathname === '/login') {
    if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { username, password } = querystring.parse(body);
        if (username === validUsername && password === validPassword) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Login successful!');
        } else {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Invalid username or password');
        }
      });
    } else {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST');
      res.end('Method Not Allowed');
    }
  } else if (pathname === '/signup') {
    if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { username, password } = querystring.parse(body);
        // Perform signup logic here, such as storing the username and password in a database
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Signup successful!');
      });
    } else {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST');
      res.end('Method Not Allowed');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
