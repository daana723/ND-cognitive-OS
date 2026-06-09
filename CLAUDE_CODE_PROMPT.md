# CLAUDE_CODE_PROMPT.md
## Feed this to Claude Code in one session

---

## CONTEXT

I am building ND Cognitive OS — a cognitive modeling system for neurodivergent minds. Not productivity software. Cognitive infrastructure.

The system has 5 MVP modules:
1. Emotional Navigator — log emotions, triggers, regulation strategies
2. Sensory Check-In — track 5 sensory channels + environment
3. Discoveries — capture insights, patterns, realizations
4. Pattern Engine — detect overwhelm loops, flow chains, burnout precursors
5. Recommendations — context-aware guidance from profile + state + patterns

Tech stack: React 18 + Vite + Zustand (persist middleware) + Tailwind CSS
Data: JSON logs, LocalStorage only, everything stays on device

The project is scaffolded at: C:\Users\danap\ND-cognitive-OS
All code is committed locally but NOT pushed to GitHub yet (needs PAT auth).

---

## THE ASK

Review the existing codebase and fix the following known issues:

### Issue 1: Build fails with import errors
The Vite build fails because component import paths may not resolve correctly.
Check all imports in App.jsx and component files.
Verify the folder structure matches the imports.

### Issue 2: Add data export functionality
Add a "Download my data" button that exports all user data as JSON.
Include: cognitive state history, emotional log, sensory log, discoveries, profile.
Format: single JSON file with timestamp in filename.

### Issue 3: Add settings page
Create a simple settings page accessible from the navbar.
Include: cognitive profile editing, data export, clear all data (with confirmation).

### Issue 4: Polish onboarding flow
The onboarding currently has 4 steps but ends with "Begin" that just dismisses.
Wire it up to actually set the profile data in the store.

---

## FILES TO REVIEW

Key files:
- src/App.jsx (main app, module routing)
- src/logic/useStore.js (Zustand store)
- src/logic/stateMachine.js (cognitive states)
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

## DESIGN CONSTRAINTS

- ND-safe: no streaks, no gamification, no urgency, no shame
- Local-first: everything stays on device
- Accessible: large text, high contrast option, keyboard navigable
- Calm: dark theme, generous spacing, no clutter

## AFTER FIXES

1. Run `npm run build` and verify it compiles
2. Run the dev server and test manually
3. Create a PR-style summary of all changes
