
import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-slate-400 border-t border-slate-700">
        © {new Date().getFullYear()} Ranger AI Mining. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
    