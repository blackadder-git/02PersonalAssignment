const dotenv = require('dotenv');
dotenv.config();

const mongoClient = require('mongodb').MongoClient;

//const mongoDBIP = '192.168.1.71';
//const mongoDBPort = 27017;
//const mongoURL = 'mongodb://<mongo admin>:<password>@'+`${mongoDBIP}`+':'+`${mongoDBPort}`;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  mongoClient.connect(process.env.MONGODB_URI)
    .then(async client => {
      _db = client;

      // Make the appropriate DB calls
      await  listDatabases(client);

      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db; // return connection
};


async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


module.exports = {
  initDb,
  getDb
};