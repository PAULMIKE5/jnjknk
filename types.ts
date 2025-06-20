
export interface UserBalances {
  rangerAI: number;
  usdt: number;
  bnb: number;
}

export interface User {
  id: string;
  username: string;
  email: string; // Added email field
  passwordHash: string; 
  referralCode: string; 
  referredBy?: string; 
  balances: UserBalances;
  isMining: boolean;
  miningStartTime?: number;
  lastAdWatchTime?: number; 
  // We don't need lastRewardClaimTime if reward is given automatically at end of 24h cycle
}

export interface AuthContextType {
  currentUser: User | null;
  loadingAuth: boolean;
  login: (username: string, passwordHash: string) => Promise<boolean>;
  register: (username: string, email: string, passwordHash: string, referredByCode?: string) => Promise<boolean>; // Added email parameter
  logout: () => void;
  updateUser: (updatedUser: User) => void; 
}

export enum SwapCurrency {
  USDT = 'USDT',
  BNB = 'BNB',
}