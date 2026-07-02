import mongoose from 'mongoose';

export type AuditAction =
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'password_change'
  | 'account_create'
  | 'account_update'
  | 'transaction'
  | 'loan_apply'
  | 'loan_approve'
  | 'loan_reject'
  | 'mortgage_apply'
  | 'card_frozen'
  | 'card_unfrozen'
  | 'support_ticket_create'
  | 'support_ticket_resolve';

export interface IAuditLog extends mongoose.Document {
  userId?: mongoose.Types.ObjectId;
  action: AuditAction;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  failureReason?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

const auditLogSchema = new mongoose.Schema<IAuditLog>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  action: { type: String, required: true, index: true },
  resourceType: { type: String, index: true },
  resourceId: { type: String },
  ipAddress: { type: String, encrypted: true },
  userAgent: { type: String, encrypted: true },
  success: { type: Boolean, required: true, index: true },
  failureReason: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now, index: true },
});

auditLogSchema.index({ timestamp: 1, action: 1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);