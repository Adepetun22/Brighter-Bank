import mongoose from 'mongoose';

export type UserRole = 'customer' | 'admin';

export interface IUser extends mongoose.Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  identity: {
    ssnLast4?: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    documents: Array<{
      type: string;
      url: string;
      verifiedAt?: Date;
    }>;
  };
  roles: UserRole[];
  security: {
    failedLoginAttempts: number;
    lockedUntil?: Date;
    passwordChangedAt: Date;
    twoFactorEnabled: boolean;
    securityQuestions?: Array<{
      question: string;
      answerHash: string;
    }>;
  };
  isActive: boolean;
  lastLoginAt?: Date;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, encrypted: true, required: true },
    dateOfBirth: { type: Date, encrypted: true },
    address: {
      street: { type: String, encrypted: true },
      city: { type: String, encrypted: true },
      state: { type: String, encrypted: true },
      zip: { type: String, encrypted: true },
      country: { type: String, encrypted: true },
    },
    identity: {
      ssnLast4: { type: String, encrypted: true },
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
      },
      documents: [
        {
          type: { type: String },
          url: { type: String },
          verifiedAt: { type: Date },
        },
      ],
    },
    roles: [{ type: String, enum: ['customer', 'admin'], default: 'customer' }],
    security: {
      failedLoginAttempts: { type: Number, default: 0 },
      lockedUntil: { type: Date },
      passwordChangedAt: { type: Date, default: Date.now },
      twoFactorEnabled: { type: Boolean, default: false },
      securityQuestions: [
        {
          question: { type: String, encrypted: true },
          answerHash: { type: String },
        },
      ],
    },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);