# SPARK_FRAMEWORK.md — 2E Assessment Scoring Model
## Based on Dabrowski, Neurodivergent-Oriented
### Created with Claude, Refined by Dana

---

## THE 5-DIMENSION SPARK 2E MODEL

Each dimension scored 0-4, total range 0-20.

### D1 — Cognitive Intensity (CI)
**Measures:** depth of processing, pattern sensitivity, associative speed, hyperfocus capacity
- 0: Flat, low engagement
- 1: Mild intensity
- 2: Moderate, situational
- 3: High, consistent
- 4: Extreme, life-shaping

### D2 — Emotional Resonance (ER)
**Measures:** emotional depth, empathy, reactivity, existential sensitivity
- 0: Muted
- 1: Mild
- 2: Moderate
- 3: Strong
- 4: Overwhelming / defining

### D3 — Sensory Amplification (SA)
**Measures:** sensory sensitivity, environmental overload, aesthetic perception, somatic awareness
- 0: Low
- 1: Mild
- 2: Moderate
- 3: High
- 4: Extreme

### D4 — Creative Divergence (CD)
**Measures:** originality, nonlinear thinking, symbolic cognition, idea generation
- 0: Conventional
- 1: Mildly divergent
- 2: Creative but structured
- 3: Highly divergent
- 4: Radically generative

### D5 — Existential Drive (ED)
**Measures:** meaning-seeking, philosophical depth, identity exploration, inner conflict / transformation
- 0: Low
- 1: Mild
- 2: Moderate
- 3: Strong
- 4: Intense / transformative

---

## SCORING INTERPRETATION (2E Profile Types)

| Score | Profile | Description |
|-------|---------|-------------|
| 0–6 | **The Quiet Spark** | Low activation. ND traits present but dormant or suppressed. |
| 7–12 | **The Flickering Spark** | Moderate intensity. Traits appear situationally. Often misunderstood. |
| 13–16 | **The Burning Spark** | High intensity. Clear 2E profile. Needs ND-friendly systems. |
| 17–20 | **The Wildfire** | Extreme intensity across multiple dimensions. Dabrowski Level 3–4 territory — disintegration, transformation, creative chaos. |

---

## VISUAL IDENTITY (Mythic-Tech, ND-Friendly, Spark-Aligned)

### Color Palette
- Indigo Core: #3A2E6E
- Deep Space Violet: #1D1538
- Soft Gold Accent: #D9B76E
- Nebula Blue: #4C6FE3
- Shadow Black: #0B0A0F
- Fog White: #F2F2F7

### Shapes & Symbols
- Triangles = cognition
- Circles = emotion
- Squares = grounding
- Spirals = transformation
- Lines = pathways
- Spark logo: geometric flame made of overlapping indigo triangles with gold inner core

### Typography
- Headings: Space Grotesk / Inter Tight
- Body: Inter / Söhne / Atkinson Hyperlegible
- Accents: JetBrains Mono (tech layer)

### Iconography for 5 Dimensions
- CI: fractal triangle
- ER: concentric circles
- SA: radiating lines
- CD: branching node
- ED: spiral

### Visual Output for Results
- 5-point star radar chart (one axis per dimension)
- Spark Index (0–20)
- Profile name (Quiet Spark → Wildfire)
- Mythic-tech interpretation paragraph
- Gentle ND-friendly grounding note

---

## ASSESSMENT STRUCTURE

### Questions per dimension: 8-10
### Total questions: 40-50
### Format: Likert scale (0-4) matching the dimension scoring
### Completion time: 8-12 minutes

### Sample Questions

**D1 — Cognitive Intensity**
1. "I can spend hours absorbed in a single topic without noticing time passing."
2. "I often see connections between things that seem unrelated to others."
3. "My mind races with ideas faster than I can express them."
4. "I prefer deep, complex topics over simple, straightforward ones."
5. "I sometimes lose track of time when I'm working on something interesting."

**D2 — Emotional Resonance**
1. "I feel others' emotions as if they were my own."
2. "I have experienced grief so intense it felt physical."
3. "I can be moved to tears by music, art, or stories."
4. "I sometimes feel overwhelmed by the suffering in the world."
5. "My emotional responses are often stronger than others expect."

**D3 — Sensory Amplification**
1. "Certain textures, sounds, or smells can overwhelm me."
2. "I am deeply affected by my physical environment."
3. "I notice sensory details that others seem to miss."
4. "I have strong preferences about food, clothing, or aesthetics."
5. "Bright lights, loud noises, or strong smells can be painful."

**D4 — Creative Divergence**
1. "I often think in metaphors and images rather than words."
2. "I come up with ideas that others find strange or unusual."
3. "I see multiple possible solutions to every problem."
4. "I sometimes struggle to explain my thinking process to others."
5. "I prefer to find my own way rather than follow instructions."

**D5 — Existential Drive**
1. "I often think about the meaning and purpose of life."
2. "I feel a strong need to understand myself at a deep level."
3. "I sometimes feel like I don't fit into the world around me."
4. "I have experienced periods of intense inner transformation."
5. "I feel things deeply."

---

## IMPLEMENTATION NOTES

### For Claude Code
1. Build assessment with 40-50 questions (8-10 per dimension)
2. Use slider inputs (0-4) for each question
3. Calculate dimension scores by averaging responses
4. Calculate total Spark Index (sum of all dimensions, 0-20)
5. Display results as radar chart + profile type + interpretation
6. Store results in LocalStorage
7. Allow export as JSON

### Results Page Should Show
1. Radar chart (5 axes, one per dimension)
2. Spark Index score (0-20)
3. Profile type name + description
4. Personalized interpretation paragraph
5. Grounding note (ND-friendly, validating)
6. Shareable image (for social media)

### Design Requirements
- Use the SPARK color palette
- Geometric constellation aesthetic
- ND-safe: no overwhelming animations, no autoplay audio
- Accessible: keyboard navigation, screen reader support
- Mobile-first responsive design
