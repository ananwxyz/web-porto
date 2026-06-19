/*
 ══════════════════════════════════════════════════════
  ARCHIVED — original App.jsx imports and component
  See individual component files for archived code
 ══════════════════════════════════════════════════════

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

 ══════════════════════════════════════════════════════
  END ARCHIVED
 ══════════════════════════════════════════════════════
*/

import React, { useEffect, useState } from 'react';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Stagger the fade-in
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="reserved-page">
      {/* Ambient glow orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* Content */}
      <main className={`reserved-content ${mounted ? 'visible' : ''}`}>

        {/* Logo mark */}
        <div className="reserved-logo" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="48" height="48">
            <path
              d="M85 25C75 25 65 35 55 50C45 65 35 75 25 75C10 75 10 50 25 25C35 15 55 35 65 50C75 65 85 75 95 75"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Main heading */}
        <h1 className="reserved-title">
          This Web Has Been
          <span className="reserved-title-accent"> Reserved.</span>
        </h1>

        {/* Funny copy */}
        <div className="reserved-body">
          <p>
            The developer is currently touching grass and rediscovering
            what sunlight feels like.
          </p>
          <p>
            Normal service will resume when they remember their Git password.
          </p>
          <p className="reserved-vibe">
            In the meantime, this domain is just vibing.<br />
            No features. No bugs. Just peace. ✌️
          </p>
        </div>

        {/* Divider */}
        <div className="reserved-divider" aria-hidden="true" />

        {/* Footer */}
        <footer className="reserved-footer">
          <p>© 2026 • powered by mass procrastination and instant noodles</p>
        </footer>
      </main>
    </div>
  );
}
