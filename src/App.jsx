import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Investment from './components/Investment';
import Contact from './components/Contact';
import DatePlanner from './components/DatePlanner';

export default function App() {
  const [isDatePlanner, setIsDatePlanner] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (
        hostname.includes('datewith') || 
        pathname.startsWith('/datewith') || 
        hash.includes('datewith')
      ) {
        setIsDatePlanner(true);
      } else {
        setIsDatePlanner(false);
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  if (isDatePlanner) {
    return (
      <DatePlanner 
        onBack={() => {
          setIsDatePlanner(false);
          window.location.hash = '';
          // fallback if they used paths
          if (window.location.pathname.startsWith('/datewith')) {
            window.history.pushState(null, '', '/');
          }
        }} 
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Portfolio />
      <Investment />
      <Contact />
    </div>
  );
}
