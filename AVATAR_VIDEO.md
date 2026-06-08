# AVATAR_VIDEO.md — Budget Options + Script Framework

## The Goal
Create talking avatar videos for:
- Product demos / explainers
- Social media content (faceless channels)
- Onboarding / tutorial videos
- Marketing content

## Budget Reality Check
- **ElevenLabs voice credits:** 100k chars remaining (FREE — use these!)
- **Anthropic API:** ~$15 remaining (save for meaningful work)
- **Video generation budget:** ~$0-5/month

## Avatar Tool Options (Ranked by Budget)

### 🥇 BEST: Hedra (Free Tier)
- **Cost:** Free plan, no credit card
- **Credits:** Some free credits/month (exact number TBD)
- **Quality:** Good — character animation, lip-sync
- **API:** Yes
- **Watermark:** Unknown on free tier
- **URL:** https://www.hedra.com

### 🥈 GOOD: D-ID (Trial)
- **Cost:** Free trial, then $5.90/mo (Lite)
- **Minutes:** Trial gives some free minutes
- **Quality:** Excellent — photorealistic
- **API:** Yes, well-documented
- **Watermark:** Full-screen on trial, smaller on paid
- **URL:** https://www.d-id.com/pricing/

### 🥉 DIY: SadTalker (Free, Local)
- **Cost:** Free, open source
- **Quality:** Basic but functional
- **Tech:** Python, needs GPU (or use Colab)
- **Setup:** Technical — requires face image + audio
- **URL:** https://github.com/OpenTalker/SadTalker

### NOT RECOMMENDED (Too Expensive)
- **HeyGen:** $24/mo starter — good but expensive
- **Luma AI:** $300+/yr — overkill for MVP
- **Sora:** Not available for this use case yet

## Recommended MVP Approach
1. **Voice:** ElevenLabs (you already have credits)
2. **Visual:** Hedra free tier → if limited, use D-ID trial
3. **Batch workflow:**
   - Write scripts (this file)
   - Generate voices in ElevenLabs (batch API)
   - Generate videos in Hedra/D-ID (batch API)
   - Edit/combine with free tools (CapCut, DaVinci Resolve)

---

## ELEVENLABS SCRIPT BATCH FRAMEWORK

### Voice Setup
- **Voice to use:** Create/save your preferred voice(s) in ElevenLabs
- **Voice ID:** Save it — needed for API calls
- **Model:** `eleven_multilingual_v2` (best quality)
- **Settings:** stability=0.5, similarity=0.75, style=0.0

### Script Format
Each script follows this structure:

```
[SCRIPT_NAME]
[CHARACTER_NAME]
[TONE: calm | warm | excited | mysterious]
[PACE: slow | normal | fast]
[EMOTION: neutral | empathetic | enthusiastic]

[SCRIPT CONTENT]

[END]
```

### Batch Script Template
```python
import requests
import json
import os

ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
VOICE_ID = "your_voice_id_here"
BASE_URL = "https://api.elevenlabs.io/v1"

def generate_voice(text, output_path, model="eleven_multilingual_v2"):
    """Generate a single voice file."""
    url = f"{BASE_URL}/text-to-speech/{VOICE_ID}"
    headers = {"xi-api-key": ELEVENLABS_API_KEY}
    data = {
        "text": text,
        "model_id": model,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
            "use_speaker_boost": True
        }
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        with open(output_path, "wb") as f:
            f.write(response.content)
        return True
    else:
        print(f"Error: {response.status_code} {response.text}")
        return False

def batch_generate(scripts_dir, output_dir):
    """Generate all scripts in a directory."""
    os.makedirs(output_dir, exist_ok=True)
    results = []
    
    for filename in os.listdir(scripts_dir):
        if filename.endswith(".txt"):
            with open(os.path.join(scripts_dir, filename)) as f:
                content = f.read()
            
            # Parse metadata
            lines = content.split("\n")
            script_name = lines[0].strip() if lines else filename
            text = "\n".join(lines[1:]).strip()
            
            output_path = os.path.join(output_dir, filename.replace(".txt", ".mp3"))
            success = generate_voice(text, output_path)
            results.append({"file": filename, "success": success})
            print(f"{'✓' if success else '✗'} {script_name}")
    
    return results

if __name__ == "__main__":
    batch_generate("./scripts/", "./output/")
```

---

## SCRIPTS TO PRODUCE (Priority Order)

### Tier 1: MVP Launch Content
1. **Welcome/Intro** — "What is ND Cognitive OS?" (30 sec)
2. **How It Works** — Quick walkthrough (60 sec)
3. **Emotional Navigator Demo** — Show the feature (45 sec)
4. **Sensory Check-In Demo** — Show the feature (45 sec)
5. **Pattern Engine Demo** — Show insights (45 sec)

### Tier 2: Marketing Content
6. **"For Neurodivergent Minds"** — Positioning video (30 sec)
7. **"Not Productivity"** — Anti-positioning (30 sec)
8. **"Your Cognitive Map"** — Feature highlight (30 sec)

### Tier 3: Tutorial Content
9. **Getting Started** — Full onboarding walkthrough (2 min)
10. **First Check-In** — How to log your first state (1 min)
11. **Understanding Patterns** — How pattern detection works (1 min)

---

## NEXT STEPS (When Dana is back)

1. ✅ Research avatar tools → DONE (Hedra free + D-ID trial recommended)
2. ✅ Prepare script framework → DONE
3. ⬜ Write actual script content (5 Tier 1 scripts)
4. ⬜ Create voice in ElevenLabs (if not done)
5. ⬜ Set up batch generation script
6. ⬜ Generate first test video
7. ⬜ Evaluate quality → decide on tool
