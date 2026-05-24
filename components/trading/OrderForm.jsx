import React from 'react';

export default function OrderForm({ type }) {
  
  const handlePiPayment = async (amount) => {
    try {
      // التأكد من وجود نافذة Pi
      if (!window.Pi) {
        alert("يرجى فتح هذا التطبيق عبر متصفح Pi");
        return;
      }

      await window.Pi.createPayment({
        amount: amount,
        memo: `Zenith Empire - ${type} Order`,
        metadata: { type: type }
      }, {
        onReady: (p) => console.log("Payment Ready"),
        onCancel: (p) => alert("تم إلغاء العملية"),
        onError: (e) => alert("حدث خطأ: " + e),
        onCompleted: (p, txid) => alert("تمت العملية بنجاح! رقم المعاملة: " + txid)
      });
    } catch (err) {
      alert("خطأ في الاتصال بشبكة Pi");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className={`font-bold mb-4 ${type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
        {type === 'buy' ? 'BUY ZENITH' : 'SELL ZENITH'}
      </h2>
      <button 
        onClick={() => handlePiPayment(1.0)} 
        className={`w-full p-3 rounded font-bold transition-all hover:opacity-90 ${type === 'buy' ? 'bg-green-600' : 'bg-red-600'}`}
      >
        {type === 'buy' ? 'CONFIRM BUY (1.0 Pi)' : 'CONFIRM SELL (1.0 Pi)'}
      </button>
    </div>
  );
}
