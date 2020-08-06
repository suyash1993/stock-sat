const MongoClient = require('mongodb').MongoClient;
const ReadPreference = require('mongodb').ReadPreference;
const migrateMongo = require('migrate-mongo');
const migrateMongoConfig = require('../migrate-mongo-config');


class MongodbConnector {
  constructor(app) {
    this.user = 'stock_admin';
    this.password = 'happymark73';
    this.instances = ['localhost:27017'];
    this.dbName = 'stock_sat';
    this.url = `mongodb://${this.user}:${this.password}@${this.instances.join(",")}?authSource=admin`;
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      readPreference: ReadPreference.PRIMARY_PREFERRED
    };
    this.app = app;
  }

  async connect() {
    const client = new MongoClient(this.url, this.options);
    const connectResp = await client.connect();
    const db = client.db(this.dbName);
    console.log("Connection established succesfully with db :-", this.dbName);
    this.app.locals.db = db;
    return db;
  }

  async initMigration() {
    migrateMongoConfig.mongodb.url = this.url;
    migrateMongoConfig.mongodb.options = this.options;
    migrateMongoConfig.mongodb.databaseName = this.dbName;
    const { db, client } = await migrateMongo.database.connect();
    const migrated = await migrateMongo.up(db, client);
    console.log('migrateMongoConfig up done-----', migrated);
    migrated.forEach(fileName => console.log(`Migrated file ${fileName} with success.`));
    await db.close();
    console.log('migrateMongoConfig db close-----');
  }
}

module.exports = MongodbConnector;