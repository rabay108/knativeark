const express = require('express');
const app = express();
const pw="passw1";
app.get('/', (req, res) => {
  console.log('Hello Login code received a request.');

  const target = process.env.TARGET || 'Login';
  res.send(`Hello changed test ${target}!\n`);
});

app.get('/login', (req, res) => {
  var td = new Date();
  var tdate=td.getDate();
  var pwd=String(pw)+String(tdate);
  var authHeader = req.headers.authorization;
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  res.setHeader('Content-Type', 'application/json');
    
  if (pass == pwd)
     {
        studentName='Student'+user		
        res.status(200).send(JSON.stringify({sub:user, name:studentName})); 
     }
  else
     {
         console.log("Password fail");
         res.status(401).send(JSON.stringify({sub:user, name:pass}));
     };
});

app.post('/loginpost', (req, res) => {
  var authHeader = req.headers.authorization;
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({sub:"postadmin", name:"Post admintest",user:user,password:pass }));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
