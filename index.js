const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello changed test ${target}!\n`);
});

app.get('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({sub:"abayadmin", name:"admintest"}));
});

app.post('/login', (req, res) => {
  var authHeader = req.headers.authorization;
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({sub:"abayadmin", name:"admintest",user:user,password:pass }));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
