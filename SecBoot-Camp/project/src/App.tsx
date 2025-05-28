import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SoundProvider, useSoundContext } from './components/SoundContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Registration from './pages/Registration';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';
import CyberInnovatorsClub from './pages/CyberInnovatorsClub';
import SoundToggle from './components/SoundToggle';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function AppContent() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();
  const { playTransition } = useSoundContext();

  useEffect(() => {
    if (!isInitialLoad) {
      playTransition();
    } else {
      setIsInitialLoad(false);
    }
  }, [location.pathname, isInitialLoad, playTransition]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="bg-matrix fixed inset-0 pointer-events-none" />
      <Navbar />
      <SoundToggle />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cyber-innovators-club" element={<CyberInnovatorsClub />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <SoundProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </SoundProvider>
  );
}

export default App;