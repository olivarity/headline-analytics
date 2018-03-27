function route(db) {
  const router = require('express').Router(); 
  router.route('/')
    .get(function (req, res) {
      // Get a random headline/button
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
    .post(function (req, res) {
      // Log a button click
      
    });

  return router;
}

module.exports = route;
