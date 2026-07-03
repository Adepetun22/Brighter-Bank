import { connectToMongoDB, disconnectFromMongoDB } from '../src/config/mongoClient';

async function initializeDatabase() {
  try {
    const client = await connectToMongoDB();
    const db = client.db();

    const collections = [
      { name: 'users', validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'passwordHash', 'firstName', 'lastName'],
          properties: {
            email: { bsonType: 'string' },
            passwordHash: { bsonType: 'string' },
            firstName: { bsonType: 'string' },
            lastName: { bsonType: 'string' }
          }
        }
      }},
      { name: 'accounts', validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'accountNumber', 'balance', 'status'],
          properties: {
            userId: { bsonType: 'objectId' },
            accountNumber: { bsonType: 'string' },
            balance: { bsonType: 'decimal' }
          }
        }
      }},
      { name: 'transactions', validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['accountId', 'amount', 'type', 'status'],
          properties: {
            accountId: { bsonType: 'objectId' },
            amount: { bsonType: 'decimal' }
          }
        }
      }}
    ];

    for (const collection of collections) {
      try {
        await db.createCollection(collection.name);
        await db.command({ collMod: collection.name, validator: collection.validator });
        console.log(`Collection ${collection.name} validated`);
      } catch (error: any) {
        if (error.codeName === 'NamespaceExists') {
          console.log(`Collection ${collection.name} already exists`);
        } else {
          console.error(`Failed to create or validate ${collection.name}:`, error);
        }
      }
    }

    await disconnectFromMongoDB();
    console.log('Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();