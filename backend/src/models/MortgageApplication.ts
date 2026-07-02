import mongoose from 'mongoose';

export type MortgageApplicationStatus = 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
export type PropertyType = 'single-family' | 'condo' | 'townhouse' | 'multi-family';

export interface IMortgageApplication extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  applicationNumber: string;
  propertyValue: mongoose.Types.Decimal128;
  downPayment: mongoose.Types.Decimal128;
  loanAmount: mongoose.Types.Decimal128;
  termYears: number;
  propertyType: PropertyType;
  propertyAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status: MortgageApplicationStatus;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  interestRate?: mongoose.Types.Decimal128;
  monthlyPayment?: mongoose.Types.Decimal128;
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

const mortgageApplicationSchema = new mongoose.Schema<IMortgageApplication>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    applicationNumber: { type: String, required: true, unique: true },
    propertyValue: { type: mongoose.Schema.Types.Decimal128, required: true },
    downPayment: { type: mongoose.Schema.Types.Decimal128, required: true },
    loanAmount: { type: mongoose.Schema.Types.Decimal128, required: true },
    termYears: { type: Number, required: true },
    propertyType: {
      type: String,
      enum: ['single-family', 'condo', 'townhouse', 'multi-family'],
      required: true,
    },
    propertyAddress: {
      street: { type: String, encrypted: true },
      city: { type: String, encrypted: true },
      state: { type: String, encrypted: true },
      zip: { type: String, encrypted: true },
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected'],
      default: 'draft',
    },
    submittedAt: { type: Date },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    interestRate: { type: mongoose.Schema.Types.Decimal128 },
    monthlyPayment: { type: mongoose.Schema.Types.Decimal128 },
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

mortgageApplicationSchema.index({ status: 1 });

export const MortgageApplication = mongoose.model<IMortgageApplication>(
  'MortgageApplication',
  mortgageApplicationSchema
);