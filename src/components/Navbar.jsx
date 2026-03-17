import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AlphaLogo from './AlphaLogo';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Investment', href: '#investment' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1000,
                padding: '0 40px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-glass-border)',
            }}
        >
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <AlphaLogo size={32} color="var(--color-text-primary)" />
            </motion.div>

            {/* Desktop Links */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }}
                className="desktop-nav"
            >
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.05em',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-accent)';
                            e.target.style.background = 'var(--color-accent-glow)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = 'var(--color-text-secondary)';
                            e.target.style.background = 'transparent';
                        }}
                    >
                        {link.label}
                    </motion.a>
                ))}
            </div>

            {/* Mobile Hamburger */}
            <button
                className="mobile-nav-toggle"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent)',
                    cursor: 'pointer',
                    padding: '8px',
                    zIndex: 1001,
                }}
                aria-label="Toggle navigation"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '280px',
                            height: '100vh',
                            background: 'rgba(5, 5, 5, 0.95)',
                            backdropFilter: 'blur(30px)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '24px',
                            borderLeft: '1px solid var(--color-glass-border)',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '12px 32px',
                                    transition: 'color 0.3s ease',
                                    letterSpacing: '0.05em',
                                }}
                                onMouseEnter={(e) => { e.target.style.color = 'var(--color-accent)'; }}
                                onMouseLeave={(e) => { e.target.style.color = 'var(--color-text-secondary)'; }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
}
