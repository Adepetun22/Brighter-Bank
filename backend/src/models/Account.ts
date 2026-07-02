import mongoose from 'mongoose';

export type AccountType = 'checking' | 'savings' | 'loan' | 'mortgage';
export type AccountStatus = 'active' | 'frozen' | 'closed' | 'dormant';

export interface IAccount extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  accountNumber: string;
  maskedNumber: string;
  accountType: AccountType;
  balance: mongoose.Types.Decimal128;
  currency: string;
  status: AccountStatus;
  interestRate?: mongoose.Types.Decimal128;
  overdraftLimit?: mongoose.Types.Decimal128;
  limits: {
    dailyWithdrawal?: mongoose.Types.Decimal128;
    dailyTransfer?: mongoose.Types.Decimal128;
    monthlyTransactionCount?: number;
  };
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

const accountSchema = new mongoose.Schema<IAccount>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    accountNumber: { type: String, required: true, unique: true, encrypted: true },
    maskedNumber: { type: String, required: true },
    accountType: {
      type: String,
      enum: ['checking', 'savings', 'loan', 'mortgage'],
      required: true,
    },
    balance: { type: mongoose.Schema.Types.Decimal128, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['active', 'frozen', 'closed', 'dormant'],
      default: 'active',
    },
    interestRate: { type: mongoose.Schema.Types.Decimal128 },
    overdraftLimit: { type: mongoose.Schema.Types.Decimal128 },
    limits: {
      dailyWithdrawal: { type: mongoose.Schema.Types.Decimal128 },
      dailyTransfer: { type: mongoose.Schema.Types.Decimal128 },
      monthlyTransactionCount: { type: Number },
    },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

accountSchema.index({ maskedNumber: 1 });

export const Account = mongoose.model<IAccount>('Account', accountSchema);