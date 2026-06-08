# ND COGNITIVE OS — SYSTEM ARCHITECTURE (v1.1)

A cognitive modeling system for non-linear thinkers and neurodivergent minds.

---

## A. SYSTEM OVERVIEW

### Purpose

A system that helps users understand:

- how they think
- how they regulate
- how they create
- how they make decisions
- how they enter flow
- how they recover

This is not productivity.
This is cognitive infrastructure.

---

## B. CORE LAYERS

### 1. Profile Layer
- Cognitive style
- Attention pattern
- Sensory profile
- Emotional regulation pattern
- Executive tendencies
- Strengths
- Challenges

### 2. Cognitive Map Layer
- State tracking
- Pattern mapping
- Trigger detection
- Recovery conditions
- Energy cycles
- Thinking modes

### 3. Adaptive Toolkit Layer
Tools recommended based on the cognitive map:
- grounding
- sensory
- attention
- planning
- creative
- regulation

### 4. Workflow Generator Layer
Generates workflows based on:
- cognitive style
- current state
- energy
- sensory environment
- project type

### 5. Pattern Engine Layer
Detects:
- recurring states
- overwhelm loops
- flow triggers
- burnout precursors
- sensory overload patterns

Includes inverted search: "What's missing?"

### 6. Companion Layer
Conversational interface that:
- reflects patterns
- explains states
- suggests adjustments
- helps regulate
- helps plan

### 7. Personal OS Layer
Outputs:
- routines
- environment design
- project structures
- creative cycles
- sensory management
- emotional navigation

---

## C. MODULES (MVP)

### Module 1 — Emotional Navigator
- Track emotional states
- Track triggers
- Track regulation strategies
- Output: emotional map + recommended actions

### Module 2 — Sensory Check-In
- Track sensory load
- Track environment
- Output: sensory profile + environment suggestions

### Module 3 — Discoveries
- Capture insights
- Capture patterns
- Capture realizations
- Output: cognitive uploading material

### Module 4 — Pattern Engine (Basic)
- Detect simple patterns
- Detect repeated states
- Detect cycles

### Module 5 — Recommendations (Basic)
- Suggest tools
- Suggest workflows
- Suggest adjustments

---

## D. TECHNICAL IMPLEMENTATION

### Frontend
- React
- Zustand (state management)
- Tailwind CSS

### Data
- JSON-based logs
- LocalStorage persistence

### Logic
- `patternEngine.js` — pattern detection + inverted search
- `stateMachine.js` — cognitive state transitions
- `cognitiveMap.js` — profile + map builder

### AI Integration
- Claude Code for building
- OpenHuman for companion layer (later)

---

## E. ECOSYSTEM CONTEXT

See VISION_DIRECTIVES.md for the five-domain ecosystem mapping.

This cognitive OS serves as the **Profile Layer + Cognitive Map Layer** for the broader IndigoSystem. It is the foundation that other modules (Emotional Navigator, Sensory Check-In, etc.) plug into.

Entry point: Serendipity Lab feeds into this system. This system feeds into the Workflow Generator and Personal OS layers.
