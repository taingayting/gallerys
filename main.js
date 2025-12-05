import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

let currentAudioBlob = null;
let lastAudioUrl = null;

const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const voiceSelect = document.getElementById('voiceSelect');
const voiceInfo = document.getElementById('voiceInfo');
const languageSelect = document.getElementById('languageSelect');
const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');
const pitchControl = document.getElementById('pitchControl');
const pitchValue = document.getElementById('pitchValue');
const stabilityControl = document.getElementById('stabilityControl');
const stabilityValue = document.getElementById('stabilityValue');
const clarityControl = document.getElementById('clarityControl');
const clarityValue = document.getElementById('clarityValue');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const statusMessage = document.getElementById('statusMessage');
const debugSentLang = document.getElementById('debugSentLang');
const audioPlayerSection = document.getElementById('audioPlayerSection');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const muteBtn = document.getElementById('muteBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const historyList = document.getElementById('historyList');

textInput.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
});

speedControl.addEventListener('input', () => {
  speedValue.textContent = speedControl.value;
});

pitchControl.addEventListener('input', () => {
  pitchValue.textContent = pitchControl.value;
});

stabilityControl.addEventListener('input', () => {
  stabilityValue.textContent = stabilityControl.value;
});

clarityControl.addEventListener('input', () => {
  clarityValue.textContent = clarityControl.value;
});

voiceSelect.addEventListener('change', () => {
  const selectedVoiceId = voiceSelect.value;
  if (selectedVoiceId) {
    const voiceName = selectedVoiceId.split('-').slice(2).join(' ').replace('Neural', '') || selectedVoiceId;
    voiceInfo.innerHTML = `
      <div class="voice-details">
        <strong>Microsoft Edge TTS</strong>
        <span class="voice-meta">Voice: ${voiceName}</span>
      </div>
    `;
  } else {
    voiceInfo.innerHTML = '';
  }
});



function showStatus(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      statusMessage.style.display = 'none';
    }, 5000);
  }
}

function showLoading(show) {
  loadingOverlay.style.display = show ? 'flex' : 'none';
  generateBtn.disabled = show;
}

generateBtn.addEventListener('click', async () => {
  // Always POST to local /api/tts endpoint which returns an MP3 blob for playback + download
  const text = textInput.value.trim();
  if (!text) return showStatus('Please enter some text to convert', 'error');

  // Get language from selector, default to 'en'
  const lang = languageSelect && languageSelect.value ? languageSelect.value : 'en';

  // Get voice_id from voiceSelect
  const voiceId = voiceSelect.value || null;

  const provider = 'edge-tts';

  // Show debug info in UI
  if (debugSentLang) {
    debugSentLang.textContent = `Sent: lang=${lang} provider=${provider} voice=${voiceId || 'auto'}`;
  }

  try {
    showLoading(true);
    showStatus('Generating speech (local server)...', 'info');

    const body = { text, lang, voice_id: voiceId, provider };
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('Local TTS error:', res.status, txt);
      showStatus(`TTS server error: ${res.status}`, 'error');
      showLoading(false);
      return;
    }

    const audioBlob = await res.blob();
    currentAudioBlob = audioBlob;
    // Revoke previous object URL to avoid leaks and ensure fresh playback
    if (lastAudioUrl) {
      try { URL.revokeObjectURL(lastAudioUrl); } catch (e) { /* ignore */ }
      lastAudioUrl = null;
    }
    const audioUrl = URL.createObjectURL(audioBlob);
    lastAudioUrl = audioUrl;
    audioPlayer.src = audioUrl;
    audioPlayerSection.style.display = 'block';
    downloadBtn.disabled = false;
    setupMiniPlayer();

    showStatus('Speech generated successfully!', 'success');

    await saveConversionHistory({
      text: text.substring(0, 500),
      voice_id: voiceId || 'coqui-tts',
      voice_name: voiceId || 'Coqui TTS',
      language: lang,
      speed: parseFloat(speedControl.value),
      pitch: parseFloat(pitchControl.value),
    });

    loadHistory();
  } catch (error) {
    console.error('Error calling local TTS:', error);
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    showLoading(false);
  }
});

downloadBtn.addEventListener('click', () => {
  if (currentAudioBlob) {
    const url = URL.createObjectURL(currentAudioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showStatus('Audio downloaded successfully!', 'success');
    return;
  }

  // Download not supported for browser TTS (no audio blob available).
  showStatus('Download not supported when using browser TTS. Use a server-side TTS to enable downloads.', 'error');
});

function setupMiniPlayer() {
  if (!audioPlayer) return;

  // Re-query DOM elements each time to avoid stale references
  const playBtnElem = document.getElementById('playPauseBtn');
  const muteBtnElem = document.getElementById('muteBtn');
  const prog = document.getElementById('progressBar');
  if (!prog || !playBtnElem || !muteBtnElem) return;

  // Clean previous listeners by replacing with clones if parent exists
  try {
    const newPlay = playBtnElem.cloneNode(true);
    if (playBtnElem.parentNode) playBtnElem.parentNode.replaceChild(newPlay, playBtnElem);
  } catch (e) {
    console.warn('Failed to replace play button node:', e);
  }
  try {
    const newMute = muteBtnElem.cloneNode(true);
    if (muteBtnElem.parentNode) muteBtnElem.parentNode.replaceChild(newMute, muteBtnElem);
  } catch (e) {
    console.warn('Failed to replace mute button node:', e);
  }

  // Re-query after potential replacement
  const playBtn = document.getElementById('playPauseBtn');
  const muteButton = document.getElementById('muteBtn');

  function updatePlayIcon() {
    if (audioPlayer.paused) playBtn.textContent = '►';
    else playBtn.textContent = '❚❚';
  }

  playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play().catch(err => console.error('Play failed', err));
    } else {
      audioPlayer.pause();
    }
    updatePlayIcon();
  });

  muteButton.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteButton.textContent = audioPlayer.muted ? '🔈' : '🔊';
  });

  // Update progress as audio plays
  audioPlayer.ontimeupdate = () => {
    if (audioPlayer.duration && !Number.isNaN(audioPlayer.duration)) {
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      prog.value = String(pct);
    }
  };

  // Seek when user moves progress bar
  prog.addEventListener('input', () => {
    if (audioPlayer.duration && !Number.isNaN(audioPlayer.duration)) {
      const pct = parseFloat(prog.value) / 100;
      audioPlayer.currentTime = pct * audioPlayer.duration;
    }
  });

  audioPlayer.onended = () => {
    updatePlayIcon();
  };

  audioPlayer.onplay = updatePlayIcon;
  audioPlayer.onpause = updatePlayIcon;

  // When metadata loaded, set progress to 0
  audioPlayer.onloadedmetadata = () => {
    prog.value = '0';
  };
}

async function saveConversionHistory(data) {
  try {
    if (!supabase) {
      console.warn('Supabase not configured. Skipping history save.');
      return;
    }
    const { error } = await supabase
      .from('tts_conversions')
      .insert([data]);

    if (error) {
      console.error('Error saving history:', error);
    }
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

async function loadHistory() {
  try {
    if (!supabase) {
      console.warn('Supabase not configured. Skipping history load.');
      historyList.innerHTML = '<p class="no-history">Supabase not configured</p>';
      return;
    }
    const { data, error } = await supabase
      .from('tts_conversions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    if (!data || data.length === 0) {
      historyList.innerHTML = '<p class="no-history">No conversion history yet</p>';
      return;
    }

    historyList.innerHTML = data.map(item => {
      const date = new Date(item.created_at).toLocaleString();
      const preview = item.text.substring(0, 100) + (item.text.length > 100 ? '...' : '');

      return `
        <div class="history-item">
          <div class="history-content">
            <p class="history-text">${preview}</p>
            <div class="history-meta">
              <span class="history-voice">${item.voice_name}</span>
              <span class="history-date">${date}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Error loading history:', error);
    historyList.innerHTML = '<p class="no-history">Error loading history</p>';
  }
}

// Microsoft Edge TTS voices - high quality neural voices
const edgeVoices = [
  { id: 'en-US-AriaNeural', name: 'Aria (Female, US English)', lang: 'en-US' },
  { id: 'en-US-ZiraNeural', name: 'Zira (Female, US English)', lang: 'en-US' },
  { id: 'en-US-JennyNeural', name: 'Jenny (Female, US English)', lang: 'en-US' },
  { id: 'en-US-GuyNeural', name: 'Guy (Male, US English)', lang: 'en-US' },
  { id: 'en-GB-SoniaNeural', name: 'Sonia (Female, UK English)', lang: 'en-GB' },
  { id: 'en-GB-RyanNeural', name: 'Ryan (Male, UK English)', lang: 'en-GB' },
  { id: 'en-GB-LibbyNeural', name: 'Libby (Female, UK English)', lang: 'en-GB' },
  { id: 'es-ES-ElviraNeural', name: 'Elvira (Female, Spanish)', lang: 'es-ES' },
  { id: 'fr-FR-DeniseNeural', name: 'Denise (Female, French)', lang: 'fr-FR' },
  { id: 'de-DE-KatjaNeural', name: 'Katja (Female, German)', lang: 'de-DE' },
  { id: 'it-IT-ElsaNeural', name: 'Elsa (Female, Italian)', lang: 'it-IT' },
  { id: 'pt-BR-FranciscaNeural', name: 'Francisca (Female, Portuguese)', lang: 'pt-BR' },
  { id: 'ja-JP-NanamiNeural', name: 'Nanami (Female, Japanese)', lang: 'ja-JP' },
  { id: 'ko-KR-SunHiNeural', name: 'SunHi (Female, Korean)', lang: 'ko-KR' },
  { id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao (Female, Chinese)', lang: 'zh-CN' },
  { id: 'ru-RU-SvetlanaNeural', name: 'Svetlana (Female, Russian)', lang: 'ru-RU' },
  { id: 'ar-SA-ZariyahNeural', name: 'Zariyah (Female, Arabic)', lang: 'ar-SA' },
  { id: 'hi-IN-SwaraNeural', name: 'Swara (Female, Hindi)', lang: 'hi-IN' }
];

// Initialize voice loading for Microsoft Edge TTS
function initVoices() {
  updateVoicesForLanguage();
  showStatus('Ready to use Microsoft Edge TTS', 'success');
}

// Update voices based on selected language
function updateVoicesForLanguage() {
  const selectedLang = languageSelect.value;
  voiceSelect.innerHTML = '<option value="">Select a voice (optional)</option>';

  // Filter voices by selected language
  const filteredVoices = edgeVoices.filter(voice => voice.lang === selectedLang);

  filteredVoices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.id;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });

  // Clear voice info when language changes
  voiceInfo.innerHTML = '';
}

// Add event listener for language changes
languageSelect.addEventListener('change', updateVoicesForLanguage);

initVoices();
loadHistory();
