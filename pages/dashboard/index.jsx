import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const userData = localStorage.getItem('pi_user')
    if (!userData) {
      router.push('/auth/pi-login')
      return
    }

    setUser(JSON.parse(userData))
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
      
      <header className="mb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ⚔️ ZENITH EMPIRE
            </h1>
            <p className="text-gray-400 mt-2">Welcome, {user?.username}</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('pi_user')
              router.push('/auth/pi-login')
            }}
            className="bg-red-600/20 border border-red-500/50 hover:bg-red-600/40 px-6 py-2 rounded-lg text-sm font-bold text-red-400 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: '💎', label: 'Balance', value: '1,000,000 ZENITH' },
          { icon: '📈', label: 'Price', value: '$0.0456' },
          { icon: '📊', label: 'Volume', value: '$15.2M' },
          { icon: '💰', label: 'Profit', value: '+$2,450 (24.5%)' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
            <p className="text-4xl mb-3">{stat.icon}</p>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">📈 ZENITH/USD Chart</h2>
          <div className="h-64 flex items-end justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: `${Math.random() * 100 + 20}%`,
                  width: '4%'
                }}
                className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/payment')}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-500/50 text-white font-bold py-6 rounded-xl transition-all active:scale-95"
          >
            <p className="text-3xl mb-2">📈</p>
            <p className="text-lg">BUY ZENITH</p>
          </button>

          <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-lg hover:shadow-red-500/50 text-white font-bold py-6 rounded-xl transition-all active:scale-95">
            <p className="text-3xl mb-2">📉</p>
            <p className="text-lg">SELL ZENITH</p>
          </button>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Pi Wallet</p>
            <p className="text-3xl font-bold text-purple-300">45.27 Pi</p>
          </div>
        </div>
      </div>
    </div>
  )
}
