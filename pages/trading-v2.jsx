import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function AdvancedTradingPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [price, setPrice] = useState(0.0456)
  const [balance, setBalance] = useState({ pi: 0, zenith: 0 })
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('trade')
  const ws = useRef(null)

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem('pi_user')
    if (!user) router.push('/auth/pi-login')

    // WebSocket للبيانات الحية
    // ws.current = new WebSocket('ws://localhost:5000/trading')
    // ws.current.onmessage = (e) => {
    //   const data = JSON.parse(e.data)
    //   if (data.type === 'price') setPrice(data.price)
    //   if (data.type === 'order') setOrders([data, ...orders])
    // }
  }, [router])

  const handleBuy = async (amount) => {
    try {
      const response = await fetch('/api/trading/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
      const data = await response.json()
      if (data.success) {
        setOrders([data, ...orders])
        alert('✅ شراء ناجح!')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Header */}
      <header className="border-b border-cyan-500/20 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            ⚔️ ZENITH TRADING ENGINE
          </h1>
          <p className="text-gray-400">Professional Trading Platform on Pi Network</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        
        {/* Price Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Current Price</p>
            <p className="text-4xl font-bold text-cyan-400">${price.toFixed(4)}</p>
            <p className="text-green-400 text-sm mt-2">↑ 2.45% (24h)</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">24h Volume</p>
            <p className="text-3xl font-bold text-purple-400">$15.2M</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-2 border-yellow-500 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Market Cap</p>
            <p className="text-3xl font-bold text-yellow-400">$45.6M</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Your Balance</p>
            <p className="text-3xl font-bold text-green-400">{balance.zenith.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">ZENITH</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700 pb-4">
          {['trade', 'staking', 'portfolio', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-cyan-600 text-white border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'trade' && '📈 Trading'}
              {tab === 'staking' && '💰 Staking'}
              {tab === 'portfolio' && '📊 Portfolio'}
              {tab === 'orders' && '📜 Orders'}
            </button>
          ))}
        </div>

        {/* Trading Section */}
        {activeTab === 'trade' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Order Books */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Chart Placeholder */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">ZENITH/PI Chart</h3>
                <div className="h-96 bg-gradient-to-b from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Advanced Chart coming soon]</p>
                </div>
              </div>

              {/* Trading Forms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Buy Form */}
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">✅ BUY</h3>
                  <input
                    type="number"
                    placeholder="Amount (ZENITH)"
                    id="buyAmount"
                    className="w-full bg-slate-900 border-2 border-green-500 rounded-lg px-4 py-3 text-white mb-4 outline-none"
                  />
                  <button
                    onClick={() => {
                      const amount = document.getElementById('buyAmount').value
                      handleBuy(parseFloat(amount))
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    🚀 BUY NOW
                  </button>
                </div>

                {/* Sell Form */}
                <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border-2 border-red-500 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">❌ SELL</h3>
                  <input
                    type="number"
                    placeholder="Amount (ZENITH)"
                    className="w-full bg-slate-900 border-2 border-red-500 rounded-lg px-4 py-3 text-white mb-4 outline-none"
                  />
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all">
                    💰 SELL NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Info */}
            <div className="space-y-6">
              
              {/* Trading Fees */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Trading Fees</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Maker Fee</span>
                    <span className="text-cyan-400">0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taker Fee</span>
                    <span className="text-cyan-400">0.5%</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                    <span className="text-gray-400">Average Fee</span>
                    <span className="text-green-400">0.3%</span>
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">📜 Recent Trades</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orders.slice(0, 5).map((order, i) => (
                    <div key={i} className="flex justify-between p-2 bg-slate-900 rounded hover:bg-slate-900/80">
                      <span className={order.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                        {order.type === 'buy' ? '📈' : '📉'} {order.amount}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(order.timestamp).toLocaleTimeString('ar-SA')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staking Section */}
        {activeTab === 'staking' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[30, 90, 180, 365].map((days, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">{days}D</h3>
                <p className="text-4xl font-bold text-pink-400 mb-4">{30 + days / 10}%</p>
                <p className="text-gray-400 text-sm mb-4">Annual Yield</p>
                <input type="number" placeholder="Amount" className="w-full bg-slate-900 border-2 border-purple-500 rounded-lg px-4 py-2 text-white mb-3 outline-none" />
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg">STAKE</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
