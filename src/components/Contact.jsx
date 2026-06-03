import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact({ isDarkTheme = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const theme = {
    titleGlow: isDarkTheme 
      ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]' 
      : 'drop-shadow-[0_0_15px_rgba(232,121,249,0.35)]',
    inputBg: isDarkTheme
      ? 'bg-zinc-950/70 border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20'
      : 'bg-slate-950/70 border-slate-800 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-500/20',
    btnStyles: isDarkTheme 
      ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
      : 'border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(232,121,249,0.3)]'
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build WhatsApp message text with all form fields
    const text = [
      `🚀 *New Project Inquiry — Portfolio Contact*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      `📧 *Email:* ${formData.email}`,
      formData.address ? `📍 *Address:* ${formData.address}` : null,
      formData.phone   ? `📞 *Phone:* ${formData.phone}`   : null,
      ``,
      `💬 *Message:*`,
      formData.message,
    ]
      .filter(line => line !== null)
      .join('\n');

    // WhatsApp direct message link — +91 9813455636
    const waUrl = `https://wa.me/919813455636?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    setSent(true);
  };

  return (
    <section 
      id="contact" 
      className={`min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden transition-colors duration-500 z-10 ${
        isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20 pointer-events-none z-0" />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-2xl space-y-12 relative z-10">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
            SECURE.SIGNAL_TRANSMISSION
          </span>
          <h2 className={`text-3xl sm:text-5xl font-sans font-black tracking-tight uppercase ${theme.titleGlow}`}>
            Contact Command Center
          </h2>
        </motion.div>

        {/* Gaming Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20 }}
          className={`relative gaming-form rounded-2xl border p-6 sm:p-10 backdrop-blur-md shadow-2xl flex flex-col gap-6 ${
            isDarkTheme 
              ? 'border-zinc-900 bg-zinc-900/20 shadow-black/60' 
              : 'border-slate-900 bg-slate-900/20 shadow-black/40'
          }`}
        >
          {/* Decorative Corner Bolts */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rounded-full" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rounded-full" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rounded-full" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rounded-full" />

          {/* Success confirmation banner */}
          {sent && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-800/60 bg-emerald-950/30 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Signal transmitted! WhatsApp is opening with your message...
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="input-grid grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SIGNAL.SOURCE_NAME :</span>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                required 
                className={`w-full p-4 rounded-xl border font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${theme.inputBg}`}
              />
            </div>
            
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SIGNAL.SOURCE_EMAIL :</span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                required 
                className={`w-full p-4 rounded-xl border font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${theme.inputBg}`}
              />
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SIGNAL.SOURCE_LOCATION :</span>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your Address" 
                className={`w-full p-4 rounded-xl border font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${theme.inputBg}`}
              />
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SIGNAL.SOURCE_COMMUNICATION :</span>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number" 
                className={`w-full p-4 rounded-xl border font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${theme.inputBg}`}
              />
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-1.5 w-full">
            <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SIGNAL.PAYLOAD_MESSAGE :</span>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="msg" 
              cols={30} 
              rows={6} 
              placeholder="Your Message" 
              required 
              className={`w-full p-4 rounded-xl border font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-none ${theme.inputBg}`}
            />
          </div>

          {/* WhatsApp target info badge */}
          <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            <i className="bx bxl-whatsapp text-green-500 text-sm" />
            Signal will be routed to WhatsApp: +91 98134 55636
          </div>

          {/* Submit Button */}
          <div className="btn-box formBtn flex justify-center pt-1">
            <button 
              type="submit" 
              className={`px-8 py-4 rounded-xl border font-bold font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${theme.btnStyles}`}
            >
              <i className="bx bxl-whatsapp text-base mr-2 align-middle" />
              Execute Send Signal
            </button>
          </div>

        </motion.form>
      </div>
    </section>
  );
}