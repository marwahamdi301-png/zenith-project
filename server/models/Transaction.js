// Transaction Model - PostgreSQL
const transactionSchema = {
  id: 'UUID PRIMARY KEY',
  user_id: 'UUID NOT NULL REFERENCES users(id)',
  
  // Type
  type: 'VARCHAR(20) NOT NULL', // buy|sell|transfer|stake|unstake|withdraw
  pair: 'VARCHAR(20) DEFAULT "ZENITH/PI"',
  
  // Amount & Price
  base_amount: 'DECIMAL(18,8) NOT NULL',
  quote_amount: 'DECIMAL(18,8) NOT NULL',
  price: 'DECIMAL(18,8) NOT NULL',
  
  // Fees
  fee_amount: 'DECIMAL(18,8) NOT NULL',
  fee_percentage: 'DECIMAL(5,4) NOT NULL',
  
  // Status & Tracking
  status: 'VARCHAR(20) DEFAULT "pending"', // pending|completed|failed|refunded
  tx_hash: 'VARCHAR(255)', // Blockchain hash
  order_id: 'VARCHAR(255) UNIQUE',
  
  // Timestamps
  created_at: 'TIMESTAMP DEFAULT NOW()',
  completed_at: 'TIMESTAMP',
  
  // Meta
  ip_address: 'VARCHAR(50)',
  user_agent: 'TEXT',
  error_message: 'TEXT'
}

module.exports = transactionSchema
