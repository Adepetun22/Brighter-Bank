import { Routes, Route, Navigate } from 'react-router-dom';

import SupportPage from './pages/support';
import BusinessPage from './pages/business';
import LoansPage from './pages/loans';
import MortgagesPage from './pages/Mortgages';
import HomePage from './pages/home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/mortgages" element={<MortgagesPage />} />

          {/* Default */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
