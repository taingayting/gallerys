import fetch from "node-fetch";

export default async function handler(req, res) {
  const { text, voiceId } = await req.json();

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: "TTS request failed" });
  }

  const audio = await response.arrayBuffer();
  return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } });
}
