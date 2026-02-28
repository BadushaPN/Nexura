import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { Link } from 'react-router-dom';
import { LogOut, DollarSign, Clock, MapPin, CheckCircle, Unlock, Search, User } from 'lucide-react';

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'my_jobs'

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setJobs(storage.getJobs());
        setApplications(storage.getApplicationsByStudentId(user.id));
    };

    const hasApplied = (jobId) => {
        return applications.some(a => a.jobId === jobId);
    };

    const getApplicationStatus = (jobId) => {
        const app = applications.find(a => a.jobId === jobId);
        return app ? app.status : null;
    };

    const handleApply = (jobId) => {
        storage.saveApplication({
            studentId: user.id,
            jobId,
            status: 'pending' // 'pending', 'selected', 'unlocked'
        });
        loadData();
    };

    const handleUnlock = (appId) => {
        // Simulate payment process
        setTimeout(() => {
            storage.updateApplicationStatus(appId, 'unlocked');
            loadData();
            alert('Payment successful! You unlocked the customer details.');
        }, 1000);
    };

    return (
        <div className="page-wrapper">
            <header className="nav-header" style={{ padding: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>N</div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.03em' }}>Nexura</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Hey, {user.name}</span>
                    <button onClick={logout} className="btn" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', borderRadius: '8px', border: 'none' }}>
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Student Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Find simple gigs around you, get selected, and earn money.</p>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                    <button
                        className={`btn ${activeTab === 'browse' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('browse')}
                    >
                        <Search size={18} /> Browse Jobs
                    </button>
                    <button
                        className={`btn ${activeTab === 'my_jobs' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('my_jobs')}
                    >
                        <CheckCircle size={18} /> My Applications
                    </button>
                </div>

                {activeTab === 'browse' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {jobs.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No jobs available right now.</p>
                        ) : (
                            jobs.map(job => {
                                const customer = storage.getUserById(job.customerId);
                                return (
                                    <div key={job.id} className="glass-card animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{job.title}</h3>
                                            <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <DollarSign size={14} /> {job.priceRange}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                                                {job.category}
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: '12px', fontSize: '0.9rem' }}>
                                            <Link to={`/profile/${job.customerId}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                                                <User size={14} color="var(--primary)" /> View Customer Profile: {customer?.name || 'Customer'}
                                            </Link>
                                        </div>

                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {job.description}
                                        </p>

                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                <Clock size={14} /> Posted today
                                            </div>

                                            {hasApplied(job.id) ? (
                                                <button className="btn" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid currentColor', cursor: 'default', padding: '8px 16px', fontSize: '0.9rem' }} disabled>
                                                    Interest Shown
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => handleApply(job.id)}>
                                                    Show Interest
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}

                {activeTab === 'my_jobs' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {applications.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>You haven't shown interest in any jobs yet.</p>
                        ) : (
                            applications.map(app => {
                                const job = storage.getJobById(app.jobId);
                                const customer = storage.getUserById(job?.customerId);

                                if (!job) return null;

                                return (
                                    <div key={app.id} className="glass-card animate-fade-in" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                        <div style={{ flex: 1, minWidth: '250px' }}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{job.title}</h3>
                                            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> {job.priceRange}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Status: <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{app.status}</strong></span>
                                            </div>
                                        </div>

                                        <div>
                                            {app.status === 'pending' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                                    <div className="badge badge-warning" style={{ padding: '8px 16px' }}>Awaiting Customer Choice</div>
                                                    <Link to={`/profile/${job.customerId}`} style={{ fontSize: '0.85rem' }}>View Profile</Link>
                                                </div>
                                            )}

                                            {app.status === 'selected' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                                    <span style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: '500' }}>You were selected!</span>
                                                    <button onClick={() => handleUnlock(app.id)} className="btn btn-primary" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                                        <Unlock size={16} /> Pay $2.99 to Unlock Details
                                                    </button>
                                                </div>
                                            )}

                                            {app.status === 'unlocked' && (
                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', padding: '16px', borderRadius: '12px', minWidth: '240px' }}>
                                                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Details Unlocked</p>
                                                    <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>{customer?.name}</p>
                                                    <p style={{ margin: '0', color: 'var(--primary)', fontSize: '0.9rem' }}>{customer?.email}</p>
                                                    <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Contact them to start working!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
