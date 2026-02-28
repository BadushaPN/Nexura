import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, GraduationCap, ShieldCheck, ArrowLeft, Star, Briefcase } from 'lucide-react';

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        // If id is 'me' or matches current user, use current user else fetch by id
        const fetchId = id === 'me' ? currentUser.id : id;
        const foundUser = storage.getUserById(fetchId);
        if (foundUser) {
            setProfileUser(foundUser);
        } else {
            navigate(-1); // Go back if user not found
        }
    }, [id, currentUser, navigate]);

    if (!profileUser) return <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

    const isStudent = profileUser.role === 'student';

    return (
        <div className="page-wrapper">
            <header className="nav-header" style={{ padding: '0 40px' }}>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>Profile</span>
                </div>
                <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
            </header>

            <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px', maxWidth: '800px' }}>
                <div className="glass-panel animate-fade-in" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
                    {/* Decorative Background */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.2))', borderBottom: '1px solid var(--surface-border)' }}></div>

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '24px', marginTop: '40px' }}>
                        {/* Avatar Placeholder */}
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--surface)', border: '4px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                            <User size={48} color="var(--text-muted)" />
                        </div>

                        <div style={{ flex: 1, paddingBottom: '8px' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {profileUser.name}
                                {profileUser.isVerified ? (
                                    <span title="Verified User" style={{ color: '#3b82f6', display: 'flex' }}><ShieldCheck size={24} /></span>
                                ) : profileUser.idProofSubmitted ? (
                                    <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>Verification Pending</span>
                                ) : null}
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textTransform: 'capitalize' }}>
                                {profileUser.role} Account
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
                        {/* Common Details */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                                <User size={18} /> Basic Info
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Location</label>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                        <MapPin size={16} color="var(--text-muted)" /> {profileUser.location || 'Not specified'}
                                    </p>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Member Since</label>
                                    <p style={{ margin: 0 }}>{new Date(profileUser.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Student Specific Details */}
                        {isStudent && (
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
                                    <GraduationCap size={18} /> Academic
                                </h3>

                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>College / University</label>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                        {profileUser.college || 'Not specified'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Student Skills */}
                        {isStudent && (
                            <div className="glass-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6' }}>
                                    <Briefcase size={18} /> Skills & Services
                                </h3>

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {profileUser.skills && profileUser.skills.length > 0 ? (
                                        profileUser.skills.map((skill, i) => (
                                            <span key={i} className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 14px', fontSize: '0.9rem' }}>
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)' }}>No skills listed.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Customer Specific (Placeholder if they need more info later) */}
                        {!isStudent && (
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
                                    <Star size={18} /> Platform Activity
                                </h3>
                                <p style={{ color: 'var(--text-muted)' }}>Trusted local job poster.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
