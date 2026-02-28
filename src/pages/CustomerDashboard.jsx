import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Users, DollarSign, Check } from 'lucide-react';

export default function CustomerDashboard() {
    const { user, logout } = useAuth();
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
    };

    const handleSelectStudent = (appId) => {
        storage.updateApplicationStatus(appId, 'selected');
        loadJobs();
        alert('Student selected! They will now be prompted to unlock your contact info.');
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Customer Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Post small tasks and get help from local students.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowNewJobForm(!showNewJobForm)}>
                        <Plus size={18} /> {showNewJobForm ? 'Cancel' : 'Post New Job'}
                    </button>
                </div>

                {showNewJobForm && (
                    <div className="glass-panel animate-fade-in" style={{ padding: '32px', marginBottom: '40px' }}>
                        <h2 style={{ marginBottom: '24px' }}>Create a New Job Posting</h2>
                        <form onSubmit={handlePostJob} style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
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
                                <select className="input-field" value={category} onChange={e => setCategory(e.target.value)} style={{ appearance: 'none' }}>
                                    <option value="Yard Work">Yard Work</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Moving Help">Moving Help</option>
                                    <option value="Tech Support">Tech Support</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="input-label">Price Range (CAD)</label>
                                <select className="input-field" value={priceRange} onChange={e => setPriceRange(e.target.value)} style={{ appearance: 'none' }}>
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
                    </div>
                )}

                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>My Posted Jobs</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {myJobs.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>You haven't posted any jobs yet.</p>
                    ) : (
                        myJobs.map(job => (
                            <div key={job.id} className="glass-card animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
                                {/* Job Header */}
                                <div style={{ padding: '24px', borderBottom: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{job.title}</h3>
                                            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> {job.priceRange}</span>
                                                <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)' }}>{job.category}</span>
                                            </div>
                                        </div>
                                        {job.applications.some(a => a.status === 'selected' || a.status === 'unlocked') && (
                                            <div className="badge badge-success"><Check size={14} style={{ marginRight: '4px' }} /> Student Selected</div>
                                        )}
                                    </div>
                                    <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{job.description}</p>
                                </div>

                                {/* Applications Section */}
                                <div style={{ padding: '24px' }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>
                                        <Users size={16} color="var(--primary)" />
                                        Interested Students ({job.applications.length})
                                    </h4>

                                    {job.applications.length === 0 ? (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No students have shown interest yet.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {job.applications.map(app => {
                                                const student = storage.getUserById(app.studentId);
                                                const isJobResolved = job.applications.some(a => a.status === 'selected' || a.status === 'unlocked');
                                                const isThisStudentSelected = app.status === 'selected' || app.status === 'unlocked';

                                                return (
                                                    <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.5)', padding: '16px', borderRadius: '8px', border: isThisStudentSelected ? '1px solid var(--secondary)' : '1px solid var(--surface-border)' }}>
                                                        <div>
                                                            <p style={{ fontWeight: '500', margin: '0 0 4px 0' }}>{student?.name}</p>
                                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                                                                {student?.skills?.map((skill, i) => (
                                                                    <span key={i} style={{ fontSize: '0.75rem', background: 'var(--surface-border)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>{skill}</span>
                                                                ))}
                                                            </div>
                                                            <Link to={`/profile/${student?.id}`} style={{ fontSize: '0.85rem' }}>View Full Profile</Link>
                                                        </div>

                                                        <div>
                                                            {app.status === 'pending' && !isJobResolved && (
                                                                <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => handleSelectStudent(app.id)}>
                                                                    Select & Hire
                                                                </button>
                                                            )}
                                                            {app.status === 'selected' && (
                                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Awaiting payment from student...</span>
                                                            )}
                                                            {app.status === 'unlocked' && (
                                                                <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <Check size={16} /> Connecting with Student
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
