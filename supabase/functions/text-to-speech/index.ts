// Minimal Edge Function that informs consumers that server-side ElevenLabs TTS
// is intentionally disabled. The frontend uses the browser Web Speech API.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const payload = {
    status: 'disabled',
    message: 'Server-side ElevenLabs TTS is disabled in this repository by default.',
    note: 'The frontend uses the browser Web Speech API (no API key required).',
    enable_server_tts: 'To enable server-side ElevenLabs TTS, set the ELEVENLABS_API_KEY environment variable for this function and restore the original implementation.',
    docs: 'See SETUP_AND_RUN.md for optional server-side configuration.'
  };

  return new Response(JSON.stringify(payload), {
    status: 501,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
});