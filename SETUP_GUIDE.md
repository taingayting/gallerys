# ElevenLabs API Key Setup Guide

This guide will walk you through the process of replacing the dummy API key with your actual ElevenLabs API key to make the text-to-speech converter fully functional.

## Step-by-Step Instructions

### Step 1: Create an ElevenLabs Account

1. Visit [https://elevenlabs.io/](https://elevenlabs.io/)
2. Click "Sign Up" in the top right corner
3. Create your account using email or social login
4. Verify your email address if required
5. Complete your profile setup

### Step 2: Get Your API Key

1. Log in to your ElevenLabs account
2. Click on your profile icon in the top right corner
3. Select "Profile Settings" or "API Settings"
4. Navigate to the "API Keys" section
   - Direct link: [https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)
5. Click the "Create API Key" button
6. Give your key a name (e.g., "Text-to-Speech App")
7. Copy the generated API key (it will look like: `sk_...`)
8. **IMPORTANT**: Save this key somewhere safe! You won't be able to see it again

### Step 3: Locate the .env File

The `.env` file is in the root directory of your project:

```
your-project/
├── .env  ← This file
├── index.html
├── main.js
├── style.css
├── package.json
└── ...
```

### Step 4: Open the .env File

Open the `.env` file using any text editor:
- **VS Code**: Right-click → Open With → Visual Studio Code
- **Notepad**: Right-click → Open With → Notepad
- **Terminal**: `nano .env` or `vim .env`

### Step 5: Replace the Dummy API Key

Find this line in the `.env` file:

```env
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
```

Replace it with your actual API key:

```env
ELEVENLABS_API_KEY=sk_your_actual_api_key_here
```

**Example:**

Before:
```env
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
```

After:
```env
ELEVENLABS_API_KEY=sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```

### Step 6: Save the File

- Press `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac)
- Make sure the file is saved as `.env` (not `.env.txt`)

### Step 7: Restart the Application

If the application is already running:

1. Stop the development server:
   - Press `Ctrl + C` in the terminal

2. Start it again:
   ```bash
   npm run dev
   ```

### Step 8: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Enter some text in the text input area
3. Select a voice from the dropdown
4. Click "Generate Speech"
5. If everything works, you'll hear the audio and can download it!

## Visual Guide

### What Your .env File Should Look Like

```env
VITE_SUPABASE_URL=https://kuhvadvenszchegnotes.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ElevenLabs API Key
# IMPORTANT: Replace 'dummy_api_key_replace_with_actual' with your actual API key
# Get your API key from: https://elevenlabs.io/app/settings/api-keys
ELEVENLABS_API_KEY=sk_your_real_api_key_goes_here_1234567890
```

## Common Mistakes to Avoid

### ❌ Don't Do This:

1. **Adding spaces around the equals sign:**
   ```env
   ELEVENLABS_API_KEY = sk_123456789
   ```

2. **Adding quotes around the key:**
   ```env
   ELEVENLABS_API_KEY="sk_123456789"
   ```

3. **Leaving the dummy key:**
   ```env
   ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
   ```

4. **Partial key copy:**
   ```env
   ELEVENLABS_API_KEY=sk_123
   ```

### ✅ Do This:

```env
ELEVENLABS_API_KEY=sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```

## Troubleshooting

### Error: "ElevenLabs API key not configured"

**Cause**: The API key is still the dummy value or not set

**Solution**:
1. Open `.env` file
2. Check if `ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual`
3. Replace with your actual key
4. Save the file
5. Restart the server

### Error: "Invalid API Key" or 401 Unauthorized

**Cause**: The API key is incorrect or invalid

**Solution**:
1. Go back to [ElevenLabs API Settings](https://elevenlabs.io/app/settings/api-keys)
2. Create a new API key
3. Copy the entire key (including the `sk_` prefix)
4. Replace the key in `.env`
5. Save and restart

### Error: "Failed to load voices"

**Possible Causes**:
- No internet connection
- Invalid API key
- ElevenLabs service is down
- Account has no active subscription

**Solutions**:
1. Check your internet connection
2. Verify your API key is correct
3. Check [ElevenLabs Status](https://status.elevenlabs.io/)
4. Verify your account is active at [ElevenLabs Dashboard](https://elevenlabs.io/app)

### Voices Load But Speech Generation Fails

**Possible Causes**:
- Insufficient credits/quota
- Account limitations

**Solutions**:
1. Check your usage at [ElevenLabs Usage](https://elevenlabs.io/app/usage)
2. Upgrade your plan if needed
3. Wait for quota reset if on free tier

## Understanding ElevenLabs API Tiers

### Free Tier
- 10,000 characters per month
- Access to standard voices
- Commercial use not allowed

### Paid Tiers
- More characters
- Access to premium voices
- Commercial use allowed
- Faster processing

Check current pricing: [https://elevenlabs.io/pricing](https://elevenlabs.io/pricing)

## Security Best Practices

1. **Never share your API key publicly**
   - Don't commit `.env` to GitHub
   - Don't share screenshots with the key visible
   - Don't paste it in public forums

2. **Regenerate if compromised**
   - If you accidentally expose your key, regenerate it immediately
   - Go to API Settings → Delete old key → Create new key

3. **Use environment variables**
   - Always use `.env` for sensitive data
   - Never hardcode keys in your source code

## Need More Help?

- **ElevenLabs Documentation**: [https://docs.elevenlabs.io/](https://docs.elevenlabs.io/)
- **ElevenLabs Support**: [support@elevenlabs.io](mailto:support@elevenlabs.io)
- **API Reference**: [https://docs.elevenlabs.io/api-reference](https://docs.elevenlabs.io/api-reference)

## Quick Reference

| Task | Command/Link |
|------|-------------|
| Get API Key | [https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys) |
| Check Usage | [https://elevenlabs.io/app/usage](https://elevenlabs.io/app/usage) |
| View Pricing | [https://elevenlabs.io/pricing](https://elevenlabs.io/pricing) |
| API Docs | [https://docs.elevenlabs.io/](https://docs.elevenlabs.io/) |
| Start Dev Server | `npm run dev` |
| Stop Dev Server | `Ctrl + C` |

---

**You're all set!** Once you've completed these steps, your text-to-speech converter will be fully functional. Happy converting!
