import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Briefcase } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('student'); // student or customer
    const [skills, setSkills] = useState(''); // Specific to student
    const [college, setCollege] = useState(''); // Specific to student
    const [location, setLocation] = useState(''); // Customer or Student
    const [idSubmitted, setIdSubmitted] = useState(false); // verification
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const user = storage.getUserByEmail(email);
            if (user && user.password === password) {
                login(user);
                navigate('/');
            } else {
                setError('Invalid credentials.');
            }
        } else {
            // Signup
            if (storage.getUserByEmail(email)) {
                setError('Email already exists.');
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                email,
                password, // In a real app we would hash this!
                name,
                role,
                skills: role === 'student' ? skills.split(',').map(s => s.trim()) : [],
                college: role === 'student' ? college : '',
                location,
                isVerified: false, // Internal team needs to review later
                idProofSubmitted: idSubmitted,
                createdAt: new Date().toISOString()
            };

            storage.saveUser(newUser);
            login(newUser);
            navigate('/');
        }
    };

    return (
        <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '440px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>
                    {isLogin ? 'Welcome Back' : 'Join Nexura'}
                </h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>
                    {isLogin ? 'Enter your details to sign in.' : 'Create an account to get started.'}
                </p>

                {error && (
                    <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger)', borderRadius: '8px', color: '#fca5a5', marginBottom: '20px', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && (
                        <div>
                            <label className="input-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="input-field"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label className="input-label">I am a...</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <label style={{ flex: 1, cursor: 'pointer' }}>
                                    <input type="radio" value="student" checked={role === 'student'} onChange={() => setRole('student')} style={{ display: 'none' }} />
                                    <div className="glass-card" style={{ padding: '12px', textAlign: 'center', border: role === 'student' ? '1px solid var(--primary)' : '1px solid var(--surface-border)' }}>
                                        Student
                                    </div>
                                </label>
                                <label style={{ flex: 1, cursor: 'pointer' }}>
                                    <input type="radio" value="customer" checked={role === 'customer'} onChange={() => setRole('customer')} style={{ display: 'none' }} />
                                    <div className="glass-card" style={{ padding: '12px', textAlign: 'center', border: role === 'customer' ? '1px solid var(--primary)' : '1px solid var(--surface-border)' }}>
                                        Customer
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {!isLogin && role === 'student' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label className="input-label">My Skills (comma separated)</label>
                                <div style={{ position: 'relative' }}>
                                    <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        className="input-field"
                                        style={{ paddingLeft: '40px' }}
                                        placeholder="Yard Work, Programming, Cleaning"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label">College/University Details</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="University of Toronto"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {!isLogin && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label className="input-label">Location / City</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Toronto, ON"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                                <input
                                    type="checkbox"
                                    id="idProof"
                                    checked={idSubmitted}
                                    onChange={(e) => setIdSubmitted(e.target.checked)}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <label htmlFor="idProof" style={{ fontSize: '0.9rem', cursor: 'pointer', userSelect: 'none' }}>
                                    I have uploaded a valid ID proof (Passport/Driver's License) for manual verification later.
                                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Required for the Verified badge)</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="input-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="input-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500', fontFamily: 'inherit' }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
}
