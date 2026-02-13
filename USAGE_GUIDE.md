# VeriShield - Quick Start Guide

## 🚀 Running the Application

The VeriShield application is currently running at:
**http://localhost:5173/**

Simply open this URL in your browser to start using VeriShield!

---

## 📖 User Guide

### Step 1: Upload Media
1. You'll see the upload area with "Drop media file here or click to browse"
2. Either:
   - **Drag and drop** an image, video, or audio file onto the upload area
   - **Click** the upload area to browse and select a file

**Supported formats**: 
- Images: JPG, PNG, GIF, WebP, etc.
- Videos: MP4, MOV, WebM, etc.
- Audio: MP3, WAV, OGG, etc.

### Step 2: Preview Your File
- After uploading, you'll see a preview of your media
- File name, type, and size are displayed
- For images/videos: visual preview shown
- For audio: audio player controls available

### Step 3: Analyze Media
1. Click the **"🔍 Analyze Media"** button
2. Wait 2-3 seconds while the system performs multi-signal analysis
3. You'll see a loading spinner with "Analyzing Media Credibility" message

### Step 4: Review Results

#### Overall Risk Assessment
- **Credibility Score**: 0-100 (higher = more credible)
- **Risk Level Badge**: 
  - 🟢 Low Risk (70-100)
  - 🟡 Medium Risk (40-69)
  - 🔴 High Risk (0-39)
- **Summary**: Plain English explanation of findings

#### Detailed Analysis
Three analysis cards show individual scores:
- **📊 Metadata**: EXIF data, timestamps, device info
- **👁️ Visual**: Compression, lighting, edges, colors
- **📈 Virality**: Manipulation patterns, urgency indicators

#### Credibility Signals
Each signal shows:
- **Category**: Metadata / Visual / Virality
- **Signal Name**: Specific indicator detected
- **Description**: What this means
- **Confidence Bar**: How confident the system is (0-100%)
- **Severity**: Color-coded (green/yellow/red)

#### Response Recommendations
Actionable guidance based on risk level:
- **Action**: What to do
- **Priority Badge**: High / Medium / Low
- **Description**: Why this action is recommended

### Step 5: Track History
- Right sidebar shows **Scan History**
- All previous analyses are saved (last 10)
- Click any history item to view that analysis again
- Each item shows:
  - Risk level badge
  - Timestamp
  - Quick summary (score + signal count)

---

## 🎨 Feature Highlights

### Drag-and-Drop Upload
- Smooth drag-over highlight effect
- No need to click buttons - just drop files!

### Real-Time Analysis
- 2-3 second analysis time
- Loading animation with status updates
- Smooth results reveal with animations

### Explainable Results
- Every signal is explained in plain English
- Confidence scores for transparency
- No black-box predictions

### Beautiful Design
- Dark mode with cybersecurity theme
- Glassmorphism effects for modern look
- Smooth animations and transitions
- Color-coded risk levels for quick scanning

---

## 🧪 Try These Test Scenarios

### Test 1: High Quality Image
Upload a recent photo from your phone:
- Should have EXIF data → Good metadata score
- Natural lighting → Good visual score
- No viral indicators → Good virality score
- **Expected**: Low Risk (70-85 score)

### Test 2: Downloaded/Edited Image
Upload a meme or edited image:
- Missing EXIF data → Lower metadata score
- Compression artifacts → Lower visual score
- Potential viral patterns → Lower virality score
- **Expected**: Medium-High Risk (30-60 score)

### Test 3: Screenshot
Upload a screenshot:
- No camera EXIF data → Lower metadata score
- Perfect KB alignment → Modification detected
- **Expected**: Medium Risk (40-70 score)

---

## 💡 Understanding Scores

### Metadata Score (35% of overall)
- **90-100**: Complete, intact EXIF with consistent timestamps
- **70-89**: Some metadata present, minor inconsistencies
- **50-69**: Limited metadata or integrity concerns
- **Below 50**: Missing or heavily modified metadata

### Visual Score (40% of overall)
- **90-100**: Natural patterns, consistent lighting/shadows
- **70-89**: Minor compression or lighting issues
- **50-69**: Noticeable visual inconsistencies
- **Below 50**: Multiple visual anomalies detected

### Virality Score (25% of overall)
- **90-100**: No viral manipulation indicators
- **70-89**: Some emotional content, normal distribution
- **50-69**: Urgency/clickbait elements present
- **Below 50**: Strong viral manipulation patterns

---

## ❓ FAQ

**Q: Does VeriShield use AI/ML models?**
A: No! VeriShield uses heuristic-based analysis - rule-based pattern matching and signal detection. This makes results more transparent and explainable.

**Q: How accurate is the analysis?**
A: VeriShield provides risk assessment, not definitive truth. Use it as one tool in your verification toolkit. Always cross-reference with other sources.

**Q: Does it detect deepfakes?**
A: VeriShield focuses on credibility risk, not deepfake detection. It analyzes metadata, visual patterns, and virality indicators that may suggest manipulation.

**Q: Is my uploaded media stored?**
A: Currently, media is only stored in your browser session. Nothing is sent to a server. When you refresh the page, history is cleared.

**Q: Can I export results?**
A: Not in this MVP version. Future versions will support PDF export and shareable reports.

---

## 🎯 Best Practices

1. **Upload original files when possible** - Screenshots and re-saved images lose metadata
2. **Review all signals** - Don't just rely on the overall score
3. **Use with other tools** - VeriShield is one part of verification workflow
4. **Check recommendations** - Follow the action items for each risk level
5. **Keep history** - Track patterns across multiple analyses

---

## 🐛 Troubleshooting

**Issue**: File won't upload
- **Solution**: Check file size (<100MB recommended) and format

**Issue**: Analysis stuck on loading
- **Solution**: Refresh page and try again

**Issue**: Can't see history items
- **Solution**: Ensure you've analyzed at least one file first

**Issue**: Preview not showing
- **Solution**: Browser may not support that media format

---

## 🔥 Pro Tips

1. **Compare similar media** - Upload different versions of the same image to see how editing affects scores
2. **Test your own photos** - See what "credible" looks like in VeriShield
3. **Watch signal patterns** - Learn which signals commonly appear together
4. **Share results** - Take screenshots to discuss findings with others
5. **Read descriptions** - The signal descriptions teach you about media forensics

---

**Need help?** Open an issue on GitHub or contact the development team.

**Enjoying VeriShield?** Give us a ⭐ on GitHub and share with others!

---

*Built for DevHeat Hackathon 2026 🏆*
