
import { User } from '../types';

const USERS_KEY = 'ranger_ai_users';
const CURRENT_USER_ID_KEY = 'ranger_ai_current_user_id';

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUserId = (): string | null => {
  return localStorage.getItem(CURRENT_USER_ID_KEY);
};

export const setCurrentUserId = (userId: string | null): void => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_ID_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_ID_KEY);
  }
};
    