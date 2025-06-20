
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types';
import { getUsers, saveUsers, getCurrentUserId, setCurrentUserId } from '../utils/localStorage';
import { generateReferralCode, simpleHash } from '../utils/helpers';
import { 
  INITIAL_USDT_BALANCE, 
  INITIAL_RANGER_AI_BALANCE, 
  INITIAL_BNB_BALANCE,
  REFERRAL_BONUS,
  MINING_DURATION,
  DAILY_MINING_REWARD
} from '../constants';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserInternal] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const updateUser = useCallback((updatedUserData: User) => {
    setCurrentUserInternal(updatedUserData);
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === updatedUserData.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUserData;
      saveUsers(users);
    }
  }, []);
  
  useEffect(() => {
    const initializeAuth = () => {
      const storedUserId = getCurrentUserId();
      if (storedUserId) {
        const users = getUsers();
        const user = users.find(u => u.id === storedUserId);
        if (user) {
          setCurrentUserInternal(user);
        } else {
          setCurrentUserId(null); // Clear invalid stored user ID
        }
      }
      setLoadingAuth(false);
    };
    initializeAuth();
  }, []);

  // Mining cycle check
  useEffect(() => {
    if (!currentUser || !currentUser.isMining || !currentUser.miningStartTime) {
      return;
    }

    const intervalId = setInterval(() => {
      if (currentUser && currentUser.isMining && currentUser.miningStartTime) {
        const elapsedTime = Date.now() - currentUser.miningStartTime;
        if (elapsedTime >= MINING_DURATION) {
          console.log(`Mining cycle complete for ${currentUser.username}. Awarding ${DAILY_MINING_REWARD} Ranger AI.`);
          const updatedUser: User = {
            ...currentUser,
            isMining: false,
            miningStartTime: undefined,
            balances: {
              ...currentUser.balances,
              rangerAI: currentUser.balances.rangerAI + DAILY_MINING_REWARD,
            },
          };
          updateUser(updatedUser);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, updateUser]); // currentUser.isMining and currentUser.miningStartTime are implicitly covered by currentUser

  const login = async (username: string, passwordAttempt: string): Promise<boolean> => {
    const users = getUsers();
    const passwordHash = await simpleHash(passwordAttempt);
    const user = users.find(u => u.username === username && u.passwordHash === passwordHash);
    if (user) {
      setCurrentUserInternal(user);
      setCurrentUserId(user.id);
      return true;
    }
    return false;
  };

  const register = async (username: string, passwordAttempt: string, referredByCode?: string): Promise<boolean> => {
    let users = getUsers();
    if (users.find(u => u.username === username)) {
      alert("Username already exists.");
      return false;
    }

    const passwordHash = await simpleHash(passwordAttempt);
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      passwordHash,
      referralCode: generateReferralCode(),
      referredBy: referredByCode,
      balances: {
        rangerAI: INITIAL_RANGER_AI_BALANCE,
        usdt: INITIAL_USDT_BALANCE,
        bnb: INITIAL_BNB_BALANCE,
      },
      isMining: false,
    };
    
    // Handle referral bonus for the referrer
    if (referredByCode) {
      const referrerIndex = users.findIndex(u => u.referralCode === referredByCode);
      if (referrerIndex !== -1) {
        users[referrerIndex].balances.rangerAI += REFERRAL_BONUS;
        console.log(`Awarded ${REFERRAL_BONUS} Ranger AI to referrer ${users[referrerIndex].username}`);
      } else {
        console.warn(`Referral code ${referredByCode} not found.`);
        // Optionally, you might want to invalidate the registration or clear newUser.referredBy
        // For now, we allow registration even if referral code is invalid, but no bonus is given.
        newUser.referredBy = undefined; 
      }
    }

    users.push(newUser);
    saveUsers(users);
    setCurrentUserInternal(newUser);
    setCurrentUserId(newUser.id);
    return true;
  };

  const logout = () => {
    setCurrentUserInternal(null);
    setCurrentUserId(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loadingAuth, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
    