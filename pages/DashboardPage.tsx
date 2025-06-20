import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';
import AnimatedCard from '../components/AnimatedCard';
import AdsenseAd from '../components/AdsenseAd';
import Modal from '../components/Modal';
import { MINING_DURATION, DAILY_MINING_REWARD, ADMOB_AD_CLIENT, ADMOB_AD_SLOT_DASHBOARD } from '../constants';
import { formatTimeDuration } from '../utils/helpers';

const DashboardPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (currentUser?.isMining && currentUser.miningStartTime) {
      const updateTimer = () => {
        if (currentUser?.isMining && currentUser.miningStartTime) { // Re-check current user state
          const elapsed = Date.now() - currentUser.miningStartTime;
          const remaining = MINING_DURATION - elapsed;
          setTimeRemaining(remaining > 0 ? remaining : 0);
          // Automatic mining completion is handled in AuthContext
        } else {
          setTimeRemaining(0);
          if (intervalId) clearInterval(intervalId); // Clear interval if mining stopped externally
        }
      };
      updateTimer(); // Initial call
      intervalId = setInterval(updateTimer, 1000);
    } else {
      setTimeRemaining(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentUser?.isMining, currentUser?.miningStartTime]); // More specific dependencies

  if (!currentUser) return <div className="text-center text-xl p-8">Loading user data...</div>;

  const handleStartMining = () => {
    if (!currentUser.isMining) {
      const updatedUser: User = {
        ...currentUser,
        isMining: true,
        miningStartTime: Date.now(),
      };
      updateUser(updatedUser);
    }
  };

  const MiningStatusIcon = currentUser.isMining 
    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-green-400 animate-spin-slow">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-red-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
      </svg>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-orbitron font-bold text-sky-300 text-center">Welcome, {currentUser.username}!</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedCard title="Mining Status" className="bg-opacity-20">
          <div className="flex items-center justify-center mb-4">
            {MiningStatusIcon}
            <p className={`text-xl font-semibold ${currentUser.isMining ? 'text-green-400 animate-subtlePulse' : 'text-red-400'}`}>
              {currentUser.isMining ? 'Mining Active' : 'Mining Inactive'}
            </p>
          </div>
          {currentUser.isMining ? (
            <div className="text-center">
              <p className="text-3xl font-orbitron text-teal-300 animate-pulse">{formatTimeDuration(timeRemaining)}</p>
              <p className="text-sm text-slate-400">Time Remaining in Current Cycle</p>
              <p className="mt-2 text-sm text-sky-300">Earning {DAILY_MINING_REWARD} Ranger AI / 24h</p>
            </div>
          ) : (
            <button
              onClick={handleStartMining}
              className="w-full mt-4 py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              Start Mining
            </button>
          )}
        </AnimatedCard>

        <AnimatedCard title="Balances" className="bg-opacity-20">
          <div className="space-y-3">
            <p className="text-lg"><span className="font-semibold text-sky-400">Ranger AI:</span> {currentUser.balances.rangerAI.toFixed(4)}</p>
            <p className="text-lg"><span className="font-semibold text-green-400">USDT:</span> {currentUser.balances.usdt.toFixed(2)}</p>
            <p className="text-lg"><span className="font-semibold text-yellow-400">BNB:</span> {currentUser.balances.bnb.toFixed(6)}</p>
          </div>
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full mt-6 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 transform hover:scale-105"
          >
            Withdraw Funds
          </button>
        </AnimatedCard>
        
        <AnimatedCard title="Referral Info" className="bg-opacity-20">
            <p className="text-lg text-slate-300">Your Referral Code:</p>
            <p className="text-2xl font-bold text-teal-400 bg-slate-700 bg-opacity-50 px-3 py-1 rounded my-2 inline-block tracking-wider">
                {currentUser.referralCode}
            </p>
            <p className="text-sm text-slate-400">Share this code with friends to earn bonuses!</p>
        </AnimatedCard>
      </div>

      <AdsenseAd adClient={ADMOB_AD_CLIENT} adSlot={ADMOB_AD_SLOT_DASHBOARD} className="max-w-4xl mx-auto" />
      
      <Modal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} title="Withdraw Funds">
        <p className="text-slate-300 text-center">Withdrawals are temporarily unavailable. Our team is working on it.</p>
        <p className="text-slate-400 text-sm text-center mt-2">Please try again later.</p>
        <button 
            onClick={() => setIsWithdrawModalOpen(false)}
            className="mt-6 w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Okay
        </button>
      </Modal>

      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;