function route(db) {
  const router = require('express').Router(); 
  router.route('/')
    .get(function (req, res) {
      // Get a random headline/button
      db.get('test', function (err, val) {
        if(err)
          return console.log(err);

        res.send(val);
      });
    })
    .post(function (req, res) {
      // Log a button click
      
    });

  return router;
}

module.exports = route;
