
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { storage } from './services/storage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { AuthPage } from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';

type Page = 'landing' | 'dashboard' | 'login' | 'signup' | 'profile';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  useEffect(() => {
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    storage.setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storage.setCurrentUser(null);
    setCurrentPage('landing');
  };

  const navigate = (page: Page) => {
    if ((page === 'dashboard' || page === 'profile') && !currentUser) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return currentUser ? <Dashboard user={currentUser} /> : <AuthPage type="login" onSuccess={handleLoginSuccess} onSwitch={() => navigate('signup')} />;
      case 'profile':
        return currentUser ? <ProfilePage user={currentUser} /> : <AuthPage type="login" onSuccess={handleLoginSuccess} onSwitch={() => navigate('signup')} />;
      case 'login':
        return <AuthPage type="login" onSuccess={handleLoginSuccess} onSwitch={() => navigate('signup')} />;
      case 'signup':
        return <AuthPage type="signup" onSuccess={handleLoginSuccess} onSwitch={() => navigate('login')} />;
      case 'landing':
      default:
        return <LandingPage onGetStarted={() => navigate(currentUser ? 'dashboard' : 'signup')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001a21]">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout} 
        onNavigate={(p) => navigate(p as Page)}
        currentPage={currentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-[#002b36] border-t border-[#004b5f] py-8 px-4 text-center">
        <p className="text-slate-400 text-sm">© 2024 Campus InfoHub. All official rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6 text-slate-500 text-xs font-semibold uppercase tracking-widest">
          <a href="#" className="hover:text-[#00bcd4] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#00bcd4] transition-colors">Contact Admin</a>
          <a href="#" className="hover:text-[#00bcd4] transition-colors">University Portal</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
