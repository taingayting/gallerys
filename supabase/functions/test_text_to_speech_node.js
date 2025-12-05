// Simple Node script to test ElevenLabs TTS locally and save output to speech.mp3
// Requires Node 18+ (global fetch available). Usage:
//   node test_text_to_speech_node.js "Hello world" <voice_id>

import fs from "fs";

async function main() {
  const text = process.argv[2] || "Hello from ElevenLabs";
  const voiceId = process.argv[3];

  if (!voiceId) {
    console.error("Usage: node test_text_to_speech_node.js <text> <voice_id>");
    process.exit(1);
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    console.error("ELEVENLABS_API_KEY not set in environment");
    process.exit(1);
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": key,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    body: JSON.stringify({ text })
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("ElevenLabs error:", res.status, txt);
    process.exit(1);
  }

  const ab = await res.arrayBuffer();
  const buf = Buffer.from(ab);
  fs.writeFileSync("speech.mp3", buf);
  console.log("Saved speech.mp3 (length:", buf.length, "bytes)");
}

main().catch(err => { console.error(err); process.exit(1); });
