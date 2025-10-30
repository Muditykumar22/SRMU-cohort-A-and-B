const express = require('express');
const app = express();

// Port jahan server sunega (listen karega)
const PORT = 3000;

// Body parsers (JSON aur HTML form ke liye)
app.use(express.json()); // JSON body ko parse karega
app.use(express.urlencoded({ extended: true })); // form-url-encoded data parse karega

// Root route - basic welcome
app.get('/', (req, res) => {
  res.status(200).send('Welcome! This is a super simple Express server.');
});

// Simple hello route
app.get('/hello', (req, res) => {
  res.status(200).send('Hello from Express!');
});

// Send a JSON response with an explicit status code
app.get('/status', (req, res) => {
  res.status(200).json({ ok: true, message: 'Everything is fine!' });
});

// Params example: /users/123
app.get('/users/:id', (req, res) => {
  const { id } = req.params; // URL se id nikalna
  res.status(200).send(`You asked for user with id: ${id}`);
});

// Query example: /search?q=apple
app.get('/search', (req, res) => {
  const { q } = req.query; // ?q= se query nikalna
  if (!q) {
    return res.status(400).send('Please provide a search query using ?q=');
  }
  res.status(200).send(`You searched for: ${q}`);
});

// POST (JSON) example: Postman me Body -> raw -> JSON
// {
//   "name": "Ali",
//   "age": 10
// }
app.post('/submit-json', (req, res) => {
  const { name, age } = req.body;
  if (!name || typeof age === 'undefined') {
    return res.status(400).json({ ok: false, message: 'name aur age bhejo (JSON me)' });
  }
  return res.status(201).json({ ok: true, received: { name, age } });
});

// Simple HTML form (for demo): browser me open karo -> submit karta hai /submit-form pe
app.get('/form', (req, res) => {
  res.status(200).send(
    '<!doctype html>' +
      '<html><body>' +
      '<h3>Simple Form</h3>' +
      '<form method="POST" action="/submit-form">' +
      '<input name="username" placeholder="username" />' +
      '<input name="password" type="password" placeholder="password" />' +
      '<button type="submit">Send</button>' +
      '</form>' +
      '</body></html>'
  );
});

// POST (form-url-encoded) example: Postman me Body -> x-www-form-urlencoded
// ya upar wale HTML form se
app.post('/submit-form', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('username aur password bhejo (form-url-encoded me)');
  }
  return res.status(200).send(`Form received for user: ${username}`);
});

// 404 for anything else
app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
