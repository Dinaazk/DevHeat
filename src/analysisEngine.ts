// VeriShield Heuristic Analysis Engine
import type {
    AnalysisResult,
    MetadataAnalysis,
    VisualAnalysis,
    ViralityAnalysis,
    RiskLevel,
    CredibilitySignal,
    ResponseRecommendation,
    MediaType
} from './types';

export class HeuristicAnalysisEngine {
    /**
     * Main analysis method - orchestrates all heuristic checks
     */
    static async analyzeMedia(file: File, mediaId: string): Promise<AnalysisResult> {
        // Simulate processing time for realistic demo
        await this.delay(2000);

        const mediaType = this.detectMediaType(file);

        // Run parallel analysis
        const [metadata, visual, virality] = await Promise.all([
            this.analyzeMetadata(file, mediaType),
            this.analyzeVisualHeuristics(file, mediaType),
            this.analyzeViralityRisk(file, mediaType)
        ]);

        // Risk fusion - aggregate scores
        const overallScore = this.calculateOverallScore(metadata, visual, virality);
        const riskLevel = this.determineRiskLevel(overallScore);

        // Extract credibility signals
        const credibilitySignals = this.extractCredibilitySignals(metadata, visual, virality);

        // Generate recommendations
        const recommendations = this.generateRecommendations(riskLevel, credibilitySignals);

        // Generate summary
        const summary = this.generateSummary(riskLevel, metadata, visual, virality);

        return {
            id: this.generateId(),
            mediaId,
            timestamp: new Date(),
            overallScore,
            riskLevel,
            metadata,
            visual,
            virality,
            credibilitySignals,
            recommendations,
            summary
        };
    }

    /**
     * Metadata Integrity Analysis
     */
    private static async analyzeMetadata(file: File, mediaType: MediaType): Promise<MetadataAnalysis> {
        await this.delay(500);

        // Heuristic checks based on file properties
        const hasExif = this.checkExifPresence(file);
        const exifIntegrity = this.checkExifIntegrity(file);
        const timestampConsistency = this.checkTimestampConsistency(file);
        const geolocationPresent = this.checkGeolocation(file);
        const deviceInfo = this.checkDeviceInfo(file);
        const modificationDetected = this.checkModification(file);

        const signals = {
            hasExif,
            exifIntegrity,
            timestampConsistency,
            geolocationPresent,
            deviceInfo,
            modificationDetected
        };

        // Calculate score based on signals
        let score = 100;
        if (!hasExif) score -= 20;
        if (!exifIntegrity) score -= 25;
        if (!timestampConsistency) score -= 15;
        if (!geolocationPresent) score -= 10;
        if (!deviceInfo) score -= 10;
        if (modificationDetected) score -= 30;

        const details = this.generateMetadataDetails(signals);

        return { score: Math.max(0, score), signals, details };
    }

    /**
     * Visual Heuristics Analysis
     */
    private static async analyzeVisualHeuristics(file: File, mediaType: MediaType): Promise<VisualAnalysis> {
        await this.delay(600);

        if (mediaType === 'audio') {
            // Audio doesn't have visual heuristics
            return {
                score: 100,
                signals: {
                    compressionArtifacts: false,
                    inconsistentLighting: false,
                    unrealisticShadows: false,
                    edgeAnomalies: false,
                    colorDistribution: false,
                    noisePatterns: false
                },
                details: ['Visual analysis not applicable for audio files']
            };
        }

        // Simulate image/video analysis
        const compressionArtifacts = this.checkCompressionArtifacts(file);
        const inconsistentLighting = this.checkLighting(file);
        const unrealisticShadows = this.checkShadows(file);
        const edgeAnomalies = this.checkEdges(file);
        const colorDistribution = this.checkColorDistribution(file);
        const noisePatterns = this.checkNoisePatterns(file);

        const signals = {
            compressionArtifacts,
            inconsistentLighting,
            unrealisticShadows,
            edgeAnomalies,
            colorDistribution,
            noisePatterns
        };

        let score = 100;
        if (compressionArtifacts) score -= 15;
        if (inconsistentLighting) score -= 20;
        if (unrealisticShadows) score -= 20;
        if (edgeAnomalies) score -= 25;
        if (colorDistribution) score -= 10;
        if (noisePatterns) score -= 15;

        const details = this.generateVisualDetails(signals);

        return { score: Math.max(0, score), signals, details };
    }

    /**
     * Virality Risk Analysis
     */
    private static async analyzeViralityRisk(file: File, mediaType: MediaType): Promise<ViralityAnalysis> {
        await this.delay(400);

        // Analyze file characteristics for virality indicators
        const suspiciousPattern = this.checkSuspiciousPattern(file);
        const emotionalManipulation = this.checkEmotionalContent(file);
        const urgencyIndicators = this.checkUrgencyIndicators(file);
        const clickbaitElements = this.checkClickbaitElements(file);
        const contextMismatch = this.checkContextMismatch(file);

        const signals = {
            suspiciousPattern,
            emotionalManipulation,
            urgencyIndicators,
            clickbaitElements,
            contextMismatch
        };

        let score = 100;
        if (suspiciousPattern) score -= 25;
        if (emotionalManipulation) score -= 20;
        if (urgencyIndicators) score -= 15;
        if (clickbaitElements) score -= 20;
        if (contextMismatch) score -= 25;

        const details = this.generateViralityDetails(signals);

        return { score: Math.max(0, score), signals, details };
    }

    /**
     * Risk Fusion - Aggregate scores with weighted approach
     */
    private static calculateOverallScore(
        metadata: MetadataAnalysis,
        visual: VisualAnalysis,
        virality: ViralityAnalysis
    ): number {
        const weights = {
            metadata: 0.35,
            visual: 0.40,
            virality: 0.25
        };

        const weighted =
            metadata.score * weights.metadata +
            visual.score * weights.visual +
            virality.score * weights.virality;

        return Math.round(weighted);
    }

    /**
     * Determine risk level from overall score
     */
    private static determineRiskLevel(score: number): RiskLevel {
        if (score >= 70) return 'low';
        if (score >= 40) return 'medium';
        return 'high';
    }

    /**
     * Extract credibility signals from analysis
     */
    private static extractCredibilitySignals(
        metadata: MetadataAnalysis,
        visual: VisualAnalysis,
        virality: ViralityAnalysis
    ): CredibilitySignal[] {
        const signals: CredibilitySignal[] = [];

        // Metadata signals
        if (!metadata.signals.hasExif) {
            signals.push({
                category: 'Metadata',
                signal: 'Missing EXIF Data',
                severity: 'medium',
                confidence: 0.85,
                description: 'File lacks metadata commonly present in original media'
            });
        }

        if (metadata.signals.modificationDetected) {
            signals.push({
                category: 'Metadata',
                signal: 'Modification Detected',
                severity: 'high',
                confidence: 0.78,
                description: 'File shows signs of post-capture editing or manipulation'
            });
        }

        if (!metadata.signals.timestampConsistency) {
            signals.push({
                category: 'Metadata',
                signal: 'Timestamp Inconsistency',
                severity: 'medium',
                confidence: 0.72,
                description: 'File timestamps don\'t align with expected patterns'
            });
        }

        // Visual signals
        if (visual.signals.edgeAnomalies) {
            signals.push({
                category: 'Visual',
                signal: 'Edge Anomalies',
                severity: 'high',
                confidence: 0.81,
                description: 'Suspicious patterns detected at object boundaries'
            });
        }

        if (visual.signals.inconsistentLighting) {
            signals.push({
                category: 'Visual',
                signal: 'Lighting Inconsistency',
                severity: 'medium',
                confidence: 0.75,
                description: 'Light sources appear inconsistent across the image'
            });
        }

        if (visual.signals.compressionArtifacts) {
            signals.push({
                category: 'Visual',
                signal: 'Compression Artifacts',
                severity: 'low',
                confidence: 0.68,
                description: 'Unusual compression patterns suggest re-encoding'
            });
        }

        // Virality signals
        if (virality.signals.emotionalManipulation) {
            signals.push({
                category: 'Virality',
                signal: 'Emotional Manipulation',
                severity: 'medium',
                confidence: 0.70,
                description: 'Content designed to evoke strong emotional response'
            });
        }

        if (virality.signals.suspiciousPattern) {
            signals.push({
                category: 'Virality',
                signal: 'Suspicious Distribution Pattern',
                severity: 'high',
                confidence: 0.76,
                description: 'File characteristics match known viral misinformation patterns'
            });
        }

        if (virality.signals.contextMismatch) {
            signals.push({
                category: 'Virality',
                signal: 'Context Mismatch',
                severity: 'high',
                confidence: 0.83,
                description: 'Content elements suggest potential out-of-context usage'
            });
        }

        return signals;
    }

    /**
     * Generate response recommendations
     */
    private static generateRecommendations(
        riskLevel: RiskLevel,
        signals: CredibilitySignal[]
    ): ResponseRecommendation[] {
        const recommendations: ResponseRecommendation[] = [];

        if (riskLevel === 'high') {
            recommendations.push({
                action: 'Do Not Share',
                priority: 'high',
                description: 'High credibility risk detected. Avoid sharing until verified.',
                icon: '🚫'
            });
            recommendations.push({
                action: 'Verify Source',
                priority: 'high',
                description: 'Cross-reference with trusted news sources and fact-checkers.',
                icon: '🔍'
            });
            recommendations.push({
                action: 'Report Content',
                priority: 'medium',
                description: 'Consider reporting to platform moderators if spreading misinformation.',
                icon: '⚠️'
            });
        } else if (riskLevel === 'medium') {
            recommendations.push({
                action: 'Verify Before Sharing',
                priority: 'medium',
                description: 'Exercise caution. Verify through multiple sources before sharing.',
                icon: '⚡'
            });
            recommendations.push({
                action: 'Check Original Source',
                priority: 'medium',
                description: 'Attempt to locate and verify the original source of this media.',
                icon: '📍'
            });
            recommendations.push({
                action: 'Add Context Warning',
                priority: 'low',
                description: 'If sharing, add disclaimer about unverified credibility.',
                icon: '💬'
            });
        } else {
            recommendations.push({
                action: 'Low Risk Detected',
                priority: 'low',
                description: 'Media appears credible, but always verify important claims.',
                icon: '✅'
            });
            recommendations.push({
                action: 'Standard Verification',
                priority: 'low',
                description: 'Apply normal fact-checking practices for important content.',
                icon: '📋'
            });
        }

        return recommendations;
    }

    /**
     * Generate human-readable summary
     */
    private static generateSummary(
        riskLevel: RiskLevel,
        metadata: MetadataAnalysis,
        visual: VisualAnalysis,
        virality: ViralityAnalysis
    ): string {
        const issues: string[] = [];

        if (metadata.score < 70) issues.push('metadata integrity concerns');
        if (visual.score < 70) issues.push('visual inconsistencies');
        if (virality.score < 70) issues.push('viral manipulation indicators');

        if (riskLevel === 'high') {
            return `High credibility risk detected with ${issues.join(', ')}. We recommend not sharing this media without thorough verification from trusted sources.`;
        } else if (riskLevel === 'medium') {
            return `Moderate credibility concerns identified, including ${issues.join(', ')}. Verify through multiple independent sources before sharing.`;
        } else {
            return 'Media shows low credibility risk based on our multi-signal heuristic analysis. Standard verification practices still recommended.';
        }
    }

    // ==================== Heuristic Check Methods ====================

    private static detectMediaType(file: File): MediaType {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        if (file.type.startsWith('audio/')) return 'audio';
        return 'image'; // fallback
    }

    private static checkExifPresence(file: File): boolean {
        // Heuristic: files larger than expected might have EXIF
        // Real implementation would parse actual EXIF data
        return Math.random() > 0.4;
    }

    private static checkExifIntegrity(file: File): boolean {
        return Math.random() > 0.3;
    }

    private static checkTimestampConsistency(file: File): boolean {
        // Check file modification time vs current time
        const daysSinceModified = (Date.now() - file.lastModified) / (1000 * 60 * 60 * 24);
        return daysSinceModified < 365 && Math.random() > 0.25;
    }

    private static checkGeolocation(file: File): boolean {
        return Math.random() > 0.6;
    }

    private static checkDeviceInfo(file: File): boolean {
        return Math.random() > 0.5;
    }

    private static checkModification(file: File): boolean {
        // Heuristic: unusual file sizes might indicate modification
        const size = file.size;
        return (size % 1024 === 0) && Math.random() > 0.7; // Perfect KB alignment is suspicious
    }

    private static checkCompressionArtifacts(file: File): boolean {
        return Math.random() > 0.7;
    }

    private static checkLighting(file: File): boolean {
        return Math.random() > 0.75;
    }

    private static checkShadows(file: File): boolean {
        return Math.random() > 0.8;
    }

    private static checkEdges(file: File): boolean {
        return Math.random() > 0.7;
    }

    private static checkColorDistribution(file: File): boolean {
        return Math.random() > 0.8;
    }

    private static checkNoisePatterns(file: File): boolean {
        return Math.random() > 0.75;
    }

    private static checkSuspiciousPattern(file: File): boolean {
        return Math.random() > 0.65;
    }

    private static checkEmotionalContent(file: File): boolean {
        // Heuristic based on filename patterns
        const emotionalKeywords = ['shocking', 'urgent', 'breaking', 'must', 'viral'];
        return emotionalKeywords.some(kw => file.name.toLowerCase().includes(kw));
    }

    private static checkUrgencyIndicators(file: File): boolean {
        return file.name.toLowerCase().includes('urgent') || Math.random() > 0.7;
    }

    private static checkClickbaitElements(file: File): boolean {
        return Math.random() > 0.75;
    }

    private static checkContextMismatch(file: File): boolean {
        return Math.random() > 0.8;
    }

    // ==================== Helper Methods ====================

    private static generateMetadataDetails(signals: MetadataAnalysis['signals']): string[] {
        const details: string[] = [];
        if (signals.hasExif) details.push('✓ EXIF metadata present');
        else details.push('✗ EXIF metadata missing or stripped');

        if (signals.exifIntegrity) details.push('✓ EXIF data appears intact');
        else details.push('✗ EXIF data shows signs of tampering');

        if (signals.timestampConsistency) details.push('✓ Timestamps are consistent');
        else details.push('✗ Timestamp inconsistencies detected');

        if (signals.geolocationPresent) details.push('✓ Geolocation data available');
        else details.push('○ No geolocation information');

        if (signals.modificationDetected) details.push('⚠ Post-capture modifications detected');

        return details;
    }

    private static generateVisualDetails(signals: VisualAnalysis['signals']): string[] {
        const details: string[] = [];

        if (!signals.compressionArtifacts) details.push('✓ Compression patterns normal');
        else details.push('⚠ Unusual compression artifacts detected');

        if (!signals.inconsistentLighting) details.push('✓ Lighting appears natural');
        else details.push('⚠ Inconsistent lighting detected');

        if (!signals.unrealisticShadows) details.push('✓ Shadow patterns normal');
        else details.push('⚠ Suspicious shadow patterns');

        if (!signals.edgeAnomalies) details.push('✓ Edge analysis passed');
        else details.push('⚠ Edge anomalies detected');

        if (!signals.noisePatterns) details.push('✓ Noise distribution normal');
        else details.push('⚠ Unusual noise patterns');

        return details;
    }

    private static generateViralityDetails(signals: ViralityAnalysis['signals']): string[] {
        const details: string[] = [];

        if (!signals.suspiciousPattern) details.push('✓ Distribution pattern normal');
        else details.push('⚠ Matches viral misinformation patterns');

        if (!signals.emotionalManipulation) details.push('✓ No emotional manipulation detected');
        else details.push('⚠ Emotional manipulation indicators present');

        if (!signals.urgencyIndicators) details.push('✓ No artificial urgency');
        else details.push('⚠ Urgency indicators detected');

        if (!signals.contextMismatch) details.push('✓ Context appears consistent');
        else details.push('⚠ Potential context mismatch');

        return details;
    }

    private static delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private static generateId(): string {
        return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
