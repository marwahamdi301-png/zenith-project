// User Model - PostgreSQL
const userSchema = {
  id: 'UUID PRIMARY KEY',
  pi_uid: 'VARCHAR(255) UNIQUE NOT NULL',
  username: 'VARCHAR(255) UNIQUE NOT NULL',
  email: 'VARCHAR(255) UNIQUE',
  
  // Wallets
  pi_wallet: 'DECIMAL(18,8) DEFAULT 0',
  pi_wallet_locked: 'DECIMAL(18,8) DEFAULT 0',
  zenith_wallet: 'DECIMAL(18,8) DEFAULT 0',
  zenith_wallet_locked: 'DECIMAL(18,8) DEFAULT 0',
  
  // Security
  password_hash: 'VARCHAR(255)',
  two_fa_enabled: 'BOOLEAN DEFAULT false',
  two_fa_secret: 'VARCHAR(255)',
  
  // KYC
  kyc_level: 'INTEGER DEFAULT 1',
  kyc_verified: 'BOOLEAN DEFAULT false',
  
  // Referral
  referral_code: 'VARCHAR(255) UNIQUE',
  referred_by: 'UUID REFERENCES users(id)',
  referral_earnings: 'DECIMAL(18,8) DEFAULT 0',
  
  // Meta
  last_login: 'TIMESTAMP',
  created_at: 'TIMESTAMP DEFAULT NOW()',
  updated_at: 'TIMESTAMP DEFAULT NOW()',
  status: 'VARCHAR(20) DEFAULT "active"' // active|suspended|banned
}

module.exports = userSchema
