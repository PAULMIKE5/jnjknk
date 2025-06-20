
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, SwapCurrency } from '../types';
import AnimatedCard from '../components/AnimatedCard';
import { RANGER_AI_TO_USDT_RATE, RANGER_AI_TO_BNB_RATE } from '../constants';

const SwapPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [amountToSwap, setAmountToSwap] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<SwapCurrency>(SwapCurrency.USDT);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (amountToSwap && currentUser) {
      const numericAmount = parseFloat(amountToSwap);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        setReceivedAmount(0);
        return;
      }
      if (selectedCurrency === SwapCurrency.USDT) {
        setReceivedAmount(numericAmount * RANGER_AI_TO_USDT_RATE);
      } else if (selectedCurrency === SwapCurrency.BNB) {
        setReceivedAmount(numericAmount * RANGER_AI_TO_BNB_RATE);
      }
    } else {
      setReceivedAmount(0);
    }
  }, [amountToSwap, selectedCurrency, currentUser]);

  if (!currentUser) return null;

  const handleSwap = () => {
    setError('');
    setSuccessMessage('');
    const numericAmount = parseFloat(amountToSwap);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid positive amount to swap.');
      return;
    }
    if (numericAmount > currentUser.balances.rangerAI) {
      setError('Insufficient Ranger AI balance.');
      return;
    }

    let newBalances = { ...currentUser.balances };
    newBalances.rangerAI -= numericAmount;

    if (selectedCurrency === SwapCurrency.USDT) {
      newBalances.usdt += receivedAmount;
    } else if (selectedCurrency === SwapCurrency.BNB) {
      newBalances.bnb += receivedAmount;
    }

    const updatedUser: User = { ...currentUser, balances: newBalances };
    updateUser(updatedUser);
    setSuccessMessage(`Successfully swapped ${numericAmount.toFixed(4)} Ranger AI for ${receivedAmount.toFixed(selectedCurrency === SwapCurrency.USDT ? 2 : 6)} ${selectedCurrency}!`);
    setAmountToSwap('');
  };
  
  const currentRate = selectedCurrency === SwapCurrency.USDT ? RANGER_AI_TO_USDT_RATE : RANGER_AI_TO_BNB_RATE;

  return (
    <AnimatedCard title="Swap Tokens" className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="amountToSwap" className="block text-sm font-medium text-sky-200">Amount of Ranger AI to Swap</label>
          <input
            type="number"
            id="amountToSwap"
            value={amountToSwap}
            onChange={(e) => setAmountToSwap(e.target.value)}
            placeholder="0.0"
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white"
          />
          <p className="text-xs text-slate-400 mt-1">Available Ranger AI: {currentUser.balances.rangerAI.toFixed(4)}</p>
        </div>

        <div>
          <label htmlFor="targetCurrency" className="block text-sm font-medium text-sky-200">Swap To</label>
          <select
            id="targetCurrency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value as SwapCurrency)}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-white"
          >
            <option value={SwapCurrency.USDT}>USDT</option>
            <option value={SwapCurrency.BNB}>BNB</option>
          </select>
        </div>

        <div className="p-4 bg-slate-700 bg-opacity-30 rounded-lg">
          <p className="text-sm text-slate-300">Conversion Rate:</p>
          <p className="text-lg font-semibold text-sky-300">1 Ranger AI ≈ {currentRate.toFixed(selectedCurrency === SwapCurrency.USDT ? 2 : 6)} {selectedCurrency}</p>
          <p className="text-sm text-slate-300 mt-2">You will receive (approx.):</p>
          <p className="text-2xl font-bold text-teal-400">
            {receivedAmount.toFixed(selectedCurrency === SwapCurrency.USDT ? 2 : 6)} {selectedCurrency}
          </p>
        </div>

        {error && <p className="text-sm text-red-400 bg-red-900 bg-opacity-50 p-2 rounded">{error}</p>}
        {successMessage && <p className="text-sm text-green-400 bg-green-900 bg-opacity-50 p-2 rounded">{successMessage}</p>}

        <button
          onClick={handleSwap}
          disabled={!amountToSwap || parseFloat(amountToSwap) <= 0 || parseFloat(amountToSwap) > currentUser.balances.rangerAI}
          className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Swap Now
        </button>
      </div>
    </AnimatedCard>
  );
};

export default SwapPage;
    