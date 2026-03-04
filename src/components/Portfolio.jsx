import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/*
 * ── PROJECTS ──
 * Add a `link` field to make the card clickable.
 * Set link to '#' or omit it for "Coming Soon" cards.
 */
const projects = [
    {
        title: 'Temu Karir',
        description: 'Direktori halaman karir resmi perusahaan Indonesia. Melamar langsung ke sumber resmi, aman dan terverifikasi otomatis.',
        tags: ['Next.js', 'React.js', 'Cloudflare'],
        accent: '#a8ffc9',
        link: 'https://temukarir.com/',
    },
    {
        title: 'Coming Soon',
        description: 'soon...',
        tags: ['-', '-', '-'],
        accent: '#50fa7b',
        link: null,
    },
];

function PortfolioCard({ project, index }) {
    const Tag = project.link ? motion.a : motion.div;
    const linkProps = project.link
        ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Tag
            {...linkProps}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
                y: -15,
                boxShadow: `0 25px 60px rgba(80, 250, 123, 0.12), 0 0 40px rgba(80, 250, 123, 0.06)`,
                transition: { duration: 0.3 },
            }}
            className="glass-card"
            style={{
                padding: '32px',
                cursor: project.link ? 'pointer' : 'default',
                transition: 'border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'block',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(80, 250, 123, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(80, 250, 123, 0.12)';
            }}
        >
            {/* Top accent line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '32px',
                    right: '32px',
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                    opacity: 0.3,
                }}
            />

            {/* Project number */}
            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-text-dim)',
                    marginBottom: '16px',
                    letterSpacing: '0.1em',
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title with icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3
                    style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.01em',
                    }}
                >
                    {project.title}
                </h3>
                {project.link && (
                    <ExternalLink size={14} style={{ color: 'var(--color-text-dim)', flexShrink: 0, marginTop: '4px' }} />
                )}
            </div>

            {/* Description */}
            <p
                style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                }}
            >
                {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map((tag, i) => (
                    <span
                        key={`${tag}-${i}`}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-accent)',
                            background: 'rgba(80, 250, 123, 0.06)',
                            border: '1px solid rgba(80, 250, 123, 0.12)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Tag>
    );
}

export default function Portfolio() {
    return (
        <section id="portfolio" style={{ padding: '120px 0', position: 'relative' }}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px' }}
                >
                    <p className="section-title">// Selected Works</p>
                    <h2 className="section-heading">
                        Projects I've <span className="text-gradient">Built</span>
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                    }}
                    className="portfolio-grid"
                >
                    {projects.map((project, i) => (
                        <PortfolioCard key={`${project.title}-${i}`} project={project} index={i} />
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 640px) {
                    .portfolio-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}
