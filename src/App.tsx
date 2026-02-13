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
        onLogin={() => setCurrentView('app')}
        onNavigateToSignup={() => setCurrentView('signup')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupPage
        onSignup={() => setCurrentView('app')}
        onNavigateToLogin={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <span className="header-icon">🛡️</span>
          <h1>VeriShield</h1>
        </div>
        <p className="header-tagline">
          Media Credibility Assessment & Response System
          <br />
          Heuristic-driven multi-signal evaluation for trustworthy media verification
        </p>
      </header>

      {/* Main Content */}
      <div className="main-grid">
        {/* Left Column - Upload & Analysis */}
        <div>
          {/* Upload Section */}
          <section className="upload-section">
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Upload Suspicious Media</h2>

            {!uploadedMedia ? (
              <div
                className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-icon">📁</div>
                <p className="upload-text">Drop media file here or click to browse</p>
                <p className="upload-hint">Supports images, videos, and audio files</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="file-input"
                  accept="image/*,video/*,audio/*"
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="file-preview">
                <div className="preview-header">
                  <div className="preview-info">
                    <h4>{uploadedMedia.file.name}</h4>
                    <p>
                      {uploadedMedia.type.toUpperCase()} •
                      {(uploadedMedia.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="preview-actions">
                    <button className="btn btn-secondary btn-icon" onClick={handleRemoveMedia}>
                      🗑️
                    </button>
                  </div>
                </div>

                {uploadedMedia.type === 'image' && uploadedMedia.preview && (
                  <img src={uploadedMedia.preview} alt="Preview" className="preview-media" />
                )}

                {uploadedMedia.type === 'video' && uploadedMedia.preview && (
                  <video src={uploadedMedia.preview} controls className="preview-media" />
                )}

                {uploadedMedia.type === 'audio' && uploadedMedia.preview && (
                  <audio src={uploadedMedia.preview} controls className="audio-preview" />
                )}
              </div>
            )}

            {uploadedMedia && !analysisResult && (
              <div className="analyze-button-container">
                <button
                  className="btn btn-primary btn-analyze"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? '🔍 Analyzing...' : '🔍 Analyze Media'}
                </button>
              </div>
            )}
          </section>

          {/* Loading State */}
          {isAnalyzing && (
            <section className="analysis-section">
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p className="loading-text">Analyzing Media Credibility</p>
                <p className="loading-subtext">
                  Running multi-signal heuristic evaluation...
                </p>
              </div>
            </section>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <section className="analysis-section">
              <div className="results-container">
                {/* Risk Score Card */}
                <div className="risk-score-card">
                  <div className="risk-score-content">
                    <div className="risk-level-badge">
                      <span className={`badge badge-${analysisResult.riskLevel}`}>
                        {analysisResult.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="score-display">{analysisResult.overallScore}</div>
                    <div className="score-label">Credibility Score</div>
                    <div className="risk-summary">{analysisResult.summary}</div>
                  </div>
                </div>

                {/* Analysis Details Grid */}
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <div className="analysis-card-header">
                      <div className="analysis-card-title">📊 Metadata</div>
                      <div className="analysis-score">{analysisResult.metadata.score}</div>
                    </div>
                    <ul className="analysis-details">
                      {analysisResult.metadata.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-card">
                    <div className="analysis-card-header">
                      <div className="analysis-card-title">👁️ Visual</div>
                      <div className="analysis-score">{analysisResult.visual.score}</div>
                    </div>
                    <ul className="analysis-details">
                      {analysisResult.visual.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-card">
                    <div className="analysis-card-header">
                      <div className="analysis-card-title">📈 Virality</div>
                      <div className="analysis-score">{analysisResult.virality.score}</div>
                    </div>
                    <ul className="analysis-details">
                      {analysisResult.virality.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Credibility Signals */}
                <div className="signals-section">
                  <h3 className="section-title">
                    <span className="section-icon">⚡</span>
                    Credibility Signals Detected
                  </h3>
                  <div className="signals-grid">
                    {analysisResult.credibilitySignals.map((signal, idx) => (
                      <div key={idx} className={`signal-item severity-${signal.severity}`}>
                        <div className="signal-category">{signal.category}</div>
                        <div className="signal-content">
                          <div className="signal-name">{signal.signal}</div>
                          <div className="signal-description">{signal.description}</div>
                          <div className="signal-confidence">
                            <div className="confidence-bar">
                              <div
                                className="confidence-fill"
                                style={{ width: `${signal.confidence * 100}%` }}
                              />
                            </div>
                            <span className="confidence-value">
                              {(signal.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="recommendations-section">
                  <h3 className="section-title">
                    <span className="section-icon">💡</span>
                    Response Recommendations
                  </h3>
                  <div className="recommendations-grid">
                    {analysisResult.recommendations.map((rec, idx) => (
                      <div key={idx} className="recommendation-item">
                        <div className="recommendation-icon">{rec.icon}</div>
                        <div className="recommendation-content">
                          <div className="recommendation-header">
                            <div className="recommendation-action">{rec.action}</div>
                            <span className={`badge priority-badge badge-${rec.priority}`}>
                              {rec.priority}
                            </span>
                          </div>
                          <div className="recommendation-description">{rec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Scan History */}
        <aside className="history-sidebar">
          <div className="history-container">
            <h3 className="history-title">
              <span>📜</span>
              Scan History
            </h3>

            {analysisHistory.length === 0 ? (
              <div className="history-empty">
                <div className="history-empty-icon">📭</div>
                <p>No previous scans yet</p>
              </div>
            ) : (
              <div className="history-list">
                {analysisHistory.map((result) => (
                  <div
                    key={result.id}
                    className="history-item"
                    onClick={() => handleLoadHistory(result)}
                  >
                    <div className="history-item-header">
                      <span className={`badge badge-${result.riskLevel}`}>
                        {result.riskLevel}
                      </span>
                      <span className="history-timestamp">
                        {formatTimestamp(result.timestamp)}
                      </span>
                    </div>
                    <div className="history-summary">
                      Score: {result.overallScore} • {result.credibilitySignals.length} signals
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
