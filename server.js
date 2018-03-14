var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CLIENTS_COLLECTION = 'clients';
var TRANSFER_COLLECTION = 'transfers';

var app = express();
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Create link to Angular build directory
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

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
        errorHandler(res, err.message, 'Failed to get clients.');
      } else {
        res.status(200).json(docs);
      }
    });
});
app.post('/api/clients', function(req, res) {
  var newClient = req.body;

  if (!req.body.name) {
    errorHandler(res, 'Invalid user input', 'Name field is required.', 400);
  }

  db.collection(CLIENTS_COLLECTION).insertOne(newClient, function(err, doc) {
    if (err) {
      errorHandler(res, err.message, 'Failed to create new client.');
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
app.get('/api/clients/:id', function(req, res) {
  db.collection(CLIENTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      errorHandler(res, err.message, 'Failed to get client');
    } else {
      res.status(200).json(doc);
    }
  });
});
app.put('/api/clients/:id', function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CLIENTS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
    if (err) {
      errorHandler(res, err.message, 'Failed to update client');
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});
app.delete('/api/clients/:id', function(req, res) {
  db.collection(CLIENTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
    if (err) {
      errorHandler(res, err.message, 'Failed to delete client');
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/* "/api/transfers"
 * GET: finds all transfers
 * POST: creates a new transfer
 */
app.get('/api/transfers', function(req, res) {
  db
    .collection(TRANSFER_COLLECTION)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        errorHandler(res, err.message, 'Failed to get transfers.');
      } else {
        res.status(200).json(docs);
      }
    });
});
app.post('/api/transfers', function(req, res) {
  var newTransfer = req.body;

  if (!req.body.fileName) {
    errorHandler(res, 'Invalid user input', '"fileName" is required.', 400);
  }

  if (!req.body.clientIds) {
    errorHandler(res, 'Invalid user input', '"client" ids is required.', 400);
  }

  if (!req.body.usage) {
    errorHandler(res, 'Invalid user input', '"usage" is required.', 400);
  }

  db.collection(TRANSFER_COLLECTION).insertOne(newTransfer, function(err, doc) {
    if (err) {
      errorHandler(res, err.message, 'Failed to create new transfer.');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/* "/api/transfers/:id"
 * DELETE: deletes transfer by id
 */
app.delete('/api/transfers/:id', function(req, res) {
  db.collection(TRANSFER_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
    if (err) {
      errorHandler(res, err.message, 'Failed to delete transfer');
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
