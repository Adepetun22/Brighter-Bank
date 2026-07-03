import { connectToMongoDB, disconnectFromMongoDB } from '../src/config/mongoClient';
import { ensureDatabaseSchema } from '../src/config/databaseSchema';

async function initializeDatabase() {
  try {
    const client = await connectToMongoDB();
    const db = client.db();

    await ensureDatabaseSchema(db);

    await disconnectFromMongoDB();
    console.log('Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();