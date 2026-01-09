
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center bg-[#001a21]">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-28 px-4 bg-gradient-to-b from-[#002b36] to-[#001a21]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Stay Connected with Your <br/>
            <span className="text-[#00bcd4]">Campus Pulse</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-light opacity-90">
            One central hub for all official college announcements, bus timings, and event registrations. Targeted information delivered exactly when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-[#009bb3] text-white font-bold rounded-xl shadow-2xl hover:bg-[#00bcd4] hover:-translate-y-1 transition-all"
            >
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-transparent border border-[#004b5f] text-slate-300 font-bold rounded-xl hover:bg-[#002b36] transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#00313d] rounded-2xl border border-[#004b5f] shadow-xl hover:border-[#00bcd4] transition-all">
            <div className="w-12 h-12 bg-[#004b5f] rounded-lg flex items-center justify-center text-[#00bcd4] mb-6">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Registrations</h3>
            <p className="text-slate-400">Never miss a deadline. Get instant updates on course registrations, exams, and scholarship applications.</p>
          </div>
          
          <div className="p-8 bg-[#00313d] rounded-2xl border border-[#004b5f] shadow-xl hover:border-[#00bcd4] transition-all">
            <div className="w-12 h-12 bg-[#004b5f] rounded-lg flex items-center justify-center text-[#00bcd4] mb-6">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Event Coordination</h3>
            <p className="text-slate-400">Stay informed about campus fests, workshops, and sports events happening in your college year.</p>
          </div>

          <div className="p-8 bg-[#00313d] rounded-2xl border border-[#004b5f] shadow-xl hover:border-[#00bcd4] transition-all">
            <div className="w-12 h-12 bg-[#004b5f] rounded-lg flex items-center justify-center text-[#00bcd4] mb-6">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Bus Timings</h3>
            <p className="text-slate-400">Real-time updates on college transportation schedules and route changes directly on your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full py-20 px-4 bg-[#002b36] border-y border-[#004b5f]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#00bcd4] mb-1">5k+</div>
              <div className="text-slate-400 font-semibold tracking-wide uppercase text-xs">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00bcd4] mb-1">200+</div>
              <div className="text-slate-400 font-semibold tracking-wide uppercase text-xs">Tutors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00bcd4] mb-1">50+</div>
              <div className="text-slate-400 font-semibold tracking-wide uppercase text-xs">Daily Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00bcd4] mb-1">100%</div>
              <div className="text-slate-400 font-semibold tracking-wide uppercase text-xs">Reliability</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
