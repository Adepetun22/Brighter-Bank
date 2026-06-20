import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import SupportPage from './pages/support';
import BusinessPage from './pages/business';
import LoansPage from './pages/loans';
import MortgagesPage from './pages/Mortgages';
import PersonaPage from './pages/Persona';
import HomePage from './pages/home';
import CreditCardsPage from './pages/credit-cards';
import InvestPage from './pages/investing';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function App() {
  return (
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
          <Route path="/personal" element={<PersonaPage />} />
          <Route path="/investing" element={<InvestPage />} />

          {/* Default */}
          <Route path="/" element={<HomePage />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
