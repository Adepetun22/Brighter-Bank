import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

const SupportPage = lazy(() => import('./pages/support'));
const BusinessPage = lazy(() => import('./pages/business'));
const AdvisorPage = lazy(() => import('./pages/advisor'));
const LoansPage = lazy(() => import('./pages/loans'));
const MortgagesPage = lazy(() => import('./pages/Mortgages'));
const PersonaPage = lazy(() => import('./pages/Persona'));
const HomePage = lazy(() => import('./pages/home'));
const CreditCardsPage = lazy(() => import('./pages/credit-cards'));
const CreditCardMatchPage = lazy(() => import('./pages/credit-card-match'));
const InvestPage = lazy(() => import('./pages/investing'));
const LoginPage = lazy(() => import('./pages/login'));
const OpenAnAccountPage = lazy(() => import('./pages/open-an-account'));
const ProfilePage = lazy(() => import('./pages/profile'));
const CheckingLearnMorePage = lazy(() => import('./pages/learn-more/checking'));
const SavingsLearnMorePage = lazy(() => import('./pages/learn-more/savings'));
const CreditCardsLearnMorePage = lazy(() => import('./pages/learn-more/credit-cards'));


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function App() {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen pt-9">
      <ScrollToTop />
      <div className="bg-yellow-400 text-black text-center text-sm py-2 px-4 font-medium fixed top-0 left-0 right-0 z-50">
        ⚠️ This is a demo website for portfolio purposes only. Not a real bank. No real financial services are offered.
      </div>

      <Navigation />

      <main className="flex-1">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-slate">Loading…</div>}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/mortgages" element={<MortgagesPage />} />
            <Route path="/credit-cards" element={<CreditCardsPage />} />
            <Route path="/credit-cards/match" element={<CreditCardMatchPage />} />
            <Route path="/personal" element={<PersonaPage />} />
            <Route path="/investing" element={<InvestPage />} />
            <Route path="/advisor" element={<AdvisorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/open-an-account" element={<OpenAnAccountPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/learn-more/checking" element={<CheckingLearnMorePage />} />
            <Route path="/learn-more/savings" element={<SavingsLearnMorePage />} />
            <Route path="/learn-more/credit-cards" element={<CreditCardsLearnMorePage />} />


            {/* Default */}
            <Route path="/" element={<HomePage />} />

          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;
