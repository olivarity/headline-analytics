// Module imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');

// Create instances
const app = express();
const db = redis.createClient(process.env.REDIS_URL);

// Middleware config
app.use(morgan('tiny'));
app.use(bodyParser.json());
db.on("error", err => console.log("Error: " + err));

// Add routes
app.use(express.static('public'));
app.use('/api', require('./routes/api.js')(db));
app.use('/admin', require('./routes/admin.js')(db));
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on ${port}`);
