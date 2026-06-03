import React, { useState, useRef, useEffect } from 'react';

export default function Services({ isDarkTheme = true }) {
  const servicesData = [
    {
      num: '// 01',
      title: '3D Web Development',
      desc: 'Forging high-performance web systems with immersive Three.js layouts, custom WebGL assets, and robust backend APIs tied to fluid modern interfaces.',
      color: 'border-cyan-500/30 text-cyan-400 shadow-cyan-950/20',
      ropeColor: 'bg-cyan-500/40',
      glow: 'group-hover:bg-cyan-500/20'
    },
    {
      num: '// 02',
      title: 'UI/UX Interactive Motion',
      desc: 'Breathing life into interfaces using hardware-accelerated micro-interactions, spring physics, and dynamic, fluid layouts built to stun.',
      color: 'border-fuchsia-500/30 text-fuchsia-400 shadow-fuchsia-950/20',
      ropeColor: 'bg-fuchsia-500/40',
      glow: 'group-hover:bg-fuchsia-500/20'
    },
    {
      num: '// 03',
      title: 'WebGL Shader Engine',
      desc: 'Writing optimized GLSL fragments and mathematical lighting models to compile cinematic, highly performant real-time render processes.',
      color: 'border-amber-500/30 text-amber-400 shadow-amber-950/20',
      ropeColor: 'bg-amber-500/40',
      glow: 'group-hover:bg-amber-500/20'
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardRefs = useRef([]);
  const leftRopeRefs = useRef([]);
  const rightRopeRefs = useRef([]);
  
  // Coordinates and angles for physics loop
  const coords = useRef(
    servicesData.map(() => ({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 }))
  );
  const animationFrameId = useRef(null);

  // Smooth lerp rendering engine with constant math-based idle swing
  useEffect(() => {
    const updateTilt = () => {
      const time = performance.now() * 0.0015; // Time factor for slow swing

      servicesData.forEach((_, index) => {
        const c = coords.current[index];
        const isHovered = hoveredIndex === index;

        if (!isHovered) {
          // CSS animation keyframes को हटाकर गणित (Math.sin/cos) से स्मूथ स्विंग बनाया
          // हर कार्ड का delay अलग करने के लिए index * 1.5 जोड़ा है
          const offset = index * 1.5;
          c.targetX = Math.sin(time + offset) * 2.5; 
          c.targetY = Math.cos(time * 0.7 + offset) * 2.0;
        }

        // Lerp Physics (0.10 for pure butter flow)
        c.currentX += (c.targetX - c.currentX) * 0.10;
        c.currentY += (c.targetY - c.currentY) * 0.10;

        const card = cardRefs.current[index];
        const leftRope = leftRopeRefs.current[index];
        const rightRope = rightRopeRefs.current[index];

        if (card) {
          // Apply 3D Transforms
          card.style.transform = `rotateX(${-c.currentY}deg) rotateY(${c.currentX}deg) rotateZ(${c.currentX * 0.15}deg)`;
          
          if (leftRope && rightRope) {
            const ropeTransform = `rotateY(${-c.currentX * 0.7}deg) skewX(${c.currentX * 0.4}deg) scaleY(${1 + Math.abs(c.currentY) * 0.003})`;
            leftRope.style.transform = ropeTransform;
            rightRope.style.transform = ropeTransform;
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(updateTilt);
    };

    animationFrameId.current = requestAnimationFrame(updateTilt);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [hoveredIndex]);

  const handlePointerMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxRotationX = 15;
    const maxRotationY = 12;

    coords.current[index].targetX = (x / (rect.width / 2)) * maxRotationY;
    coords.current[index].targetY = (y / (rect.height / 2)) * maxRotationX;
  };

  const handlePointerEnter = (index) => {
    setHoveredIndex(index);
    // Remove transition so mouse tracking is direct and dynamic
    const card = cardRefs.current[index];
    if (card) {
      card.style.transition = 'none';
      if (leftRopeRefs.current[index]) leftRopeRefs.current[index].style.transition = 'none';
      if (rightRopeRefs.current[index]) rightRopeRefs.current[index].style.transition = 'none';
    }
  };

  const handlePointerLeave = (index) => {
    setHoveredIndex(null);
  };

  return (
    <section 
      id="services" 
      className={`w-full min-h-screen flex flex-col justify-center items-center py-28 max-w-7xl mx-auto px-6 sm:px-12 transition-colors duration-500 antialiased relative z-10 overflow-visible ${
        isDarkTheme ? 'bg-zinc-950 text-zinc-50' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="w-full flex flex-col items-center text-center mb-32 space-y-3 relative z-20">
        <div className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-500">
          SYSTEM . CAPABILITIES
        </div>
        <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight uppercase text-zinc-100">
          My Services
        </h2>
      </div>

      {/* 3D GRID FRAMEWORK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 w-full max-w-6xl relative z-30 px-4 [perspective:2000px] [transform-style:preserve-3d] overflow-visible">
        {servicesData.map((service, index) => {
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onPointerEnter={() => handlePointerEnter(index)}
              onPointerMove={(e) => handlePointerMove(e, index)}
              onPointerLeave={() => handlePointerLeave(index)}
              className={`w-full relative rounded-2xl border ${service.color} bg-zinc-900/40 backdrop-blur-md p-8 flex flex-col justify-between items-start min-h-[25rem] cursor-pointer select-none group [origin:50%_-64px] [transform-style:preserve-3d] shadow-2xl`}
            >
              
              {/* THE CABLES */}
              <div 
                ref={(el) => (leftRopeRefs.current[index] = el)}
                className="absolute -top-16 left-8 w-[2px] h-16 bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-400 origin-top [transform-style:preserve-3d]"
              >
                <div className={`absolute bottom-0 -left-[3px] w-2 h-2 rounded-full ${service.ropeColor} shadow-lg shadow-black/50 [transform:translateZ(2px)]`} />
              </div>
              <div 
                ref={(el) => (rightRopeRefs.current[index] = el)}
                className="absolute -top-16 right-8 w-[2px] h-16 bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-400 origin-top [transform-style:preserve-3d]"
              >
                <div className={`absolute bottom-0 -left-[3px] w-2 h-2 rounded-full ${service.ropeColor} shadow-lg shadow-black/50 [transform:translateZ(2px)]`} />
              </div>

              {/* Bolt Hardware Details */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />

              {/* Cyberpunk Hologram Backlight Glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none blur-2xl ${service.glow} [transform:translateZ(-20px)]`} />

              {/* Card Header Structure - High Depth Layer */}
              <div className="w-full [transform:translateZ(50px)] [transform-style:preserve-3d] space-y-6">
                <div className="w-full flex justify-between items-center border-b border-zinc-800/80 pb-4">
                  <span className="font-mono text-xs font-bold tracking-widest text-zinc-500">
                    {service.num}
                  </span>
                  <div className={`w-2 h-2 rounded-full bg-zinc-800 border ${service.color.split(' ')[0]} group-hover:animate-pulse`} />
                </div>

                <h3 className="text-2xl font-sans font-black tracking-tight text-zinc-200 group-hover:text-white transition-colors duration-300 uppercase [transform:translateZ(15px)]">
                  {service.title}
                </h3>
              </div>

              {/* Description Layer - Mid Depth */}
              <p className="text-sm font-sans text-zinc-400 leading-relaxed tracking-wide font-normal [transform:translateZ(30px)] my-6">
                {service.desc}
              </p>

              {/* Bottom Interactive Console Tray - Maximum Depth */}
              <div className="w-full border-t border-zinc-800/60 pt-4 flex items-center justify-between [transform:translateZ(55px)] [transform-style:preserve-3d]">
                <span className={`font-mono text-[10px] tracking-widest uppercase font-bold transition-all duration-300 group-hover:tracking-[0.22em] ${service.color.split(' ')[1]}`}>
                  Initialize Engine
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center justify-center text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-600 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.4)] [transform:translateZ(10px)]">
                  <i className="bx bx-terminal text-sm" />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>  
  );
}