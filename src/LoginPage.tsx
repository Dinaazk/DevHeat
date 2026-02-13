import React, { useState } from 'react';
import './App.css';

interface LoginPageProps {
    onLogin: (name: string) => void;
    onNavigateToSignup: () => void;
    onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login: use email prefix as name
        const nameFromEmail = email.split('@')[0];
        // Capitalize first letter
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        onLogin(formattedName);
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
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to continue to VeriShield</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
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

                    <div className="form-actions">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn-auth-primary">
                        Sign In
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <button className="btn-link" onClick={onNavigateToSignup}>Sign up</button></p>
                    <button className="btn-link-subtle" onClick={onBack}>← Back to Home</button>
                </div>
            </div>
        </div>
    );
};
