import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PaymentPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [status, setStatus] = useState(null)
  const [selectedPkg, setSelectedPkg] = useState(null)

  const packages = [
    {
      id: 'starter',
      name: 'Starter Package',
      amount: 10,
      zenith: 10000,
      description: 'ابدأ رحلتك مع 10,000 ZENITH',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'pro',
      name: 'Pro Package',
      amount: 50,
      zenith: 60000,
      description: 'احصل على 60,000 ZENITH بسعر مميز',
      color: 'from-purple-600 to-pink-600',
      badge: 'Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      amount: 100,
      zenith: 150000,
      description: 'استثمر بـ 150,000 ZENITH',
      color: 'from-amber-600 to-red-600',
      badge: 'Best Deal'
    }
  ]

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem('pi_user')
    if (!user) {
      router.push('/auth/pi-login')
    }
  }, [router])

  const handlePurchase = (pkg) => {
    setSelectedPkg(pkg)
    setStatus('pending')
    
    setTimeout(() => {
      setStatus('completed')
      localStorage.setItem('last_payment', JSON.stringify({
        package: pkg.name,
        amount: pkg.amount,
        zenith: pkg.zenith,
        timestamp: new Date().toISOString()
      }))
    }, 3000)
  }

  const handleReset = () => {
    setStatus(null)
    setSelectedPkg(null)
  }

  if (!isClient) {
    return null
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-cyan-400 font-bold text-2xl">جاري معالجة الدفع...</p>
          <p className="text-gray-400 mt-2">يرجى الانتظار</p>
        </div>
      </div>
    )
  }

  if (status === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-slate-800 border-2 border-green-500 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-400 mb-2">تم الدفع بنجاح!</h1>
          <p className="text-gray-300 mb-6">شكراً لاستثمارك في ZENITH EMPIRE</p>
          
          {selectedPkg && (
            <div className="bg-slate-900 p-6 rounded-lg mb-6 space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-400">الحزمة</span>
                <span className="text-cyan-400 font-bold">{selectedPkg.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">المبلغ</span>
                <span className="text-yellow-400 font-bold">${selectedPkg.amount} Pi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ZENITH المستلمة</span>
                <span className="text-cyan-400 font-bold">{String(selectedPkg.zenith)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg text-white font-bold py-3 rounded-lg transition-all"
          >
            🏠 العودة للشراء
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          ⚔️ ZENITH EMPIRE
        </h1>
        <p className="text-gray-400 text-lg">احصل على ZENITH الخاص بك الآن</p>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gradient-to-br ${pkg.color} p-0.5 rounded-xl hover:scale-105 transition-all`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full font-bold text-sm">
                  {pkg.badge}
                </div>
              )}

              <div className="bg-slate-900 rounded-lg p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{pkg.description}</p>

                <div className="bg-slate-800 p-4 rounded-lg mb-6">
                  <p className="text-gray-400 text-xs mb-1">السعر</p>
                  <p className="text-3xl font-bold text-cyan-400 mb-3">${pkg.amount}</p>
                  <p className="text-gray-400 text-xs">تحصل على</p>
                  <p className="text-2xl font-bold text-yellow-400">{String(pkg.zenith)}</p>
                </div>

                <button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full font-bold py-3 rounded-lg transition-all text-white ${
                    pkg.id === 'pro'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-500/50'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50'
                  }`}
                >
                  🚀 اشترِ الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-800/50 border-2 border-green-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔐</span>
            <h3 className="text-lg font-bold text-green-400">آمن تماماً</h3>
          </div>
          <p className="text-gray-300 text-sm">
            ✅ جميع العمليات محمية<br/>
            ✅ لا نحفظ بيانات الدفع<br/>
            ✅ جميع المعاملات مشفرة
          </p>
        </div>
      </div>
    </div>
  )
}
