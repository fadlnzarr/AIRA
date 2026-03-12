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

// Dashboard Imports
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Calls } from './pages/dashboard/Calls';
import { Leads } from './pages/dashboard/Leads';
import { Appointments } from './pages/dashboard/Appointments';
import { Settings } from './pages/dashboard/Settings';
import { Support } from './pages/dashboard/Support';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      <ScrollToTop />
      <CustomCursor />

      <CounterPreloader onLoadingComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className={!isDashboard ? "site-shell min-h-screen flex flex-col font-sans text-white selection:bg-[#d92514] selection:text-white animate-in fade-in duration-700" : ""}>
          {!isDashboard && <GrainBackground />}
          {!isDashboard && <Navbar />}

          <main className={!isDashboard ? "flex-grow" : ""}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname.split('/')[1]}> {/* Key on top-level segment to prevent re-animating nested routes deeply */}
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="calls" element={<Calls />} />
                  <Route path="leads" element={<Leads />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="support" element={<Support />} />
                  {/* Add more dashboard sub-routes here as needed */}
                  <Route path="*" element={<Overview />} />
                </Route>

                {/* Public Website Routes */}
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
                <Route path="/demo" element={<PageTransition><Demo /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/booking-confirmed" element={<PageTransition><BookingConfirmation /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>

          {!isDashboard && <Footer />}
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;