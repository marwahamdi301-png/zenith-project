/**
 * 💼 Wallet Manager - إدارة المحافظ الحقيقية
 */

import StellarSDK from 'stellar-sdk'

const server = new StellarSDK.Server('https://horizon.stellar.org')
const networkPassphrase = StellarSDK.Networks.PUBLIC_NETWORK

export const walletManager = {
  // 🔑 الحساب الرئيسي (محفظتك)
  appPublicKey: process.env.STELLAR_MAINNET_PUBLIC,
  appSecretKey: process.env.STELLAR_MAINNET_SECRET,

  /**
   * ✅ تحويل ZENITH للمستخدم بعد الدفع
   */
  async sendZenithToUser(userWalletAddress, zenithAmount) {
    try {
      console.log(`💰 Sending ${zenithAmount} ZENITH to ${userWalletAddress}`)

      // احصل على حساب التطبيق
      const sourceAccount = await server.loadAccount(this.appPublicKey)

      // أنشئ عملية التحويل
      const transaction = new StellarSDK.TransactionBuilder(sourceAccount, {
        fee: StellarSDK.BASE_FEE,
        networkPassphrase
      })
        .addOperation(
          StellarSDK.Operation.payment({
            destination: userWalletAddress,
            asset: new StellarSDK.Asset('ZENITH', this.appPublicKey),
            amount: (zenithAmount / 10000000).toString() // تحويل من وحدات أصغر
          })
        )
        .setDefaultTimeout(30)
        .build()

      // وقّع العملية
      transaction.sign(
        StellarSDK.Keypair.fromSecret(this.appSecretKey)
      )

      // أرسل العملية للـ Blockchain
      const result = await server.submitTransaction(transaction)

      console.log('✅ ZENITH sent successfully:', result.hash)
      return result
    } catch (error) {
      console.error('❌ Error sending ZENITH:', error)
      throw error
    }
  },

  /**
   * 📊 تحقق من رصيد المحفظة
   */
  async checkBalance(walletAddress) {
    try {
      const account = await server.loadAccount(walletAddress)
      const balances = account.balances

      console.log(`💰 Balances for ${walletAddress}:`, balances)
      return balances
    } catch (error) {
      console.error('❌ Error checking balance:', error)
      throw error
    }
  },

  /**
   * 🔍 تتبع عملية
   */
  async trackTransaction(transactionHash) {
    try {
      const transaction = await server.transactions().transaction(transactionHash).call()
      console.log('📍 Transaction details:', transaction)
      return transaction
    } catch (error) {
      console.error('❌ Error tracking transaction:', error)
      throw error
    }
  }
}
