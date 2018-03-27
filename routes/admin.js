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

  return router;
}

module.exports = route;
