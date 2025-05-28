import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectOverview from './components/ProjectOverview';
import TeamSection from './components/TeamSection';
import RepositorySection from './components/RepositorySection';
import Footer from './components/Footer';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-base' : 'bg-neutral-100'} transition-colors duration-300`}>
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-neutral-800/80 text-neutral-100 hover:shadow-neon-blue transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <Navbar />
      <Hero />
      <ProjectOverview />
      <TeamSection />
      <RepositorySection />
      <Footer />
    </div>
  );
}

export default App;