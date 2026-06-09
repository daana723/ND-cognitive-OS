# CLAUDE_CODE_MASTER_PROMPT.md
## Complete Context for Claude Code Session
### Budget: $3-5 | Time: 15-20 minutes max

---

## PROJECT: ND Cognitive OS

A cognitive modeling system for neurodivergent minds. Not productivity software. Cognitive infrastructure.

**Local path:** C:\Users\danap\ND-cognitive-OS
**NOT pushed to GitHub yet** (needs PAT auth — handle push at end if possible)

---

## KEY CONTEXT

### The Ecosystem (6 prototypes, 1 repo)
1. **2E Assessment App** (Bolt) — Dabrowski overexcitabilities assessment. THE differentiator.
2. **Serendipity Lab** (v0) — Pattern recognition, synchronicity tracking
3. **Creator OS** (v0) — Brain dump → product pipeline
4. **IndigoSystem** (Lovable) — The Loom orchestrator
5. **Quantum Self Companion** (Lovable) — Spiritual companion
6. **ND Cognitive OS** (this repo) — Foundation layer

### The Vision
- **Entry point:** 2E Assessment (Dabrowski framework)
- **Monetization:** Free assessment → $12 full report → $7/mo Pro → $29/mo Ecosystem
- **Differentiator:** No competitor combines cognitive state tracking + sensory monitoring + pattern engine + ND-safe design + local-first privacy
- **Tagline:** "Understand how you think. Not how you should think."

### Voiceovers Available
- 20 long voiceovers (Mia + British Woman) at C:\Users\danap\Downloads\
- 10 short voiceovers for TikTok/Reels
- 2 manifesto versions (Mia + British Woman)
- Voices: Mia (6XUfcgr5IVKRBUTL5bza), British Woman (YrhbtpGGYpTLhiRBo85G)

---

## TASKS FOR CLAUDE CODE

### Priority 1: Fix Build (MUST DO)
The `npm run build` fails. Fix import paths and any other build errors.
All component imports in App.jsx and sub-components need verification.

### Priority 2: Push to GitHub
After fixing build, push to GitHub.
Remote: https://github.com/daana723/ND-cognitive-OS.git
Branch: main
Username: daana723
Use PAT if needed (ask user to provide one).

### Priority 3: Add 2E Assessment Module (IF TIME)
See spec at: C:\Users\danap\ND-cognitive-OS\2E_ASSESSMENT_SPEC.md

Build the assessment as a new module with:
- 40-60 Likert scale questions across 5 OE dimensions
- Scoring algorithm (normalize to 0-100% per dimension)
- Results page with radar chart (use Recharts or similar)
- Growth recommendations based on dominant OE
- Shadow patterns for each dimension
- Store results in LocalStorage

### Priority 4: Add Settings Page (IF TIME)
- Edit cognitive profile
- Export all data as JSON
- Clear all data (with confirmation)

---

## DESIGN CONSTRAINTS
- ND-safe: no streaks, no gamification, no shame, no urgency
- Local-first: everything on device, exportable
- Dark theme (arcane palette: #0f0a1a bg, #1a1025 surface, #7c3aed accent)
- Accessible: large text, high contrast, keyboard navigable
- Calm: generous spacing, no clutter, micro-interactions only

---

## FILES TO REVIEW
- src/App.jsx (main routing)
- src/logic/useStore.js (Zustand store)
- src/logic/stateMachine.js (8 cognitive states)
- src/logic/cognitiveMap.js (profile + recommendations)
- src/logic/patternEngine.js (pattern detection)
- src/components/Profile/Dashboard.jsx
- src/components/Profile/Onboarding.jsx
- src/components/Profile/Navbar.jsx
- src/components/EmotionalNavigator/EmotionalNavigator.jsx
- src/components/SensoryCheckIn/SensoryCheckIn.jsx
- src/components/Discoveries/Discoveries.jsx
- src/components/Recommendations/Recommendations.jsx
- src/components/PatternEngine/PatternEngine.jsx
- package.json
- vite.config.js
- tailwind.config.js

---

## AFTER COMPLETION
1. Run `npm run build` — must succeed
2. Run `npm run dev` — verify it works
3. Push to GitHub
4. Provide summary of all changes made
