
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // AuthContextType is defined in types.ts
import type { AuthContextType } from '../types';


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};