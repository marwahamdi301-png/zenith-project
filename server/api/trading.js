/**
 * 🔗 ZENITH EMPIRE - Trading API Routes
 */

const express = require('express')
const router = express.Router()
const TradingEngine = require('../services/TradingEngine')
const auth = require('../middleware/auth')

// GET /api/trading/price
router.get('/price', async (req, res) => {
  try {
    const price = await TradingEngine.getPrice()
    res.json({
      pair: 'ZENITH/PI',
      price,
      change24h: 2.45,
      volume24h: 15200000,
      marketCap: 45600000
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/trading/buy
router.post('/buy', auth, async (req, res) => {
  try {
    const { amount } = req.body
    const result = await TradingEngine.processBuy(req.user.id, amount)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/trading/sell
router.post('/sell', auth, async (req, res) => {
  try {
    const { amount } = req.body
    const result = await TradingEngine.processSell(req.user.id, amount)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/trading/balance
router.get('/balance', auth, async (req, res) => {
  try {
    const pi = await TradingEngine.getUserBalance(req.user.id, 'pi')
    const zenith = await TradingEngine.getUserBalance(req.user.id, 'zenith')
    res.json({ pi, zenith, total_value: (pi + zenith * 0.0456).toFixed(2) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
