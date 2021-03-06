
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // for testing

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});


const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        { a: 1 },
        { a: 2 },
        { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}