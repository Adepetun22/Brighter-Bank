import { Session, ISession } from '../models/Session.js';

export class SessionRepository {
  async create(
    userId: string,
    tokenId: string,
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
    expiresInHours: number = 24
  ): Promise<ISession> {
    const session = new Session({
      userId,
      tokenId,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + expiresInHours * 3600000),
    });
    return session.save();
  }

  async findByTokenId(tokenId: string): Promise<ISession | null> {
    return Session.findOne({ tokenId, expiresAt: { $gt: new Date() } }).exec();
  }

  async revokeByTokenId(tokenId: string): Promise<void> {
    await Session.findOneAndUpdate(
      { tokenId },
      { revokedAt: new Date() }
    ).exec();
  }

  async revokeAllByUserId(userId: string): Promise<void> {
    await Session.updateMany(
      { userId, revokedAt: { $exists: false } },
      { revokedAt: new Date() }
    ).exec();
  }

  async cleanupExpired(): Promise<void> {
    await Session.deleteMany({ expiresAt: { $lt: new Date() } }).exec();
  }
}