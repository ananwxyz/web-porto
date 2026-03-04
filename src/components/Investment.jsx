import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useStockPrice } from '../hooks/useStockPrice';

const insights = [
    {
        title: 'Initial Public Offering (IPO)',
        date: 'Jan 2026',
        snippet: 'Initial Public Offering (IPO) is a process where a private company offers its shares to the public for the first time, allowing investors to buy a stake in the company and providing the company with capital for growth and expansion.',
        tag: 'IPO',
    },
    {
        title: 'Ultimate Beneficiary Ownership (UBO)',
        date: 'Jan 2026',
        snippet: 'Ultimate Beneficiary Ownership (UBO) refers to the natural person(s) who ultimately own or control a legal entity or arrangement, such as a company, trust, or foundation. It is a key concept in anti-money laundering (AML) and counter-terrorist financing (CTF) regulations worldwide.',
        tag: 'UBO',
    },
    {
        title: 'Right Issue (PMHMETD)',
        date: 'Jan 2026',
        snippet: 'Right Issue (PMHMETD) is a process where a company offers its existing shareholders the right to purchase additional shares in the company at a predetermined price, which is typically lower than the current market price. It is a way for companies to raise capital for growth and expansion.',
        tag: 'Right Issue',
    },
];

/*
 * ── SECTOR WATCHLIST (automatic) ──
 * Edit ticker and name below.
 * Tickers should be Yahoo Finance sector indices for IDX, e.g., ^JKENRG
 */
const sectorWatchlist = [
    { display: 'IDX:ENERGY', ticker: '^JKENRG', name: 'IDX Energy Sector' },
    { display: 'IDX:FINANCE', ticker: '^JKFINA', name: 'IDX Finance Sector' },
    { display: 'IDX:TECH', ticker: '^JKTECH', name: 'IDX Technology Sector' },
];

function formatNumber(num) {
    if (num == null) return '—';
    return num.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SectorCard({ sector, index }) {
    const { price, prevClose, changePct, loading, error } = useStockPrice(sector.ticker);

    // Gunakan harga live
    const currentPrice = price;

    return (
        <motion.div
            className="glass-card glow-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            style={{ padding: '28px', cursor: 'default' }}
        >
            {/* Header */}
            <div style={{ marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {sector.display}
                </span>
            </div>

            {/* Sector name */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-dim)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                {sector.name}
            </div>

            {/* Current Price */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {formatNumber(currentPrice)}
                {loading && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontWeight: 'normal' }}>(updating...)</span>}
            </div>

            {/* Levels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Index Level
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        {formatNumber(currentPrice)}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Prev Close
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        {formatNumber(prevClose)}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Daily Change
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: changePct >= 0 ? 'var(--color-accent)' : '#ff5555',
                    }}>
                        {changePct > 0 ? '+' : ''}{changePct?.toFixed(2) || '—'}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function Investment() {
    return (
        <section id="investment" style={{ padding: '120px 0', position: 'relative' }}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px' }}
                >
                    <p className="section-title">// Market Terminal</p>
                    <h2 className="section-heading">
                        Investment <span className="text-gradient">Insights</span>
                    </h2>
                </motion.div>

                {/* Market Insights */}
                <div style={{ marginBottom: '60px' }}>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            marginBottom: '20px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <TrendingUp size={14} /> Market Insights
                    </div>

                    <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {insights.map((item, i) => (
                            <motion.a
                                key={item.title}
                                href="https://stonkstock.medium.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                style={{ padding: '28px', cursor: 'pointer', textDecoration: 'none', display: 'block' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(80, 250, 123, 0.25)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(80, 250, 123, 0.12)'; }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.6rem',
                                            color: 'var(--color-accent)',
                                            background: 'rgba(80, 250, 123, 0.08)',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            letterSpacing: '0.1em',
                                        }}
                                    >
                                        {item.tag}
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-dim)' }}>{item.date}</span>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                    {item.snippet}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Sector Watchlist — Automatic Data */}
                <div>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            marginBottom: '20px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <BarChart3 size={14} /> Sector Watchlist
                    </div>

                    <div className="trading-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {sectorWatchlist.map((sector, i) => (
                            <SectorCard key={sector.display} sector={sector} index={i} />
                        ))}
                    </div>

                    <div style={{
                        marginTop: '32px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-dim)',
                        letterSpacing: '0.05em',
                        opacity: 0.7
                    }}>
                        * NOTE: DO YOUR OWN RISK & NOT FINANCIAL ADVICE
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .insights-grid, .trading-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 640px) {
                    .insights-grid, .trading-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}
