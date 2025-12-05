# Text to Speech Converter - Setup & Run Guide

This project converts text to speech using the ElevenLabs API, deployed on Supabase Edge Functions.

## Prerequisites
- Node.js 18+ (with npm)
- Supabase Account and API keys
- ElevenLabs API key (free tier available: https://elevenlabs.io)
- Supabase CLI (optional, for local testing)

## Quick Setup

### 1. Environment Variables
Create a `.env` file in the project root (do **NOT** commit this file):

```bash
# Supabase config (from https://app.supabase.com)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# ElevenLabs API key (from https://elevenlabs.io/app/settings/api-keys)
ELEVENLABS_API_KEY=sk_your_elevenlabs_key_here
```

**Important:** Use `.env.example` as reference. Never commit real API keys.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the URL Vite prints).

## Testing Locally

### Option A: Test via Vite + Supabase Edge Functions (Recommended)

1. **Deploy function to Supabase:**
   - Use Supabase Dashboard to set the `ELEVENLABS_API_KEY` environment variable in the Edge Function.
   - Or use Supabase CLI:
     ```bash
     supabase functions deploy text-to-speech
     ```

2. **Load the app:**
   - Open `http://localhost:5173` in the browser.
   - The app will call `${VITE_SUPABASE_URL}/functions/v1/text-to-speech/voices` to load voices.

3. **Select a voice and generate:**
   - Pick a voice from the dropdown.
   - Enter text and click "Generate Speech".
   - Audio will be created and you can download it.

### Option B: Quick Node Test (No Supabase)

If you only want to test the ElevenLabs API directly:

```bash
# In PowerShell, set the API key temporarily:
$env:ELEVENLABS_API_KEY = "sk_your_elevenlabs_key"

# Run the test script:
node .\supabase\functions\test_text_to_speech_node.js "Hello world" 21m00Tcm4TlvDq3YWrSJVN

# This creates speech.mp3 in the repo root
```

(Replace `21m00Tcm4TlvDq3YWrSJVN` with a valid voice ID from https://elevenlabs.io/app/voices)

### Option C: Test Supabase Function Locally

If you have Supabase CLI installed:

```bash
# Serve the function locally:
supabase functions serve text-to-speech

# In another PowerShell terminal, call the /voices endpoint:
$uri = 'http://localhost:54321/functions/v1/text-to-speech/voices'
Invoke-RestMethod -Method Get -Uri $uri -ContentType 'application/json'

# You should see a JSON response with { "voices": [...] }
```

## How It Works

### Frontend (`main.js`, `index.html`)
- Loads available voices from `GET /functions/v1/text-to-speech/voices`
- Groups voices by language
- User enters text, selects voice, and clicks "Generate Speech"
- Sends POST to `/functions/v1/text-to-speech` with text and voice settings
- Audio is played in browser and can be downloaded
- Optional: history saved to Supabase (requires database table and correct credentials)

### Backend (Supabase Edge Function - `supabase/functions/text-to-speech/index.ts`)
- `GET /voices`: Fetches all available voices from ElevenLabs, normalizes response
- `POST /` (text-to-speech): Converts text to audio using ElevenLabs API
- CORS headers set to allow cross-origin requests from the frontend

## Troubleshooting

### Voices dropdown is empty
- Check browser DevTools Console (F12) for errors
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in `.env`
- Restart dev server after changing `.env`
- Check Network tab: does GET `/voices` return a response? What is the HTTP status?

### "Speech generation failed"
- Ensure `ELEVENLABS_API_KEY` is set on the Supabase Edge Function
- Verify voice ID is valid
- Check ElevenLabs account has API quota remaining

### CORS errors
- The Edge Function includes CORS headers by default
- If you're calling from a different domain, check browser console for details

### "Supabase not configured" message
- History feature requires valid Supabase credentials
- The text-to-speech generation itself does NOT require Supabase database
- To skip history, just ignore the message; TTS will still work

## File Structure

```
.
├── index.html                          # Main HTML
├── main.js                             # Frontend logic (Vue-less)
├── style.css                           # Styles
├── package.json                        # Dependencies
├── .env                                # (local, not committed) API keys
├── .env.example                        # Template for .env
├── .gitignore                          # Ignores .env, node_modules, etc.
├── tsconfig.json                       # TypeScript config
├── supabase/
│   ├── functions/
│   │   ├── text-to-speech/
│   │   │   └── index.ts               # Edge Function (Deno runtime)
│   │   └── test_text_to_speech_node.js # Local Node test script
│   └── migrations/
│       └── 20251204050720_create_tts_conversions_table.sql
└── types/
    └── (types files if added later)
```

## Build & Deploy

### Build for production:
```bash
npm run build
```

Outputs to `dist/` folder.

### Deploy to Supabase:
1. Set environment variables in Supabase Dashboard (Edge Function settings)
2. Deploy the Edge Function:
   ```bash
   supabase functions deploy text-to-speech
   ```
3. Deploy frontend to any static host (Netlify, Vercel, GitHub Pages, etc.)

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview prod build locally |
| `node ./supabase/functions/test_text_to_speech_node.js "text" <voice_id>` | Test ElevenLabs API directly |
| `supabase functions serve text-to-speech` | Run Edge Function locally (requires Supabase CLI) |

## Security Notes

- **Never commit `.env`** — it contains secret API keys
- Use `.env.example` as a template for other developers
- Rotate API keys if they are accidentally exposed
- The Supabase Anon Key has limited scope; it can only call Edge Functions
- The ElevenLabs API key should be stored securely on the backend (Edge Function environment variables)

## Support

- ElevenLabs Docs: https://elevenlabs.io/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Vite: https://vitejs.dev
