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


server.get('/cipher', (req, res) => {
  console.log(req.query);
  let decoded = '';
  for (let i = 0; i < req.query.text.length; i++){
    let newCharVal = req.query.text.charCodeAt(i) + parseInt(req.query.shift);
    decoded += String.fromCharCode(newCharVal);
  }
  res.send(`<p>${decoded}</p>`);
  res.end();
});


server.get('/lotto', (req, res) => {
  let num = req.query.num.map(n => parseInt(n));
  let winningNums = [];
  let matchCount = 0;

  for (let i = 0; i < 6; i++) {
    winningNums.push(Math.floor(Math.random() * 20));
  }

  for (let i = 0; i < num.length; i++) {
    for (let j = 0; j < winningNums.length; j++) {
      if (num[i] === winningNums[j]) {
        winningNums.splice(j, 1);
        matchCount++;
      }
    }
  }

  let result;
  if (matchCount < 4) {
    result = 'Sorry, you lose...';
  }
  else if (matchCount === 4) {
    result = 'Free ticket...';
  }
  else {
    result = 'Winner!';
  }

  res.send(`<p>${result}</p>`);

  console.log(num, winningNums, matchCount);
  res.end();
});

server.listen(8080, () => console.log('Express server is listening on port 8080'));