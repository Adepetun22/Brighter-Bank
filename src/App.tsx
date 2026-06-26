import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

import SupportPage from './pages/support';
import BusinessPage from './pages/business';
import LoansPage from './pages/loans';
import MortgagesPage from './pages/Mortgages';
import PersonaPage from './pages/Persona';
import HomePage from './pages/home';
import CreditCardsPage from './pages/credit-cards';
import CreditCardMatchPage from './pages/credit-card-match';
import InvestPage from './pages/investing';
import LoginPage from './pages/login';
import OpenAnAccountPage from './pages/open-an-account';
import ProfilePage from './pages/profile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function App() {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />

      <main className="flex-1">
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/open-an-account" element={<OpenAnAccountPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Default */}
          <Route path="/" element={<HomePage />} />

        </Routes>
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;
