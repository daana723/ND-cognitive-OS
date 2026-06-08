# ND COGNITIVE OS — CONTEXT PACKAGE FOR CLAUDE CODE
## Complete Product Vision, Architecture & Implementation Guide
### Version 1.0 — June 2026

---

## 1. PRODUCT VISION

### What This Is

A cognitive modeling system for non-linear thinkers and neurodivergent minds. Not productivity software. Cognitive infrastructure.

### What This Is NOT
- Not a task manager
- Not a habit tracker
- Not another dashboard with KPIs
- Not productivity theater

### Core Promise
Help users understand:
- How they think
- How they regulate
- How they create
- How they make decisions
- How they enter flow
- How they recover

### Design Principles
- Calm, atmospheric, non-urgent
- ND-safe formatting (bullets, scannable, no dense walls)
- Reduce cognitive load, don't multiply tabs
- Good enough to learn from > perfect > nothing
- Privacy-first: LocalStorage only, everything stays on device

---

## 2. ECOSYSTEM MAP — EXISTING ASSETS

### Live Prototypes (all accessible)

| # | Name | URL | Tech | Status | Domain |
|---|------|-----|------|--------|--------|
| 1 | **Serendipity Lab** | v0-image-analysis-nu-ruby-90.vercel.app | React/v0 | LIVE — Pattern Recognition, Cognitive Alignment, Sensory Synchrony modules | Self + Society |
| 2 | **Creator OS** | v0-creator-os-build-steel.vercel.app | React/v0 | LIVE — Brain Dump, Product Ideas, Marketplace, Social Studio | Creation + Systems |
| 3 | **ADHD Assessment** | adhd-assessment-with-q5qj.bolt.host | Next.js/Bolt | LIVE — Subtype analysis, assessment flow | Self |
| 4 | **Quantum Self Companion** | quantum-self-companion.lovable.app | React/Lovable | LIVE — Neurodivergent spiritual companion | Self + Future |
| 5 | **IndigoSystem Landing** | mythic-tech.lovable.app | React/Lovable | LIVE — The Loom orchestrator, agent descriptions | Systems + Future |
| 6 | **ND-cognitive-OS** | github.com/daana723/ND-cognitive-OS | React/Vite | SCAFFOLDED — 5 MVP modules | Self |
| 7 | **ClarityOS** | github.com/daana723/ClarityOS | Multi-agent | EARLY — Insight/Reflection/Guidance agents | Self |
| 8 | **Indigo-Companion** | github.com/daana723/Indigo-Companion | HTML/JS | PROTOTYPE — Mood selector, journaling | Self |
| 9 | **SoulPrints** | github.com/daana723/sb1-SoulPrints | React/Vite | PROTOTYPE — StackBlitz | Creation |

### Key Insight
These are NOT separate products. They are fragments of ONE system trying to emerge. The ND-cognitive-OS repo is the unification point.

---

## 3. UNIFIED ARCHITECTURE

### 7 Core Layers (from architecture.md)

```
┌─────────────────────────────────────────────────────────┐
│  7. PERSONAL OS LAYER                                   │
│     Routines, environment design, project structures     │
├─────────────────────────────────────────────────────────┤
│  6. COMPANION LAYER                                     │
│     Conversational interface, reflects patterns          │
├─────────────────────────────────────────────────────────┤
│  5. PATTERN ENGINE LAYER                                │
│     Detects cycles, flow triggers, burnout precursors   │
│     Includes inverted search: "What's missing?"          │
├─────────────────────────────────────────────────────────┤
│  4. WORKFLOW GENERATOR LAYER                            │
│     Generates workflows from cognitive state + profile  │
├─────────────────────────────────────────────────────────┤
│  3. ADAPTIVE TOOLKIT LAYER                              │
│     Grounding, sensory, attention, planning tools       │
├─────────────────────────────────────────────────────────┤
│  2. COGNITIVE MAP LAYER                                 │
│     State tracking, trigger detection, energy cycles    │
├─────────────────────────────────────────────────────────┤
│  1. PROFILE LAYER                                       │
│     Cognitive style, attention pattern, sensory profile │
└─────────────────────────────────────────────────────────┘
```

### Module Mapping to Existing Assets

| Layer | MVP Module | Existing Asset to Integrate |
|-------|-----------|---------------------------|
| 1. Profile | Profile Setup | ADHD Assessment (subtype analysis) |
| 2. Cognitive Map | State Tracker | ND-cognitive-OS Dashboard |
| 3. Adaptive Toolkit | Recommendations | ClarityOS agents (Insight, Reflection, Guidance) |
| 4. Workflow Generator | Personal OS | Creator OS (Brain Dump → Product pipeline) |
| 5. Pattern Engine | Pattern Detection | Serendipity Lab (Pattern Recognition module) |
| 6. Companion | Chat Interface | Quantum Self Companion + Indigo-Companion |
| 7. Personal OS | Output Generator | SoulPrints + Creator OS Marketplace |

---

## 4. MVP MODULES — IMPLEMENTATION PRIORITY

### Phase 1: Foundation (NOW)
**Goal: Working cognitive state tracker with local persistence**

1. **State Machine** — 8 cognitive states, valid transitions, energy/sensory tracking
2. **Profile Setup** — Cognitive style, attention pattern, strengths/challenges
3. **Dashboard** — Current state display, quick state change, energy/sensory sliders

### Phase 2: Data Collection (NEXT)
**Goal: Start capturing real cognitive data**

4. **Emotional Navigator** — Log emotions, triggers, regulation strategies, intensity
5. **Sensory Check-In** — Track 5 sensory channels + environment factors
6. **Discoveries** — Capture insights, patterns, realizations with tags

### Phase 3: Intelligence (LATER)
**Goal: Pattern detection and recommendations**

7. **Pattern Engine** — Detect overwhelm loops, flow chains, burnout precursors, inverted search
8. **Recommendations** — Context-aware suggestions based on profile + current state + patterns
9. **Personal OS Output** — Generate routines, environment designs, project structures

---

## 5. TECHNICAL SPECIFICATION

### Stack
- **Frontend:** React 18 + Vite
- **State:** Zustand (with persist middleware → LocalStorage)
- **Styling:** Tailwind CSS
- **Data:** JSON logs, LocalStorage persistence
- **No backend** — everything stays on device

### File Structure
```
nd-cognitive-os/
├── src/
│   ├── components/
│   │   ├── Profile/          # Dashboard, Onboarding, Navbar
│   │   ├── EmotionalNavigator/
│   │   ├── SensoryCheckIn/
│   │   ├── Discoveries/
│   │   ├── Recommendations/
│   │   └── PatternEngine/
│   ├── logic/
│   │   ├── stateMachine.js   # States, transitions, energy/sensory
│   │   ├── cognitiveMap.js   # Profile, map builder, recommendations
│   │   ├── patternEngine.js  # Pattern detection, inverted search
│   │   └── useStore.js       # Zustand store with persistence
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### State Machine
```javascript
STATES: flow, focused, scattered, overwhelmed, recovering, dormant, hyperfocus, dissociated
ENERGY: high, medium, low, depleted
SENSORY: calm, moderate, elevated, overload
```

### Data Model
```javascript
// Cognitive state entry
{
  from: 'focused',
  to: 'flow',
  timestamp: '2026-06-08T...',
  energy: 'high',
  sensory: 'calm',
  context: { trigger: 'music on', location: 'home' }
}

// Emotional log entry
{
  emotion: 'anxious',
  intensity: 7,
  trigger: 'sudden noise',
  strategy: 'deep breath',
  timestamp: '2026-06-08T...'
}

// Sensory check-in
{
  levels: { visual: 'high', auditory: 'moderate', tactile: 'low', ... },
  environment: { lighting: 'calm', noise: 'moderate', ... },
  notes: 'Feeling overstimulated by screen',
  timestamp: '2026-06-08T...'
}

// Discovery
{
  type: 'insight' | 'pattern' | 'realization' | 'question' | 'breakthrough',
  content: 'I think better after walking',
  tags: ['movement', 'cognition'],
  timestamp: '2026-06-08T...'
}
```

---

## 6. MONETIZATION MAP

### Free Tier (Entry Point)
- Basic cognitive state tracking
- Emotional + sensory logging
- Simple pattern detection
- LocalStorage only

### Paid Tiers (Future)
| Tier | Price | Features |
|------|-------|----------|
| **Serendipity Lab** | Free | Pattern recognition, synchronicity tracking, basic insights |
| **Cognitive OS Pro** | £7/mo | Advanced patterns, AI companion, workflow generation |
| **Creator OS** | £12/mo | Brain dump → product pipeline, marketplace, social studio |
| **IndigoSystem** | £29/mo | Full ecosystem, The Loom orchestrator, all agents |

### Product Funnel
```
Serendipity Lab (free) → Cognitive OS Pro → Creator OS → IndigoSystem
     ↑                         ↑                ↑
  Entry point            Core value         Revenue driver
```

---

## 7. ONBOARDING FLOW

### Step 1: Welcome
"This is not productivity software. This is cognitive infrastructure."

### Step 2: Cognitive Style
"How do you think?" — Linear / Non-linear / Cyclical / Spiral / Constellation

### Step 3: Attention Pattern
"How does your attention move?" — Narrow focus / Wide scan / Rotating / Depth-first / Burst

### Step 4: Sensory Profile (optional)
Rate sensitivity: Visual / Auditory / Tactile / Proprioceptive / Interoceptive

### Step 5: Set Intentions
"What do you want to understand about yourself?" — Free text or guided options

### Step 6: First Check-In
"How are you feeling right now?" → Emotional Navigator

---

## 8. IMPLEMENTATION PRIORITIES

### For Claude Code — Immediate Tasks

1. **Verify the scaffolded project builds** — fix any import/path issues
2. **Add the remaining components** — Recommendations and PatternEngine modules
3. **Wire up the state machine** — ensure all state transitions work correctly
4. **Add data export** — JSON download of all user data
5. **Polish the onboarding** — make it feel calm and welcoming
6. **Add keyboard shortcuts** — for power users who hate mice
7. **Add dark/light mode toggle** — respect system preference by default

### Integration Tasks (After MVP Works)

8. **Port Serendipity Lab modules** into this codebase
9. **Port ADHD Assessment** as a Profile setup wizard
10. **Port Creator OS brain dump** as a Discovery type
11. **Add companion chat interface** — start with rule-based, add AI later
12. **Add data import** — let users bring data from other tools

---

## 9. DESIGN LANGUAGE

### Colors
- **Background:** Deep purple-black (#0f0a1a)
- **Surface:** Muted purple (#1a1025)
- **Accent:** Violet (#7c3aed)
- **Glow:** Light violet (#a78bfa)

### Typography
- System fonts only (no external fonts to load)
- Large, readable sizes
- Generous line height

### Interaction Patterns
- No modals — use inline expansion
- No notifications — use gentle visual cues
- No streaks or gamification pressure
- Micro-interactions only (no flashy animations)
- Everything reachable in 2 clicks max

### ND-Safe Rules
- Never show more than 7 items at once
- Always provide an "escape" (skip, dismiss, later)
- Never use urgency language ("hurry", "don't miss", "streak")
- Always allow going back
- Respect reduced-motion preference

---

## 10. STRATEGIC CONTEXT

### The User (Dana)
- Linguist, artist, generalist builder, system thinker
- Neurodivergent, twice-burnout survivor
- Thinks in metaphors, patterns, associations, intuitions
- Needs proactive help, not reactive
- ONE clear action, not options
- Cognitive load is the real constraint (not money, skills, or knowledge)

### The Vision (from VISION_DIRECTIVES.md)
Five domains: Self, Creation, Systems, Society, Future
Everything connects. Favor synthesis over accumulation.
Ask: "Does this help humans understand themselves more clearly?"

### The Ecosystem
This cognitive OS is the FOUNDATION layer. It feeds into:
- Serendipity Lab (pattern recognition)
- Creator OS (idea → product pipeline)
- The Loom (agent orchestrator)
- Quantum Companion (spiritual/reflective layer)

### What to Build NOW
The MVP. The foundation. The thing that works.
Everything else is iteration.

---

## APPENDIX: EXISTING CODE ASSETS

### From Indigo-Companion repo
- `src/models/` — data models
- `src/services/` — business logic
- `specs/dynamic-insight-engine/` — insight engine spec
- `design.md` — full component architecture
- `requirements.md` — detailed user stories and acceptance criteria

### From ClarityOS repo
- `architecture.md` — multi-agent structure (Insight, Reflection, Guidance agents)

### From ND-cognitive-OS repo (this project)
- All scaffolded components in `src/components/`
- Core logic in `src/logic/`
- Full architecture in `architecture.md`
- Vision in `VISION_DIRECTIVES.md`
