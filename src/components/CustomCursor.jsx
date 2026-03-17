import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const checkHover = () => {
            const hoveredEl = document.querySelectorAll('a, button, [role="button"], .glass-card');
            hoveredEl.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovered(true));
                el.addEventListener('mouseleave', () => setIsHovered(false));
            });
        };

        window.addEventListener('mousemove', moveCursor);
        checkHover();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: -16,
                top: -16,
                width: isHovered ? 64 : 32,
                height: isHovered ? 64 : 32,
                borderRadius: '50%',
                backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: '1px solid var(--color-accent)',
                pointerEvents: 'none',
                zIndex: 99999,
                x: cursorX,
                y: cursorY,
                mixBlendMode: 'difference',
                transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {isHovered && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff'
                    }}
                />
            )}
        </motion.div>
    );
}
