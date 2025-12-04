# 🔑 How to Replace the Dummy API Key with Your Real ElevenLabs API Key

## Quick Overview

You need to replace the dummy API key in the `.env` file with your actual ElevenLabs API key to make the text-to-speech converter work.

**Time Required**: 5-10 minutes
**Difficulty**: Easy
**Cost**: Free tier available

---

## 📍 Where is the API Key Located?

The API key is stored in the **`.env`** file in the root directory of your project:

```
your-project-folder/
├── .env  ← OPEN THIS FILE
├── index.html
├── main.js
├── style.css
└── ...
```

---

## 🎯 Step 1: Get Your ElevenLabs API Key

### Option A: If you already have an ElevenLabs account

1. Go to: **[https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)**
2. Log in to your account
3. Click "**Copy**" next to your existing API key
4. Skip to **Step 2**

### Option B: If you need to create a new account

1. Visit: **[https://elevenlabs.io/sign-up](https://elevenlabs.io/sign-up)**
2. Create an account (free tier available)
3. Verify your email
4. Go to: **[https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)**
5. Click "**Create API Key**"
6. Give it a name (e.g., "Text to Speech App")
7. Click "**Copy**" to copy your new key

**Your API key will look like this:**
```
sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z
```

⚠️ **IMPORTANT**: Save this key! You won't be able to see it again.

---

## 📝 Step 2: Open the .env File

### Windows:
- Right-click on `.env`
- Select "**Open with**" → "**Notepad**" or "**VS Code**"

### Mac:
- Right-click on `.env`
- Select "**Open With**" → "**TextEdit**" or "**VS Code**"

### Linux:
```bash
nano .env
# or
vim .env
```

---

## ✏️ Step 3: Replace the Dummy Key

You will see this in your `.env` file:

```env
VITE_SUPABASE_URL=https://kuhvadvenszchegnotes.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ElevenLabs API Key
# IMPORTANT: Replace 'dummy_api_key_replace_with_actual' with your actual API key
# Get your API key from: https://elevenlabs.io/app/settings/api-keys
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
```

### Replace the last line:

**BEFORE:**
```env
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
```

**AFTER:**
```env
ELEVENLABS_API_KEY=sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z
```

Replace `sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z` with YOUR actual API key.

---

## 💾 Step 4: Save the File

- Press **Ctrl + S** (Windows/Linux)
- Press **Cmd + S** (Mac)
- Or click **File** → **Save**

**Make sure the file is saved as `.env` (NOT `.env.txt`)**

---

## 🔄 Step 5: Restart the Application

### If the app is running:

1. Go to your terminal/command prompt
2. Press **Ctrl + C** to stop the server
3. Run the command again:
   ```bash
   npm run dev
   ```

### If the app is not running:

```bash
npm run dev
```

The application will start at: **http://localhost:5173**

---

## ✅ Step 6: Test It!

1. Open your browser and go to: **http://localhost:5173**
2. Type some text (e.g., "Hello, this is a test")
3. Select a voice from the dropdown
4. Click "**Generate Speech**"
5. You should hear the audio!
6. Click "**Download MP3**" to save the file

---

## 🚨 Troubleshooting

### Issue: "ElevenLabs API key not configured"

**Solution:**
- Check that you replaced `dummy_api_key_replace_with_actual` with your real key
- Make sure there are NO spaces before or after the `=` sign
- Restart the application

### Issue: "Invalid API Key" or 401 Error

**Solution:**
- Your API key might be incorrect
- Go back to [ElevenLabs API Keys](https://elevenlabs.io/app/settings/api-keys)
- Create a new key and copy it again
- Replace the key in `.env` again

### Issue: "Failed to load voices"

**Solution:**
- Check your internet connection
- Verify your ElevenLabs account is active
- Check if you have credits: [https://elevenlabs.io/app/usage](https://elevenlabs.io/app/usage)

### Issue: Voices load but generation fails

**Solution:**
- You might be out of credits
- Check usage: [https://elevenlabs.io/app/usage](https://elevenlabs.io/app/usage)
- Upgrade your plan if needed

---

## 📊 ElevenLabs Free Tier

The free tier includes:
- ✅ 10,000 characters per month
- ✅ Access to standard voices
- ✅ High-quality audio output
- ❌ No commercial use

Upgrade for more: [https://elevenlabs.io/pricing](https://elevenlabs.io/pricing)

---

## 🔒 Security Tips

1. **Never share your API key**
   - Don't post it online
   - Don't commit it to GitHub (already protected by `.gitignore`)
   - Don't share screenshots with the key visible

2. **If compromised:**
   - Go to: [https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)
   - Delete the old key
   - Create a new one
   - Update your `.env` file

---

## 📚 Additional Resources

- **ElevenLabs Dashboard**: [https://elevenlabs.io/app](https://elevenlabs.io/app)
- **API Documentation**: [https://docs.elevenlabs.io/](https://docs.elevenlabs.io/)
- **Check Usage**: [https://elevenlabs.io/app/usage](https://elevenlabs.io/app/usage)
- **Get Support**: [support@elevenlabs.io](mailto:support@elevenlabs.io)

---

## 🎉 That's It!

Your text-to-speech converter is now ready to use with your own ElevenLabs API key!

**Summary of what you did:**
1. ✅ Got your ElevenLabs API key
2. ✅ Opened the `.env` file
3. ✅ Replaced the dummy key with your real key
4. ✅ Saved the file
5. ✅ Restarted the application
6. ✅ Tested it successfully!

---

**Need help?** Check the `README.md` or `SETUP_GUIDE.md` files for more detailed information.
