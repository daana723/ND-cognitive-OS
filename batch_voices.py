#!/usr/bin/env python3
"""
ElevenLabs Batch Voice Generator
Generates voice files for all scripts in the scripts/ directory.
Uses Mia and British Woman voices alternately.

Requirements: pip install requests
Usage: python batch_voices.py
"""

import os
import sys
import json
import time
import re
import requests

# ─── CONFIGURATION ───────────────────────────────────────────
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")

# Voice IDs — fill these in from your ElevenLabs voice library
VOICES = {
    "default": "YhbtpGGYpTLhiRBo85G",  # Your voice
}

MODEL = "eleven_multilingual_v2"
VOICE_SETTINGS = {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0.0,
    "use_speaker_boost": True,
}

SCRIPTS_DIR = "scripts"
OUTPUT_DIR = "output"

# ─── FUNCTIONS ───────────────────────────────────────────────

def parse_script(filepath):
    """Parse a script file and extract metadata + content."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.split("\n")
    
    # Extract metadata from brackets
    metadata = {}
    script_lines = []
    in_script = False
    
    for line in lines:
        line = line.strip()
        if line.startswith("[SCRIPT_"):
            metadata["name"] = line.strip("[]")
        elif line.startswith("[CHARACTER:"):
            metadata["character"] = line.split(":", 1)[1].strip().rstrip("]")
        elif line.startswith("[TONE:"):
            metadata["tone"] = line.split(":", 1)[1].strip().rstrip("]")
        elif line.startswith("[PACE:"):
            metadata["pace"] = line.split(":", 1)[1].strip().rstrip("]")
        elif line.startswith("[EMOTION:"):
            metadata["emotion"] = line.split(":", 1)[1].strip().rstrip("]")
        elif line == "[END]":
            break
        elif line and not line.startswith("["):
            in_script = True
            script_lines.append(line)
    
    metadata["text"] = "\n".join(script_lines).strip()
    return metadata


def generate_voice(text, voice_id, output_path, settings=None):
    """Generate a single voice file via ElevenLabs API."""
    if not ELEVENLABS_API_KEY:
        print("ERROR: Set ELEVENLABS_API_KEY environment variable")
        return False
    
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
    }
    
    data = {
        "text": text,
        "model_id": MODEL,
        "voice_settings": settings or VOICE_SETTINGS,
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        chars_used = len(text)
        size_kb = len(response.content) / 1024
        print(f"  ✓ {os.path.basename(output_path)} ({chars_used} chars, {size_kb:.0f} KB)")
        return True
    else:
        print(f"  ✗ Error {response.status_code}: {response.text[:200]}")
        return False


def batch_generate():
    """Generate all scripts with alternating voices."""
    if not os.path.exists(SCRIPTS_DIR):
        print(f"ERROR: {SCRIPTS_DIR}/ directory not found")
        return
    
    scripts = sorted([
        f for f in os.listdir(SCRIPTS_DIR)
        if f.endswith(".txt")
    ])
    
    if not scripts:
        print(f"No .txt scripts found in {SCRIPTS_DIR}/")
        return
    
    print(f"Found {len(scripts)} scripts")
    print(f"Output: {OUTPUT_DIR}/")
    print(f"Voices: Mia + British Woman (alternating)")
    print(f"Model: {MODEL}")
    print()
    
    voices = list(VOICES.values())
    total_chars = 0
    success = 0
    failed = 0
    
    voice_names = list(VOICES.keys())
    
    for i, filename in enumerate(scripts):
        filepath = os.path.join(SCRIPTS_DIR, filename)
        metadata = parse_script(filepath)
        
        voice_idx = i % len(voices)
        voice_name = voice_names[voice_idx]
        voice_id = voices[voice_idx]
        
        if not voice_id.startswith("YOUR_"):
            print(f"\n[{i+1}/{len(scripts)}] {filename} → {voice_name}")
            
            safe_name = re.sub(r'[^\w\-.]', '_', filename.replace('.txt', ''))
            output_path = os.path.join(OUTPUT_DIR, f"{safe_name}.mp3")
            
            ok = generate_voice(
                metadata["text"],
                voice_id,
                output_path
            )
            
            if ok:
                success += 1
                total_chars += len(metadata["text"])
            else:
                failed += 1
            
            time.sleep(0.5)  # rate limiting
        else:
            print(f"\n[{i+1}/{len(scripts)}] {filename} → SKIPPED (voice ID not set)")
            print(f"  Set VOICES in the script to your ElevenLabs voice IDs")
    
    print(f"\n{'='*50}")
    print(f"Done: {success} generated, {failed} failed")
    print(f"Total characters: {total_chars:,}")
    print(f"Estimated credits used: ~{total_chars:,} / 100,000")
    print(f"Remaining credits: ~{100000 - total_chars:,}")


# ─── MAIN ────────────────────────────────────────────────────

if __name__ == "__main__":
    if not ELEVENLABS_API_KEY:
        print("=" * 50)
        print("ELEVENLABS_API_KEY not set!")
        print()
        print("Set it in your terminal:")
        print('  export ELEVENLABS_API_KEY="sk_..."')
        print()
        print("In PowerShell:")
        print('  $env:ELEVENLABS_API_KEY = "sk_..."')
        print()
        print("Or add to your .env file")
        print("=" * 50)
        sys.exit(1)
    
    batch_generate()
