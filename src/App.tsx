import SupportPage from './pages/support';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <SupportPage />
      <Footer />
    </div>
  );
}