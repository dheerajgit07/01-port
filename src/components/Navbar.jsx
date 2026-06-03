import React, { useState, useEffect } from 'react';

// Parent (App.jsx) se central props accept kiye
export default function Navbar({ isDarkTheme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Intersection Observer to automatically highlight visible sections on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'dikotahq', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for precise detection

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  // Purely Cyberpunk and Neon configurations connected to central prop
  const themeStyles = {
    cyber: {
      textAccent: "text-cyan-400 group-hover:text-cyan-300",
      activeTab: "bg-cyan-500/15 text-cyan-400 border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] font-black",
      hqTab: "text-yellow-500 border border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/20 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]",
      badgeGlow: "bg-cyan-400 shadow-[0_0_12px_#22d3ee]",
      toggleBtn: "border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
      mobileMenuBg: "bg-zinc-950/98 border-zinc-900"
    },
    neon: {
      textAccent: "text-fuchsia-500 group-hover:text-fuchsia-400",
      activeTab: "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-400 shadow-[0_0_20px_rgba(232,121,249,0.25)] font-black",
      hqTab: "text-rose-500 border border-rose-500/40 bg-rose-500/5 hover:bg-rose-500/20 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
      badgeGlow: "bg-fuchsia-400 shadow-[0_0_12px_#e879f9]",
      toggleBtn: "border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 shadow-[0_0_15px_rgba(232,121,249,0.15)]",
      mobileMenuBg: "bg-zinc-950/98 border-zinc-900"
    }
  };

  // True handles Cyber mode, False handles Neon mode
  const current = isDarkTheme ? themeStyles.cyber : themeStyles.neon;

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ) 
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ) 
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ) 
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ) 
    },
    { 
      id: 'dikotahq', 
      label: 'Dikota HQ', 
      isHQ: true,
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ) 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ) 
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 xl:h-24 z-50 bg-zinc-950/95 backdrop-blur-3xl border-b border-zinc-900/80 px-6 md:px-16 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
      <div className="max-w-[92rem] h-full mx-auto flex justify-between items-center">
        
        {/* Luxury Minimalist Brand Unit */}
        <button 
          onClick={() => scrollToSection('home')} 
          className="group relative flex items-center gap-4 cursor-pointer select-none z-50 h-full"
        >
          <div className="relative flex items-center justify-center">
            <span className={`w-2.5 h-2.5 rounded-full ${current.badgeGlow}`}></span>
            <span className={`absolute w-5 h-5 rounded-full ${current.badgeGlow} opacity-20 animate-ping`}></span>
          </div>
          
          <div className="flex flex-col text-left font-sans">
            <span className="text-xl md:text-2xl font-black tracking-[0.35em] text-white leading-none">
              DK
            </span>
            <span className={`text-[9px] font-bold tracking-[0.4em] uppercase mt-1.5 transition-colors duration-300 ${current.textAccent}`}>
              LABS // SYS
            </span>
          </div>
        </button>
        
        {/* Wide Tactical Center Deck (Desktop View) */}
        <div className="hidden xl:flex items-center gap-3 p-1.5 bg-zinc-900/40 rounded-xl border border-zinc-800/60 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            if (item.isHQ) {
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-3 rounded-lg font-black tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-xs uppercase ${
                    isActive ? current.activeTab : current.hqTab
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-5 py-3 rounded-lg font-bold tracking-wide transition-all duration-200 flex items-center gap-2.5 cursor-pointer text-xs relative group transition-all ${
                  isActive 
                    ? current.activeTab 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tactical Command Action Block */}
        <div className="flex items-center gap-4 font-mono z-50">
          <button 
            onClick={toggleTheme}
            className={`hidden sm:flex px-4 py-3 border text-[11px] font-black rounded-lg tracking-[0.12em] transition-all duration-300 items-center gap-2.5 cursor-pointer ${current.toggleBtn}`}
          >
            {/* Cyber / Neon dynamic radar/eye icon representation */}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>MATRIX: {isDarkTheme ? 'CYBER' : 'NEON'}</span>
          </button>

          {/* High-Tech Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white transition-all shadow-inner"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <div className={`xl:hidden fixed inset-x-0 top-20 transition-all duration-300 ease-in-out border-b border-zinc-900 shadow-2xl overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[500px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
      } ${current.mobileMenuBg}`}>
        <div className="flex flex-col gap-2 p-5 font-mono">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full px-5 py-3.5 rounded-lg text-xs flex items-center gap-3.5 cursor-pointer border transition-all duration-150 ${
                  isActive 
                    ? current.activeTab 
                    : item.isHQ ? current.hqTab : 'bg-zinc-900/30 text-zinc-400 border-zinc-800/30 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {item.icon}
                <span className="tracking-widest uppercase font-bold">{item.label}</span>
              </button>
            );
          })}
          
          {/* Mobile view theme toggler */}
          <button
            onClick={toggleTheme}
            className={`sm:hidden w-full mt-1 px-5 py-3.5 border text-[10px] font-black rounded-lg tracking-widest flex items-center justify-center gap-2.5 ${current.toggleBtn}`}
          >
            <span>MATRIX: {isDarkTheme ? 'CYBER' : 'NEON'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}