var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/puppies', db.getAllPuppies);
//router.get('/api/puppies/:id', db.getSinglePuppy);
//router.post('/api/puppies', db.createPuppy);
//router.put('/api/puppies/:id', db.updatePuppy);
//router.delete('/api/puppies/:id', db.removePuppy);

router.get('/map', function(req, res) {
    //var client = new Client(conString); // Setup our Postgres Client
    //client.connect(); // connect to the client
    //var query = db.query(new Query(coffee_query)); // Run our Query
    //query.on("row", function (row, result) {
    //    result.addRow(row);
    //});
    // Pass the result to the map page
    //query.on("end", function (result) {
    //    var data = result.rows[0].row_to_json // Save the JSON as variable data
        res.render('map', {
            title: "Express API"//, // Give a title to our page
            //jsonData: data // Pass data to the View
        });
    //});
});

module.exports = router;
