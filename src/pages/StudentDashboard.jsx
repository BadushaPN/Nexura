import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { LogOut, CheckCircle, Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../context/ToastContext';

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const { showToast } = useToast();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'my_jobs'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setJobs(storage.getJobs());
        setApplications(storage.getApplicationsByStudentId(user.id));
    };

    const categories = ['All', ...new Set(storage.getJobs().map(j => j.category))];

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const hasApplied = (jobId) => {
        return applications.some(a => a.jobId === jobId);
    };

    const handleApply = (jobId) => {
        storage.saveApplication({
            studentId: user.id,
            jobId,
            status: 'pending' // 'pending', 'selected', 'unlocked'
        });
        loadData();
        showToast('Interest shown! Awaiting customer selection.', 'success');
    };

    const handleUnlock = (jobId) => {
        // Find application ID for this job
        const app = applications.find(a => a.jobId === jobId);
        if (!app) return;

        // Simulate payment process
        setTimeout(() => {
            storage.updateApplicationStatus(app.id, 'unlocked');
            loadData();
            showToast('Payment successful! Details unlocked.', 'success');
        }, 1000);
    };

    return (
        <div className="page-wrapper">
            <header className="nav-header" style={{ padding: '0 40px' }}>
                <div className="flex-center gap-12">
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>N</div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.03em' }}>Nexura</span>
                </div>
                <div className="flex-center gap-16">
                    <span className="icon-primary" style={{ opacity: 0.8 }}>Hey, {user.name}</span>
                    <button onClick={logout} className="btn" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', borderRadius: '8px', border: 'none' }}>
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="container main-content">
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Student Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Find simple gigs around you, get selected, and earn money.</p>

                <div className="flex-between mb-24 flex-wrap gap-16">
                    <div className="flex gap-16">
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
                        <div className="flex gap-12 flex-wrap">
                            <div style={{ position: 'relative', width: '240px' }}>
                                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                <input
                                    className="input-field"
                                    style={{ paddingLeft: '38px', height: '40px' }}
                                    placeholder="Search gigs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="input-field"
                                style={{ width: '160px', height: '40px', padding: '0 12px' }}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                {activeTab === 'browse' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {filteredJobs.length === 0 ? (
                            <EmptyState
                                icon="search"
                                title={searchQuery || selectedCategory !== 'All' ? "No matches found" : "No Gigs Available"}
                                message={searchQuery || selectedCategory !== 'All' ? "Try adjusting your search or category filters." : "Check back later or try posting a request if you have a special skill!"}
                            />
                        ) : (
                            filteredJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    customer={storage.getUserById(job.customerId)}
                                    isApplied={hasApplied(job.id)}
                                    onAction={handleApply}
                                    variant="browse"
                                />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'my_jobs' && (
                    <div className="flex-column gap-16">
                        {applications.length === 0 ? (
                            <EmptyState
                                title="No Applications Yet"
                                message="Browse the jobs tab and show interest in a gig to see your applications here."
                            />
                        ) : (
                            applications.map(app => (
                                <JobCard
                                    key={app.id}
                                    job={storage.getJobById(app.jobId)}
                                    customer={storage.getUserById(storage.getJobById(app.jobId)?.customerId)}
                                    status={app.status}
                                    onAction={handleUnlock}
                                    variant="application"
                                />
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
