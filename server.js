import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Basic security headers
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '200kb' }));

// Simple rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT || '60', 10), // default 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);



app.post('/api/tts', async (req, res) => {
  try {
    const { text, lang = 'en-US', slow = false, voice_id = null, provider = null } = req.body || {};
    console.log('[POST /api/tts] incoming request', { provider, lang, voice_id, textPreview: (text || '').slice(0,100) });
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Use Edge-TTS (Microsoft AI voices)
    const edgeTtsPath = process.env.EDGE_TTS_PATH || 'edge-tts';
    const voice = voice_id || getDefaultVoiceForLang(lang);

    // Create temporary file for audio output
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'edge-tts-'));
    const outputPath = path.join(tmpDir, 'output.mp3');

    // Build Edge-TTS command arguments
    const args = [
      '--voice', voice,
      '--text', `"${text}"`,  // Quote the text to handle spaces and special characters
      '--write-media', outputPath
    ];

    // Add rate adjustment if slow is true
    if (slow) {
      args.push('--rate', '-50%');
    }

    console.log('Running Edge-TTS command:', edgeTtsPath, args.join(' '));

    // Execute Edge-TTS
    await new Promise((resolve, reject) => {
      const child = spawn(edgeTtsPath, args, {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let stderr = '';
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Edge-TTS exited with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (err) => {
        reject(new Error(`Failed to start Edge-TTS: ${err.message}`));
      });
    });

    // Read the generated audio file
    const audioBuffer = await fs.readFile(outputPath);

    // Clean up temporary directory
    await fs.rm(tmpDir, { recursive: true, force: true });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');
    return res.send(audioBuffer);

  } catch (err) {
    console.error('TTS server error', err && err.stack ? err.stack : err);
    // In development, return the error message to the client for easier debugging
    const dev = (process.env.NODE_ENV || '').toLowerCase() !== 'production';
    return res.status(500).json({ error: 'Internal server error', message: dev ? (err?.message || String(err)) : undefined });
  }
});

// Helper function to get default voice for language
function getDefaultVoiceForLang(lang) {
  const voiceMap = {
    'en-US': 'en-US-AriaNeural',
    'en-GB': 'en-GB-SoniaNeural',
    'es-ES': 'es-ES-ElviraNeural',
    'fr-FR': 'fr-FR-DeniseNeural',
    'de-DE': 'de-DE-KatjaNeural',
    'it-IT': 'it-IT-ElsaNeural',
    'pt-BR': 'pt-BR-FranciscaNeural',
    'ja-JP': 'ja-JP-NanamiNeural',
    'ko-KR': 'ko-KR-SunHiNeural',
    'zh-CN': 'zh-CN-XiaoxiaoNeural',
    'ru-RU': 'ru-RU-SvetlanaNeural',
    'ar-SA': 'ar-SA-ZariyahNeural',
    'hi-IN': 'hi-IN-SwaraNeural'
  };

  // Extract language code (e.g., 'en-US' from 'en-US' or 'en')
  const langCode = lang.split('-').slice(0, 2).join('-');
  return voiceMap[langCode] || voiceMap['en-US'];
}

app.get('/', (_req, res) => {
  res.send('Local TTS server — POST /api/tts with { text, lang, voice_id, provider }');
});

// Small test endpoint to verify frontend playback without needing upstream providers.
app.get('/api/test-tone', (_req, res) => {
  try {
    // Generate a 1 second silent WAV (16-bit PCM, mono, 16000 Hz)
    const sampleRate = 16000;
    const durationSec = 1;
    const numSamples = sampleRate * durationSec;
    const bytesPerSample = 2; // 16-bit
    const blockAlign = bytesPerSample * 1; // mono
    const byteRate = sampleRate * blockAlign;

    const dataSize = numSamples * bytesPerSample;
    const buffer = Buffer.alloc(44 + dataSize);

    // RIFF header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write('WAVE', 8);

    // fmt subchunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
    buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
    buffer.writeUInt16LE(1, 22); // NumChannels
    buffer.writeUInt32LE(sampleRate, 24); // SampleRate
    buffer.writeUInt32LE(byteRate, 28); // ByteRate
    buffer.writeUInt16LE(blockAlign, 32); // BlockAlign
    buffer.writeUInt16LE(16, 34); // BitsPerSample

    // data subchunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);

    // Silence: buffer is already zeroed, so data chunk remains silent

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (err) {
    console.error('test-tone error', err);
    return res.status(500).json({ error: 'Failed to generate test tone', message: err?.message });
  }
});

app.listen(port, () => {
  console.log(`TTS server listening on http://localhost:${port}`);
});
