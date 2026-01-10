import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';

// New "Audio Peak" Logo Design
// Represents AI Voice (equalizer bars) forming an abstract 'A' shape
export const LogoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Central Pillar - The core AI */}
    <rect x="10.5" y="3" width="3" height="18" rx="1.5" fill="currentColor" />
    {/* Mid Pillars - Voice modulation */}
    <rect x="5.5" y="8" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.7" />
    <rect x="15.5" y="8" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.7" />
    {/* Outer Pillars - Resonance */}
    <rect x="0.5" y="11" width="3" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
    <rect x="20.5" y="11" width="3" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${
        scrolled || isOpen ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 h-20' : 'bg-transparent h-28'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Transition Container */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center relative h-10"
            onClick={() => navigate('/')}
          >
            <AnimatePresence mode="wait">
              {!scrolled ? (
                <motion.div
                  key="text-logo"
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <LogoIcon className="w-8 h-8 text-white" />
                  <span className="font-serif italic font-bold text-3xl tracking-tight text-white">AIRA</span>
                </motion.div>
              ) : (
                <motion.div
                  key="icon-logo"
                  initial={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, y: 10, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0"
                >
                  <LogoIcon className="w-10 h-10 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-sans font-medium uppercase tracking-widest transition-all duration-300 relative group ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                  <span className={`absolute -bottom-2 left-0 h-px bg-white transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" variant="secondary" onClick={() => navigate('/contact')} icon={<ArrowRight className="w-4 h-4" />}>
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black fixed inset-0 z-40 pt-24 px-4"
          >
            <div className="space-y-6">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `block text-4xl font-serif italic font-bold ${
                      isActive
                        ? 'text-white'
                        : 'text-white/50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-12">
                 <Button className="w-full" onClick={() => navigate('/contact')}>Book a Call</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};