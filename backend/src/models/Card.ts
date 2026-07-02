import mongoose from 'mongoose';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover';
export type CardStatus = 'active' | 'frozen' | 'expired' | 'reported';

export interface ICard extends mongoose.Document {
  accountId: mongoose.Types.ObjectId;
  cardNumber?: string;
  maskedNumber: string;
  expiryDate?: string;
  cardType: CardType;
  status: CardStatus;
  security: {
    dailyLimit?: mongoose.Types.Decimal128;
    atmLimit?: mongoose.Types.Decimal128;
    onlineLimit?: mongoose.Types.Decimal128;
    contactlessLimit?: mongoose.Types.Decimal128;
  };
  createdAt: Date;
  updatedAt: Date;
  expiredAt?: Date;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
    cardNumber: { type: String, encrypted: true },
    maskedNumber: { type: String, required: true },
    expiryDate: { type: String, encrypted: true },
    cardType: {
      type: String,
      enum: ['visa', 'mastercard', 'amex', 'discover'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'frozen', 'expired', 'reported'],
      default: 'active',
    },
    security: {
      dailyLimit: { type: mongoose.Schema.Types.Decimal128 },
      atmLimit: { type: mongoose.Schema.Types.Decimal128 },
      onlineLimit: { type: mongoose.Schema.Types.Decimal128 },
      contactlessLimit: { type: mongoose.Schema.Types.Decimal128 },
    },
    expiredAt: { type: Date },
  },
  { timestamps: true }
);

export const Card = mongoose.model<ICard>('Card', cardSchema);