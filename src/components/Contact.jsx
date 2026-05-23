import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';

const contacts = [
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/ananwxyz',
        icon: Linkedin,
        description: 'Professional network & career updates',
        handle: '@ananwxyz',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/ananwxyz',
        icon: Github,
        description: 'Open source projects & code repositories',
        handle: '@ananwxyz',
    },
    {
        label: 'Email',
        href: 'mailto:ananwxyz@gmail.com',
        icon: Mail,
        description: 'For collaborations & opportunities',
        handle: 'ananwxyz@gmail.com',
    },
];

export default function Contact() {
    return (
        <section id="contact" style={{ padding: '120px 0 80px', position: 'relative' }}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px', textAlign: 'center' }}
                >
                    <p className="section-title" style={{ textAlign: 'center' }}>Contact</p>
                    <h2 className="section-heading" style={{ textAlign: 'center' }}>
                        Get in <span className="text-gradient">Touch</span>
                    </h2>
                </motion.div>

                {/* Contact Cards */}
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
                    {contacts.map((contact, i) => {
                        const Icon = contact.icon;
                        return (
                            <motion.a
                                key={contact.label}
                                href={contact.href}
                                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className="glass-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                whileHover={{
                                    y: -15,
                                    boxShadow: '0 25px 60px rgba(255, 255, 255, 0.05), 0 0 40px rgba(255, 255, 255, 0.03)',
                                    transition: { duration: 0.3 },
                                }}
                                style={{
                                    padding: '36px 28px',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-glass-border)'; }}
                            >
                                {/* Icon container */}
                                <div
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon size={24} style={{ color: 'var(--color-accent)' }} />
                                </div>

                                {/* Label */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                            {contact.label}
                                        </span>
                                        <ArrowUpRight size={14} style={{ color: 'var(--color-text-dim)' }} />
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            color: 'var(--color-accent-dim)',
                                            letterSpacing: '0.02em',
                                        }}
                                    >
                                        {contact.handle}
                                    </span>
                                </div>

                                {/* Description */}
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                    {contact.description}
                                </p>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{
                        marginTop: '80px',
                        paddingTop: '32px',
                        borderTop: '1px solid var(--color-glass-border)',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-dim)', letterSpacing: '0.05em' }}>
                        © 2026 Anan
                    </p>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; max-width: 400px !important; }
        }
      `}</style>
        </section>
    );
}
