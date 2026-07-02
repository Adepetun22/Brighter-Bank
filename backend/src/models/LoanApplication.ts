import mongoose from 'mongoose';

export type LoanApplicationStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface ILoanApplication extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  applicationNumber: string;
  amount: mongoose.Types.Decimal128;
  termMonths: number;
  purpose: string;
  status: LoanApplicationStatus;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  decisionReason?: string;
  documents: Array<{
    type: string;
    url: string;
    uploadedAt: Date;
  }>;
  riskAssessment?: {
    score: number;
    factors: Record<string, unknown>;
  };
  createdAt: Date;
  updatedAt: Date;
}

const loanApplicationSchema = new mongoose.Schema<ILoanApplication>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    applicationNumber: { type: String, required: true, unique: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    termMonths: { type: Number, required: true },
    purpose: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'rejected'],
      default: 'draft',
    },
    submittedAt: { type: Date },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    decisionReason: { type: String },
    documents: [
      {
        type: { type: String },
        url: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    riskAssessment: {
      score: { type: Number },
      factors: { type: mongoose.Schema.Types.Mixed },
    },
  },
  { timestamps: true }
);

loanApplicationSchema.index({ status: 1 });

export const LoanApplication = mongoose.model<ILoanApplication>(
  'LoanApplication',
  loanApplicationSchema
);