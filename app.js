const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on ${port}`);
