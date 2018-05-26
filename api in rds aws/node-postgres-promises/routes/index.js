var express = require('express');
var router = express.Router();

// inside index.js
var db = require('../queries');

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "i5up3r" // sandbox username
var password = "19878719" // read only privileges on our table
var host = "dwdb.cccghmibyhvm.us-east-2.rds.amazonaws.com:5432"
var database = "p1" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

// Set up your database query to display GeoJSON
var user_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Point(ST_X(ST_Centroid(ST_Transform(lg.geom,4326))), ST_Y(ST_Centroid(ST_Transform(lg.geom,4326)))))::json As geometry, row_to_json((id, class)) As properties FROM project1.uk_comp_model_pr_3857 As lg) As f) As fc";
// var user_query = "SELECT 1 UNION SELECT 2";

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

/* GET Postgres JSON data */
router.get('/data', function (req, res) {
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(user_query));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.send(result.rows[0].row_to_json);
        res.end();
    });
});

router.get('/map2', function(req, res) {
    var client = new Client(conString); // Setup our Postgres Client
    client.connect(); // connect to the client
    var query = client.query(new Query(user_query)); // Run our Query
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    //Pass the result to the map page
    query.on("end", function (result) {
        var data = result.rows[0].row_to_json // Save the JSON as variable data
        res.render('map2', {
            title: "Express API", // Give a title to our page
            jsonData: data // Pass data to the View
        });
    });
});

/* GET the filtered page */
router.get('/filter*', function (req, res) {
    var name = req.query.name;
    if (name.indexOf("--") > -1 || name.indexOf("'") > -1 || name.indexOf(";") > -1 || name.indexOf("/*") > -1 || name.indexOf("xp_") > -1){
        console.log("Bad request detected");
        res.redirect('/map');
        return;
    } else {
        console.log("Request passed")
        var filter_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Centroid(lg.geom))::json As geometry, row_to_json((id, name)) As properties FROM cambridge_coffee_shops As lg WHERE lg.name = \'" + name + "\') As f) As fc";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(filter_query);
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            var data = result.rows[0].row_to_json
            res.render('map', {
                title: "Express API",
                jsonData: data
            });
        });
    };
});

module.exports = router;
