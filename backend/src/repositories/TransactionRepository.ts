import { Transaction, ITransaction } from '../models/Transaction.js';
import { IAccount, Account } from '../models/Account.js';
import mongoose from 'mongoose';

export class TransactionRepository {
  async create(
    accountId: string,
    transactionData: {
      description: string;
      amount: number;
      type: 'credit' | 'debit' | 'transfer';
      merchant?: string;
    }
  ): Promise<ITransaction> {
    const account = await Account.findById(accountId);
    if (!account) throw new Error('Account not found');

    const currentBalance = parseFloat(account.balance.toString());
    const amount = parseFloat(transactionData.amount.toString());
    const newBalance = transactionData.type === 'credit' ? currentBalance + amount : currentBalance - amount;

    const transaction = new Transaction({
      accountId,
      ...transactionData,
      amount: mongoose.Types.Decimal128.fromString(amount.toString()),
      balanceAfter: mongoose.Types.Decimal128.fromString(newBalance.toString()),
    });

    account.balance = mongoose.Types.Decimal128.fromString(newBalance.toString());
    await account.save();

    return transaction.save();
  }

  async findByAccountId(accountId: string, limit?: number): Promise<ITransaction[]> {
    const query = Transaction.find({ accountId }).sort({ timestamp: -1 });
    if (limit) query.limit(limit);
    return query.exec();
  }

  async findRecent(accountId: string, days: number = 30): Promise<ITransaction[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return Transaction.find({
      accountId,
      timestamp: { $gte: cutoff },
    })
      .sort({ timestamp: -1 })
      .exec();
  }

  async updateStatus(transactionId: string, status: 'completed' | 'failed'): Promise<ITransaction | null> {
    return Transaction.findByIdAndUpdate(transactionId, { status }, { new: true }).exec();
  }
}