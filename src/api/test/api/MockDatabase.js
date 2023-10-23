const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Extend the default timeout so MongoDB binaries can download
jest.setTimeout(60000);

// List your collection names here
const COLLECTIONS = [
  "Asset",
  "Model",
];

class InMemoryMongoDb {
  constructor() {
    this.db = null;
    this.connection = null;
  }

  async start(dbName) {
    this.server = await MongoMemoryServer.create({dbName});
    this.connection = await MongoClient.connect(this.server.getUri(), { useNewUrlParser: true, useUnifiedTopology: true});
    this.db = this.connection.db(dbName);
  }

  stop() {
    this.connection.close();
    return this.server.stop();
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c => this.db.collection(c).deleteMany({})));
  }
}

module.exports = InMemoryMongoDb;