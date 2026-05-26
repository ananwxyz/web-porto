import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
    {
        role: 'QA Engineer',
        company: 'Yourpay',
        industry: 'Fintech - Payment Solutions',
        period: 'May 2026 – Present',
        isCurrent: true,
        responsibilities: [
            'Ensuring quality of a fintech platform serving hundreds of thousands of Indonesian migrant workers with millions of transactions processed across Indonesia, Taiwan, Hong Kong, Korea, and Singapore.',
            'Executing manual and API test cases covering payment, transfer, lending, and savings features using Postman.',
            'Validating Acceptance Criteria alongside Product and Engineering teams before each feature release.',
            'Identifying, documenting, and tracking bugs using Jira to support fast and clear resolution with the engineering team.',
            'Managing test scenarios, test cases, and test documentation using Qase.io.',
            'Supporting pre-release regression, smoke, and sanity testing cycles in a fast-paced agile environment.',
            'Participating in sprint planning and daily standups within a cross-functional team.',
        ],
    },
    {
        role: 'Software Tester',
        company: 'uTest',
        industry: 'Crowdsourced Testing Platform',
        period: 'Jan 2025 – Present',
        isCurrent: true,
        responsibilities: [
            'Responsible for identifying and reporting bugs, conducting functional and usability testing across various web and mobile applications for international clients.',
            'Project: Forex App Trading (NDA)',
        ],
    },
    {
        role: 'QA Engineer',
        company: 'Karya Putra Group',
        industry: 'Supplier of Office Stationary',
        period: 'Aug 2025 – Feb 2026',
        isCurrent: false,
        responsibilities: [
            'Created and executed 30+ manual test cases across web-based applications, identifying and documenting 20+ defects via Jira.',
            'Performed basic API testing using Postman to validate endpoints and verify response accuracy.',
            'Participated in bug triage discussions and collaborated with developers to verify bug fixes before release.',
        ],
    },
];

function TimelineConnector({ isLast }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: '15px',
                top: '32px',
                bottom: isLast ? '50%' : '-24px',
                width: '1px',
                background: 'linear-gradient(to bottom, var(--color-glass-border), transparent)',
            }}
        />
    );
}

function ExperienceCard({ experience, index, isLast }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{
                position: 'relative',
                paddingLeft: '48px',
                paddingBottom: isLast ? 0 : '48px',
            }}
        >
            {/* Timeline dot */}
            <div
                style={{
                    position: 'absolute',
                    left: '6px',
                    top: '6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `2px solid ${experience.isCurrent ? '#50fa7b' : 'var(--color-glass-border)'}`,
                    background: experience.isCurrent ? 'rgba(80, 250, 123, 0.15)' : 'var(--color-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                }}
            >
                {experience.isCurrent && (
                    <div
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#50fa7b',
                            boxShadow: '0 0 8px #50fa7b',
                        }}
                    />
                )}
            </div>

            {/* Timeline connector */}
            {!isLast && <TimelineConnector isLast={isLast} />}

            {/* Card */}
            <motion.div
                className="glass-card"
                whileHover={{
                    y: -4,
                    boxShadow: '0 20px 50px rgba(255, 255, 255, 0.03)',
                    transition: { duration: 0.3 },
                }}
                style={{
                    padding: '28px 32px',
                    transition: 'border-color 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-glass-border)';
                }}
            >
                {/* Subtle accent glow on top edge */}
                {experience.isCurrent && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #50fa7b, transparent)',
                            opacity: 0.5,
                        }}
                    />
                )}

                {/* Header row */}
                <div className="exp-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '16px', flexWrap: 'wrap' }}>
                    <h3
                        style={{
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-heading)',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {experience.role}
                    </h3>
                    {experience.isCurrent && (
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.6rem',
                                color: '#50fa7b',
                                background: 'rgba(80, 250, 123, 0.08)',
                                border: '1px solid rgba(80, 250, 123, 0.2)',
                                padding: '4px 10px',
                                borderRadius: '100px',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}
                        >
                            Current
                        </span>
                    )}
                </div>

                {/* Meta info */}
                <div
                    className="exp-meta"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        <Briefcase size={12} />
                        {experience.company}
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        <MapPin size={12} />
                        {experience.industry}
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-dim)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        <Calendar size={12} />
                        {experience.period}
                    </span>
                </div>

                {/* Responsibilities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {experience.responsibilities.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'flex-start',
                            }}
                        >
                            <ChevronRight
                                size={14}
                                style={{
                                    color: 'var(--color-accent-dim)',
                                    flexShrink: 0,
                                    marginTop: '3px',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                }}
                            >
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <section id="experience" style={{ padding: '120px 0', position: 'relative' }}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px' }}
                >
                    <p className="section-title">Experience</p>
                    <h2 className="section-heading">
                        Where I've <span className="text-gradient">Worked</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div style={{ maxWidth: '800px' }}>
                    {experiences.map((exp, i) => (
                        <ExperienceCard
                            key={`${exp.company}-${i}`}
                            experience={exp}
                            index={i}
                            isLast={i === experiences.length - 1}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .exp-meta {
                        flex-direction: column;
                        gap: 8px !important;
                    }
                }
            `}</style>
        </section>
    );
}
