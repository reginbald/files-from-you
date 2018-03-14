var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CLIENTS_COLLECTION = 'clients';

var app = express();
app.use(bodyParser.json());

// Database variable to reuse the connection pool.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', function(err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log('Database connection ready');

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log('App now running on port', port);
  });
});

/*******************************************************/
// API ROUTES
function errorHandler(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({ error: message });
}

/* "/api/clients"
 * GET: finds all client
 * POST: creates a new client
 */
app.get('/api/clients', function(req, res) {
  db
    .collection(CLIENTS_COLLECTION)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to get clients.');
      } else {
        res.status(200).json(docs);
      }
    });
});
app.post('/api/clients', function(req, res) {
  var newClient = req.body;

  if (!req.body.name) {
    handleError(res, 'Invalid user input', 'Name field is required.', 400);
  }

  db.collection(CLIENTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to create new client.');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/* "/api/clients/:id"
 * GET: find client by id
 * PUT: update client by id
 * DELETE: deletes client by id
 */
app.get('/api/clients/:id', function(req, res) {});
app.put('/api/clients/:id', function(req, res) {});
app.delete('/api/clients/:id', function(req, res) {});
