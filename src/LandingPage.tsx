import React from 'react';
import './App.css';

interface LandingPageProps {
    onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <div className="landing-container">
            {/* Decorative Background Elements */}
            <div className="blob blob-top-right"></div>
            <div className="blob blob-bottom-left"></div>

            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-logo">
                    <div className="nav-icon-container">
                        <span className="nav-icon">🛡️</span>
                    </div>
                    <span className="nav-brand">VERISHIELD</span>
                </div>
            </nav>

            <main className="landing-content">
                {/* Left Column: Hero Text */}
                <div className="hero-section">
                    <h1 className="hero-title">
                        Your Shield In a <br />
                        Digital Storm
                    </h1>

                    <p className="hero-description">
                        AI-powered deepfake detection that verifies videos,
                        images, and audio instantly. Stay safe from
                        misinformation, protect your family, and trust what
                        you see online.
                    </p>

                    <div className="hero-tagline">
                        Verify • Trust • Connect
                    </div>

                    <div className="hero-actions">
                        <button className="btn-landing-primary" onClick={onGetStarted}>
                            Get Started
                        </button>
                        <button className="btn-landing-secondary">
                            Learn More
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">5M+</span>
                            <span className="stat-label">Downloads</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">1M+</span>
                            <span className="stat-label">Connections</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">100K+</span>
                            <span className="stat-label">Verified</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Feature Grid */}
                <div className="features-section">
                    <div className="features-grid">
                        {/* Card 1 */}
                        <div className="feature-card">
                            <h3 className="feature-title">AI verification</h3>
                            <p className="feature-desc">
                                Instant Analysis by Advanced Neural Networks.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="feature-card">
                            <h3 className="feature-title">Trusted Circle</h3>
                            <p className="feature-desc">
                                Share suspicious content within your trusted network for quick verification and early warnings.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="feature-card">
                            <h3 className="feature-title">Stay Safe Together</h3>
                            <p className="feature-desc">
                                Smart protection mode blocks harmful or misleading media for safer family browsing.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="feature-card">
                            <h3 className="feature-title">Global Threat Map</h3>
                            <p className="feature-desc">
                                View real-time insights on viral fake content and emerging misinformation trends worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
