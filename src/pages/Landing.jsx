import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, DollarSign, Star } from 'lucide-react';

export default function Landing() {
    return (
        <div className="page-wrapper">
            <header className="nav-header" style={{ padding: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>N</div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.03em' }}>Nexura</span>
                </div>
                <div>
                    <Link to="/auth" className="btn btn-secondary" style={{ marginRight: '16px' }}>Log In</Link>
                    <Link to="/auth" className="btn btn-primary">Get Started</Link>
                </div>
            </header>

            <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
                <div className="badge badge-primary animate-fade-in" style={{ marginBottom: '24px' }}>
                    <Star size={14} style={{ marginRight: '6px' }} />
                    The New Standard for Student Gigs
                </div>

                <h1 className="animate-fade-in" style={{ fontSize: '4.5rem', lineHeight: '1.1', maxWidth: '800px', marginBottom: '24px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    Local Gigs. <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Zero Hassle.</span>
                </h1>

                <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '48px', animationDelay: '0.1s' }}>
                    Connect with local students for one-off tasks. From yard work to coding, find the perfect person for the job in minutes.
                </p>

                <div className="animate-fade-in" style={{ display: 'flex', gap: '20px', animationDelay: '0.2s' }}>
                    <Link to="/auth" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                        I want to work <ArrowRight size={20} />
                    </Link>
                    <Link to="/auth" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                        I need to hire
                    </Link>
                </div>

                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', width: '100%', maxWidth: '1000px', marginTop: '100px', animationDelay: '0.4s' }}>
                    <div className="glass-card" style={{ padding: '32px', textAlign: 'left' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary)' }}>
                            <Briefcase size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Any Skill Welcome</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Car washing, drawing, programming, or dog walking. List your skills and start earning today.</p>
                    </div>

                    <div className="glass-card" style={{ padding: '32px', textAlign: 'left' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--secondary)' }}>
                            <DollarSign size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Micro-unlock Model</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Students pay a tiny $2-$3 unlock fee only when they get selected for a job. No hidden subscription fees required.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
