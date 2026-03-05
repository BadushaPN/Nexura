import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { LogOut, Plus } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import EmptyState from '../components/EmptyState';
import CustomerJobCard from '../components/CustomerJobCard';
import { useToast } from '../context/ToastContext';

export default function CustomerDashboard() {
    const { user, logout } = useAuth();
    const { showToast } = useToast();
    const [myJobs, setMyJobs] = useState([]);
    const [showNewJobForm, setShowNewJobForm] = useState(false);

    // New Job Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Yard Work');
    const [priceRange, setPriceRange] = useState('$15 - $25');

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = () => {
        const jobs = storage.getJobsByCustomerId(user.id);
        // Fetch applications for each job to see who is interested
        const jobsWithApps = jobs.map(j => ({
            ...j,
            applications: storage.getApplicationsByJobId(j.id)
        }));
        setMyJobs(jobsWithApps);
    };

    const handlePostJob = (e) => {
        e.preventDefault();
        storage.saveJob({
            customerId: user.id,
            title,
            description,
            category,
            priceRange,
            status: 'open'
        });

        setTitle('');
        setDescription('');
        setShowNewJobForm(false);
        loadJobs();
        showToast('Job posted successfully!', 'success');
    };

    const handleSelectStudent = (appId) => {
        storage.updateApplicationStatus(appId, 'selected');
        loadJobs();
        showToast('Student selected! They have been notified.', 'success');
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
                <div className="flex-between mb-24 flex-wrap gap-16">
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Customer Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Post small tasks and get help from local students.</p>
                    </div>
                    <button className={`btn ${showNewJobForm ? 'btn-secondary' : 'btn-primary'}`} onClick={() => setShowNewJobForm(!showNewJobForm)}>
                        {showNewJobForm ? 'Cancel' : <><Plus size={18} /> Post New Job</>}
                    </button>
                </div>

                {showNewJobForm && (
                    <GlassPanel className="animate-fade-in" style={{ padding: '32px', marginBottom: '40px' }}>
                        <h2 className="mb-24">Create a New Job Posting</h2>
                        <form onSubmit={handlePostJob} style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="input-label">Job Title</label>
                                <input required type="text" className="input-field" placeholder="e.g. Lawn Mowing and Weed Pulling" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="input-label">Description</label>
                                <textarea required className="input-field" rows="4" placeholder="Detail what needs to be done..." value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>

                            <div>
                                <label className="input-label">Category</label>
                                <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="Yard Work">Yard Work</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Moving Help">Moving Help</option>
                                    <option value="Tech Support">Tech Support</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="input-label">Price Range (CAD)</label>
                                <select className="input-field" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                                    <option value="$15 - $25">$15 - $25</option>
                                    <option value="$25 - $40">$25 - $40</option>
                                    <option value="$40 - $60">$40 - $60</option>
                                    <option value="$60 - $100">$60 - $100</option>
                                    <option value="$100+">$100+</option>
                                </select>
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>Post Job Now</button>
                            </div>
                        </form>
                    </GlassPanel>
                )}

                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>My Posted Jobs</h2>

                <div className="flex-column gap-24">
                    {myJobs.length === 0 ? (
                        <EmptyState
                            title="No Jobs Posted"
                            message="You haven't posted any gigs yet. Click 'Post New Job' to get started!"
                        />
                    ) : (
                        myJobs.map(job => (
                            <CustomerJobCard
                                key={job.id}
                                job={job}
                                onSelectStudent={handleSelectStudent}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
