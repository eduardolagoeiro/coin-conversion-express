import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const mongourl =
  process.env.DATABASE_URL ||
  'mongodb://localhost:27017/coin_coversion_database';

function connect(): Promise<typeof mongoose> {
  return mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function disconnect(): Promise<void> {
  return mongoose.disconnect();
}

export default {
  connect,
  disconnect,
};
