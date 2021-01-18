import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

async function connect(): Promise<void> {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
}

async function disconnect(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

async function clear(): Promise<void> {
  const { collections } = mongoose.connection;

  await Promise.all(
    Object.keys(collections).map((key) => collections[key].deleteMany({}))
  );
}

export default {
  connect,
  disconnect,
  clear,
};
