
var express = require('express');
var XXX = express.Router();
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://heroku_njmbv2gs:962hpsg6iqt144v4t5dc3tbtk0@ds229648.mlab.com:29648/heroku_njmbv2g\n' +
    's\n';



//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
XXX.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;
        //get collection of routes
        var Routes = db.collection('routes');
        //get all Routes
        Routes.find({ }).sort({ name: 1 }).toArray(function (err, docs) {
            if(err) throw err;

            response.render('pages/mongodb', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

});//end XXX.get



/*
var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
/* GET home page. ///////
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); });
module.exports = router;
//**************************************************************************
// ***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response) {
    mongodb.MongoClient.connect('mongodb://heroku_pmk6n54s:penh0a964unc8citdi3c1943cv@ds153869.mlab.com:53869/heroku_pmk6n54s', function (err, client) {
        // mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
// works with mongodb v2 but not v3         if(err) throw err;
// get collection of routes
        var db = client.db('heroku_pmk6n54s');
// in v3 we need to get the db from the client
        var Routes = db.collection('Routes');
//get all Routes with frequency >=1
        Routes.find({frequency: {$gte: 0}}).sort({name: 1}).toArray(function (err, docs) {
            if (err) throw err;
            response.render('mongodb', {results: docs});
        });
//close connection when your app is terminating.
// db.close(function (err) {
        client.close(function (err) {
            if (err) throw err;
        });
    });
}
  //end of connect });//end app.get
*/