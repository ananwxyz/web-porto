import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="grid-bg"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: '80px',
                backgroundImage: 'url("/glass-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    pointerEvents: 'none',
                }}
            />

            <motion.div
                className="hero-grid"
                style={{
                    opacity: heroOpacity,
                    scale: heroScale,
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 20px',
                }}
            >
                <div style={{ textAlign: 'left' }}>
                    {/* Subtle role label */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#ffffff',
                            letterSpacing: '0.15em',
                            marginBottom: '24px',
                            textTransform: 'uppercase',
                        }}
                    >
                        QA Engineer
                    </motion.p>

                    {/* Main Name */}
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            lineHeight: 0.85,
                            marginBottom: '40px',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        Anan
                    </motion.h1>
                </div>

                <div className="hero-subtitle-container" style={{ textAlign: 'left', paddingBottom: '20px' }}>
                    <motion.div
                        className="hero-accent-line"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            width: '2px',
                            height: '48px',
                            background: 'var(--color-accent-dim)',
                            marginBottom: '24px',
                            originY: 0
                        }}
                    />

                    {/* Description — first person, natural */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1.05rem',
                            color: '#ffffff',
                            lineHeight: 1.75,
                            maxWidth: '500px',
                            marginBottom: '32px',
                        }}
                    >
                        I work in software quality assurance, helping teams ship reliable products through manual and automated testing. I collaborate closely with developers to catch defects early, validate functionality, and keep quality standards high throughout the development lifecycle.
                    </motion.p>

                    {/* Availability — simple and honest */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                            color: '#ffffff',
                        }}
                    >
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#50fa7b',
                                boxShadow: '0 0 8px #50fa7b',
                                flexShrink: 0,
                            }}
                        />
                        Open to opportunities
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
