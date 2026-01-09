
import React from 'react';
import { User, UserRole } from '../types';
import { storage } from '../services/storage';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="bg-[#002b36] border-b border-[#004b5f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-[#009bb3] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4a1 1 0 011-1h2a1 1 0 011 1v3M12 14l9-9-9 9z"></path></svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00bcd4] to-[#4dd0e1]">
                Campus InfoHub
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'text-[#00bcd4]' : 'text-slate-300 hover:text-[#00bcd4]'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('profile')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'profile' ? 'text-[#00bcd4]' : 'text-slate-300 hover:text-[#00bcd4]'}`}
                >
                  Profile
                </button>
                <div className="h-6 w-px bg-[#004b5f]"></div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-white leading-tight">{user.name}</span>
                    <span className="text-[10px] font-bold text-[#00bcd4] uppercase tracking-widest">{user.role}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-sm font-medium text-slate-300 hover:text-[#00bcd4] transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 bg-[#009bb3] text-white text-sm font-semibold rounded-lg hover:bg-[#00bcd4] transition-colors shadow-md"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-slate-300 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
