# Alternative: Manual Setup Without CLI

Since the CLI is giving us trouble, let's do this manually through the Supabase Dashboard instead. This is actually easier!

## Step 1: Open Supabase Dashboard
1. Go to https://app.supabase.com
2. Log in with your account
3. Click on your project: **kuhvadvenszchegnotes**

## Step 2: Enable the Edge Functions Extension

1. In the left sidebar, find **"SQL Editor"** or **"Database"**
2. Look for **"Extensions"** in the left sidebar
3. Search for **"pg_net"**
4. Click **"Install"** (if not already installed)

This enables Edge Functions on your project.

## Step 3: Deploy Your Function

Since the CLI isn't cooperating, you can deploy via the dashboard:

1. In the left sidebar, click **"Edge Functions"**
2. Click **"Create a new function"** button
3. Name it: `text-to-speech`
4. For the code, copy and paste the contents of:
   - `supabase/functions/text-to-speech/index.ts`

5. Create the function

## Step 4: Set Environment Variables

1. After creating the function, look for **Settings** or **...** menu
2. Click **"Manage Secrets"** or **"Environment Variables"**
3. Add a new variable:
   - **Key:** `ELEVENLABS_API_KEY`
   - **Value:** `sk_your_actual_key_here` (from https://elevenlabs.io/app/settings/api-keys)
4. Click **Save**

## Step 5: Test

1. Go to `http://localhost:5173` in your browser
2. The voice dropdown should now work ✅

---

## If Dashboard Deployment is Too Complicated

Let's use a simpler approach - just test directly with Node:

### Test Directly (No Supabase Needed)

```powershell
# Set your ElevenLabs key
$env:ELEVENLABS_API_KEY = "sk_your_actual_key_here"

# Test the local Node script
node .\supabase\functions\test_text_to_speech_node.js "Hello world" 21m00Tcm4TlvDq3YWrSJVN
```

This will:
1. Call ElevenLabs directly
2. Save audio as `speech.mp3`
3. Prove your API key works

If this works, your key is valid! Then we can figure out the Supabase deployment.

---

## What Now?

**Option A (Recommended):** Tell me you want to try the Node test first - easiest way to verify everything works

**Option B:** Manually deploy via the Dashboard if you're comfortable with it

Which option should we try?
