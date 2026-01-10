import React from 'react';
import { NavLink } from 'react-router-dom';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { LogoIcon } from './Navbar'; // Import the shared logo icon

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
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