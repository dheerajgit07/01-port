import React, { useState, useRef } from 'react';
import aboutImg from '../assets/dj1j.png';

export default function About({ isDarkTheme = true }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);
  const rAFRef = useRef(null); // स्मूथ मूवमेंट के लिए animation frame reference

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const maxTilt = 18; // परफेक्ट बैलेंस टिल्ट एंगल
    const calcX = -(y - centerY) / centerY * maxTilt;
    const calcY = (x - centerX) / centerX * maxTilt;

    // requestAnimationFrame का उपयोग ताकि माउस मूवमेंट स्क्रीन रिफ्रेश रेट के साथ सिंक हो
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    rAFRef.current = requestAnimationFrame(() => {
      setRotateX(calcX);
      setRotateY(calcY);
    });
  };

  const handleMouseLeave = () => {
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    // वापस अपनी जगह पर स्मूथली आने के लिए
    rAFRef.current = requestAnimationFrame(() => {
      setRotateX(0);
      setRotateY(0);
    });
  };

  return (
    <section 
      id="about" 
      className={`w-full min-h-screen flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-20 py-20 max-w-7xl mx-auto px-4 sm:px-8 xl:px-12 overflow-hidden transition-colors duration-500 antialiased ${
        isDarkTheme ? 'bg-zinc-950 text-zinc-50' : 'bg-slate-950 text-slate-100'
      }`}
    >
      
      {/* LEFT COLUMN: 3D GRAPHIC PLATFORM (बड़ी स्क्रीन पर अब बिल्कुल नहीं कटेगा) */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="w-full xl:flex-1 flex items-center justify-center relative max-w-[24rem] sm:max-w-[28rem] md:max-w-[30rem] aspect-square transition-transform duration-300 ease-out mx-auto xl:mx-0 select-none cursor-pointer"
      >
        {/* Background Radial Ambiance Glow */}
        <div className="absolute inset-0 rounded-full bg-fuchsia-500/15 blur-[120px] pointer-events-none transform translate-z-[-40px]" />

        {/* Core Image Wrapper (95% विड्थ के साथ फुल साइज़) */}
        <div 
          style={{ transform: 'translateZ(40px)' }}
          className={`relative w-[95%] h-[95%] rounded-2xl p-[2px] border overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] transition-colors duration-300 group ${
            isDarkTheme ? 'bg-zinc-900/40 border-zinc-800' : 'bg-slate-900/40 border-slate-800'
          }`}
        >
          {/* Active Border Glow */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_40%,#f02ea1_50%,transparent_60%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className={`w-full h-full rounded-[14px] overflow-hidden relative border ${
            isDarkTheme ? 'bg-zinc-950 border-zinc-900' : 'bg-slate-950 border-slate-900'
          }`}>
            <img 
              src={aboutImg} 
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] scale-100 group-hover:scale-103 transition-transform duration-700 ease-out" 
              alt="About Profile" 
            />
          </div>
        </div>

        {/* --- FLOATING STAT CARDS WITH MULTI-LAYER Z-INDEX --- */}
        <div 
          style={{ transform: 'translateZ(80px)' }}
          className={`absolute -top-2 -left-4 p-4 rounded-xl border font-mono backdrop-blur-md shadow-xl ${
            isDarkTheme ? 'bg-zinc-950/90 border-zinc-800' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <span className="block text-2xl font-bold text-fuchsia-400 drop-shadow-[0_0_8px_rgba(240,46,170,0.4)]">1+</span>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mt-0.5 whitespace-nowrap">Years of Experience</p>
        </div>

        <div 
          style={{ transform: 'translateZ(100px)' }}
          className={`absolute bottom-12 -right-6 p-4 rounded-xl border font-mono backdrop-blur-md shadow-xl ${
            isDarkTheme ? 'bg-zinc-950/90 border-zinc-800' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <span className="block text-2xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">10+</span>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mt-0.5 whitespace-nowrap">Projects Completed</p>
        </div>

        <div 
          style={{ transform: 'translateZ(70px)' }}
          className={`absolute -bottom-4 left-12 p-4 rounded-xl border font-mono backdrop-blur-md shadow-xl ${
            isDarkTheme ? 'bg-zinc-950/90 border-zinc-800' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <span className="block text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">18+</span>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mt-0.5 whitespace-nowrap">Happy Clients</p>
        </div>

      </div>

      {/* RIGHT COLUMN: TEXT CONTENT CONTAINER */}
      <div className="w-full xl:flex-1 flex flex-col justify-center items-start text-left space-y-6 max-w-2xl xl:max-w-none mx-auto xl:mx-0">
        
        {/* Decorative Component Section Identifier */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-fuchsia-400 drop-shadow-[0_0_6px_rgba(240,46,170,0.3)]">
          // 01 . IDENTITY OVERVIEW
        </div>

        {/* Animated On-Scroll Rise Headings */}
        <div className="overflow-hidden w-full class-scroll-rise">
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-zinc-50">
            About me
          </h2>
        </div>
        
        <div className="overflow-hidden w-full class-scroll-rise delay-100">
          <h3 className="text-xl md:text-2xl font-mono font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-fuchsia-400">
            A story of innovation and growth
          </h3>
        </div>

        {/* Bio Paragraph blocks */}
        <div className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-zinc-400 tracking-wide font-normal class-scroll-rise delay-200">
          <p>
            Ever since I was a kid, I’ve been curious about how things work. I used to build little experiments—like homemade helicopters, testing remote control signal ranges, or exploring game ideas I had in my head. For me, science wasn’t just something from books—it was something to play with, test, and bring to life.
          </p>
          <p>
            As I grew up, that curiosity turned into a passion for technology. I started exploring computers, learning how software works, and getting into programming. I didn’t just want to use apps—I wanted to understand how they were built and maybe one day, build my own.
          </p>
          <p>
            That’s when I discovered the world of AI and machine learning. Now, I’m focused on learning how to build smart systems, write clean code, and bring my own tech ideas to life. I’m currently teaching frontend web design and tracking production assets at <span className="text-zinc-200 font-medium">Holly Heart Global School, Samalkha</span>, while finishing my BCA degree under <span className="text-yellow-400/90 font-medium">Kurukshetra University</span>. I enjoy working on challenges that push me to think creatively.
          </p>
        </div>

        {/* Interactive Action Button */}
        <div className="pt-4 font-mono text-xs tracking-widest uppercase font-bold w-full sm:w-auto class-scroll-rise delay-300">
          <div className="relative group p-[1.5px] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(240,46,170,0.1)] hover:shadow-[0_0_25px_rgba(240,46,170,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_20%,#f02ea1_50%,transparent_80%)] animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100" />
            <a 
              href="#" 
              className="relative px-8 py-4 rounded-[11px] text-fuchsia-400 bg-zinc-950 hover:bg-fuchsia-950/40 flex items-center justify-center gap-2 transition-colors duration-300 w-full"
            >
              Read More!
              <i className="bx bx-right-arrow-alt text-base transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}