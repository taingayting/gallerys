# Text-to-Speech Converter

A fully functional text-to-speech converter web application powered by ElevenLabs API. Convert unlimited text into high-quality speech with customizable voice options, speed, pitch, and more.

## Features

- **Unlimited Text Input**: No character or word limits
- **Multiple Voice Options**: Choose from various voices in different languages
- **Voice Customization**:
  - Adjust speech speed (0.5x - 2.0x)
  - Control pitch (0.5 - 1.5)
  - Fine-tune stability and clarity
- **Audio Preview**: Listen to generated speech before downloading
- **Download as MP3**: Save your converted speech in MP3 format
- **Conversion History**: Track your recent conversions
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Prerequisites

- Node.js (v18 or higher)
- A Supabase account
- An ElevenLabs API account

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Get Your ElevenLabs API Key

1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up or log in to your account
3. Navigate to your [API Settings](https://elevenlabs.io/app/settings/api-keys)
4. Click on "Create API Key" or copy your existing key
5. Save this key securely - you'll need it in the next step

### Step 3: Configure Your API Key

**IMPORTANT**: This is the main step to make the application work!

Open the `.env` file in the root directory of your project and replace the dummy API key:

```env
# Before (Dummy Key):
ELEVENLABS_API_KEY=dummy_api_key_replace_with_actual

# After (Your Real Key):
ELEVENLABS_API_KEY=sk_your_actual_api_key_here
```

**Where to find the `.env` file:**
- The `.env` file is located in the root folder of your project
- Path: `/project/.env`

**Example of a valid API key:**
```env
ELEVENLABS_API_KEY=sk_1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 4: Configure Supabase Edge Function Secret

Your ElevenLabs API key also needs to be set as a secret in your Supabase Edge Function. This has been automatically configured for you, but if you need to update it:

The Edge Function will automatically use the `ELEVENLABS_API_KEY` from your environment.

### Step 5: Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 6: Build for Production

To create a production build:

```bash
npm run build
```

## How to Use the Application

1. **Enter Your Text**: Type or paste any text in the text input area (no limits!)

2. **Select a Voice**:
   - Choose from various voices organized by language
   - Each voice shows additional information like gender, age, and accent

3. **Customize Voice Settings**:
   - **Speed**: Adjust how fast the speech is delivered
   - **Pitch**: Change the tone/pitch of the voice
   - **Stability**: Control the consistency of the voice
   - **Clarity**: Adjust the clarity and similarity to the original voice

4. **Generate Speech**:
   - Click the "Generate Speech" button
   - Wait for the audio to be generated (usually a few seconds)

5. **Preview Your Audio**:
   - Use the audio player to listen to your generated speech

6. **Download**:
   - Click the "Download MP3" button to save the audio file

7. **View History**:
   - Check your recent conversions at the bottom of the page

## API Key Troubleshooting

### Issue: "ElevenLabs API key not configured" Error

**Solution:**
1. Open the `.env` file
2. Make sure the line reads: `ELEVENLABS_API_KEY=your_actual_key`
3. Ensure there are no spaces before or after the `=` sign
4. Make sure you've saved the file
5. Restart the development server (`npm run dev`)

### Issue: "Invalid API Key" Error

**Solution:**
1. Verify your API key is correct
2. Make sure you copied the entire key (they usually start with `sk_`)
3. Check if your ElevenLabs account is active
4. Ensure you have available credits in your ElevenLabs account

### Issue: Voices Not Loading

**Solution:**
1. Check your internet connection
2. Verify your API key is correctly set
3. Check the browser console for error messages
4. Make sure your ElevenLabs subscription is active

## File Structure

```
project/
├── index.html              # Main HTML file
├── main.js                 # JavaScript application logic
├── style.css               # Styling and design
├── package.json            # Dependencies
├── .env                    # Environment variables (API keys)
├── supabase/
│   └── functions/
│       └── text-to-speech/ # Edge function for API integration
└── README.md              # This file
```

## Environment Variables

The application uses the following environment variables:

```env
# Supabase Configuration (Auto-configured)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ElevenLabs API Key (YOU MUST SET THIS)
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

## Technologies Used

- **Frontend**: Vanilla JavaScript with Vite
- **Backend**: Supabase Edge Functions
- **Database**: Supabase PostgreSQL
- **API**: ElevenLabs Text-to-Speech API
- **Styling**: Modern CSS with gradients and animations

## API Usage and Costs

- ElevenLabs offers a free tier with limited characters per month
- Check your usage at [ElevenLabs Dashboard](https://elevenlabs.io/app/usage)
- Upgrade your plan for more characters and additional features

## Security Notes

- **NEVER** commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Your API key is only used server-side in the Edge Function
- The frontend never exposes your API key

## Support

For issues related to:
- **Application bugs**: Check the browser console for errors
- **API Key issues**: Follow the troubleshooting guide above
- **ElevenLabs API**: Visit [ElevenLabs Documentation](https://docs.elevenlabs.io/)
- **Supabase**: Visit [Supabase Documentation](https://supabase.com/docs)

## Quick Start Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Get ElevenLabs API key from https://elevenlabs.io/app/settings/api-keys
- [ ] Update `.env` file with your real API key
- [ ] Run `npm run dev`
- [ ] Test the application with sample text
- [ ] Download your first MP3 file

## License

This project is open source and available for personal and commercial use.

---

**Enjoy creating natural-sounding speech from your text!**
