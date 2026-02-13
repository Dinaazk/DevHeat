import React, { useState } from 'react';
import './App.css';

interface SignupPageProps {
    onSignup: () => void;
    onNavigateToLogin: () => void;
    onBack: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateToLogin, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate signup
        onSignup();
    };

    return (
        <div className="auth-container">
            {/* Decorative Blobs */}
            <div className="blob blob-top-right"></div>
            <div className="blob blob-bottom-left"></div>

            <div className="auth-card glass-panel">
                <div className="auth-header">
                    <div className="nav-icon-container" style={{ margin: '0 auto 1rem' }}>
                        <span className="nav-icon">🛡️</span>
                    </div>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join the VeriShield network</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-auth-primary">
                        Create Account
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <button className="btn-link" onClick={onNavigateToLogin}>Log in</button></p>
                    <button className="btn-link-subtle" onClick={onBack}>← Back to Home</button>
                </div>
            </div>
        </div>
    );
};
