import React, { useState, useEffect } from 'react';
import profileImg from '../assets/image.png';
import cvFile from '../assets/Resume.jpg';

export default function Hero({ isDarkTheme = true }) { 

  // Roles array for dynamic text changing
  const roles = ["Full-Stack Developer", "UI/UX Designer", "AI Architect", "Co-Founder @ Dikota"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(80);
        
        if (displayedText === currentFullText) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);
        
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section 
      id="home" 
      className={`relative w-full lg:mt-10 min-h-[calc(100vh-80px)] xl:min-h-[calc(100vh-96px)] flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between gap-12 xl:gap-16 py-12 md:py-20 max-w-6xl mx-auto px-6 sm:px-8 overflow-hidden transition-colors duration-500 antialiased ${
        isDarkTheme ? 'bg-zinc-950 text-zinc-50' : 'bg-slate-950 text-slate-100'
      }`}
    >
      
      {/* BACKGROUND GLOW ORBS FOR EXTRA AMBIENT HIGHLIGHT */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* LEFT CONTENT DECK */}
      <div className="w-full xl:flex-1 flex flex-col justify-center items-start text-left z-10 space-y-6 md:space-y-7 max-w-xl xl:max-w-none mx-auto xl:mx-0">
        
        {/* Pre-Heading Tag */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-medium font-mono tracking-widest text-yellow-400 select-none shadow-[0_0_15px_rgba(234,179,8,0.15)] uppercase ${
          isDarkTheme ? 'bg-zinc-900 border-yellow-500/30' : 'bg-slate-900 border-yellow-500/30'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping"></span>
          Available for Production Engineering
        </div>

        {/* Headline */}
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-[1.1] text-zinc-50">
            Hi! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-yellow-400 drop-shadow-[0_0_20px_rgba(240,46,170,0.4)]">Dheeraj Kamboj</span>
          </h1>
        </div>

        {/* Dynamic Text Frame with Supercharged Glow */}
        <div className="font-mono text-lg md:text-xl tracking-wide font-semibold h-8 flex items-center text-zinc-300">
          <h3>
            And I'm a{' '}
            <span 
              className="text-fuchsia-400 transition-all duration-200 border-r-2 border-fuchsia-500 pr-1 select-all font-bold"
              style={{ textShadow: '0 0 15px rgba(240,46,170,0.6), 0 0 30px rgba(240,46,170,0.2)' }}
            >
              {displayedText}
            </span>
          </h3>
        </div>

        {/* Narrative Paragraph */}
        <p className="font-sans text-sm md:text-base max-w-lg leading-relaxed font-normal text-zinc-400 tracking-wide">
          <span className="font-semibold border-b pb-0.5 text-yellow-400 border-yellow-500/30 drop-shadow-[0_0_6px_rgba(234,179,8,0.25)]">Co-Founder at Dikota</span> &amp; Full-Stack Architect specializing in high-end digital ecosystems. Expert in <span className="text-zinc-200 font-medium">AI-Driven Development</span> leveraging modern frameworks.
        </p>

        {/* Information Cards Grid with Intense Ambient Glow */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          
          {/* Card 1: Fuchsia Laser Glow */}
          <div className="group relative p-[1.5px] rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(240,46,170,0.25)]">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_30%,#f02ea1_50%,transparent_70%)] animate-[spin_2.5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={`relative p-4 rounded-[11px] h-full border transition-colors duration-300 ${
              isDarkTheme ? 'bg-zinc-950/95 border-zinc-900 group-hover:border-transparent' : 'bg-slate-950/95 border-slate-900 group-hover:border-transparent'
            }`}>
              <h5 className="uppercase tracking-widest text-[10px] text-fuchsia-400 font-bold mb-1.5 drop-shadow-[0_0_8px_rgba(240,46,170,0.3)]">Email Terminal :</h5>
              <span className="break-all select-all font-medium text-xs md:text-[13px] text-zinc-300 tracking-wide">dheerajkamboj25@gmail.com</span>
            </div>
          </div>

          {/* Card 2: Yellow Laser Glow */}
          <div className="group relative p-[1.5px] rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_30%,#eab308_50%,transparent_70%)] animate-[spin_2.5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className={`relative p-4 rounded-[11px] h-full border transition-colors duration-300 ${
              isDarkTheme ? 'bg-zinc-950/95 border-zinc-900 group-hover:border-transparent' : 'bg-slate-950/95 border-slate-900 group-hover:border-transparent'
            }`}>
              <h5 className="uppercase tracking-widest text-[10px] text-yellow-400 font-bold mb-1.5 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">Design Curation :</h5>
              <span className="break-all select-all font-medium text-xs md:text-[13px] text-zinc-300 tracking-wide">behance.net/Dheeraj</span>
            </div>
          </div>

        </div>

        {/* Buttons Layout with Full-Time Radioactive Borders */}
        <div className="flex flex-wrap items-center gap-5 pt-2 font-mono text-xs tracking-widest uppercase font-bold w-full">
          
          {/* Button 1: Download CV */}
          <div className="relative group p-[1.5px] rounded-xl overflow-hidden w-full sm:w-auto shadow-[0_0_15px_rgba(240,46,170,0.15)] hover:shadow-[0_0_30px_rgba(240,46,170,0.5)] transition-all duration-300">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_20%,#f02ea1_50%,transparent_80%)] animate-[spin_2s_linear_infinite]"></div>
            <a 
              href={cvFile} 
              download="Dheeraj_Kamboj_CV.png"
              className="relative px-7 py-4 rounded-[11px] text-fuchsia-400 bg-zinc-950 hover:bg-fuchsia-950/40 flex items-center justify-center gap-3 transition-colors duration-300 w-full tracking-widest"
            >
              Download CV 
              <i className="bx bx-download text-sm animate-bounce"></i>
            </a>
          </div>

          {/* Button 2: Hire Me Now */}
          <div className="relative group p-[1.5px] rounded-xl overflow-hidden w-full sm:w-auto shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] transition-all duration-300">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_25%,#eab308_50%,transparent_75%)] animate-[spin_3s_linear_infinite] group-hover:animate-[spin_1.5s_linear_infinite]"></div>
            <a 
              href="#contact" 
              className={`relative px-7 py-4 rounded-[11px] flex items-center justify-center gap-3 transition-colors duration-300 w-full tracking-widest ${
                isDarkTheme 
                  ? 'bg-zinc-950 text-zinc-400 group-hover:text-yellow-400' 
                  : 'bg-slate-950 text-slate-400 group-hover:text-yellow-400'
              }`}
            >
              Hire Me Now 
              <i className="bx bx-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </a>
          </div>

        </div>

        {/* Social Hub */}
        <div className={`w-full flex flex-wrap items-center gap-6 pt-5 border-t ${isDarkTheme ? 'border-zinc-900' : 'border-slate-800'}`}>
          <div className="flex items-center gap-5 text-2xl">
            <a href="https://www.facebook.com/share/1Lxy7vRfwa/" target="_blank" rel="noreferrer" className="transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 text-[#1877F2]" title="Facebook">
              <i className="bx bxl-facebook-circle" style={{ filter: 'drop-shadow(0 0 8px rgba(24,119,242,0.5))' }}></i>
            </a>
            <a href="https://www.instagram.com/dheeraj_kamboj_12" target="_blank" rel="noreferrer" className="transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 text-[#E4405F]" title="Instagram">
              <i className="bx bxl-instagram" style={{ filter: 'drop-shadow(0 0 8px rgba(228,64,95,0.6))' }}></i>
            </a>
            <a href="https://www.snapchat.com/add/dimon7429" target="_blank" rel="noreferrer" className="transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 text-[#FFFC00]" title="Snapchat">
              <i className="bx bxl-snapchat text-amber-300" style={{ filter: 'drop-shadow(0 0 6px rgba(255,252,0,0.5))' }}></i>
            </a>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 text-[#0077B5]" title="LinkedIn">
              <i className="bx bxl-linkedin-square" style={{ filter: 'drop-shadow(0 0 8px rgba(0,119,181,0.5))' }}></i>
            </a>
          </div>
          
          <div className={`hidden sm:block w-[1px] h-5 ${isDarkTheme ? 'bg-zinc-800' : 'bg-slate-800'}`}></div>
          
          {/* Dikota Capsule Badge */}
          <div className={`flex items-center gap-4 px-4 py-2 border rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(240,46,170,0.05)] hover:shadow-[0_0_15px_rgba(240,46,170,0.2)] hover:border-fuchsia-500/50 ${
            isDarkTheme ? 'border-zinc-800/80 bg-zinc-900/40' : 'border-slate-800/80 bg-slate-900/40'
          }`}>
            <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-500">
              Visit Dikota
            </span>
            <div className={`flex items-center gap-2.5 border-l pl-3 ${isDarkTheme ? 'border-zinc-800' : 'border-slate-800'}`}>
              <a href="https://youtube.com/@dikotas" target="_blank" rel="noreferrer" title="Dikota YouTube" className="text-[#FF0000] hover:scale-110 transition-all duration-300">
                <i className="bx bxl-youtube text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(255,0,0,0.4))' }}></i>
              </a>
              <a href="https://www.instagram.com/dikota_13" target="_blank" rel="noreferrer" title="Dikota Instagram" className="text-[#E4405F] hover:scale-110 transition-all duration-300">
                <i className="bx bxl-instagram-alt text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(228,64,95,0.4))' }}></i>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT DISPLAY DOCK */}
      <div className="w-full xl:flex-1 flex items-center justify-center relative max-w-[19rem] sm:max-w-[22rem] md:max-w-[24rem] xl:max-w-[27rem] aspect-square select-none mx-auto xl:mx-0">
        
        {/* Animated Cyber Blob */}
        <div className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen filter blur-[2px] transform translate-z-0">
          <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill={isDarkTheme ? '#f02ea1' : '#a855f7'}>
              <animate 
                attributeName="d" 
                dur="18s" 
                repeatCount="indefinite" 
                values="
                  M453.5,301.5Q429,353,377.5,367Q326,381,288,437.5Q250,494,194.5,468.5Q139,443,101,400.5Q63,358,67,304Q71,250,84,206Q97,162,126.5,124Q156,86,203,58Q250,30,296.5,59.5Q343,89,377,123Q411,157,444.5,203.5Q478,250,453.5,301.5Z;
                  M424,306Q444,362,402,401Q360,440,305,450.5Q250,461,204.5,434.5Q159,408,135,369Q111,330,104,290Q97,250,85,199Q73,148,122.5,132Q172,116,211,100.5Q250,85,304,73.5Q358,62,371,117.5Q384,173,394,211.5Q404,250,424,306Z;
                  M432.5,300Q423,350,392,396Q361,442,305.5,426.5Q250,411,207,405Q164,399,130.5,368.5Q97,338,67,294Q37,250,58.5,201Q80,152,114,112.5Q148,73,199,70Q250,67,303.5,66Q357,65,371,118.5Q385,172,413.5,211Q442,250,432.5,300Z;
                  M438,299.5Q421,349,396,404Q371,459,310.5,443Q250,427,192.5,437.5Q135,448,92,407Q49,366,57,308Q65,250,66,197Q67,144,104.5,103Q142,62,196,37.5Q250,13,302,41Q354,69,403,101Q452,133,453.5,191.5Q455,250,438,299.5Z;
                  M453.5,301.5Q429,353,377.5,367Q326,381,288,437.5Q250,494,194.5,468.5Q139,443,101,400.5Q63,358,67,304Q71,250,84,206Q97,162,126.5,124Q156,86,203,58Q250,30,296.5,59.5Q343,89,377,123Q411,157,444.5,203.5Q478,250,453.5,301.5Z"
              />
            </path>
          </svg>
        </div>

        {/* Profile Frame with Inner Soft Neon Border */}
        <div className="relative w-[78%] h-[78%] rounded-full border border-dashed border-fuchsia-500/40 p-4 flex items-center justify-center drop-shadow-[0_0_20px_rgba(240,46,170,0.3)]">
          <div className={`w-full h-full rounded-full border p-3 flex items-center justify-center overflow-hidden backdrop-blur-md ${
            isDarkTheme ? 'border-zinc-800/80 bg-zinc-900/10' : 'border-slate-800/80 bg-slate-900/10'
          }`}>
            <div className={`w-full h-full rounded-full overflow-hidden relative border flex items-center justify-center ${
              isDarkTheme ? 'bg-zinc-950 border-zinc-800/60' : 'bg-slate-950 border-slate-800/60'
            }`}>
              <img 
                className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" 
                src={profileImg} 
                alt="Dheeraj" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}