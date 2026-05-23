import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PiLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkUser = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('pi_user')
        if (user) {
          router.push('/dashboard')
        }
      }
    }
    checkUser()
  }, [router])

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const user = {
        uid: 'user_' + Math.random().toString(36).substr(2, 9),
        username: 'zenith_trader_' + Math.random().toString(36).substr(2, 5)
      }

      localStorage.setItem('pi_user', JSON.stringify(user))
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚔️</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ZENITH EMPIRE
            </h1>
            <p className="text-gray-400 mt-2">Trading Platform</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">❌ {error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all text-lg flex items-center justify-center gap-3 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Connecting...
              </>
            ) : (
              <>
                <span>🔑</span>
                Sign In with Pi Network
              </>
            )}
          </button>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-gray-300 text-sm">Secure Authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-gray-300 text-sm">Real-time Trading</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-gray-300 text-sm">Military Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
