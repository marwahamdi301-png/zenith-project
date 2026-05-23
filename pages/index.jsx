import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem('pi_user')
      router.push(user ? '/dashboard' : '/auth/pi-login')
    }, 2000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden">
      
      {/* Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative text-center">
        <div className="text-8xl mb-8 animate-bounce">⚔️</div>
        
        <h1 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ZENITH EMPIRE
          </span>
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          بناء الإمبراطورية من الصفر
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
        </div>

        <p className="text-gray-400">جاري التحميل...</p>
      </div>
    </div>
  )
}
