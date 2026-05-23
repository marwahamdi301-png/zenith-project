// pages/api/payments/approve.js
/**
 * 🔐 Approve Payment - مصادقة العملية من الخادم
 * هذا الـ Endpoint يُستدعى عندما تكون العملية جاهزة للموافقة
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { paymentId, userId, amount, packageId } = req.body

    // 1️⃣ التحقق من البيانات
    if (!paymentId || !userId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    console.log(`💳 Approving payment: ${paymentId} for user: ${userId}`)

    // 2️⃣ التحقق من الملف الشخصي (في الإنتاج، تحقق من قاعدة البيانات)
    if (amount < 10 || amount > 1000) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    // 3️⃣ تسجيل العملية في قاعدة البيانات (في الإنتاج)
    // await db.payments.create({
    //   paymentId,
    //   userId,
    //   amount,
    //   packageId,
    //   status: 'approved',
    //   createdAt: new Date()
    // })

    // 4️⃣ الرد بالنجاح
    return res.status(200).json({
      success: true,
      message: 'Payment approved successfully',
      paymentId,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Approval error:', error)
    return res.status(500).json({
      error: 'Payment approval failed',
      message: error.message
    })
  }
}
