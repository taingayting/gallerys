# Complete Beginner's Guide to Supabase (Step by Step)

## What is Supabase?

Think of Supabase as a cloud service that runs your backend code. Instead of running code on your computer, it runs on Supabase's servers. Your website talks to Supabase, which then talks to ElevenLabs.

```
Your Website (Browser)
    ↓ (sends text)
Supabase Cloud (our code runs here)
    ↓ (sends text to ElevenLabs)
ElevenLabs API
    ↓ (returns audio)
Supabase Cloud
    ↓ (returns audio)
Your Website (plays audio)
```

---

## Part 1: Create a Supabase Account (If You Don't Have One)

### Step 1: Go to Supabase
1. Open your browser
2. Go to https://supabase.com
3. Click **"Start your project"** or **"Sign Up"**

### Step 2: Sign Up
1. Click **"Continue with GitHub"** (easiest method)
2. Or use email/password
3. Follow the prompts

### Step 3: Create a New Project
1. After login, click **"New Project"** or **"Create Organization"**
2. Fill in:
   - **Organization Name:** Anything you want (e.g., "My TTS App")
   - **Project Name:** `tts-project` (or any name)
   - **Database Password:** Any secure password (you won't need it often)
   - **Region:** Choose closest to you (or `Singapore`, `US East`)
3. Click **"Create New Project"**
4. Wait 1-2 minutes for it to create (you'll see a loading spinner)

---

## Part 2: Get Your Supabase Credentials

Once your project is created, you need to get two pieces of information:

### Step 1: Open Your Project
1. Go to https://app.supabase.com
2. You should see your project in the list
3. Click on it to open

### Step 2: Find Your URL and API Key
1. In the left sidebar, click **"Settings"** (gear icon ⚙️)
2. Then click **"API"**
3. You'll see:
   - **URL:** Something like `https://xxxxxxxxxxxxxx.supabase.co`
   - **anon public:** Your API key (starts with `eyJ...`)

### Step 3: Copy These Values
1. Click the copy button next to **URL** and save it somewhere
2. Click the copy button next to **anon public** and save it

Example:
```
URL: https://myproject123.supabase.co
API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Part 3: Add Your Values to Your Project

### Step 1: Open VS Code
1. Open your project in VS Code
2. Create a file called `.env` in the root folder (same level as `package.json`)

### Step 2: Add the Values
1. Paste this into `.env`:
```
VITE_SUPABASE_URL=https://yourprojecturl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ELEVENLABS_API_KEY=sk_your_elevenlabs_key
```

2. Replace:
   - `https://yourprojecturl.supabase.co` with your actual URL
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual API key
   - `sk_your_elevenlabs_key` with your ElevenLabs API key

### Step 3: Save the File
1. Press `Ctrl+S` to save
2. Do NOT commit this file to Git (it has secrets!)

---

## Part 4: Deploy Your Function to Supabase

Now you need to upload your `text-to-speech` function to Supabase so it runs in the cloud.

### Step 1: Open PowerShell Terminal
1. In VS Code, open Terminal (Ctrl+`)
2. Make sure you're in the project folder:
```powershell
cd D:\year4\textconvertor\gallerys
```

### Step 2: Log In to Supabase CLI
1. Run this command:
```powershell
supabase login
```

2. Your browser will open asking you to log in to Supabase
3. Click **"Authorize"** to allow the CLI to access your account
4. Go back to the terminal - it should say "✓ Logged in"

### Step 3: Link Your Project
1. Run this command:
```powershell
supabase link --project-ref your_project_ref
```

2. To find your project ref:
   - Go to https://app.supabase.com
   - Click on your project
   - In the URL bar, you'll see: `https://app.supabase.com/project/xxxxx` (the xxxxx is your project ref)
   - Example: If URL is `https://app.supabase.com/project/abcdefghijk`, then project ref is `abcdefghijk`

3. Replace `your_project_ref` with this value and run the command
4. You might be asked to enter your database password (from when you created the project)

### Step 4: Deploy the Function
1. Run this command:
```powershell
supabase functions deploy text-to-speech
```

2. Wait for it to complete (should take 10-30 seconds)
3. You should see:
```
✓ Function deployed successfully
✓ Function available at: https://yourproject.supabase.co/functions/v1/text-to-speech
```

If you get an error, copy it and tell me!

---

## Part 5: Set the ElevenLabs API Key

### Step 1: Get Your ElevenLabs Key
1. Go to https://elevenlabs.io/app/settings/api-keys
2. Log in to ElevenLabs
3. Copy your API key (it looks like `sk_1234567890abcdef...`)

### Step 2: Set It via CLI (Easier for Beginners)
In PowerShell, run:
```powershell
supabase secrets set ELEVENLABS_API_KEY="sk_your_key_here"
```

Replace `sk_your_key_here` with your actual key.

Example:
```powershell
supabase secrets set ELEVENLABS_API_KEY="sk_1234567890abcdefghijklmnop"
```

### Step 3: Verify It Was Set
```powershell
supabase secrets list
```

You should see `ELEVENLABS_API_KEY` in the list.

---

## Part 6: Test Everything

### Step 1: Start Your Dev Server
```powershell
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

### Step 2: Open in Browser
1. Click the link or paste `http://localhost:5173/` in your browser
2. You should see the Text to Speech app

### Step 3: Test the Voice Dropdown
1. Look for the **"Select Voice"** dropdown
2. It should now show a list of voices instead of "Error loading voices"
3. If it shows voices, congratulations! ✅ It's working!

### Step 4: Test Text to Speech
1. Enter some text in the text input box
2. Select a voice
3. Click **"Generate Speech"**
4. You should hear audio play below!

---

## Troubleshooting

### Problem: "Still getting 'Error loading voices'"

**Solution 1: Check Your .env File**
1. Open `.env` in VS Code
2. Make sure it has all three lines:
   ```
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ELEVENLABS_API_KEY=sk_...
   ```
3. Restart your dev server (Ctrl+C and `npm run dev`)
4. Reload the browser

**Solution 2: Check the Console**
1. Press F12 to open DevTools
2. Click the "Console" tab
3. You should see log messages like:
   ```
   [loadVoices] Fetching from: https://...
   [loadVoices] Response status: 200 OK
   [loadVoices] Loaded 100 voices
   ```
4. If you see errors, copy them and show me

**Solution 3: Check Your API Key**
1. Make sure your ElevenLabs API key is correct
2. Go to https://elevenlabs.io/app/settings/api-keys
3. Copy the key again (no extra spaces!)
4. Run:
   ```powershell
   supabase secrets set ELEVENLABS_API_KEY="your_new_key"
   ```

### Problem: "supabase command not found"

**Solution:**
```powershell
# Install Supabase CLI
npm install -g supabase
```

Then try again.

### Problem: "Function not found" or "Unauthorized"

**Solution:**
1. Make sure you deployed:
   ```powershell
   supabase functions deploy text-to-speech
   ```
2. Make sure you set the API key:
   ```powershell
   supabase secrets set ELEVENLABS_API_KEY="sk_your_key"
   ```
3. Wait 30 seconds and reload the browser

---

## Quick Checklist

- [ ] Created Supabase account at https://supabase.com
- [ ] Created a new project
- [ ] Got your Supabase URL and API key
- [ ] Created `.env` file with your credentials
- [ ] Logged in to Supabase CLI: `supabase login`
- [ ] Linked your project: `supabase link --project-ref xxxxx`
- [ ] Deployed the function: `supabase functions deploy text-to-speech`
- [ ] Set the API key: `supabase secrets set ELEVENLABS_API_KEY="sk_..."`
- [ ] Started dev server: `npm run dev`
- [ ] Opened browser and saw voices in the dropdown ✅

---

## Summary

You've now:
1. ✅ Created a Supabase account (cloud backend service)
2. ✅ Connected your app to Supabase
3. ✅ Deployed your text-to-speech function to the cloud
4. ✅ Given it permission to use the ElevenLabs API
5. ✅ Tested that everything works together

Your app is now live in the cloud! 🎉

---

## Next Steps

Once everything is working:
- You can share your app with others
- Deploy the frontend to Netlify, Vercel, or GitHub Pages
- The Supabase backend will always be running

Need help? Let me know what error you see! 😊
