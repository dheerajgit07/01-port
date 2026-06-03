import React from 'react';

export default function Footer() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center bg-black px-4">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-300">
        Want to design something legendary?
      </h2>
      <a href="mailto:hello@example.com" className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-lg">
        Get In Touch
      </a>
    </section>
  );
}