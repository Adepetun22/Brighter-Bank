import { User, IUser } from '../models/User.js';
import bcrypt from 'bcryptjs';

export class UserRepository {
  async create(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    address?: {
      street: string;
      city: string;
      state?: string;
      zip: string;
      country: string;
    };
    identity?: {
      ssnLast4?: string;
      verificationStatus?: 'pending' | 'verified' | 'rejected';
      documents?: Array<{ type: string; url: string; verifiedAt?: Date }>;
    };
  }): Promise<IUser> {
    const passwordHash = await bcrypt.hash(userData.password, 12);
    const user = new User({
      ...userData,
      passwordHash,
      security: { passwordChangedAt: new Date() },
    });
    return user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async update(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async incrementFailedAttempts(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (user) {
      user.security.failedLoginAttempts += 1;
      await user.save();
    }
  }

  async lockAccount(email: string, durationMinutes: number): Promise<void> {
    const user = await User.findOne({ email });
    if (user) {
      user.security.lockedUntil = new Date(Date.now() + durationMinutes * 60000);
      user.security.failedLoginAttempts = 0;
      await user.save();
    }
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) return false;
    return bcrypt.compare(password, user.passwordHash);
  }
}