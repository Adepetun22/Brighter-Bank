# MongoDB Backend Database Structure Plan

## Overview
Design a secure MongoDB database structure for Brighter Bank, a digital-first banking application. This plan covers schema design, security measures, and implementation requirements.

## Context
- Frontend: React/Vite with TypeScript
- Existing types: User, Account, Transaction, LoanApplication
- Security focus: Financial data protection, compliance with banking standards

## Collections Schema

### 1. users
```javascript
{
  _id: ObjectId,
  email: String,           // unique, indexed
  passwordHash: String,    // bcrypt/argon2
  firstName: String,
  lastName: String,
  phone: String,           // encrypted
  dateOfBirth: Date,       // encrypted
  address: {              // encrypted
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  identity: {             // KYC data, encrypted
    ssnLast4: String,
    verificationStatus: String,
    documents: [{
      type: String,
      url: String,
      verifiedAt: Date
    }]
  },
  roles: [String],        // ['customer'], ['admin']
  security: {
    failedLoginAttempts: Number,
    lockedUntil: Date,
    passwordChangedAt: Date,
    twoFactorEnabled: Boolean,
    securityQuestions: [{
      question: String,
      answerHash: String
    }]
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  isActive: Boolean
}
```

### 2. accounts
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  accountNumber: String,   // encrypted
  maskedNumber: String,    // Last 4 digits only
  accountType: String,     // checking, savings, loan, mortgage
  balance: Decimal128,
  currency: String,
  status: String,          // active, frozen, closed, dormant
  interestRate: Decimal128,
  overdraftLimit: Decimal128,
  limits: {
    dailyWithdrawal: Decimal128,
    dailyTransfer: Decimal128,
    monthlyTransactionCount: Number
  },
  createdAt: Date,
  updatedAt: Date,
  closedAt: Date
}
```

### 3. transactions
```javascript
{
  _id: ObjectId,
  accountId: ObjectId,
  transactionId: String,   // encrypted external reference
  timestamp: Date,
  description: String,
  amount: Decimal128,
  type: String,           // credit, debit, transfer
  status: String,         // pending, completed, failed, reversed
  category: String,
  merchant: String,         // encrypted
  balanceAfter: Decimal128,
  metadata: {
    ipAddress: String,      // encrypted - fraud detection
    location: Object
  },
  createdAt: Date
}
```

### 4. sessions
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  tokenId: String,        // JWT jti claim
  refreshToken: String,   // hashed
  userAgent: String,      // encrypted
  ipAddress: String,      // encrypted
  expiresAt: Date,
  createdAt: Date,
  lastAccessedAt: Date,
  revokedAt: Date
}
```

### 5. loan_applications
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  applicationNumber: String,
  amount: Decimal128,
  termMonths: Number,
  purpose: String,
  status: String,         // draft, submitted, approved, rejected
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: ObjectId,
  decisionReason: String,
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],
  riskAssessment: {
    score: Number,
    factors: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 6. cards
```javascript
{
  _id: ObjectId,
  accountId: ObjectId,
  cardNumber: String,     // encrypted
  maskedNumber: String,
  expiryDate: String,     // encrypted
  cardType: String,
  status: String,         // active, frozen, expired, reported
  security: {
    dailyLimit: Decimal128,
    atmLimit: Decimal128,
    onlineLimit: Decimal128,
    contactlessLimit: Decimal128
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 7. audit_logs
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  action: String,
  resourceType: String,
  resourceId: String,
  ipAddress: String,      // encrypted
  userAgent: String,
  success: Boolean,
  failureReason: String,
  metadata: Object,
  timestamp: Date
}
```

### 8. mortgage_applications
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  applicationNumber: String,
  propertyValue: Decimal128,
  downPayment: Decimal128,
  loanAmount: Decimal128,
  termYears: Number,
  propertyType: String,    // single-family, condo, townhouse
  propertyAddress: {      // encrypted
    street: String,
    city: String,
    state: String,
    zip: String
  },
  status: String,          // draft, submitted, under-review, approved, rejected
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: ObjectId,
  interestRate: Decimal128,
  monthlyPayment: Decimal128,
  decisionReason: String,
  documents: [{
    type: String,          // paystub, bank-statement, tax-return, appraisal
    url: String,
    uploadedAt: Date
  }],
  riskAssessment: {
    score: Number,
    factors: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 9. support_tickets
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  ticketNumber: String,    // unique reference
  subject: String,
  category: String,       // account, technical, security, payment, other
  priority: String,       // low, medium, high, urgent
  status: String,         // open, in-progress, resolved, closed
  message: String,
  response: String,
  assignedTo: ObjectId,    // admin user
  resolvedAt: Date,
  closedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 10. branches
```javascript
{
  _id: ObjectId,
  branchId: String,       // unique identifier
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  hours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    // ... other days
  },
  services: [String],       // atm, teller, advisor, loan-officer
  phone: String,
  isActive: Boolean
}
```

### 11. statements
```javascript
{
  _id: ObjectId,
  accountId: ObjectId,
  statementId: String,     // unique reference
  period: {
    startDate: Date,
    endDate: Date
  },
  openingBalance: Decimal128,
  closingBalance: Decimal128,
  totalDeposits: Decimal128,
  totalWithdrawals: Decimal128,
  url: String,             // encrypted/secure storage reference
  generatedAt: Date,
  createdAt: Date
}
```

## Security Configuration

### Environment Variables (.env.production)
```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://cluster.mongodb.net/brighterbank?retryWrites=true&w=majority&tls=true
FIELD_ENCRYPTION_KEY_PATH=/run/secrets/mongodb-field-key

# JWT Configuration
JWT_SECRET=                    # 256+ bits minimum
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Security Settings
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=30m
SESSION_TIMEOUT=15m
AUDIT_LOG_RETENTION_DAYS=365

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS & Security Headers
ALLOWED_ORIGINS=https://brighterbankplc.com

# Feature Flags
FEATURE_MERCHANT_SERVICES=false
```

### .env.example (Frontend/Backend Combined)
```bash
# Base URL for the backend API
VITE_API_BASE_URL=https://api.brighterbankplc.com

# Public-facing app URL
VITE_APP_URL=https://brighterbankplc.com

# Feature flags
VITE_FEATURE_MERCHANT_SERVICES=false

# Backend-only (not prefixed with VITE_)
MONGODB_URI=
JWT_SECRET=
FIELD_ENCRYPTION_KEY_PATH=
```

### MongoDB Atlas Security Settings
- Enable MongoDB Atlas with TLS 1.3
- Configure IP Whitelist for application servers
- Enable database auditing and CloudTrail logs
- Use encryption at rest (default in Atlas)
- Enable field-level encryption for sensitive fields

### Field-Level Encryption Required
- SSN, account numbers, card numbers
- Phone numbers, addresses
- IP addresses in audit logs
- User agent strings

## Indexes Strategy
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ "security.failedLoginAttempts": 1, lockedUntil: 1 })

db.accounts.createIndex({ userId: 1 })
db.accounts.createIndex({ accountNumber: 1 }, { unique: true })
db.accounts.createIndex({ maskedNumber: 1 })

db.transactions.createIndex({ accountId: 1, timestamp: -1 })
db.transactions.createIndex({ timestamp: 1 })
db.transactions.createIndex({ status: 1 })

db.sessions.createIndex({ tokenId: 1 }, { unique: true })
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL

db.loan_applications.createIndex({ userId: 1 })
db.loan_applications.createIndex({ status: 1 })

db.mortgage_applications.createIndex({ userId: 1 })
db.mortgage_applications.createIndex({ status: 1 })

db.support_tickets.createIndex({ userId: 1 })
db.support_tickets.createIndex({ status: 1 })
db.support_tickets.createIndex({ ticketNumber: 1 }, { unique: true })

db.branches.createIndex({ branchId: 1 }, { unique: true })
db.branches.createIndex({ "coordinates.lat": 1, "coordinates.lng": 1 })
```

## Implementation Tasks

1. **Setup MongoDB Atlas Cluster**
   - Create cluster with TLS 1.3
   - Configure IP whitelist
   - Enable auditing

2. **Create database initialization scripts**
   - `scripts/db-init.ts` - Create collections with validation rules
   - `scripts/encryption-key.ts` - Field encryption key management

3. **Create Mongoose models**
   - `src/models/User.ts`
   - `src/models/Account.ts`
   - `src/models/Transaction.ts`
   - `src/models/Session.ts`
   - `src/models/LoanApplication.ts`
   - `src/models/MortgageApplication.ts`
   - `src/models/Card.ts`
   - `src/models/AuditLog.ts`
   - `src/models/SupportTicket.ts`
   - `src/models/Branch.ts`
   - `src/models/Statement.ts`

4. **Create repository layer**
   - `src/repositories/UserRepository.ts`
   - `src/repositories/AccountRepository.ts`
   - `src/repositories/TransactionRepository.ts`
   - `src/repositories/SessionRepository.ts`
   - `src/repositories/LoanRepository.ts`
   - `src/repositories/MortgageRepository.ts`
   - `src/repositories/CardRepository.ts`
   - `src/repositories/SupportRepository.ts`

5. **Update .gitignore**
   - Add `.env*`
   - Add `secrets/`
   - Add `*.pem` files

6. **Create .env.example** (already exists - extend it)

7. **Create secrets management structure**
   - `secrets/mongodb-field.key` - Local development only (never committed)
   - Production: Use AWS Secrets Manager / Azure Key Vault / HashiCorp Vault

## Secrets Management

### Development (.env.local - NEVER committed)
```bash
# Use .env.local for local development
# Copy from .env.example and fill with values
cp .env.example .env.local
```

### Production Secrets Strategy
- **MongoDB Atlas**: Use connection string with IAM authentication when possible
- **Field Encryption Key**: 
  - Generate 96-byte base64 key: `openssl rand -base64 96 > secrets/mongodb-field.key`
  - Store in secrets manager, not filesystem
- **JWT Secret**: 32+ random bytes, rotated quarterly
- **API Keys**: Use vault with automatic rotation

### .gitignore Additions
```
.env*
!.env.example
secrets/
*.pem
*.key
*.cert
*.p12
*.pfx
```

## Validation Steps

1. Verify MongoDB connection with TLS
2. Test field encryption/decryption
3. Verify all indexes are created
4. Test session TTL expiration
5. Verify audit logging on all sensitive operations
6. Run security scan on connection strings and env vars
7. Validate Decimal128 precision for financial calculations
8. Test MongoDB Realm/App Services integration (if used)
9. Verify PCI-DSS compliance for card data storage
10. Test backup/restore procedures

## MongoDB Atlas Secrets Configuration

### Finding MONGODB_URI in MongoDB Cloud
1. Go to https://cloud.mongodb.com → Your project (`69865d9a524912a87df7e795`)
2. Click **Connect** → **Connect your application**
3. Select **Node.js** driver
4. Copy the connection string:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/brighterbank?retryWrites=true&w=majority
```

### Generating JWT_SECRET (PowerShell)
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```
Example output: `aB3dE9fGhK2mN5pQrStUvWxYz7W8eF1gH2`

### Generating MONGODB_FIELD_ENCRYPTION_KEY (PowerShell)
```powershell
[Convert]::ToBase64String((1..96 | ForEach-Object { Get-Random -Maximum 256 }))
```
Output: 96-byte base64 string (required for field-level encryption)

## Vercel Monorepo Deployment

### Root vercel.json (Monorepo Configuration)
Configured for frontend + backend routing. API routes proxy to backend service.

### Backend vercel.json
Configured for Node.js serverless deployment.

### Vercel Environment Variables (Backend Service)
Set these in Vercel dashboard → Settings → Environment Variables:
- `MONGODB_URI` - MongoDB Atlas connection string
- `MONGODB_FIELD_ENCRYPTION_KEY` - 96-byte base64 key
- `JWT_SECRET` - 32+ random bytes
- `MONGODB_ENCRYPTION_SALT` - Optional salt string

## Risks & Considerations

- **PII Compliance**: Ensure all personal data is encrypted at rest and in transit
- **Audit Trail**: Maintain 365-day retention as per banking requirements
- **Concurrent Access**: Use MongoDB transactions for balance updates
- **Rate Limiting**: Prevent brute force on authentication endpoints
- **Session Management**: Implement automatic cleanup via TTL indexes
- **PCI-DSS**: Never log or expose full card numbers
- **Decimal Precision**: All monetary values use Decimal128 to avoid floating-point errors
- **Backup Security**: Encrypted backups, tested restore procedures quarterly