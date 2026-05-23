// ZENITH EMPIRE - Server Configuration
module.exports = {
  // API
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  
  // Redis
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: '7d',
  
  // Pi Network
  PI_API_KEY: process.env.PI_API_KEY,
  PI_MAINNET: true,
  
  // Trading Engine
  TRADING: {
    MAKER_FEE: 0.001, // 0.1%
    TAKER_FEE: 0.005, // 0.5%
    PROTOCOL_CUT: 0.10, // 10% من الرسوم
    MIN_ORDER: 1,
    MAX_ORDER: 1000000
  },
  
  // Security
  RATE_LIMIT: {
    WINDOW: 15 * 60 * 1000, // 15 دقيقة
    MAX_REQUESTS: 100
  }
}
