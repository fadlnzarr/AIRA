import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { Demo } from './pages/Demo';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { CounterPreloader } from './components/ui/counter-preloader';
import { GrainBackground } from './components/ui/grain-background';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
          <Route path="/demo" element={<PageTransition><Demo /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/booking-confirmed" element={<PageTransition><BookingConfirmation /></PageTransition>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor />

      <CounterPreloader onLoadingComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="site-shell min-h-screen flex flex-col font-sans text-white selection:bg-[#d92514] selection:text-white animate-in fade-in duration-700">
          <GrainBackground />
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      )}
    </HashRouter>
  );
};

export default App;