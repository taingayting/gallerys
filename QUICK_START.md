# 🚀 Quick Start Guide

Get your Text-to-Speech converter running in 5 minutes!

## Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

## Step 2: Get ElevenLabs API Key (2 minutes)

1. Go to: **https://elevenlabs.io/app/settings/api-keys**
2. Sign up or log in
3. Click "Create API Key"
4. Copy the key (starts with `sk_`)

## Step 3: Update .env File (1 minute)

Open `.env` and replace:

```env
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual
```

With your real key:

```env
ELEVENLABS_API_KEY=sk_your_actual_key_here
```

Save the file.

## Step 4: Run the App (30 seconds)

```bash
npm run dev
```

Open: **http://localhost:5173**

## Step 5: Test It! (1 minute)

1. Type: "Hello world"
2. Select a voice
3. Click "Generate Speech"
4. Download your MP3!

---

## That's It! 🎉

**Need more help?** Check these files:
- `API_KEY_INSTRUCTIONS.md` - Detailed API key setup
- `SETUP_GUIDE.md` - Complete setup guide
- `README.md` - Full documentation

**Having issues?** Most problems are solved by:
1. Making sure the API key is correct
2. Restarting the server (`Ctrl+C` then `npm run dev`)
3. Checking you have internet connection
4. Verifying your ElevenLabs account is active

---

**Quick Commands:**

| Action | Command |
|--------|---------|
| Start app | `npm run dev` |
| Stop app | `Ctrl + C` |
| Build app | `npm run build` |
| Preview build | `npm run preview` |

**Quick Links:**

- Get API Key: https://elevenlabs.io/app/settings/api-keys
- Check Usage: https://elevenlabs.io/app/usage
- Documentation: https://docs.elevenlabs.io/

---

**Enjoy your text-to-speech converter!**
