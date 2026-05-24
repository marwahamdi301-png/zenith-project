import React from 'react';

export default function OrderForm({ type }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className={`font-bold mb-4 ${type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
        {type === 'buy' ? 'BUY ZENITH' : 'SELL ZENITH'}
      </h2>
      <input 
        type="number" 
        placeholder="Amount" 
        className="w-full bg-gray-900 border border-gray-600 p-2 rounded mb-4 text-white"
      />
      <button className={`w-full p-2 rounded font-bold ${type === 'buy' ? 'bg-green-600' : 'bg-red-600'}`}>
        {type === 'buy' ? 'CONFIRM BUY' : 'CONFIRM SELL'}
      </button>
    </div>
  );
}
