import { Account, IAccount } from '../models/Account.js';
import mongoose from 'mongoose';

export class AccountRepository {
  async create(accountData: {
    userId: string;
    accountNumber: string;
    accountType: 'checking' | 'savings' | 'loan' | 'mortgage';
    balance: number;
    currency?: string;
  }): Promise<IAccount> {
    const maskedNumber = `****${accountData.accountNumber.slice(-4)}`;
    const account = new Account({
      ...accountData,
      maskedNumber,
      balance: mongoose.Types.Decimal128.fromString(accountData.balance.toString()),
    });
    return account.save();
  }

  async findByUserId(userId: string): Promise<IAccount[]> {
    return Account.find({ userId }).exec();
  }

  async findById(id: string): Promise<IAccount | null> {
    return Account.findById(id).exec();
  }

  async updateBalance(accountId: string, amount: number): Promise<IAccount | null> {
    const account = await Account.findById(accountId);
    if (!account) return null;

    const currentBalance = parseFloat(account.balance.toString());
    account.balance = mongoose.Types.Decimal128.fromString((currentBalance + amount).toString());
    return account.save();
  }

  async update(id: string, updates: Partial<IAccount>): Promise<IAccount | null> {
    return Account.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}