import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.MONGODB_FIELD_ENCRYPTION_KEY || process.env.FIELD_ENCRYPTION_KEY || 'dev-key-please-change';

// Field encryption plugin setup (deferred until connection)
let encryptionInitialized = false;

export async function initEncryptionPlugin() {
  if (encryptionInitialized) return;
  try {
    const { fieldEncryption } = await import('mongoose-field-encryption');
    mongoose.plugin(fieldEncryption, {
      secret: ENCRYPTION_KEY,
      saltGenerator: () => () => process.env.MONGODB_ENCRYPTION_SALT || '522F4D38F4A5C3D2E1B6F7A89C0D2E1F',
      encrypt: (doc: mongoose.Document) => {
        const schema = (doc.constructor as mongoose.Model<mongoose.Document>).schema;
        const paths = Object.keys(schema.paths);
        return paths.some((path) => {
          const pathOptions = schema.paths[path].options;
          return pathOptions.encrypted === true;
        });
      },
      decryptedFields: ['__v'],
    });
    encryptionInitialized = true;
  } catch (error) {
    console.error('Field encryption plugin init failed:', error);
  }
}

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  const options: mongoose.ConnectOptions = {
    maxPoolSize: 50,
    minPoolSize: 5,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    await mongoose.connect(mongoUri, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnect error:', error);
  }
}