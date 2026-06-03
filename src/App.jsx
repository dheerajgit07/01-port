import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import DikotaHQ from './components/DikotaHQ';
import Portfolio3D from './components/Portfolio3D';
import Contact from './components/Contact';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div 
      /* FIXED: 'snap-y' और 'snap-mandatory' को पूरी तरह हटा दिया गया है। 
         अब ब्राउज़र का स्क्रॉल इंजन पूरी तरह आज़ाद है, कोई भी सेक्शन पेज को लॉक नहीं कर पाएगा!
      */
      className={`min-h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth antialiased selection:bg-cyan-500 selection:text-black transition-colors duration-500 ${
        isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-slate-950 text-slate-100'
      }`}
    >
      
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      
      {/* सारे सेक्शन्स अब बिना किसी पाबंदी के स्मूथली स्क्रॉल होंगे */}
      <Hero isDarkTheme={isDarkTheme} />
      
      <About isDarkTheme={isDarkTheme} />
      
      <Services isDarkTheme={isDarkTheme} />
      
      <Skills isDarkTheme={isDarkTheme} />
      
      <DikotaHQ isDarkTheme={isDarkTheme} />
      
      <Portfolio3D isDarkTheme={isDarkTheme} />
      
      <Contact isDarkTheme={isDarkTheme} />
      
    </div>
  );
}