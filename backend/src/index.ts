import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { connectDatabase, disconnectDatabase, initEncryptionPlugin } from './config/database.js';
import { UserRepository } from './repositories/UserRepository.js';
import { AccountRepository } from './repositories/AccountRepository.js';
import { TransactionRepository } from './repositories/TransactionRepository.js';
import { SessionRepository } from './repositories/SessionRepository.js';
import { LoanApplication } from './models/LoanApplication.js';
import { MortgageApplication } from './models/MortgageApplication.js';
import { SupportTicket } from './models/SupportTicket.js';

dotenv.config();

const app = express();
const userRepository = new UserRepository();
const accountRepository = new AccountRepository();
const transactionRepository = new TransactionRepository();
const sessionRepository = new SessionRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

function serializeUser(user: any) {
  const obj = user?.toObject ? user.toObject() : user;
  const { passwordHash, security, __v, ...safeUser } = obj ?? {};
  return safeUser;
}

function generateAccountNumber() {
  return `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
}

function createJwtToken(user: any, tokenId: string) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      roles: user.roles ?? ['customer'],
      tokenId,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

async function authorize(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ code: '401', message: 'Missing auth token.' });

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const tokenId = payload.tokenId;
    if (!tokenId) {
      return res.status(401).json({ code: '401', message: 'Invalid auth token.' });
    }

    const session = await sessionRepository.findByTokenId(tokenId);
    if (!session) {
      return res.status(401).json({ code: '401', message: 'Session expired or revoked.' });
    }

    (req as any).userId = payload.sub;
    (req as any).tokenId = tokenId;
    return next();
  } catch (error) {
    return res.status(401).json({ code: '401', message: 'Invalid auth token.' });
  }
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['*'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP',
});
app.use(limiter);

app.post('/auth/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      country,
      dob,
      ssn,
      address,
      city,
      zip,
      accountType,
    } = req.body;

    if (!name || !email || !password || !phone || !country || !dob || !ssn || !address || !city || !zip || !accountType) {
      return res.status(400).json({ code: '400', message: 'Missing required registration fields.' });
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ code: '409', message: 'A user with that email already exists.' });
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.shift() ?? name;
    const lastName = nameParts.join(' ') || firstName;

    const createdUser = await userRepository.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth: new Date(dob),
      address: {
        street: address,
        city,
        state: '',
        zip,
        country,
      },
      identity: {
        ssnLast4: ssn,
        verificationStatus: 'pending',
        documents: [],
      },
    });

    await accountRepository.create({
      userId: createdUser._id.toString(),
      accountNumber: generateAccountNumber(),
      accountType,
      balance: 0,
      currency: 'USD',
    });

    const tokenId = crypto.randomUUID();
    const refreshToken = crypto.randomUUID();

    await sessionRepository.create(
      createdUser._id.toString(),
      tokenId,
      refreshToken,
      req.headers['user-agent']?.toString(),
      req.ip
    );

    const token = createJwtToken(createdUser, tokenId);
    return res.status(201).json({ token, refreshToken, user: serializeUser(createdUser) });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to register account.' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ code: '400', message: 'Email and password are required.' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ code: '401', message: 'Invalid credentials.' });
    }

    const isValid = await userRepository.validatePassword(email, password);
    if (!isValid) {
      return res.status(401).json({ code: '401', message: 'Invalid credentials.' });
    }

    const tokenId = crypto.randomUUID();
    const refreshToken = crypto.randomUUID();
    await sessionRepository.create(
      user._id.toString(),
      tokenId,
      refreshToken,
      req.headers['user-agent']?.toString(),
      req.ip
    );

    const token = createJwtToken(user, tokenId);
    return res.status(200).json({ token, refreshToken, user: serializeUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to login.' });
  }
});

app.post('/auth/logout', authorize, async (req, res) => {
  try {
    const tokenId = (req as any).tokenId;
    if (tokenId) {
      await sessionRepository.revokeByTokenId(tokenId);
    }
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to logout.' });
  }
});

app.post('/auth/refresh', async (req, res) => {
  try {
    const { refresh } = req.body;
    if (!refresh) {
      return res.status(400).json({ code: '400', message: 'Refresh token is required.' });
    }

    const session = await sessionRepository.findByRefreshToken(refresh);
    if (!session || session.revokedAt) {
      return res.status(401).json({ code: '401', message: 'Invalid refresh token.' });
    }

    const user = await userRepository.findById(session.userId.toString());
    if (!user) {
      return res.status(401).json({ code: '401', message: 'Invalid refresh token.' });
    }

    const token = createJwtToken(user, session.tokenId);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Refresh error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to refresh token.' });
  }
});

app.get('/auth/me', authorize, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const user = await userRepository.findById(userId);
    if (!user) return res.status(404).json({ code: '404', message: 'User not found.' });
    return res.status(200).json(serializeUser(user));
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to fetch user.' });
  }
});

app.get('/accounts', authorize, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const accounts = await accountRepository.findByUserId(userId);
    return res.status(200).json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to load accounts.' });
  }
});

app.get('/accounts/:id', authorize, async (req, res) => {
  try {
    const account = await accountRepository.findById(req.params.id);
    if (!account) return res.status(404).json({ code: '404', message: 'Account not found.' });
    if (account.userId.toString() !== (req as any).userId) {
      return res.status(403).json({ code: '403', message: 'Access denied.' });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error('Get account error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to load account.' });
  }
});

app.get('/accounts/:id/transactions', authorize, async (req, res) => {
  try {
    const account = await accountRepository.findById(req.params.id);
    if (!account) return res.status(404).json({ code: '404', message: 'Account not found.' });
    if (account.userId.toString() !== (req as any).userId) {
      return res.status(403).json({ code: '403', message: 'Access denied.' });
    }
    const transactions = await transactionRepository.findByAccountId(req.params.id);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to load transactions.' });
  }
});

app.post('/loans/apply', authorize, async (req, res) => {
  try {
    const { amount, termMonths, purpose } = req.body;
    const userId = (req as any).userId;
    const user = await userRepository.findById(userId);
    if (!user) return res.status(401).json({ code: '401', message: 'Invalid credentials.' });

    if (!amount || !termMonths || !purpose) {
      return res.status(400).json({ code: '400', message: 'Missing loan application fields.' });
    }

    const application = new LoanApplication({
      userId: user._id,
      applicationNumber: `LN-${Date.now()}`,
      amount: amount.toString ? amount.toString() : amount,
      termMonths,
      purpose,
      status: 'submitted',
      submittedAt: new Date(),
    });

    await application.save();
    return res.status(201).json(application);
  } catch (error) {
    console.error('Loan apply error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to submit loan application.' });
  }
});

app.get('/loans/:id', authorize, async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id).exec();
    if (!application) return res.status(404).json({ code: '404', message: 'Loan application not found.' });
    if (application.userId.toString() !== (req as any).userId) {
      return res.status(403).json({ code: '403', message: 'Access denied.' });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.error('Get loan status error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to load loan application.' });
  }
});

app.post('/mortgages/apply', authorize, async (req, res) => {
  try {
    const { propertyValue, downPayment, loanAmount, termYears, propertyType, propertyAddress } = req.body;
    const userId = (req as any).userId;
    const user = await userRepository.findById(userId);
    if (!user) return res.status(401).json({ code: '401', message: 'Invalid credentials.' });

    if (!propertyValue || !downPayment || !loanAmount || !termYears || !propertyType || !propertyAddress) {
      return res.status(400).json({ code: '400', message: 'Missing mortgage application fields.' });
    }

    const application = new MortgageApplication({
      userId: user._id,
      applicationNumber: `MT-${Date.now()}`,
      propertyValue: propertyValue.toString ? propertyValue.toString() : propertyValue,
      downPayment: downPayment.toString ? downPayment.toString() : downPayment,
      loanAmount: loanAmount.toString ? loanAmount.toString() : loanAmount,
      termYears,
      propertyType,
      propertyAddress,
      status: 'submitted',
      submittedAt: new Date(),
    });

    await application.save();
    return res.status(201).json(application);
  } catch (error) {
    console.error('Mortgage apply error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to submit mortgage application.' });
  }
});

app.get('/mortgages/:id', authorize, async (req, res) => {
  try {
    const application = await MortgageApplication.findById(req.params.id).exec();
    if (!application) return res.status(404).json({ code: '404', message: 'Mortgage application not found.' });
    if (application.userId.toString() !== (req as any).userId) {
      return res.status(403).json({ code: '403', message: 'Access denied.' });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.error('Get mortgage status error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to load mortgage application.' });
  }
});

app.post('/support/tickets', authorize, async (req, res) => {
  try {
    const { subject, message, category, priority } = req.body;
    const userId = (req as any).userId;
    if (!subject || !message || !category || !priority) {
      return res.status(400).json({ code: '400', message: 'Missing support ticket fields.' });
    }

    const ticket = new SupportTicket({
      userId,
      ticketNumber: `ST-${Date.now()}`,
      subject,
      message,
      category,
      priority,
      status: 'open',
    });

    await ticket.save();
    return res.status(201).json(ticket);
  } catch (error) {
    console.error('Support ticket error:', error);
    return res.status(500).json({ code: '500', message: 'Failed to create support ticket.' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  // Start HTTP server immediately
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Connect to database in background
  try {
    await initEncryptionPlugin();
    await connectDatabase();
  } catch (dbError) {
    console.error('Database connection failed (continuing anyway):', dbError);
  }
}

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

startServer();