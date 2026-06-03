import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function DikotaHQ({ isDarkTheme = true }) {
  const containerRef = useRef(null);

  // Premium 3D Perspective Card Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Top Telemetry Counters Data
  const telemetryCounters = [
    { value: '7 Nodes', text: 'Active Operations Monitored', glow: '#12f7ff', textColor: 'text-cyan-400' },
    { value: 'CLEARED', text: 'Production Invoices Settled', glow: '#00ff66', textColor: 'text-emerald-400' },
    { value: 'ADVANCE', text: 'Staging Milestones Secured', glow: '#ffcc00', textColor: 'text-amber-400' }
  ];

  // Professional Architecture Lifecycle Log Array (All Projects Synchronized)
  const operationalLedger = [
    {
      nodeName: 'Medical & Surgical Equipment Core',
      clusterType: 'ACTIVE STAGING',
      clusterStyle: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
      progress: 65,
      progressColor: 'bg-amber-500 shadow-[0_0_8px_#ffcc00]',
      lifecycleStatus: '65% Supply Chain Framework Configured',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Milestone Advance Secured',
      settleColor: 'text-amber-400',
      settleSub: 'Remittance Cycle Active',
      vectorText: 'Review Infrastructure',
      vectorLink: '#',
      vectorStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      nodeName: 'Hollyheart Global School Portal',
      clusterType: 'ACTIVE STAGING',
      clusterStyle: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
      progress: 50,
      progressColor: 'bg-amber-500 shadow-[0_0_8px_#ffcc00]',
      lifecycleStatus: '50% Next-Gen Portal Core Built',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Milestone Advance Secured',
      settleColor: 'text-amber-400',
      settleSub: 'Database Integration Phase',
      vectorText: 'Review Staging',
      vectorLink: '#',
      vectorStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      nodeName: 'Vanvraiksha Green Management',
      clusterType: 'ACTIVE STAGING',
      clusterStyle: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
      progress: 75,
      progressColor: 'bg-amber-500 shadow-[0_0_8px_#ffcc00]',
      lifecycleStatus: '75% Assets Optimization Layer Staged',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Milestone Advance Secured',
      settleColor: 'text-amber-400',
      settleSub: 'Final Assets Audit Active',
      vectorText: 'Review Staging',
      vectorLink: '#',
      vectorStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      nodeName: 'Maha Laxmi Lab System',
      clusterType: 'PRODUCTION MAINNET',
      clusterStyle: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60',
      progress: 100,
      progressColor: 'bg-emerald-500 shadow-[0_0_8px_#00ff66]',
      lifecycleStatus: '100% SHIPPED & LIVE',
      lifecycleColor: 'text-emerald-400',
      settleState: '100% Contract Cleared',
      settleColor: 'text-emerald-400',
      settleSub: 'Invoice Closed',
      vectorText: 'Live Custom .Com',
      vectorLink: 'https://mahaluxmilab.com/',
      vectorStyle: 'bg-emerald-500 hover:bg-emerald-600 text-black border-emerald-500'
    },
    {
      nodeName: 'Tarun Kapoor Enterprise',
      clusterType: 'PRODUCTION MAINNET',
      clusterStyle: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60',
      progress: 100,
      progressColor: 'bg-emerald-500 shadow-[0_0_8px_#00ff66]',
      lifecycleStatus: '100% SHIPPED & LIVE',
      lifecycleColor: 'text-emerald-400',
      settleState: '100% Contract Cleared',
      settleColor: 'text-emerald-400',
      settleSub: 'Invoice Closed',
      vectorText: 'Live Custom .In',
      vectorLink: 'https://www.tarunkapoor.in/',
      vectorStyle: 'bg-emerald-500 hover:bg-emerald-600 text-black border-emerald-500'
    },
    {
      nodeName: 'Mamta Nursery Digital',
      clusterType: 'PRODUCTION MAINNET',
      clusterStyle: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60',
      progress: 100,
      progressColor: 'bg-emerald-500 shadow-[0_0_8px_#00ff66]',
      lifecycleStatus: '100% SHIPPED & LIVE',
      lifecycleColor: 'text-emerald-400',
      settleState: '100% Contract Cleared',
      settleColor: 'text-emerald-400',
      settleSub: 'Invoice Closed',
      vectorText: 'Live Custom .Com',
      vectorLink: 'http://mamtanursery.com/',
      vectorStyle: 'bg-emerald-500 hover:bg-emerald-600 text-black border-emerald-500'
    },
    {
      nodeName: 'Elite Property Hub',
      clusterType: 'ACTIVE STAGING',
      clusterStyle: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
      progress: 40,
      progressColor: 'bg-amber-500 shadow-[0_0_8px_#ffcc00]',
      lifecycleStatus: '40% Client Infrastructure Build',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Milestone 1 Advance Secured',
      settleColor: 'text-amber-400',
      settleSub: 'Remittance Cycle Active',
      vectorText: 'Review Staging',
      vectorLink: 'https://01-realstate.vercel.app',
      vectorStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      nodeName: 'Furniture Rho Engine',
      clusterType: 'ACTIVE STAGING',
      clusterStyle: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
      progress: 90,
      progressColor: 'bg-amber-500 shadow-[0_0_8px_#ffcc00]',
      lifecycleStatus: '90% Client Architecture Staged',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Milestone 1 Advance Secured',
      settleColor: 'text-amber-400',
      settleSub: 'Final Remittance Pending Review',
      vectorText: 'Review Staging',
      vectorLink: 'https://furniture-rho-murex.vercel.app/',
      vectorStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      nodeName: 'Dikota Core Architecture',
      clusterType: 'INTERNAL TESTING SANDBOX',
      clusterStyle: 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60',
      progress: 100,
      progressColor: 'bg-zinc-500',
      lifecycleStatus: 'CI/CD Continuous Optimization Node',
      lifecycleColor: 'text-zinc-400',
      settleState: 'Self-Managed Instance',
      settleSub: 'Non-Commercial Sandbox',
      vectorText: 'Testing Build',
      vectorLink: 'https://dikota-all.vercel.app/',
      vectorStyle: 'bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 border-zinc-700 opacity-60'
    }
  ];

  return (
    <section 
      id="dikotahq" 
      className={`min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 sm:px-12 relative overflow-hidden transition-colors duration-500 z-10 ${
        isDarkTheme ? 'bg-zinc-950' : 'bg-slate-950'
      }`}
    >
      {/* CSS Injection for Smooth Moving Light Border Glow */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes movingGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .moving-light-container {
          position: relative;
          background: rgba(9, 9, 11, 0.4);
        }
        .moving-light-container::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(90deg, #12f7ff, #ffcc00, #00ff66, #f43f5e, #12f7ff);
          background-size: 400% 400%;
          animation: movingGlow 8s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}} />

      {/* Cyber Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      <div className="w-full max-w-6xl space-y-10 relative z-10">
        
        {/* SECTION TITLE HEADER */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-1"
        >
          <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
            DIKOTA.SYSTEM_TELEMETRY
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
            Dikota Operations HQ
          </h2>
        </motion.div>

        {/* ENTERPRISE TELEMETRY MATRIX COUNTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {telemetryCounters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className={`rounded-2xl p-6 text-center border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                isDarkTheme ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/40' : 'bg-slate-900/40 border-slate-800/80 shadow-black/20'
              }`}
            >
              <span 
                className={`text-4xl font-black font-mono block tracking-wide ${counter.textColor}`}
                style={{ filter: `drop-shadow(0 0 10px ${counter.glow}50)` }}
              >
                {counter.value}
              </span>
              <p className="font-sans text-xs font-semibold text-zinc-400 tracking-wider mt-2 uppercase">
                {counter.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MOVING LIGHT BORDER 3D LEDGER PANEL */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10px' }}
          className="w-full rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300 moving-light-container [perspective:1200px]"
        >
          {/* Glassmorphism Inner Gradient Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/0 pointer-events-none" />

          <div className="overflow-x-auto w-full p-2 sm:p-4">
            <table className="w-full border-collapse text-left min-w-[850px] font-sans">
              
              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-zinc-800/80 text-cyan-400 uppercase tracking-widest font-mono text-[10px] font-bold">
                  <th className="p-4">Deployment Node / Scope</th>
                  <th className="p-4">Pipeline Cluster Type</th>
                  <th className="p-4">Build Lifecycle Status</th>
                  <th className="p-4">Financial Settle-State</th>
                  <th className="p-4 text-right">Deployment Vector</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="text-zinc-300 text-sm divide-y divide-zinc-900/60 font-medium">
                {operationalLedger.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-zinc-900/40 transition-colors duration-200 group/row"
                  >
                    {/* Node Name */}
                    <td className="p-4 font-bold text-white tracking-wide group-hover/row:text-cyan-400 transition-colors duration-200">
                      {row.nodeName}
                    </td>

                    {/* Cluster Badge */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded border text-[10px] font-mono font-bold tracking-wider ${row.clusterStyle}`}>
                        {row.clusterType}
                      </span>
                    </td>

                    {/* Lifecycle Status & Loading Bar */}
                    <td className="p-4">
                      <div className="w-32 bg-zinc-800/60 h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${row.progressColor}`} 
                          style={{ width: `${row.progress}%` }} 
                        />
                      </div>
                      <span className={`text-[11px] font-mono font-bold block ${row.lifecycleColor || 'text-zinc-400'}`}>
                        {row.lifecycleStatus}
                      </span>
                    </td>

                    {/* Financial Status */}
                    <td className="p-4 font-sans text-xs">
                      <span className={`font-bold block ${row.settleColor || 'text-zinc-200'}`}>
                        {row.settleState}
                      </span>
                      <span className="text-[11px] text-zinc-500 block mt-0.5 font-medium">
                        {row.settleSub}
                      </span>
                    </td>

                    {/* Deployment Action Button */}
                    <td className="p-4 text-right">
                      <a 
                        href={row.vectorLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-block px-3.5 py-1.5 rounded font-mono text-[11px] font-bold tracking-wider border transition-all duration-300 hover:scale-[1.05] shadow-lg ${row.vectorStyle}`}
                      >
                        {row.vectorText}
                      </a>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}