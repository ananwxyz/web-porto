import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const shapes = [
    { type: 'hexagon', size: 60, x: '10%', y: '20%', delay: 0, duration: 18 },
    { type: 'cube', size: 40, x: '80%', y: '15%', delay: 2, duration: 22 },
    { type: 'circle', size: 30, x: '65%', y: '70%', delay: 1, duration: 20 },
    { type: 'hexagon', size: 45, x: '25%', y: '75%', delay: 3, duration: 16 },
    { type: 'diamond', size: 35, x: '90%', y: '55%', delay: 1.5, duration: 24 },
    { type: 'circle', size: 20, x: '50%', y: '10%', delay: 0.5, duration: 19 },
    { type: 'cube', size: 50, x: '15%', y: '50%', delay: 2.5, duration: 21 },
    { type: 'diamond', size: 25, x: '75%', y: '40%', delay: 1, duration: 17 },
];

function ShapeSVG({ type, size }) {
    const color = 'rgba(80, 250, 123, 0.08)';
    const stroke = 'rgba(80, 250, 123, 0.15)';

    switch (type) {
        case 'hexagon':
            return (
                <svg width={size} height={size} viewBox="0 0 100 100">
                    <polygon
                        points="50,2 95,25 95,75 50,98 5,75 5,25"
                        fill={color}
                        stroke={stroke}
                        strokeWidth="1"
                    />
                </svg>
            );
        case 'cube':
            return (
                <svg width={size} height={size} viewBox="0 0 100 100">
                    <rect x="10" y="10" width="80" height="80" rx="4"
                        fill={color} stroke={stroke} strokeWidth="1"
                        transform="rotate(15, 50, 50)"
                    />
                </svg>
            );
        case 'circle':
            return (
                <svg width={size} height={size} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45"
                        fill={color} stroke={stroke} strokeWidth="1"
                    />
                </svg>
            );
        case 'diamond':
            return (
                <svg width={size} height={size} viewBox="0 0 100 100">
                    <polygon
                        points="50,5 95,50 50,95 5,50"
                        fill={color}
                        stroke={stroke}
                        strokeWidth="1"
                    />
                </svg>
            );
        default:
            return null;
    }
}

export default function FloatingShapes({ containerRef }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {shapes.map((shape, i) => {
                const y = useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? -80 : 80)]);
                return (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: shape.x,
                            top: shape.y,
                            y,
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            rotate: { duration: shape.duration, repeat: Infinity, ease: 'linear' },
                            scale: { duration: shape.duration / 3, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
                        }}
                    >
                        <ShapeSVG type={shape.type} size={shape.size} />
                    </motion.div>
                );
            })}
        </div>
    );
}
