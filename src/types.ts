// VeriShield Type Definitions

export type MediaType = 'image' | 'video' | 'audio';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface UploadedMedia {
  id: string;
  file: File;
  type: MediaType;
  preview?: string;
  uploadedAt: Date;
}

export interface MetadataAnalysis {
  score: number;
  signals: {
    hasExif: boolean;
    exifIntegrity: boolean;
    timestampConsistency: boolean;
    geolocationPresent: boolean;
    deviceInfo: boolean;
    modificationDetected: boolean;
  };
  details: string[];
}

export interface VisualAnalysis {
  score: number;
  signals: {
    compressionArtifacts: boolean;
    inconsistentLighting: boolean;
    unrealisticShadows: boolean;
    edgeAnomalies: boolean;
    colorDistribution: boolean;
    noisePatterns: boolean;
  };
  details: string[];
}

export interface ViralityAnalysis {
  score: number;
  signals: {
    suspiciousPattern: boolean;
    emotionalManipulation: boolean;
    urgencyIndicators: boolean;
    clickbaitElements: boolean;
    contextMismatch: boolean;
  };
  details: string[];
}

export interface CredibilitySignal {
  category: string;
  signal: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  description: string;
}

export interface ResponseRecommendation {
  action: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  icon: string;
}

export interface AnalysisResult {
  id: string;
  mediaId: string;
  timestamp: Date;
  overallScore: number;
  riskLevel: RiskLevel;
  metadata: MetadataAnalysis;
  visual: VisualAnalysis;
  virality: ViralityAnalysis;
  credibilitySignals: CredibilitySignal[];
  recommendations: ResponseRecommendation[];
  summary: string;
}

export interface AnalysisHistory {
  analyses: AnalysisResult[];
}
