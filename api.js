function route(db) {
  const router = require('express').Router(); 
  router.route('/')

    // Get a random headline/button
    .get(function (req, res) {
      db.keys('data:*', function(err, keys) {
        if(!err) {
          const index = Math.floor(Math.random() * keys.length);
          const key = keys[index];
          console.log(`Getting ${key}`);
          db.hgetall(key, function(err, val) {
            if(err) {
              console.log('Failed getting data object', err);
              return res.sendStatus(500).end(); 
            }
            res.json({
              button: val.button, 
              headline: val.headline, 
              id: key
            }); 
            
            db.hincrby(key, "sentCount", 1);
          });
        }
        else {
          console.log('Failed getting data keys', err);
          return res.sendStatus(500).end(); 
        }
      });
    })

    // Log button press
    .post(function (req, res) {
      const id = req.body.id;
      
      if(!id) 
        return res.sendStatus(400);
      
      const timestamp = { buttonId: id,  timestamp: Date.now() }
      db.lpush('clicks', JSON.stringify(timestamp));
      db.hincrby(id, "clickedCount", 1);

      res.sendStatus(200);
    });

  return router;
}

module.exports = route;
