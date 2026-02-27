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
            }}
        >
            <FloatingShapes containerRef={containerRef} />

            {/* Radial gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(80, 250, 123, 0.04) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}
            >
                {/* Terminal label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-dim)',
                        letterSpacing: '0.15em',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                    }}
                >
                    <span style={{ color: 'var(--color-accent)' }}>$</span> ~/portfolio
                </motion.div>

                {/* Main Name */}
                <motion.h1
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 10rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.06em',
                        lineHeight: 0.9,
                        marginBottom: '24px',
                    }}
                >
                    <span className="text-gradient">anan</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto 32px',
                        lineHeight: 1.7,
                        letterSpacing: '0.02em',
                    }}
                >
                    Building digital experiences at the intersection of
                    <span style={{ color: 'var(--color-accent)' }}> technology</span> and
                    <span style={{ color: 'var(--color-mint)' }}> finance</span>
                </motion.p>

                {/* Status indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-dim)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    <span
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                            boxShadow: '0 0 8px var(--color-accent)',
                            display: 'inline-block',
                        }}
                    />
                    Available for projects
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
                    style={{
                        position: 'absolute',
                        bottom: '-120px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-dim)', letterSpacing: '0.15em' }}>SCROLL</span>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
