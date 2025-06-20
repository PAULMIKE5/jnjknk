
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AnimatedCard from '../components/AnimatedCard';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return <div className="text-center text-xl p-8">Loading profile...</div>;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode)
      .then(() => alert('Referral code copied to clipboard!'))
      .catch(err => console.error('Failed to copy referral code: ', err));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatedCard title="Your Profile">
        <div className="space-y-4 text-slate-200">
          <div>
            <p className="text-sm text-sky-300">Username</p>
            <p className="text-xl font-semibold">{currentUser.username}</p>
          </div>
           <div>
            <p className="text-sm text-sky-300">Email</p>
            <p className="text-xl font-semibold">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-sm text-sky-300">Your Unique Referral Code</p>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-2xl font-bold text-teal-400 bg-slate-700 bg-opacity-70 px-4 py-2 rounded-lg tracking-wider">
                {currentUser.referralCode}
              </p>
              <button
                onClick={handleCopyReferral}
                title="Copy Referral Code"
                className="p-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 0V9A1.875 1.875 0 0018.375 7.125h-3.375a1.875 1.875 0 00-1.875 1.875v.168M16.5 9.75V16.5" />
                </svg>
              </button>
            </div>
          </div>
          {currentUser.referredBy && (
            <div>
              <p className="text-sm text-sky-300">Referred By Code</p>
              <p className="text-lg font-semibold bg-slate-700 bg-opacity-50 px-3 py-1 rounded inline-block">{currentUser.referredBy}</p>
            </div>
          )}
          <div className="pt-4 border-t border-slate-700">
             <p className="text-sm text-slate-400">Account ID: <span className="font-mono text-xs">{currentUser.id}</span></p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ProfilePage;