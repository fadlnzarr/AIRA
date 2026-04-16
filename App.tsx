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
import { ClientIntake } from './pages/ClientIntake';
import { Login } from './pages/Login';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { CounterPreloader } from './components/ui/counter-preloader';
import { GrainBackground } from './components/ui/grain-background';
import { AuthProvider } from './src/lib/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Dashboard Imports
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Calls } from './pages/dashboard/Calls';
import { Leads } from './pages/dashboard/Leads';
import { Appointments } from './pages/dashboard/Appointments';
import { Settings } from './pages/dashboard/Settings';
import { Support } from './pages/dashboard/Support';
import { ClientManagement } from './pages/dashboard/ClientManagement';
import { Customers } from './pages/dashboard/Customers';

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
  const isLogin = location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      <CustomCursor />

      <CounterPreloader onLoadingComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className={!isDashboard && !isLogin ? "site-shell min-h-screen flex flex-col font-sans text-white selection:bg-[#d92514] selection:text-white animate-in fade-in duration-700" : ""}>
          {!isDashboard && !isLogin && <GrainBackground />}
          {!isDashboard && !isLogin && <Navbar />}

          <main className={!isDashboard && !isLogin ? "flex-grow" : ""}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname.split('/')[1]}>
                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Dashboard Routes (Protected) */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Overview />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="calls" element={<Calls />} />
                  <Route path="leads" element={<Leads />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="customers" element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <Customers />
                    </ProtectedRoute>
                  } />
                  <Route path="clients" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ClientManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="settings" element={<Settings />} />
                  <Route path="support" element={<Support />} />
                  <Route path="*" element={<Overview />} />
                </Route>

                {/* Public Website Routes */}
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
                <Route path="/demo" element={<PageTransition><Demo /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/booking-confirmed" element={<PageTransition><BookingConfirmation /></PageTransition>} />
                <Route path="/client-intake" element={<PageTransition><ClientIntake /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>

          {!isDashboard && !isLogin && <Footer />}
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;