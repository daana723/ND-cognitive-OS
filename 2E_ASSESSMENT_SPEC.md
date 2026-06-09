# 2E_ASSESSMENT_SPEC.md — Dabrowski Overexcitabilities Assessment
## Product Specification for Claude Code
### June 2026

---

## PURPOSE

A self-discovery assessment for neurodivergent and gifted adults, built around Dabrowski's Theory of Positive Disintegration.

**Who is it for?**
- Gifted adults
- ADHD individuals
- Autistic individuals
- Twice Exceptional (2E) individuals
- Highly Sensitive People (HSP)
- Multipotentialites

**Why Dabrowski and not MBTI/Enneagram?**
- MBTI and Enneagram are saturated in the market
- Dabrowski directly addresses: intensity, giftedness, existential questioning, asynchronous development, neurodivergent experience
- These themes are already central to Dana's books, Serendipity Lab, and Know Thyself OS
- Almost uniquely aligned with the target audience

---

## FRAMEWORK: Dabrowski's Theory of Positive Disintegration

### Five Overexcitabilities (OEs)

1. **Intellectual OE**
   - Deep thinking, questioning everything, insatiable curiosity
   - Love of analysis, theoretical thinking, moral reasoning
   - Can appear as: pedantry, overthinking, "too intense" in conversation

2. **Emotional OE**
   - Intense feelings, deep empathy, strong emotional responses
   - Capacity for deep attachment, compassion, sensitivity to others' pain
   - Can appear as: moodiness, "too sensitive," emotional overwhelm

3. **Imaginational OE**
   - Rich fantasy life, creative thinking, vivid dreams
   - Visual metaphors, elaborate imagination, blending truth and fiction
   - Can appear as: "spacing out," unrealistic, lost in thought

4. **Psychomotor OE**
   - High energy, need for movement, rapid speech patterns
   - Restlessness, impulsivity, love of action
   - Can appear as: hyperactivity, inability to sit still, "too much energy"

5. **Sensual OE**
   - Heightened sensory awareness, aesthetic appreciation
   - Deep pleasure from sensory experiences (food, art, music, texture)
   - Can appear as: sensory overload, pickiness, "too particular"

### Levels of Positive Disintegration

1. **Primary Integration** — undifferentiated, self-serving
2. **Unilevel Disintegration** — crisis of values, confusion
3. **Spontaneous Multilevel Disintegration** — beginning to see higher vs lower
4. **Organized Multilevel Disintegration** — conscious work on personality development
5. **Secondary Integration** — personality ideal achieved, inner peace

---

## ASSESSMENT STRUCTURE

### Question Format
- **40-60 questions** total (8-12 per OE dimension)
- **Likert scale:** 1-5 (Strongly Disagree → Strongly Agree)
- Mix of direct and scenario-based questions
- Estimated completion time: 8-12 minutes

### Sample Questions (Intellectual OE)
1. "I often find myself questioning things that others accept without thought."
2. "I prefer deep conversations over small talk."
3. "I can spend hours researching a topic that interests me."
4. "I often see connections between seemingly unrelated things."
5. "I enjoy debating ideas, even when it makes others uncomfortable."

### Sample Questions (Emotional OE)
1. "I feel others' emotions as if they were my own."
2. "I have experienced grief so intense it felt physical."
3. "I form deep attachments to people, places, and even objects."
4. "I can be moved to tears by music, art, or stories."
5. "I sometimes feel overwhelmed by the suffering in the world."

### Sample Questions (Imaginational OE)
1. "I have a rich and vivid inner world."
2. "I often daydream or get lost in my thoughts."
3. "I use metaphors and imagery to understand complex ideas."
4. "I sometimes struggle to distinguish between my imagination and reality."
5. "I have recurring dreams that feel meaningful."

### Sample Questions (Psychomotor OE)
1. "I have difficulty sitting still for long periods."
2. "I think better when I'm moving."
3. "I talk faster when I'm excited about something."
4. "I feel restless when I have unstructured time."
5. "I prefer to learn by doing rather than reading."

### Sample Questions (Sensual OE)
1. "I am deeply affected by my physical environment."
2. "Certain textures, sounds, or smells can overwhelm me."
3. "I have strong preferences about food, clothing, or aesthetics."
4. "I can spend hours absorbed in a piece of music or art."
5. "I notice sensory details that others seem to miss."

---

## SCORING

### Per Dimension
- Sum of Likert scores for each OE (8-12 questions × 1-5 scale)
- Range: 8-60 per dimension (if 12 questions)
- Normalize to percentage: (score - min) / (max - min) × 100

### Profile Output
- **Dominant OE:** Highest scoring dimension
- **Secondary OE:** Second highest
- **OE Constellation:** All 5 scores as a pattern
- **Intensity Level:** Overall average across all dimensions
  - Low (0-30%): Mild overexcitabilities
  - Medium (31-60%): Moderate intensity
  - High (61-80%): Strong overexcitabilities
  - Very High (81-100%): Intense, may need support

---

## OUTPUTS

### What Users Receive

1. **OE Profile**
   - Visual radar chart of all 5 dimensions
   - Dominant and secondary OE identified
   - Intensity level

2. **Growth Recommendations**
   - Based on dominant OE
   - Practical strategies for channeling intensity
   - Shadow patterns to watch for

3. **Strengths**
   - Reframing OEs as superpowers
   - Career and life alignment suggestions

4. **Shadow Patterns**
   - When OEs become maladaptive
   - Warning signs for each dimension
   - Regulation strategies

5. **Development Level**
   - Approximate Dabrowski level (1-5)
   - Growth direction suggestions

---

## USER JOURNEY

```
Landing Page
    ↓
Assessment (8-12 min)
    ↓
Results Page (OE Profile + Recommendations)
    ↓
Companion Discussion (AI chat about results)
    ↓
Suggested Resources
    ↓
Integration with ND Cognitive OS
```

---

## FUTURE INTEGRATIONS

- **Companion** — AI chat that understands your OE profile
- **Journal** — log experiences through the lens of your OEs
- **Archetypes Builder** — connect OEs to archetypal patterns
- **Builder OS** — use OE profile to optimize workflows
- **Know Thyself** — deeper self-knowledge layer

---

## ECOSYSTEM PILLARS

The assessment feeds into a larger framework:

| Pillar | Component | OE Connection |
|--------|-----------|---------------|
| **Identity** | Archetypes | Imaginational OE |
| **Intensity** | Dabrowski Profile | All 5 OEs |
| **Cognitive Style** | Attention Pattern | Intellectual + Psychomotor OE |
| **Timing** | Temporal Positioning | Emotional OE |
| **Environment** | Relocation Architect | Sensual OE |
| **Reflection** | Journal + Companion | Emotional + Imaginational OE |
| **Action** | Builder Navigation | Intellectual + Psychomotor OE |

---

## IMPLEMENTATION NOTES

- Build as a standalone module that can be integrated into ND Cognitive OS
- Use React components matching existing design system
- Store results in LocalStorage (consistent with privacy-first approach)
- Export results as JSON (consistent with data portability)
- Make it free to take, with paid detailed report ($12 one-time)
