
import React, { useState } from 'react';
import { UserRole, CollegeYear, User } from '../types';
import { YEARS } from '../constants';
import { storage } from '../services/storage';

interface AuthProps {
  type: 'login' | 'signup';
  onSuccess: (user: User) => void;
  onSwitch: () => void;
}

export const AuthPage: React.FC<AuthProps> = ({ type, onSuccess, onSwitch }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.STUDENT,
    year: CollegeYear.YEAR_1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup') {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        year: formData.role === UserRole.STUDENT ? formData.year : undefined,
      };
      storage.saveUser(newUser);
      onSuccess(newUser);
    } else {
      const users = storage.getUsers();
      const user = users.find(u => u.email === formData.email);
      if (user) {
        onSuccess(user);
      } else {
        alert('User not found. Try signing up or use Quick Login!');
      }
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    const users = storage.getUsers();
    let user = users.find(u => u.role === role);
    
    if (!user) {
      // Create a default demo user if none exists
      user = {
        id: role === UserRole.TUTOR ? 'demo-tutor' : 'demo-student',
        name: role === UserRole.TUTOR ? 'Prof. Demo Tutor' : 'Alex Demo Student',
        email: role === UserRole.TUTOR ? 'tutor@demo.com' : 'student@demo.com',
        role: role,
        year: role === UserRole.STUDENT ? CollegeYear.YEAR_2 : undefined,
      };
      storage.saveUser(user);
    }
    onSuccess(user);
  };

  const inputClasses = "w-full px-4 py-3 bg-[#002b36] border border-[#004b5f] rounded-xl text-white focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none transition-all placeholder-slate-500";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#001a21]">
      <div className="bg-[#00313d] p-8 rounded-2xl shadow-2xl border border-[#004b5f] w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#004b5f] rounded-2xl flex items-center justify-center text-[#00bcd4] mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {type === 'signup' ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-[#00bcd4] mt-2 opacity-80">
            {type === 'signup' ? 'Join the campus information network' : 'Log in to your dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className={labelClasses}>Full Name</label>
              <input 
                type="text" 
                required
                className={inputClasses}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className={labelClasses}>Email Address</label>
            <input 
              type="email" 
              required
              className={inputClasses}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@college.edu"
            />
          </div>

          <div>
            <label className={labelClasses}>Password</label>
            <input 
              type="password" 
              required
              className={inputClasses}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {type === 'signup' && (
            <>
              <div>
                <label className={labelClasses}>Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, role: UserRole.STUDENT })}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${formData.role === UserRole.STUDENT ? 'bg-[#004b5f] border-[#00bcd4] text-[#00bcd4]' : 'bg-[#002b36] border-[#004b5f] text-slate-400'}`}
                  >
                    Student
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, role: UserRole.TUTOR })}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${formData.role === UserRole.TUTOR ? 'bg-[#004b5f] border-[#00bcd4] text-[#00bcd4]' : 'bg-[#002b36] border-[#004b5f] text-slate-400'}`}
                  >
                    Tutor
                  </button>
                </div>
              </div>

              {formData.role === UserRole.STUDENT && (
                <div>
                  <label className={labelClasses}>Year of Study</label>
                  <select 
                    className={inputClasses}
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value as CollegeYear })}
                  >
                    {YEARS.map(year => <option key={year} value={year} className="bg-[#00313d]">{year}</option>)}
                  </select>
                </div>
              )}
            </>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-[#009bb3] text-white font-bold rounded-xl shadow-xl hover:bg-[#00bcd4] transition-all mt-4 active:scale-95"
          >
            {type === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#004b5f]">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Access for Demos</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleQuickLogin(UserRole.TUTOR)}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-[#004b5f] text-[#ffca28] rounded-lg text-xs font-bold hover:bg-[#004b5f] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.586.346l-1.541-.308A4 4 0 014.033 11.33L4 11l.033-.33a4 4 0 012.727-3.419l1.541-.308a4 4 0 012.586.346l.673.337a6 6 0 003.86.517l2.387-.477a2 2 0 001.022-.547V10a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2H7a2 2 0 00-2 2v1a2 2 0 002 2h2v2H7a2 2 0 00-2 2v1a2 2 0 002 2h2v2z"></path></svg>
              Tutor Login
            </button>
            <button 
              onClick={() => handleQuickLogin(UserRole.STUDENT)}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-[#004b5f] text-[#00bcd4] rounded-lg text-xs font-bold hover:bg-[#004b5f] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-9-9 9z"></path></svg>
              Student Login
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          {type === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'}
          <button 
            onClick={onSwitch}
            className="ml-2 font-bold text-[#00bcd4] hover:text-[#4dd0e1]"
          >
            {type === 'signup' ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
