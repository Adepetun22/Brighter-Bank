import type { Db } from 'mongodb';

export interface CollectionSchema {
  name: string;
  validator: Record<string, unknown>;
}

export const collections: CollectionSchema[] = [
  {
    name: 'users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'passwordHash', 'firstName', 'lastName', 'phone', 'roles', 'security'],
        properties: {
          email: { bsonType: 'string' },
          passwordHash: { bsonType: 'string' },
          firstName: { bsonType: 'string' },
          lastName: { bsonType: 'string' },
          phone: { bsonType: 'string' },
          dateOfBirth: { bsonType: 'date' },
          address: { bsonType: 'object' },
          identity: { bsonType: 'object' },
          roles: { bsonType: 'array' },
          security: { bsonType: 'object' },
          isActive: { bsonType: 'bool' },
          lastLoginAt: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'accounts',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'accountNumber', 'maskedNumber', 'accountType', 'balance', 'status'],
        properties: {
          userId: { bsonType: 'objectId' },
          accountNumber: { bsonType: 'string' },
          maskedNumber: { bsonType: 'string' },
          accountType: { bsonType: 'string' },
          balance: { bsonType: 'decimal' },
          currency: { bsonType: 'string' },
          status: { bsonType: 'string' },
          interestRate: { bsonType: 'decimal' },
          overdraftLimit: { bsonType: 'decimal' },
          limits: { bsonType: 'object' },
          closedAt: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'transactions',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['accountId', 'timestamp', 'description', 'amount', 'type', 'status', 'balanceAfter'],
        properties: {
          accountId: { bsonType: 'objectId' },
          transactionId: { bsonType: 'string' },
          timestamp: { bsonType: 'date' },
          description: { bsonType: 'string' },
          amount: { bsonType: 'decimal' },
          type: { bsonType: 'string' },
          status: { bsonType: 'string' },
          category: { bsonType: 'string' },
          merchant: { bsonType: 'string' },
          balanceAfter: { bsonType: 'decimal' },
          metadata: { bsonType: 'object' },
        },
      },
    },
  },
  {
    name: 'statements',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['accountId', 'statementId', 'period', 'openingBalance', 'closingBalance', 'totalDeposits', 'totalWithdrawals'],
        properties: {
          accountId: { bsonType: 'objectId' },
          statementId: { bsonType: 'string' },
          period: { bsonType: 'object' },
          openingBalance: { bsonType: 'decimal' },
          closingBalance: { bsonType: 'decimal' },
          totalDeposits: { bsonType: 'decimal' },
          totalWithdrawals: { bsonType: 'decimal' },
          url: { bsonType: 'string' },
          generatedAt: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'sessions',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'tokenId', 'refreshToken', 'expiresAt', 'lastAccessedAt'],
        properties: {
          userId: { bsonType: 'objectId' },
          tokenId: { bsonType: 'string' },
          refreshToken: { bsonType: 'string' },
          userAgent: { bsonType: 'string' },
          ipAddress: { bsonType: 'string' },
          expiresAt: { bsonType: 'date' },
          lastAccessedAt: { bsonType: 'date' },
          revokedAt: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'auditlogs',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['action', 'success', 'timestamp'],
        properties: {
          userId: { bsonType: 'objectId' },
          action: { bsonType: 'string' },
          resourceType: { bsonType: 'string' },
          resourceId: { bsonType: 'string' },
          ipAddress: { bsonType: 'string' },
          userAgent: { bsonType: 'string' },
          success: { bsonType: 'bool' },
          failureReason: { bsonType: 'string' },
          metadata: { bsonType: 'object' },
          timestamp: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'branches',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['branchId', 'name', 'address', 'coordinates'],
        properties: {
          branchId: { bsonType: 'string' },
          name: { bsonType: 'string' },
          address: { bsonType: 'object' },
          coordinates: { bsonType: 'object' },
          hours: { bsonType: 'object' },
          services: { bsonType: 'array' },
          phone: { bsonType: 'string' },
          isActive: { bsonType: 'bool' },
        },
      },
    },
  },
  {
    name: 'cards',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['accountId', 'maskedNumber', 'cardType', 'status'],
        properties: {
          accountId: { bsonType: 'objectId' },
          cardNumber: { bsonType: 'string' },
          maskedNumber: { bsonType: 'string' },
          expiryDate: { bsonType: 'string' },
          cardType: { bsonType: 'string' },
          status: { bsonType: 'string' },
          security: { bsonType: 'object' },
          expiredAt: { bsonType: 'date' },
        },
      },
    },
  },
  {
    name: 'loanapplications',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'applicationNumber', 'amount', 'termMonths', 'purpose', 'status'],
        properties: {
          userId: { bsonType: 'objectId' },
          applicationNumber: { bsonType: 'string' },
          amount: { bsonType: 'decimal' },
          termMonths: { bsonType: 'int' },
          purpose: { bsonType: 'string' },
          status: { bsonType: 'string' },
          submittedAt: { bsonType: 'date' },
          reviewedAt: { bsonType: 'date' },
          reviewedBy: { bsonType: 'objectId' },
          decisionReason: { bsonType: 'string' },
          documents: { bsonType: 'array' },
          riskAssessment: { bsonType: 'object' },
        },
      },
    },
  },
  {
    name: 'mortgageapplications',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'applicationNumber', 'propertyValue', 'downPayment', 'loanAmount', 'termYears', 'propertyType', 'propertyAddress', 'status'],
        properties: {
          userId: { bsonType: 'objectId' },
          applicationNumber: { bsonType: 'string' },
          propertyValue: { bsonType: 'decimal' },
          downPayment: { bsonType: 'decimal' },
          loanAmount: { bsonType: 'decimal' },
          termYears: { bsonType: 'int' },
          propertyType: { bsonType: 'string' },
          propertyAddress: { bsonType: 'object' },
          status: { bsonType: 'string' },
          submittedAt: { bsonType: 'date' },
          reviewedAt: { bsonType: 'date' },
          reviewedBy: { bsonType: 'objectId' },
          interestRate: { bsonType: 'decimal' },
          monthlyPayment: { bsonType: 'decimal' },
          decisionReason: { bsonType: 'string' },
          documents: { bsonType: 'array' },
          riskAssessment: { bsonType: 'object' },
        },
      },
    },
  },
];

export async function ensureDatabaseSchema(db: Db): Promise<void> {
  for (const collection of collections) {
    const existingCollections = await db.listCollections({ name: collection.name }).toArray();

    if (existingCollections.length === 0) {
      await db.createCollection(collection.name, {
        validator: collection.validator,
      });
      console.log(`Collection ${collection.name} created`);
    } else {
      await db.command({ collMod: collection.name, validator: collection.validator });
      console.log(`Collection ${collection.name} validated`);
    }
  }
}
