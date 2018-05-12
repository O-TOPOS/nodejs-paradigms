var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://i5up3r:19878719@dwdb.cccghmibyhvm.us-east-2.rds.amazonaws.com:5432/p1';
var db = pgp(connectionString);

// add query functions

function getAllPuppies(req, res, next) {
  db.any('select 1 as id UNION select 2 as id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};


module.exports = {
  getAllPuppies: getAllPuppies,
  //getSinglePuppy: getSinglePuppy,
  //createPuppy: createPuppy,
  //updatePuppy: updatePuppy,
  //removePuppy: removePuppy
};
