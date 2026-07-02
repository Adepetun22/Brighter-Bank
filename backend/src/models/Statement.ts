import mongoose from 'mongoose';

export interface IStatement extends mongoose.Document {
  accountId: mongoose.Types.ObjectId;
  statementId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  openingBalance: mongoose.Types.Decimal128;
  closingBalance: mongoose.Types.Decimal128;
  totalDeposits: mongoose.Types.Decimal128;
  totalWithdrawals: mongoose.Types.Decimal128;
  url?: string;
  generatedAt: Date;
  createdAt: Date;
}

const statementSchema = new mongoose.Schema<IStatement>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    index: true,
  },
  statementId: { type: String, required: true, unique: true },
  period: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  openingBalance: { type: mongoose.Schema.Types.Decimal128, required: true },
  closingBalance: { type: mongoose.Schema.Types.Decimal128, required: true },
  totalDeposits: { type: mongoose.Schema.Types.Decimal128, required: true },
  totalWithdrawals: { type: mongoose.Schema.Types.Decimal128, required: true },
  url: { type: String },
  generatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

statementSchema.index({ accountId: 1, 'period.startDate': -1 });

export const Statement = mongoose.model<IStatement>('Statement', statementSchema);