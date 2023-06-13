import mongoose, { Connection as MongooseConnection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.Promise = global.Promise;

class Connection {
  private mongoServer: MongoMemoryServer;
  public connection: MongooseConnection | any;

  constructor() {
    this.mongoServer = new MongoMemoryServer();
    this.connection = null;
  }

  async connect() {
    await this.mongoServer.start();
    const mongoUri = this.mongoServer.getUri();

    this.connection = await mongoose.connect(mongoUri);
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      await this.mongoServer.stop();
      this.connection = null;
    }
  }

  async cleanup(): Promise<void> {
    if (this.connection) {
      const models = Object.keys(this.connection.models);
      const promises: Promise<any>[] = [];

      models.forEach((model) => {
        const Model = this.connection!.models[model];
        promises.push(Model.deleteMany({}));
      });

      await Promise.all(promises);
    }
  }
}

/**
 * Create the initial database connection.
 *
 * @async
 * @return {Promise<Connection>}
 */
export const connect = async (): Promise<Connection> => {
  const conn = new Connection();
  await conn.connect();
  return conn;
};