import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ES Imports for static project screenshot assets from src/assets/
import project1Img from '../assets/2.jpg';
import project2Img from '../assets/5.jpg';
import project3Img from '../assets/6.jpg';
import project4Img from '../assets/4.jpg';
import project5Img from '../assets/3.jpg';

// Individual 3D Interactive Project Card Wrapper
function ProjectTiltCard({ children, onClick, glowColor = 'from-cyan-500/25', isDarkTheme }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

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
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
      className={`relative group/pcard cursor-pointer rounded-2xl border backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
        isDarkTheme
          ? 'border-zinc-800/80 bg-zinc-900/10 shadow-black/60'
          : 'border-slate-800/80 bg-slate-900/10 shadow-black/40'
      }`}
    >
      {/* Laser Border Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover/pcard:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />

      {/* Dynamic Cursor Light Spot Reflection */}
      <motion.div
        style={{
          background: isDarkTheme
            ? `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.05), transparent 50%)`
            : `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.03), transparent 50%)`,
          '--x': glowX,
          '--y': glowY
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 w-full h-full p-6 sm:p-7 flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}

// Typing Terminal Simulation Component inside Project Detail Console
function ConsoleTerminal({ activeProject, isOpen }) {
  const [logs, setLogs] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || !activeProject) {
      setLogs([]);
      setCurrentLineIndex(0);
      return;
    }

    const initialLogs = [
      `[SYS]: Establishing link to ${activeProject.name.toLowerCase().replace(/\s+/g, '')}.node...`,
      `[SYS]: Handshake protocol initiated...`,
      `[SYS]: Connection secured via SSL TLSv1.3 | Latency: ${activeProject.latency || '34ms'}`,
      `[SYS]: Fetching module blueprint and pipeline registry...`,
      `[SYS]: Environment: ${activeProject.category.toUpperCase()}`,
      `[SYS]: Main core stack loaded: [${activeProject.tech.join(', ')}]`,
      `[SYS]: Node Performance: ${activeProject.perfStats || '98.6% Optimization Score'}`,
      `[SYS]: Status telemetry check: CLEAR & READY.`,
      `[SYS]: Boot process finished. Ready for inspection.`
    ];

    setLogs([initialLogs[0]]);
    setCurrentLineIndex(1);

    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev < initialLogs.length) {
          setLogs((curr) => [...curr, initialLogs[prev]]);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, activeProject]);

  return (
    <div className="w-full h-full rounded-lg bg-black/90 border border-zinc-800 p-4 font-mono text-xs text-green-400 overflow-y-auto space-y-2 select-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)] max-h-[160px] md:max-h-none">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 text-zinc-500 text-[10px] tracking-wider uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
          Terminal Session active
        </span>
        <span>PORT: 5173</span>
      </div>
      <div className="space-y-1">
        {logs.map((log, index) => (
          <p key={index} className="leading-relaxed whitespace-pre-wrap">
            {log}
          </p>
        ))}
        {currentLineIndex < 9 && (
          <div className="inline-block w-1.5 h-4 bg-green-400 animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}

export default function Portfolio3D({ isDarkTheme = true }) {
  const [filter, setFilter] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Maha Laxmi Lab System',
      category: 'PRODUCTION',
      desc: 'High-throughput diagnostic lab management database system. Standardized diagnostic reports generation, patient database orchestration, and automatic notification dispatch modules.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
      url: 'https://mahaluxmilab.com/',
      stats: { Status: 'SHIPPED & LIVE', LoadTime: '< 150ms', PatientsCount: '10,000+' },
      latency: '28ms',
      perfStats: '99.8% Optimization / Clear Database Thread Indexing',
      glowColor: 'from-emerald-500/25 group-hover/pcard:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      borderGlow: 'bg-emerald-500',
      badgeColor: 'text-emerald-400 border-emerald-950/40 bg-emerald-950/20',
      img: project1Img
    },
    {
      id: 2,
      name: 'Tarun Kapoor Enterprise',
      category: 'PRODUCTION',
      desc: 'Elegant, modern digital showcase and corporate presence. Optimized layout structures, hardware-accelerated animated asset flows, and high performance scoring guidelines.',
      tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Stripe', 'PostgreSQL'],
      url: 'https://www.tarunkapoor.in/',
      stats: { Status: 'SHIPPED & LIVE', PageSpeed: '98/100', SEO: '100/100' },
      latency: '31ms',
      perfStats: 'Mobile Lock Safe Scaling / Smooth GPU Render Node',
      glowColor: 'from-cyan-500/25 group-hover/pcard:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
      borderGlow: 'bg-cyan-500',
      badgeColor: 'text-cyan-400 border-cyan-950/40 bg-cyan-950/20',
      img: project2Img
    },
    {
      id: 3,
      name: 'Mamta Nursery Digital',
      category: 'PRODUCTION',
      desc: 'Bespoke inventory management catalog. Formulated scalable item tags, lightning-fast database search queries, and custom asset layouts to coordinate local order flow.',
      tech: ['React', 'Bootstrap', 'Express', 'MongoDB', 'Cloudinary'],
      url: 'http://mamtanursery.com/',
      stats: { Status: 'SHIPPED & LIVE', ItemsStaged: '5,000+', Uptime: '99.95%' },
      latency: '38ms',
      perfStats: 'Cloud CDN Assets Optimized / Clean Search Engine Index',
      glowColor: 'from-teal-500/25 group-hover/pcard:shadow-[0_0_30px_rgba(20,184,166,0.2)]',
      borderGlow: 'bg-teal-500',
      badgeColor: 'text-teal-400 border-teal-950/40 bg-teal-950/20',
      img: project3Img
    },
    {
      id: 4,
      name: 'Furniture Rho Engine',
      category: 'STAGING',
      desc: 'Immersive WebGL interior layout and custom furniture visualizer config engine. Engineered procedural 3D model loaders with dynamic lighting matrices.',
      tech: ['React', 'Three.js', 'R3F', 'GSAP', 'TailwindCSS'],
      url: 'https://furniture-rho-murex.vercel.app/',
      stats: { Status: 'ACTIVE STAGING', FrameRate: '60 FPS', ModelsStaged: '40+' },
      latency: '24ms',
      perfStats: 'GPU Acceleration Matrix / Custom Shaders Compiled',
      glowColor: 'from-fuchsia-500/25 group-hover/pcard:shadow-[0_0_30px_rgba(217,70,239,0.2)]',
      borderGlow: 'bg-fuchsia-500',
      badgeColor: 'text-fuchsia-400 border-fuchsia-950/40 bg-fuchsia-950/20',
      img: project4Img
    },
    {
      id: 5,
      name: 'Elite Property Hub',
      category: 'STAGING',
      desc: 'Interactive real estate portal with advanced filtering modules, real-time map sync, and high-fidelity layout listings structured on lightweight components.',
      tech: ['React', 'Vite', 'TailwindCSS', 'Firebase', 'Swiper'],
      url: 'https://01-realstate.vercel.app',
      stats: { Status: 'ACTIVE STAGING', RenderLatency: '40ms', AssetsSecured: '100%' },
      latency: '45ms',
      perfStats: 'Firebase Database Real-time Sync / Responsive Grid Bounds',
      glowColor: 'from-yellow-500/25 group-hover/pcard:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
      borderGlow: 'bg-yellow-500',
      badgeColor: 'text-yellow-400 border-yellow-950/40 bg-yellow-950/20',
      img: project5Img
    }
  ];

  // Filtering Logic
  const filteredProjects = filter === 'ALL'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section
      id="portfolio"
      className={`w-full min-h-screen flex flex-col justify-center items-center py-28 max-w-7xl mx-auto px-6 sm:px-12 transition-colors duration-500 antialiased relative z-10 overflow-visible ${
        isDarkTheme ? 'bg-zinc-950 text-zinc-50' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />

      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="w-full flex flex-col items-center text-center mb-16 space-y-3 relative z-10">
        <div className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-500">
          PORTFOLIO.BUILDS
        </div>
        <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight uppercase text-zinc-100">
          Project Showcase
        </h2>
      </div>

      {/* FILTERS CONTROL PANEL */}
      <div className="flex items-center gap-3 p-1.5 bg-zinc-900/40 rounded-xl border border-zinc-800/60 font-mono text-xs mb-16 z-20">
        {['ALL', 'PRODUCTION', 'STAGING'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-lg font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              filter === cat
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-850/50'
            }`}
          >
            {cat === 'STAGING' ? 'Active Staging' : cat}
          </button>
        ))}
      </div>

      {/* 3D PERSPECTIVE PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-20 [perspective:1800px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, type: 'spring', damping: 20 }}
              className="w-full [transform-style:preserve-3d]"
            >
              <ProjectTiltCard
                onClick={() => setActiveProject(project)}
                glowColor={project.glowColor}
                isDarkTheme={isDarkTheme}
              >
                <div className="space-y-5">
                  {/* Card Header */}
                  <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3.5" style={{ transform: 'translateZ(30px)' }}>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold tracking-widest ${project.badgeColor}`}>
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold">NODE // 0{index + 1}</span>
                  </div>

                  {/* Project Screenshot Visualizer */}
                  <div className="my-1 relative w-full h-36 rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden group/img-container shadow-md" style={{ transform: 'translateZ(20px)' }}>
                    <img 
                      src={project.img} 
                      alt={project.name}
                      className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover/pcard:brightness-100 group-hover/pcard:scale-[1.06] transition-all duration-500 ease-out"
                    />
                    
                    {/* Grid Scanline Overlay for Cyberpunk display visual */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:100%_5px] pointer-events-none opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Quick Telemetry status overlay */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 font-mono text-[8px] font-bold text-zinc-200 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-sm shadow-inner">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.category === 'PRODUCTION' ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-amber-400 shadow-[0_0_6px_#f59e0b]'} animate-pulse`} />
                      {project.stats.Status}
                    </div>
                  </div>

                  {/* Project Meta Details */}
                  <div className="space-y-2.5" style={{ transform: 'translateZ(40px)' }}>
                    <h3 className="text-xl font-sans font-black tracking-tight text-zinc-150 uppercase group-hover/pcard:text-white transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="text-xs font-sans text-zinc-400 leading-relaxed font-normal line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Badges Row */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5" style={{ transform: 'translateZ(30px)' }}>
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-zinc-950/60 border border-zinc-850 text-[9px] font-mono text-zinc-400 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Row */}
                <div className="w-full border-t border-zinc-800/50 mt-6 pt-4 flex items-center justify-between" style={{ transform: 'translateZ(50px)' }}>
                  <button className="font-mono text-[10px] text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
                    Inspect Node
                    <i className="bx bx-right-arrow-alt text-xs group-hover/pcard:translate-x-1 transition-transform" />
                  </button>
                  <div className="w-7.5 h-7.5 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center justify-center text-zinc-500 group-hover/pcard:text-white group-hover/pcard:border-zinc-700 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <i className="bx bx-terminal text-sm" />
                  </div>
                </div>
              </ProjectTiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DETAIL CONSOLE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`w-full max-w-4xl rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ${
                isDarkTheme ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-950 border-slate-800'
              }`}
            >
              {/* Abstract decorative graphic line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] ${activeProject.borderGlow}`} />

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:text-white flex items-center justify-center transition-all shadow-inner cursor-pointer"
              >
                <i className="bx bx-x text-xl" />
              </button>

              {/* LEFT COLUMN: TELEMETRY DETAILS */}
              <div className="flex-1 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                      PROJECT.NODE // 0{activeProject.id}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white uppercase">
                      {activeProject.name}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {activeProject.desc}
                  </p>

                  <div className="space-y-2">
                    <h5 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Metrics Data :</h5>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(activeProject.stats).map(([k, v]) => (
                        <div key={k} className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl font-mono text-center">
                          <span className="block text-[8px] text-zinc-500 uppercase tracking-wider font-semibold">{k}</span>
                          <span className="block text-xs font-bold text-zinc-200 mt-1 whitespace-nowrap">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tactical Actions */}
                <div className="flex flex-wrap gap-4 pt-4 font-mono text-[11px] font-bold tracking-widest uppercase">
                  {/* Visit Node */}
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] ${
                      isDarkTheme 
                        ? 'bg-zinc-900 border-zinc-800 text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]' 
                        : 'bg-slate-900 border-slate-800 text-cyan-450 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    }`}
                  >
                    <span>Visit Live Node</span>
                    <i className="bx bx-link-external text-sm" />
                  </a>

                  {/* Close Session */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-6 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-900/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    Close Log Session
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: CONSOLE & SCREENSHOT FEED */}
              <div className="w-full md:w-[45%] flex flex-col gap-4 h-[350px] md:h-auto">
                {/* Visual Capture Node */}
                <div className="space-y-1.5">
                  <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1.5 select-none">
                    <i className="bx bx-window-open text-xs" />
                    Visual Node Capture Feed
                  </div>
                  <div className="relative w-full h-32 sm:h-36 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
                    <img 
                      src={activeProject.img} 
                      alt={activeProject.name}
                      className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none opacity-30" />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-sm text-[8px] text-cyan-400 font-mono tracking-widest shadow-lg">
                      FEED // SECURE
                    </div>
                  </div>
                </div>

                {/* Console Terminal */}
                <div className="flex-grow flex flex-col min-h-0">
                  <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5 select-none">
                    <i className="bx bx-terminal text-xs" />
                    Console Output
                  </div>
                  <div className="flex-grow min-h-[160px]">
                    <ConsoleTerminal activeProject={activeProject} isOpen={activeProject !== null} />
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}