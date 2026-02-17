import React, { useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { LogoIcon } from './Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin ONCE
gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  // Exactly two refs as required
  const footerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const word = wordRef.current;

    if (!footer || !word) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Set initial position - word starts below
      gsap.set(word, { yPercent: 50 });

      // Create ONE pinned ScrollTrigger
      gsap.to(word, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom bottom+=1000',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          // markers: true, // Uncomment for debugging
        },
      });
    }, footer);

    // Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-black text-white min-h-[100vh]"
    >
      {/* ============================================ */}
      {/* B) Wordmark Layer - absolute z-0 behind     */}
      {/* ============================================ */}
      <div className="absolute inset-x-0 bottom-[10vh] z-0 pointer-events-none flex items-center justify-center gap-6">
        <div
          ref={wordRef}
          className="flex items-center justify-center gap-6 will-change-transform"
        >
          {/* Logo Icon */}
          <div className="text-white/10" style={{ width: 'clamp(80px, 12vw, 200px)', height: 'clamp(80px, 12vw, 200px)' }}>
            <LogoIcon className="w-full h-full" />
          </div>
          {/* AIRA Text */}
          <span
            className="font-serif italic font-bold text-white/10 whitespace-nowrap leading-none tracking-tight"
            style={{
              fontSize: 'clamp(96px, 18vw, 320px)',
            }}
          >
            AIRA
          </span>
        </div>
      </div>

      {/* Bottom gradient mask - word emerges from here */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.95) 30%, transparent 100%)',
        }}
      />

      {/* ============================================ */}
      {/* A) Top Content Layer - relative z-10        */}
      {/* ============================================ */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-white">
                <LogoIcon className="w-full h-full" />
              </div>
              <span className="font-serif italic font-bold text-4xl tracking-tight text-white">AIRA</span>
            </div>
            <p className="text-white/60 text-lg leading-relaxed font-sans max-w-md">
              Constructing the interface between human intent and artificial intelligence.
              <br /><span className="text-white mt-2 block">Zero latency. Infinite scale.</span>
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center border-white/20 hover:border-white">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center border-white/20 hover:border-white">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="text-white font-serif italic font-light text-xl mb-6">Explore</h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <NavLink to={item.path} className="text-white/50 hover:text-white text-sm font-sans uppercase tracking-widest transition-colors">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-white font-serif italic font-light text-xl mb-6">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-white/60 group cursor-pointer">
                <Mail className="w-5 h-5 text-white mt-1" />
                <div>
                  <span className="block text-white font-sans text-sm font-bold uppercase tracking-wider mb-1">Email</span>
                  <span className="font-serif italic text-lg group-hover:text-white transition-colors">contact@airasystems.co</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-white/60 group cursor-pointer">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <div>
                  <span className="block text-white font-sans text-sm font-bold uppercase tracking-wider mb-1">Studio</span>
                  <span className="font-serif italic text-lg group-hover:text-white transition-colors">Ontario, CA</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-sans uppercase tracking-widest">
            © {new Date().getFullYear()} AIRA Agency.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-white/30 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};