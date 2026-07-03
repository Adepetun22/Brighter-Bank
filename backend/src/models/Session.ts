import mongoose from 'mongoose';

export interface ISession extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  tokenId: string;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  lastAccessedAt: Date;
  revokedAt?: Date;
  createdAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tokenId: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true },
    userAgent: { type: String, encrypted: true },
    ipAddress: { type: String, encrypted: true },
    expiresAt: { type: Date, required: true },
    lastAccessedAt: { type: Date, default: Date.now },
    revokedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model<ISession>('Session', sessionSchema);