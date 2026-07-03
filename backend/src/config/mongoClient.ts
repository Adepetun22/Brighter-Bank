import dotenv from 'dotenv';
import { MongoClient, type ServerApiVersion } from 'mongodb';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is required');
}

const client = new MongoClient(mongoUri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToMongoDB(): Promise<MongoClient> {
  try {
    await client.connect();
    console.log('You successfully connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export async function disconnectFromMongoDB(): Promise<void> {
  await client.close();
  console.log('MongoDB connection closed');
}

export { client as mongoClient };
