const { MongoClient } = require('mongodb');
// import MongoClient 
const myConnectionString = "***REMOVED***";
const myClient = new MongoClient(myConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let myConn:any;

module.exports = {
  connectToServer: function (callback:any) {
    myClient.connect(function (err:any, db:any) {
      if (err || !db) {
        return callback(err);
      }

      myConn = db.db('dotaDrafter');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return myConn;
  },
};

export {};