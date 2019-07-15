const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('<p>Hello</p>');
  res.end();
})

server.get('/sum', (req, res) => {
  console.log(req.query);
  let sum = 0;
  Object.keys(req.query).forEach(key => {
    sum += parseInt(req.query[key]);
  });
  res.send(`<p>${sum}</p>`)
  res.end();
});

server.listen(8080, () => console.log('Express server is listening on port 8080'));