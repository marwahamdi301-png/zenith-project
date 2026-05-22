import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // تحقق من تسجيل الدخول
    const userData = localStorage.getItem('pi_user')
    if (!userData) {
      // في التطوير، أنشئ مستخدم وهمي
      const mockUser = {
        uid: 'user_test_12345',
        username: 'zenith_trader'
      }
      localStorage.setItem('pi_user', JSON.stringify(mockUser))
      setUser(mockUser)
    } else {
      setUser(JSON.parse(userData))
    }

    // محفظة Zenith
    setWallet({
      address: 'GCMRPF2KNTNFSNB7LIX6KDWKLVGMGNZT2ACHCMF2R3OX5YZFSQPYTEP6',
      balance: 1000000,
      zenith: 50000,
      piBalance: 45.27,
      piAvailable: 0.01,
      profitLoss: 2450,
      percentChange: 24.5
    })

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ⚔️ ZENITH EMPIRE
            </h1>
            <p className="text-gray-400 mt-2">Welcome, {user?.username}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Current Price</p>
            <p className="text-3xl font-bold text-cyan-400">$0.0439</p>
            <p className="text-green-400 text-sm">↑ 2.45% (24h)</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { name: 'DASHBOARD', icon: '📊' },
            { name: 'TRADING', icon: '📈' },
            { name: 'CONTRACTS', icon: '⚙️' },
            { name: 'WHALES', icon: '🐋' },
            { name: 'LEARN', icon: '📚' }
          ].map((tab) => (
            <button
              key={tab.name}
              className="px-4 py-2 border-2 border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-colors whitespace-nowrap font-bold"
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Wallet Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '💎', label: 'ZENITH Balance', value: wallet?.balance?.toLocaleString() },
              { icon: '📈', label: 'Holding', value: wallet?.zenith?.toLocaleString() },
              { icon: '💰', label: 'Profit', value: `$${wallet?.profitLoss.toFixed(2)}` },
              { icon: '📊', label: 'ROI', value: `${wallet?.percentChange.toFixed(1)}%` }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 border-2 border-yellow-500/50 rounded-lg p-4 hover:border-yellow-500 transition-colors">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                <p className="font-bold text-cyan-400">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Price Chart */}
          <div className="bg-slate-800/50 border-2 border-yellow-500/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">📈 Price Chart</h2>
            <div className="h-64 flex items-end justify-around gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: `${Math.sin(i / 3) * 40 + 50}%`
                  }}
                  className="w-2 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t hover:from-cyan-400 hover:to-cyan-300 transition-colors"
                />
              ))}
            </div>
            <p className="mt-4 text-center text-cyan-400 font-bold text-2xl">$0.0439</p>
          </div>

          {/* Whale Tracker */}
          <div className="bg-slate-800/50 border-2 border-yellow-500/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">🐋 Whale Tracker (LIVE)</h2>
            <div className="space-y-3">
              {[
                { wallet: 'GC2R...7XK9', amount: '947M', action: 'BUY' },
                { wallet: 'GB5X...WHNPC', amount: '433M', action: 'SELL' },
                { wallet: 'GD4M...3KL2', amount: '250M', action: 'BUY' }
              ].map((whale, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="text-cyan-400 font-mono">{whale.wallet}</span>
                  <span className="text-yellow-400 font-bold">{whale.amount}</span>
                  <span className={`font-bold ${whale.action === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {whale.action === 'BUY' ? '📈 BUY' : '📉 SELL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Wallet & Actions */}
        <div className="space-y-6">
          
          {/* Pi Wallet */}
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-300 mb-4">🔑 Pi Network Wallet</h3>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <p className="text-gray-500 text-xs mb-2">Address</p>
              <p className="text-cyan-400 font-mono text-sm break-all">{wallet?.address}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Pi Balance</p>
                <p className="text-3xl font-bold text-purple-300">{wallet?.piBalance} Pi</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Available to Trade</p>
                <p className="text-xl font-bold text-green-400">{wallet?.piAvailable} Pi</p>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors">
              🔄 Connect Pi Wallet
            </button>
          </div>

          {/* ZENITH Wallet */}
          <div className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border-2 border-cyan-500 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">💎 ZENITH Wallet</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total ZENITH</p>
                <p className="text-3xl font-bold text-cyan-400">{wallet?.zenith?.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>📈</span>
                <span>BUY ZENITH</span>
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>📉</span>
                <span>SELL ZENITH</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800/50 border-2 border-yellow-500/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Value</span>
                <span className="text-cyan-400 font-bold">$45,270</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Invested</span>
                <span className="text-cyan-400 font-bold">$42,820</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profit/Loss</span>
                <span className="text-green-400 font-bold">+$2,450</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-gray-400">ROI</span>
                <span className="text-green-400 font-bold">+24.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
