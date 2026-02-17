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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hysteresis: Scroll down > 50 to collapse, scroll up < 30 to expand
      // to avoid rapid toggling around a single pixel line.
      if (!scrolled && scrollY > 50) {
        setScrolled(true);
      } else if (scrolled && scrollY < 30) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Determine theme based on route
  const isDarkRoute = ['/demo', '/contact', '/booking-confirmed'].includes(location.pathname);
  const textColor = isDarkRoute ? 'text-white' : 'text-black';
  const borderColor = isDarkRoute ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
  // Glass background: Semi-transparent for true frosted glass
  const glassBg = isDarkRoute
    ? 'rgba(10, 10, 10, 0.55)'
    : 'rgba(255, 255, 255, 0.45)';
  // Dropdown text colors that adapt to route
  const menuTextColor = isDarkRoute ? 'text-white' : 'text-black';
  const menuTextMuted = isDarkRoute ? 'text-white/70' : 'text-black/70';
  const menuLabelColor = isDarkRoute ? 'text-white/40' : 'text-black/40';
  const menuBorderColor = isDarkRoute ? 'border-white/10' : 'border-black/10';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav
        className="navbar-container pointer-events-auto relative z-50"
        initial={false}
        // STRATEGY: Animate max-width from a large pixel value to small pixel value.
        // We use 1600px (desktop max) vs 280px (collapsed).
        // The parent padding (px-4 = 32px total) handles the screen edge spacing naturally.
        animate={{
          maxWidth: scrolled ? 280 : 1600,
          width: '100%'
        }}
        transition={{
          duration: scrolled ? 0.5 : 0.9,

          // EASING: Controls "how fast" at different points.
          // Format: [start_delay, start_speed, end_delay, end_speed] (roughly)
          // 1st number (0.8): Higher = Slower start (delayed acceleration)
          // 3rd mumber (0.2): Lower = Faster into the end (less braking)
          // 4th number (1.0): Should be 1.0 for smooth stop. (0.85 might undershoot)
          ease: scrolled
            ? [0.25, 0.1, 0.25, 1] // Collapse (keep snappy)
            : [0.8, -0.09, 1, 0],    // Expand: Your current "Slow Start -> Fast Middle -> Slow End" curve
        }}
        style={{
          width: '100%', // Continually stretched to limit but constrained by maxWidth
        }}
      >
        {/* Main Toolbar - Premium Frosted Glass */}
        <motion.div
          className="relative overflow-hidden rounded-full"
          style={{
            background: glassBg,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkRoute
              ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
          }}
        >
          <div className="flex items-center justify-between px-6 h-14 w-full">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout="position"
            >
              <LogoIcon className="w-6 h-6 text-[#d92514]" />
              <motion.span
                className={`font-serif italic font-bold text-lg tracking-tight ${textColor} whitespace-nowrap`}
                layout="position"
              >
                AIRA
              </motion.span>
            </motion.div>

            {/* Desktop Nav Links - Always mounted, animate opacity/pointers */}
            <motion.div
              className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
              animate={{
                opacity: scrolled ? 0 : 1,
                pointerEvents: scrolled ? 'none' : 'auto',
                y: scrolled ? 20 : 0,
                scale: scrolled ? 0.9 : 1
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs font-sans font-medium uppercase tracking-widest transition-all duration-300 relative group whitespace-nowrap ${isActive ? 'text-[#d92514]' : `${isDarkRoute ? 'text-white/60' : 'text-black/60'} hover:text-[#d92514]`
                    }`
                  }
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#d92514] transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </NavLink>
              ))}
            </motion.div>

            {/* Menu Button - Always mounted, animate opacity/pointers */}
            <div className="flex items-center justify-end">
              <motion.button
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 ${isMenuOpen ? 'bg-[#d92514]/10 text-[#d92514]' : `hover:bg-[#d92514]/5 hover:text-[#d92514] ${textColor}`}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                // Show on mobile always, or on desktop when scrolled
                animate={{
                  opacity: (scrolled || isMenuOpen || window.innerWidth < 768) ? 1 : 0,
                  scale: (scrolled || isMenuOpen || window.innerWidth < 768) ? 1 : 0.8,
                  pointerEvents: (scrolled || isMenuOpen || window.innerWidth < 768) ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className={`w-5 h-5 ${isDarkRoute ? 'text-white' : 'text-black'}`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className={`w-5 h-5 ${isDarkRoute ? 'text-white' : 'text-black'}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Expanded Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute left-0 right-0 mt-2 overflow-hidden rounded-3xl"
              style={{
                // PREMIUM FROSTED GLASS DROPDOWN
                background: isDarkRoute ? 'rgba(10, 10, 10, 0.65)' : 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: `1px solid ${borderColor}`,
                boxShadow: isDarkRoute
                  ? '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  : '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
              initial={{ opacity: 0, y: -10, maxHeight: 0 }}
              animate={{ opacity: 1, y: 0, maxHeight: 500 }} // Explicit height
              exit={{ opacity: 0, y: -10, maxHeight: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <div className="p-6">
                {/* Menu Label */}
                <motion.p
                  className={`text-xs font-sans uppercase tracking-widest ${menuLabelColor} mb-4`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Menu
                </motion.p>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block text-2xl font-semibold transition-all duration-200 ${isActive
                            ? (isDarkRoute ? 'text-white' : 'text-black')
                            : `${menuTextMuted} ${isDarkRoute ? 'hover:text-white' : 'hover:text-black'} hover:translate-x-2`
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Section */}
                <motion.div
                  className={`mt-8 pt-6 border-t ${menuBorderColor} grid grid-cols-2 gap-6`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div>
                    <p className={`text-xs font-sans uppercase tracking-widest ${menuLabelColor} mb-2`}>
                      Get Started
                    </p>
                    <button
                      onClick={() => {
                        navigate('/contact');
                        setIsMenuOpen(false);
                      }}
                      className={`text-sm font-medium ${menuTextMuted} ${isDarkRoute ? 'hover:text-white' : 'hover:text-black'} transition-colors text-left`}
                    >
                      Schedule a call →
                    </button>
                  </div>
                  <div>
                    <p className={`text-xs font-sans uppercase tracking-widest ${menuLabelColor} mb-2`}>
                      Demo
                    </p>
                    <button
                      onClick={() => {
                        navigate('/demo');
                        setIsMenuOpen(false);
                      }}
                      className={`text-sm font-medium ${menuTextMuted} ${isDarkRoute ? 'hover:text-white' : 'hover:text-black'} transition-colors text-left`}
                    >
                      Try AIRA now →
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav >
    </div >
  );
};