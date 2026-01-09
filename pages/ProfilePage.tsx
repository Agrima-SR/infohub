
import React from 'react';
import { User, UserRole } from '../types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#00313d] rounded-2xl shadow-2xl overflow-hidden border border-[#004b5f]">
        <div className="bg-gradient-to-r from-[#004b5f] to-[#009bb3] h-32 md:h-48"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-[#00313d] rounded-2xl p-2 shadow-lg mx-auto md:mx-0">
              <div className="w-full h-full bg-[#002b36] rounded-xl flex items-center justify-center text-[#00bcd4]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
            </div>
            <div className="mt-4 text-center md:text-left md:ml-40 md:-mt-12">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <div className="text-[#00bcd4] flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === UserRole.TUTOR ? 'bg-[#ffca28] text-black' : 'bg-[#00bcd4] text-white'}`}>
                  {user.role}
                </span>
                {user.role === UserRole.STUDENT && (
                  <span className="text-sm font-medium opacity-80">| {user.year}</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-[#004b5f] pb-2">Account Details</h3>
              <div>
                <label className="block text-xs font-bold text-[#00bcd4] uppercase tracking-widest mb-1">Email Address</label>
                <div className="p-3 bg-[#002b36] border border-[#004b5f] rounded-lg text-slate-200 font-medium">{user.email}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00bcd4] uppercase tracking-widest mb-1">Unique ID</label>
                <div className="p-3 bg-[#002b36] border border-[#004b5f] rounded-lg text-slate-200 font-medium font-mono">{user.id}</div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-[#004b5f] pb-2">Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-[#00313d] border border-[#004b5f] rounded-xl hover:border-[#00bcd4] hover:shadow-lg transition-all group">
                  <span className="text-slate-200 font-semibold group-hover:text-[#00bcd4]">Update Password</span>
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-[#00313d] border border-[#004b5f] rounded-xl hover:border-[#00bcd4] hover:shadow-lg transition-all group">
                  <span className="text-slate-200 font-semibold group-hover:text-[#00bcd4]">Notification Preferences</span>
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
