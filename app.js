// Module imports
const express = require('express');
const morgan = require('morgan');
const redis = require('redis');

// Create instances
const app = express();
const db = redis.createClient(process.env.REDIS_URL);

// Middleware config
app.use(morgan('tiny'));

// Add routes
app.use(express.static('public'));
app.use('/api', require('./api.js')(db));
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on ${port}`);
