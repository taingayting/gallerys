# How to Set ElevenLabs API Key in Supabase Dashboard

## Step-by-Step Guide

### Step 1: Open Supabase Dashboard
1. Go to https://app.supabase.com
2. Log in with your account
3. You should see your projects listed

### Step 2: Select Your Project
1. Look for your project named **`kuhvadvenszchegnotes`** (or similar)
2. Click on it to open the project dashboard

### Step 3: Navigate to Edge Functions
1. In the left sidebar, find **Edge Functions** (it's under the "Development" section)
2. Click on **Edge Functions**
3. You should see a list of functions, including **`text-to-speech`**

### Step 4: Open Environment Variables
1. Find the **`text-to-speech`** function in the list
2. Click on it to view the function details
3. Look for a **gear icon ⚙️** or **three dots menu (...)** in the top right
4. Click it and select **"Manage Environment Variables"** or **"Settings"**

### Step 5: Add the API Key
1. In the Environment Variables section, click **"Add Variable"** or **"New Variable"**
2. Fill in:
   - **Name:** `ELEVENLABS_API_KEY`
   - **Value:** `sk_your_actual_api_key_here` (copy from https://elevenlabs.io/app/settings/api-keys)
3. Click **Save** or **Confirm**

### Step 6: Deploy the Function
1. After saving the environment variable, the function may need to be redeployed
2. Look for a **Deploy** button or the function might redeploy automatically
3. Wait for the deployment to complete (usually takes a few seconds)

### Step 7: Test
1. Go back to your app at http://localhost:5178 (or your Vite URL)
2. Reload the page (Ctrl+R or Cmd+R)
3. The voice dropdown should now load voices successfully! ✅

---

## Alternative: Using Supabase CLI

If the dashboard is confusing, you can use the CLI:

```powershell
# First, make sure you're authenticated with Supabase
supabase login

# Navigate to your project folder
cd d:\year4\textconvertor\gallerys

# Set the secret (replace with your actual ElevenLabs API key)
supabase secrets set ELEVENLABS_API_KEY="sk_your_actual_api_key_here"

# Verify it was set
supabase secrets list
```

---

## Getting Your ElevenLabs API Key

1. Go to https://elevenlabs.io/app/settings/api-keys
2. Log in to your ElevenLabs account
3. Your API key should be displayed (starts with `sk_`)
4. Copy it carefully (don't share it!)

---

## Common Issues

**"Environment Variables section not found"**
- Make sure you're in the Edge Function's settings (not the general project settings)
- The text-to-speech function must exist first

**"Still getting 'Unauthorized' error after setting the key"**
- Make sure you copied the key correctly (no extra spaces or characters)
- Verify you're using the latest key from ElevenLabs dashboard
- Wait 30 seconds after saving, then reload the browser

**"Function not found"**
- You may need to deploy the function first using Supabase CLI:
  ```powershell
  supabase functions deploy text-to-speech
  ```

---

## Quick Checklist

- [ ] Logged into https://app.supabase.com
- [ ] Selected the correct project (kuhvadvenszchegnotes)
- [ ] Found Edge Functions → text-to-speech
- [ ] Opened Manage Environment Variables
- [ ] Added ELEVENLABS_API_KEY with your valid key
- [ ] Saved the changes
- [ ] Waited for deployment to complete
- [ ] Reloaded http://localhost:5178 in browser
- [ ] Voice dropdown now shows voices ✅

---

Once you've completed these steps, let me know and I'll verify everything is working!
