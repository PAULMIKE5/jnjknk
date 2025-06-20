import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"; // Added transition-all
  const activeNavLinkClass = "bg-sky-600 text-white shadow-md"; // Added shadow for active
  const inactiveNavLinkClass = "text-sky-100 hover:bg-sky-700 hover:text-white hover:shadow-sm"; // Added hover shadow

  return (
    <nav className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink 
              to="/dashboard" 
              className="text-2xl font-bold text-sky-400 font-orbitron hover:text-sky-300 transition-colors duration-300"
            >
              {APP_NAME}
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/swap" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`}
              >
                Swap
              </NavLink>
              <NavLink 
                to="/referrals" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`}
              >
                Referrals
              </NavLink>
              <NavLink 
                to="/watch-ads" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`}
              >
                Watch Ads
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`}
              >
                Profile
              </NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            {currentUser && (
              <button
                onClick={handleLogout}
                className={`${navLinkClass} bg-pink-600 hover:bg-pink-700 text-white transform hover:scale-105`}
              >
                Logout
              </button>
            )}
          </div>
          {/* Mobile menu button could be added here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;