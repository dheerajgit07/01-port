import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Individual 3D Interactive Card Wrapper
function TiltCard({ children, containerVariants, glowColor = 'from-cyan-500/10', isDarkTheme }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const glowX = useSpring(useTransform(x, [-0.5, 0.5], ['0%', '100%']), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], ['0%', '100%']), springConfig);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`space-y-6 p-6 sm:p-8 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-500 group/card relative overflow-hidden ${
        isDarkTheme 
          ? 'border-zinc-800/60 bg-zinc-900/10 shadow-black/50' 
          : 'border-slate-800/60 bg-slate-900/10 shadow-black/40'
      }`}
    >
      {/* Dynamic Interactive Reflection Overlay */}
      <motion.div 
        style={{
          background: isDarkTheme
            ? `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.04), transparent 50%)`
            : `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.03), transparent 50%)`,
          '--x': glowX,
          '--y': glowY
        }}
        className="absolute inset-0 pointer-events-none z-0" 
      />
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-0`} />

      <div className="relative z-10 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Skills({ isDarkTheme = true }) {
  // Group 1: Core Frameworks & Web Architecture
  const coreEngineering = [
    { name: 'MERN Stack', percentage: 88, color: 'from-emerald-500 to-green-600 shadow-emerald-500/20' },
    { name: 'Next.js', percentage: 85, color: isDarkTheme ? 'from-zinc-100 to-zinc-400 shadow-white/10' : 'from-slate-100 to-slate-400 shadow-white/10' }
  ];

  // Group 2: Programming Languages
  const languagesTech = [
    { name: 'TypeScript', percentage: 80, color: 'from-blue-500 to-sky-600 shadow-blue-500/20' },
    { name: 'JavaScript', percentage: 85, color: 'from-yellow-400 to-amber-500 shadow-amber-500/20' },
    { name: 'Python', percentage: 70, color: 'from-blue-400 to-indigo-500 shadow-blue-400/20' },
    { name: 'C / C++', percentage: 60, color: 'from-teal-400 to-emerald-600 shadow-teal-500/20' }
  ];

  // Group 3: UI/UX & Creative Systems
  const uiCreativeTech = [
    { name: 'Tailwind CSS', percentage: 92, color: 'from-cyan-400 to-teal-500 shadow-cyan-400/20' },
    { name: 'Three.js / GSAP', percentage: 75, color: 'from-indigo-500 to-purple-600 shadow-indigo-500/20' },
    { name: 'Figma UI/UX', percentage: 82, color: 'from-fuchsia-500 to-pink-500 shadow-fuchsia-500/20' },
    { name: 'HTML & CSS', percentage: 95, color: 'from-orange-400 to-pink-500 shadow-pink-500/20' }
  ];

  // Group 4: Data & Execution
  const dataAndExecution = [
    { name: 'SQL Databases', percentage: 78, totalDots: 60 },
    { name: 'Problem Solving', percentage: 92, totalDots: 60 },
    { name: 'Leadership', percentage: 88, totalDots: 60 },
    { name: 'Team Work', percentage: 85, totalDots: 60 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 22, stiffness: 120 } }
  };

  const renderLinearSkills = (skillsArray) => (
    <div className="space-y-5 [transform:translateZ(30px)]">
      {skillsArray.map((skill, index) => (
        <motion.div key={index} variants={itemVariants} className="space-y-1.5 group/bar">
          <div className="flex justify-between items-center font-mono text-xs sm:text-sm tracking-wide">
            <p className={`transition-colors duration-300 font-medium ${isDarkTheme ? 'text-zinc-300 group-hover/bar:text-white' : 'text-slate-300 group-hover/bar:text-white'}`}>
              {skill.name}
            </p>
            <p className={`font-bold transition-colors duration-300 ${isDarkTheme ? 'text-zinc-400 group-hover/bar:text-cyan-400' : 'text-slate-400 group-hover/bar:text-cyan-400'}`}>
              {skill.percentage}%
            </p>
          </div>
          <div className={`h-1.5 w-full rounded-full overflow-hidden p-[1px] border ${isDarkTheme ? 'bg-zinc-950 border-zinc-900' : 'bg-slate-950 border-slate-900'}`}>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
              className={`h-full rounded-full bg-gradient-to-r shadow-lg ${skill.color}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section 
      id="skills" 
      className={`w-full min-h-screen flex flex-col justify-center items-center py-28 max-w-7xl mx-auto px-4 sm:px-12 transition-colors duration-500 antialiased relative z-10 overflow-visible ${
        isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Dynamic Background Mesh Grid Line Setup */}
      <div className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0 transition-colors duration-500 ${
        isDarkTheme 
          ? 'bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]'
      }`} />

      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center text-center mb-20 space-y-2 relative z-20"
      >
        <div className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase ${isDarkTheme ? 'text-zinc-500' : 'text-slate-500'}`}>
          SYSTEM.CORE_MATRICES
        </div>
        <h2 className={`text-3xl sm:text-5xl font-sans font-black tracking-tight uppercase ${isDarkTheme ? 'text-zinc-100' : 'text-slate-100'}`}>
          Power Levels
        </h2>
      </motion.div>

      {/* 4-COLUMN 3D GRID FRAMEWORK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl relative z-30 [perspective:1600px]">
        
        {/* CARD 1: CORE ENGINEERING */}
        <TiltCard containerVariants={containerVariants} glowColor="from-emerald-500/10" isDarkTheme={isDarkTheme}>
          <div className={`border-b pb-3 mb-5 flex items-center justify-between [transform:translateZ(40px)] ${isDarkTheme ? 'border-zinc-800/80' : 'border-slate-800/80'}`}>
            <h3 className={`text-md font-bold font-sans tracking-wider uppercase ${isDarkTheme ? 'text-zinc-200' : 'text-slate-200'}`}>Core Engineering</h3>
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
              isDarkTheme ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900/40' : 'text-emerald-400 bg-slate-900/30 border-emerald-900/40'
            }`}>ENG.ENV</span>
          </div>
          {renderLinearSkills(coreEngineering)}
        </TiltCard>

        {/* CARD 2: PROGRAMMING LANGUAGES */}
        <TiltCard containerVariants={containerVariants} glowColor="from-blue-500/10" isDarkTheme={isDarkTheme}>
          <div className={`border-b pb-3 mb-5 flex items-center justify-between [transform:translateZ(40px)] ${isDarkTheme ? 'border-zinc-800/80' : 'border-slate-800/80'}`}>
            <h3 className={`text-md font-bold font-sans tracking-wider uppercase ${isDarkTheme ? 'text-zinc-200' : 'text-slate-200'}`}>Programming Languages</h3>
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
              isDarkTheme ? 'text-blue-400 bg-blue-950/30 border-blue-900/40' : 'text-blue-400 bg-slate-900/30 border-blue-900/40'
            }`}>LANG.CORE</span>
          </div>
          {renderLinearSkills(languagesTech)}
        </TiltCard>

        {/* CARD 3: UI & CREATIVE SYSTEMS */}
        <TiltCard containerVariants={containerVariants} glowColor="from-pink-500/10" isDarkTheme={isDarkTheme}>
          <div className={`border-b pb-3 mb-5 flex items-center justify-between [transform:translateZ(40px)] ${isDarkTheme ? 'border-zinc-800/80' : 'border-slate-800/80'}`}>
            <h3 className={`text-md font-bold font-sans tracking-wider uppercase ${isDarkTheme ? 'text-zinc-200' : 'text-slate-200'}`}>UI & Creative Systems</h3>
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
              isDarkTheme ? 'text-pink-400 bg-pink-950/30 border-pink-900/40' : 'text-pink-400 bg-slate-900/30 border-pink-900/40'
            }`}>VISUAL.UI</span>
          </div>
          {renderLinearSkills(uiCreativeTech)}
        </TiltCard>

        {/* CARD 4: DATA & EXECUTION */}
        <TiltCard containerVariants={containerVariants} glowColor="from-fuchsia-500/10" isDarkTheme={isDarkTheme}>
          <div className={`border-b pb-3 mb-5 flex items-center justify-between [transform:translateZ(40px)] ${isDarkTheme ? 'border-zinc-800/80' : 'border-slate-800/80'}`}>
            <h3 className={`text-md font-bold font-sans tracking-wider uppercase ${isDarkTheme ? 'text-zinc-200' : 'text-slate-200'}`}>Data & Execution</h3>
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
              isDarkTheme ? 'text-fuchsia-400 bg-fuchsia-950/30 border-fuchsia-800/40' : 'text-fuchsia-400 bg-slate-900/30 border-fuchsia-800/40'
            }`}>EXEC.MATRIX</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 [transform:translateZ(30px)]">
            {dataAndExecution.map((skill, sIndex) => {
              const activeDots = Math.floor((skill.percentage / 100) * skill.totalDots);
              const rotationStep = 360 / skill.totalDots;

              return (
                <div key={sIndex} className={`flex flex-col items-center text-center p-3 border rounded-xl relative group/node [transform-style:preserve-3d] transition-colors duration-500 ${
                  isDarkTheme ? 'bg-zinc-950/20 border-zinc-900/60 hover:border-zinc-800' : 'bg-slate-950/20 border-slate-900/60 hover:border-slate-800'
                }`}>
                  
                  {/* Circular Matrix Dot Ring */}
                  <div className="relative w-24 h-24 sm:w-26 sm:h-26 flex items-center justify-center [transform:translateZ(20px)]">
                    <div className="absolute inset-0 w-full h-full transform rotate-[-90deg]">
                      {[...Array(skill.totalDots)].map((_, i) => {
                        const isActive = i < activeDots;
                        return (
                          <div
                            key={i}
                            className="absolute left-1/2 top-0 origin-[0_48px] sm:origin-[0_52px]"
                            style={{ transform: `translateX(-50%) rotate(${i * rotationStep}deg)` }}
                          >
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.4 }}
                              whileInView={{ opacity: isActive ? 1 : 0.15 }}
                              viewport={{ once: true }}
                              transition={{ 
                                delay: (sIndex * 0.05) + (i * 0.003), 
                                type: 'spring', 
                                stiffness: 350, 
                                damping: 20 
                              }}
                              className={`w-[1.5px] h-[5px] rounded-full ${
                                isActive ? 'bg-cyan-400 shadow-[0_0_6px_#12f7ff]' : 'bg-zinc-800'
                              }`} 
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col items-center justify-center z-10 [transform:translateZ(10px)]">
                      <span className="text-base sm:text-lg font-black font-mono tracking-tight text-zinc-100 group-hover/node:text-cyan-400 transition-colors duration-300">
                        {skill.percentage}%
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono font-medium tracking-tight mt-2 truncate max-w-full text-zinc-400 group-hover/node:text-zinc-200 transition-colors duration-300 [transform:translateZ(10px)]">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </TiltCard>

      </div>
    </section>
  );
}