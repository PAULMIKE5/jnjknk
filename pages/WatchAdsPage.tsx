
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';
import AnimatedCard from '../components/AnimatedCard';
import { ADS_REWARD } from '../constants';

const WatchAdsPage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adWatchMessage, setAdWatchMessage] = useState('');
  
  // Cooldown can be implemented by checking currentUser.lastAdWatchTime
  // For simplicity, this example allows watching ads without strict cooldown.

  if (!currentUser) return null;

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setAdWatchMessage('Watching ad... Please wait.');

    // Simulate ad watching duration
    setTimeout(() => {
      const reward = ADS_REWARD;
      const updatedUser: User = {
        ...currentUser,
        balances: {
          ...currentUser.balances,
          rangerAI: currentUser.balances.rangerAI + reward,
        },
        lastAdWatchTime: Date.now(), // Store last watch time for potential cooldown logic
      };
      updateUser(updatedUser);
      
      setIsWatchingAd(false);
      setAdWatchMessage(`Ad watched! You earned ${reward} Ranger AI.`);
      
      // Clear message after a few seconds
      setTimeout(() => setAdWatchMessage(''), 3000);

    }, 3000); // Simulate 3 seconds ad watch
  };

  return (
    <div className="max-w-lg mx-auto">
      <AnimatedCard title="Watch Ads & Earn">
        <div className="text-center space-y-6">
          <img src="https://picsum.photos/seed/adbanner/400/200" alt="Ad Banner" className="mx-auto rounded-lg shadow-lg" />
          
          <p className="text-slate-300">
            Watch a short advertisement to earn <span className="font-bold text-sky-400">{ADS_REWARD} Ranger AI</span>!
          </p>
          
          <button
            onClick={handleWatchAd}
            disabled={isWatchingAd}
            className="w-full max-w-xs mx-auto py-3 px-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center"
          >
            {isWatchingAd ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Watch Ad & Earn"
            )}
          </button>

          {adWatchMessage && (
            <p className={`mt-4 text-sm ${adWatchMessage.includes('earned') ? 'text-green-400' : 'text-sky-300'} transition-opacity duration-500`}>
              {adWatchMessage}
            </p>
          )}

          <p className="text-xs text-slate-500 mt-4">
            Note: This is a simulated ad experience for demonstration purposes.
          </p>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default WatchAdsPage;
    