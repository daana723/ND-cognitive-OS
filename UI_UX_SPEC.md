# UI_UX_SPEC.md — ND Cognitive OS
## Immersive Experience Design Specification
### For Qwen 3.5 Build

---

## DESIGN PHILOSOPHY

This is NOT a productivity app. This is NOT a child's game. This is a **mythic-tech cognitive sanctuary** — an immersive, evolving, self-recursive experience for neurodivergent minds.

**Core Principles:**
1. **Immersive, not functional** — Every interaction should feel like entering a different world
2. **Self-recursive** — The system evolves with the user, learning and adapting
3. **ND-safe** — No shame, no gamification, no streaks, no urgency, no "regulate" language
4. **Mythic-tech aesthetic** — Ancient patterns meet modern technology
5. **Local-first** — Everything stays on device, private, sovereign

---

## COLOR PALETTE (SPARK Framework)

```
Indigo Core:    #3A2E6E
Deep Space:     #1D1538
Soft Gold:      #D9B76E
Nebula Blue:    #4C6FE3
Shadow Black:   #0B0A0F
Fog White:      #F2F2F7
Sage Green:     #7C9A72
Rose Gold:      #C9A96E
```

**Usage:**
- Background: Deep Space (#1D1538) with subtle gradient to Shadow Black
- Primary accents: Indigo Core + Soft Gold
- Text: Fog White for primary, muted gray (#9CA3AF) for secondary
- Interactive elements: Nebula Blue glow on hover
- Success/positive: Sage Green
- Warning/gentle alert: Rose Gold

---

## TYPOGRAPHY

```
Headings: Space Grotesk (bold, letter-spacing: -0.02em)
Body: Inter (regular, line-height: 1.6)
Accents: JetBrains Mono (for tech elements, data, scores)
```

**ND-safe sizing:**
- Minimum body text: 16px
- Heading hierarchy: 12px minimum difference
- Generous line-height (1.6+)
- Dyslexia-friendly options (toggle in settings)

---

## ANIMATION & INTERACTION

**Allowed:**
- Subtle breathing/pulsing effects (4-6 second cycles)
- Smooth page transitions (300ms ease-in-out)
- Gentle glow on interactive elements
- Constellation-style connection animations
- Growth/progress animations (organic, not mechanical)

**NOT allowed:**
- Fast flashing (seizure risk)
- Autoplay audio/video
- Overwhelming particle effects
- Gamification animations (confetti, badges, streaks)
- Urgency animations (countdowns, pulsing red)

---

## USER FLOW

### First Visit (No Profile)
```
Landing Page (immersive, atmospheric)
    ↓
Choose Entry Point:
    A) "Am I 2E?" → SPARK Assessment (40 questions, 8-12 min)
    B) "Daily Cognitive OS" → Onboarding → Dashboard
    ↓
Results / Dashboard
    ↓
System evolves with each interaction
```

### Returning User
```
Dashboard (personalized, shows patterns, insights)
    ↓
Modules: Emotional Navigator | Sensory Check-In | Discoveries | Pattern Engine | SPARK Results
    ↓
Settings (export, clear, edit profile, reset)
```

---

## COMPONENT SPECIFICATIONS

### Landing Page
- Full-screen immersive experience
- Animated constellation background (subtle, slow-moving)
- Two large CTA cards: "Am I 2E?" and "Daily Cognitive OS"
- Philosophy section: "Not therapy. Infrastructure."
- No navigation bar (clean, focused)

### SPARK Assessment
- One question at a time (not a long form)
- Likert scale: 0-4 with visual slider
- Progress indicator: constellation that fills in as you progress
- Dimension icons: CI (fractal triangle), ER (concentric circles), SA (radiating lines), CD (branching node), ED (spiral)
- After each dimension: brief transition animation
- Final results: animated radar chart, profile type reveal, personalized interpretation

### SPARK Results
- Radar chart (5-point star, SVG, animated reveal)
- Spark Index score (0-20, large, prominent)
- Profile type: Quiet Spark / Flickering Spark / Burning Spark / Wildfire
- Personalized interpretation paragraph
- Growth recommendations (3-5 actionable items)
- Shadow patterns (gentle, non-judgmental)
- Shareable image generation

### Dashboard
- "Energy Weather Report" — current state visualization
- Quick-log buttons (emotion, sensory, discovery)
- Pattern insights (emerging, not overwhelming)
- Module navigation (icons, not text-heavy)

### Settings
- Profile editor (cognitive style, attention pattern, strengths, challenges)
- Data export (JSON, timestamped)
- Clear all data (with confirmation, not scary)
- Reset onboarding
- Accessibility toggles (reduced motion, high contrast, dyslexia font)

---

## LANGUAGE GUIDELINES

**USE:**
- "Navigate Life as Your Neurodivergent Self"
- "Tools, guidance, and quantum wisdom"
- "100% Local & Private"
- "No Cloud. No Tracking. One-Time Payment. Yours Forever."
- "Your privacy is not our product"
- "True digital ownership"
- "Neurodivergent Safe Space"
- "Built BY Neurodivergents, FOR Neurodivergents"
- "What if you're not broken—just operating in a world designed for different brains?"
- "Understand" not "fix"
- "Intensity" not "sensitivity"
- "Pattern" not "symptom"
- "Thrive" not "cope"
- "Sanctuary" not "tool"
- "Infrastructure" not "app"
- "Evolve" not "improve"

**NEVER USE:**
- "This is not a productivity app" (too negative — show what it IS, not what it isn't)
- "This is not a game" (too negative)
- "Regulate" (pejorative connotation)
- "Manage" (implies disorder)
- "Track" (surveillance connotation)
- "Compliance" or "adherence"
- "Normal" or "typical"
- "Deficit" or "disorder"
- Gamification language (streaks, points, badges, levels)

---

## SELF-RECURSIVE FEATURES

The system should evolve with the user:

1. **Pattern Recognition** — Detects cycles in emotional/sensory data
2. **Adaptive Recommendations** — Suggestions change based on user history
3. **Evolving Dashboard** — Layout adapts to most-used modules
4. **Insight Generation** — "I've noticed..." statements based on data patterns
5. **Growth Tracking** — Shows how patterns change over time (not gamified, just observational)

---

## TECHNICAL REQUIREMENTS

- React 18 + Vite
- Zustand for state management
- LocalStorage for persistence
- SVG for radar chart and animations
- Tailwind CSS for styling
- No external analytics or tracking
- Works offline after initial load
- Export: JSON file download
- Import: JSON file upload (for data portability)

---

## SUCCESS CRITERIA

A user should feel:
1. **Seen** — "This understands me"
2. **Safe** — "Nothing here judges me"
3. **Curious** — "I want to explore more"
4. **Empowered** — "I understand myself better"
5. **Calm** — "This doesn't overwhelm me"

NOT:
- Like they're using a "tool"
- Like they're being "tracked"
- Like they're playing a "game"
- Like they're in "therapy"
