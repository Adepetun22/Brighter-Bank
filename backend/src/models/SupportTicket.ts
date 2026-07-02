import mongoose from 'mongoose';

export type SupportCategory = 'account' | 'technical' | 'security' | 'payment' | 'other';
export type SupportPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SupportStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export interface ISupportTicket extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  ticketNumber: string;
  subject: string;
  category: SupportCategory;
  priority: SupportPriority;
  status: SupportStatus;
  message: string;
  response?: string;
  assignedTo?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const supportTicketSchema = new mongoose.Schema<ISupportTicket>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    ticketNumber: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    category: {
      type: String,
      enum: ['account', 'technical', 'security', 'payment', 'other'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    message: { type: String, required: true },
    response: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

supportTicketSchema.index({ status: 1 });

export const SupportTicket = mongoose.model<ISupportTicket>(
  'SupportTicket',
  supportTicketSchema
);