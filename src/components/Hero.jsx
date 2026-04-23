import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingShapes from './FloatingShapes';

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
                paddingTop: '120px',
            }}
        >
            <FloatingShapes containerRef={containerRef} />

            {/* Minimal overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
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
                    {/* Terminal label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            letterSpacing: '0.2em',
                            marginBottom: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>SYS.QA_STABLE</span>
                        <div style={{ width: '40px', height: '1px', background: 'var(--color-text-dim)', opacity: 0.3 }} />
                        <span>TEST_ENVIRONMENT_ACTIVE</span>
                    </motion.div>

                    {/* Main Name */}
                    <motion.h1
                        className="hero-title"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(4rem, 15vw, 14rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.07em',
                            lineHeight: 0.8,
                            marginBottom: '40px',
                            color: 'var(--color-text-primary)',
                            position: 'relative'
                        }}
                    >
                        <span style={{ display: 'block' }}>ANAN</span>
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
                            height: '60px',
                            background: 'var(--color-accent)',
                            marginBottom: '24px',
                            originY: 0
                        }}
                    />

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1.1rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                            marginBottom: '32px',
                            fontWeight: 400
                        }}
                    >
                        Ensuring digital excellence through 
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}> automated precision</span> and 
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}> resilient testing</span> architectures.
                    </motion.p>

                    {/* Status indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        style={{
                            padding: '10px 16px',
                            background: 'var(--color-bg-raised)',
                            border: '1px solid var(--color-glass-border)',
                            borderRadius: '100px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-text-dim)',
                            letterSpacing: '0.05em',
                            marginBottom: '40px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#50fa7b', // Green for "Success/Stable"
                                boxShadow: '0 0 10px #50fa7b',
                            }}
                        />
                        SDET_ENGINEER // OPEN FOR COLLABORATION
                    </motion.div>

                    {/* Skills / System Capabilities Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(1, 1fr)',
                            gap: '24px',
                            borderTop: '1px solid var(--color-glass-border)',
                            paddingTop: '24px'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-accent)', letterSpacing: '0.1em' }}>[01] AUTOMATION_ENGINEERING</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                Playwright, Cypress, Selenium, Appium, PyTest, K6
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-accent)', letterSpacing: '0.1em' }}>[02] QUALITY_ASSURANCE</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                Manual Testing, API Testing (Postman), CI/CD, JIRA, Agile Methodologies
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-accent)', letterSpacing: '0.1em' }}>[03] TECHNICAL_STACK</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                JS, TS, Python, Go, React, Node, SQL, Git, Docker
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical text on the edge - Hidden on mobile via CSS */}
                <div className="hero-side-text">
                    EST. MMXXIV / / HUMAN DRIVEN DESIGN
                </div>
            </motion.div>
        </section>
    );
}
