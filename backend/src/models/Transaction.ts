import mongoose from 'mongoose';

export type TransactionType = 'credit' | 'debit' | 'transfer';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface ITransaction extends mongoose.Document {
  accountId: mongoose.Types.ObjectId;
  transactionId?: string;
  timestamp: Date;
  description: string;
  amount: mongoose.Types.Decimal128;
  type: TransactionType;
  status: TransactionStatus;
  category?: string;
  merchant?: string;
  balanceAfter: mongoose.Types.Decimal128;
  metadata?: {
    ipAddress?: string;
    location?: {
      lat?: number;
      lng?: number;
    };
  };
  createdAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    transactionId: { type: String, encrypted: true },
    timestamp: { type: Date, required: true, index: true },
    description: { type: String, required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    type: { type: String, enum: ['credit', 'debit', 'transfer'], required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'reversed'],
      default: 'pending',
    },
    category: { type: String },
    merchant: { type: String, encrypted: true },
    balanceAfter: { type: mongoose.Schema.Types.Decimal128, required: true },
    metadata: {
      ipAddress: { type: String, encrypted: true },
      location: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

transactionSchema.index({ status: 1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);