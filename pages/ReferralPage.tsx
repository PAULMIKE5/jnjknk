
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AnimatedCard from '../components/AnimatedCard';
import { REFERRAL_BONUS } from '../constants';

const ReferralPage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode)
      .then(() => alert('Referral code copied to clipboard!'))
      .catch(err => console.error('Failed to copy referral code: ', err));
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <AnimatedCard title="Referral Program">
        <div className="text-slate-300 space-y-4">
          <p className="text-lg">Invite your friends to join Ranger AI Mining and earn rewards!</p>
          <p>When a new user registers using your unique referral code, you will receive a bonus of <span className="font-bold text-sky-400">{REFERRAL_BONUS} Ranger AI</span>.</p>
          
          <div className="mt-6">
            <p className="text-md font-semibold text-sky-300">Your Referral Code:</p>
            <div className="flex items-center space-x-3 my-2 p-3 bg-slate-700 bg-opacity-60 rounded-lg">
              <span className="text-2xl font-orbitron text-teal-300 tracking-wider flex-grow">{currentUser.referralCode}</span>
              <button
                onClick={handleCopyReferral}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-sm transition-colors duration-200"
              >
                Copy Code
              </button>
            </div>
            <p className="text-sm text-slate-400">Share this code with your friends via social media, messaging apps, or anywhere you like!</p>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard title="How It Works">
        <ul className="list-disc list-inside space-y-3 text-slate-300">
          <li>Share your unique referral code found above or on your profile page.</li>
          <li>Your friend enters your code in the "Referral Code" field during their registration.</li>
          <li>Once their registration is complete, you automatically receive {REFERRAL_BONUS} Ranger AI in your balance.</li>
          <li>There's no limit to how many friends you can refer!</li>
        </ul>
      </AnimatedCard>

       <AnimatedCard title="Benefits">
        <ul className="list-disc list-inside space-y-3 text-slate-300">
          <li><span className="font-semibold text-sky-400">For You:</span> Earn {REFERRAL_BONUS} Ranger AI for every successful referral. More referrals mean more Ranger AI!</li>
          <li><span className="font-semibold text-sky-400">For Your Friends:</span> They get to join the exciting world of Ranger AI Mining and start their journey.</li>
          <li>Help grow the Ranger AI community and earn together!</li>
        </ul>
      </AnimatedCard>
    </div>
  );
};

export default ReferralPage;
    