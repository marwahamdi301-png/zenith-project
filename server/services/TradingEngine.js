/**
 * 🚀 ZENITH EMPIRE - Real-time Trading Engine
 * معالج العمليات المالية الفورية
 */

const Redis = require('redis')
const redis = Redis.createClient()

class TradingEngine {
  constructor() {
    this.orderBook = new Map() // pair -> {bids: [], asks: []}
    this.trades = [] // آخر العمليات
    this.price = 0.0456
  }

  /**
   * معالجة طلب الشراء
   */
  async processBuy(userId, amount, pair = 'ZENITH/PI') {
    const timestamp = Date.now()
    const orderId = `order_${userId}_${timestamp}`
    
    // 1. التحقق من الرصيد
    const balance = await this.getUserBalance(userId, 'pi')
    const totalCost = amount * this.price * 1.005 // 0.5% fee
    
    if (balance < totalCost) {
      return { success: false, error: 'Insufficient balance' }
    }
    
    // 2. حجز الرصيد (Lock)
    await this.lockBalance(userId, 'pi', totalCost)
    
    // 3. معالجة الطلب
    const trade = {
      orderId,
      userId,
      type: 'buy',
      amount,
      price: this.price,
      fee: totalCost - (amount * this.price),
      total: totalCost,
      status: 'pending',
      timestamp
    }
    
    // 4. إضافة إلى Redis PubSub
    await redis.publish('trading:orders', JSON.stringify(trade))
    
    // 5. محاكاة المعالجة الفورية
    setTimeout(() => this.completeTrade(trade), 100)
    
    return { success: true, orderId, ...trade }
  }

  /**
   * معالجة طلب البيع
   */
  async processSell(userId, amount, pair = 'ZENITH/PI') {
    const timestamp = Date.now()
    const orderId = `order_${userId}_${timestamp}`
    
    // 1. التحقق من الرصيد
    const balance = await this.getUserBalance(userId, 'zenith')
    if (balance < amount) {
      return { success: false, error: 'Insufficient ZENITH balance' }
    }
    
    // 2. حجز الرصيد
    await this.lockBalance(userId, 'zenith', amount)
    
    // 3. حساب العائد
    const received = amount * this.price * 0.995 // بعد الرسوم
    const fee = amount * this.price * 0.005
    
    // 4. معالجة الطلب
    const trade = {
      orderId,
      userId,
      type: 'sell',
      amount,
      price: this.price,
      fee,
      received,
      status: 'pending',
      timestamp
    }
    
    await redis.publish('trading:orders', JSON.stringify(trade))
    setTimeout(() => this.completeTrade(trade), 100)
    
    return { success: true, orderId, ...trade }
  }

  /**
   * إكمال العملية
   */
  async completeTrade(trade) {
    // 1. تحديث الأرصدة
    if (trade.type === 'buy') {
      await this.updateBalance(trade.userId, 'pi', -trade.total)
      await this.updateBalance(trade.userId, 'zenith', +trade.amount)
    } else {
      await this.updateBalance(trade.userId, 'zenith', -trade.amount)
      await this.updateBalance(trade.userId, 'pi', +trade.received)
    }
    
    // 2. تسجيل الرسوم
    await this.recordFee(trade.userId, trade.fee)
    
    // 3. نشر التحديث
    await redis.publish('trading:completed', JSON.stringify(trade))
    
    // 4. تحديث السعر (محاكاة)
    this.price += (Math.random() - 0.5) * 0.0001
    await redis.set('zenith:price', this.price)
  }

  /**
   * احصل على سعر ZENITH الحالي
   */
  async getPrice() {
    const cached = await redis.get('zenith:price')
    return cached ? parseFloat(cached) : this.price
  }

  /**
   * احصل على رصيد المستخدم
   */
  async getUserBalance(userId, asset) {
    const balance = await redis.get(`balance:${userId}:${asset}`)
    return balance ? parseFloat(balance) : 0
  }

  /**
   * قفل الرصيد (لمنع العمليات المتزامنة)
   */
  async lockBalance(userId, asset, amount) {
    await redis.incrby(`locked:${userId}:${asset}`, amount)
  }

  /**
   * تحديث الرصيد
   */
  async updateBalance(userId, asset, amount) {
    await redis.incrbyfloat(`balance:${userId}:${asset}`, amount)
  }

  /**
   * تسجيل الرسوم
   */
  async recordFee(userId, amount) {
    const timestamp = new Date().toISOString()
    await redis.lpush(`fees:history`, JSON.stringify({ userId, amount, timestamp }))
  }
}

module.exports = new TradingEngine()
