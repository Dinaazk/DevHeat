import { useState, useRef, useCallback } from 'react';
import './App.css';
import type { UploadedMedia, AnalysisResult, MediaType } from './types';
import { HeuristicAnalysisEngine } from './analysisEngine';
import { LandingPage } from './LandingPage';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';

type ViewState = 'landing' | 'login' | 'signup' | 'app';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [userName, setUserName] = useState('Dinaa');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    const mediaType: MediaType = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
        ? 'video'
        : 'audio';

    const reader = new FileReader();
    reader.onload = (e) => {
      const media: UploadedMedia = {
        id: `media_${Date.now()}`,
        file,
        type: mediaType,
        preview: e.target?.result as string,
        uploadedAt: new Date()
      };
      setUploadedMedia(media);
      setAnalysisResult(null); // Clear previous results
    };

    if (mediaType === 'audio') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Analyze media
  const handleAnalyze = async () => {
    if (!uploadedMedia) return;

    setIsAnalyzing(true);

    try {
      const result = await HeuristicAnalysisEngine.analyzeMedia(
        uploadedMedia.file,
        uploadedMedia.id
      );

      setAnalysisResult(result);
      setAnalysisHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Remove uploaded media
  const handleRemoveMedia = () => {
    setUploadedMedia(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Load history item
  const handleLoadHistory = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };


  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return (
      <LoginPage
        onLogin={(name) => {
          setUserName(name);
          setCurrentView('app');
        }}
        onNavigateToSignup={() => setCurrentView('signup')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupPage
        onSignup={(name) => {
          setUserName(name);
          setCurrentView('app');
        }}
        onNavigateToLogin={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="app dashboard-layout">
      {/* Top Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="brand-logo-circle">
            <span className="nav-icon">🛡️</span>
          </div>
          <span className="brand-text">VeriShield</span>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-item active">Upload</a>
          <a href="#" className="nav-item">Recent</a>
          <a href="#" className="nav-item">History</a>
        </div>

        <div className="nav-actions">
          <span className="nav-user-name">Welcome, {userName}</span>
          <button className="btn-icon-only">⋮</button>
          <div className="user-avatar-circle">{userName.charAt(0)}</div>
        </div>
      </nav>

      <main className="dashboard-content">
        {/* Welcome Section */}
        <header className="welcome-header">
          <h1>Welcome back, {userName} 👋</h1>
          <p>Media Credibility Assessment System</p>
        </header>

        <div className="main-grid">
          {/* Left Column: Upload Card */}
          <div className="primary-column">
            <section className="card upload-card-hero">
              <div className="upload-hero-content">
                <div className="cloud-icon-circle">
                  <span className="cloud-icon">↑</span>
                </div>

                <h2>Upload Suspicious Media</h2>

                {!uploadedMedia ? (
                  <div className="upload-actions-container">
                    <button
                      className="btn-upload-primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Image / Video
                    </button>
                    <button className="btn-upload-secondary" disabled>
                      Analyse Media
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="file-input"
                      accept="image/*,video/*,audio/*"
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div className="upload-actions-container">
                    <div className="file-preview-hero">
                      {uploadedMedia.type === 'image' && <img src={uploadedMedia.preview} alt="Preview" />}
                      {uploadedMedia.type === 'video' && <video src={uploadedMedia.preview} />}
                      {uploadedMedia.type === 'audio' && <div className="audio-icon-hero">🔊</div>}
                      <div className="file-name-hero">{uploadedMedia.file.name}</div>
                      <button className="btn-close-preview" onClick={handleRemoveMedia}>×</button>
                    </div>

                    <button
                      className="btn-upload-primary"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyse Media'}
                    </button>
                  </div>
                )}

                <div className="upload-footer-text">
                  <p>VeriShield evaluates credibility risk using <br /> multi-signal integrity analysis.</p>
                </div>
              </div>
            </section>

            {/* Analysis Results (Conditionally Shown below upload or as overlay) */}
            {analysisResult && !isAnalyzing && (
              <div className="analysis-result-overlay">
                {/* We can keep the detailed results here if needed, or simplify */}
                <h3>Analysis Complete</h3>
                <div className={`result-summary-badge risk-${analysisResult.riskLevel}`}>
                  {analysisResult.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Widgets */}
          <aside className="secondary-column">
            {/* Recent Activity Card */}
            <section className="card widget-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon video">▶</div>
                  <div className="activity-info">
                    <span className="activity-name">Video Scan</span>
                  </div>
                  <span className="activity-status status-high">High Risk</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon url">🔗</div>
                  <div className="activity-info">
                    <span className="activity-name">URL Scan</span>
                  </div>
                  <span className="activity-status status-medium">Medium Risk</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon image">🖼️</div>
                  <div className="activity-info">
                    <span className="activity-name">Image Scan</span>
                  </div>
                  <span className="activity-status status-low">Low Risk</span>
                </div>
              </div>
            </section>

            {/* Last Scan Result Card */}
            <section className="card widget-card">
              <h3>Last Scan Result</h3>
              <div className="scan-stats-list">
                <div className="stat-row">
                  <span className="stat-label">Risk Score</span>
                  <span className="stat-value">72</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Risk Level</span>
                  <span className="stat-value text-red">High Risk</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Confidence</span>
                  <span className="stat-value">84%</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
