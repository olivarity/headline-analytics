function route(db) {
  const router = require('express').Router();  
  router.get('/timestamps', function(req, res) {
    db.lrange('clicks', 0, -1, function(err, data) {
      if(err)
        return res.sendStatus(500).end();
      
      const objects = data.map(e => JSON.parse(e));
      res.json(objects);
    });
  });

  router.get('/headlines', function(req, res) {
    db.keys('data:*', function (err, keys) {
      if(err)
        return res.sendStatus(500).end();
      
      let objects = {};
      let callsRemaining = keys.length; 

      for(let i = 0; i < callsRemaining; i++) {
        const key = keys[i];
        db.hgetall(key, (err, val) => {
          objects[key] = err ? 'Error' : val;     
          callsRemaining--;
          if(callsRemaining <= 0)
            res.json(objects);
        });
      }
    });
  });
  return router;
}

module.exports = route;
