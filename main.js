import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentAudioBlob = null;
let voices = [];

const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const voiceSelect = document.getElementById('voiceSelect');
const voiceInfo = document.getElementById('voiceInfo');
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
const audioPlayerSection = document.getElementById('audioPlayerSection');
const audioPlayer = document.getElementById('audioPlayer');
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
  const selectedVoice = voices.find(v => v.voice_id === voiceSelect.value);
  if (selectedVoice) {
    const labels = selectedVoice.labels || {};
    const languageInfo = labels.language || labels.accent || 'Unknown';
    const ageInfo = labels.age || '';
    const genderInfo = labels.gender || '';

    voiceInfo.innerHTML = `
      <div class="voice-details">
        <strong>${selectedVoice.name}</strong>
        <span class="voice-meta">${genderInfo}${ageInfo ? `, ${ageInfo}` : ''}${languageInfo ? ` | ${languageInfo}` : ''}</span>
        ${selectedVoice.description ? `<p class="voice-description">${selectedVoice.description}</p>` : ''}
      </div>
    `;
  }
});

async function loadVoices() {
  try {
    const apiUrl = `${supabaseUrl}/functions/v1/text-to-speech/voices`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to load voices');
    }

    const data = await response.json();
    voices = data.voices || [];

    voiceSelect.innerHTML = '<option value="">Select a voice</option>';

    const groupedVoices = {};
    voices.forEach(voice => {
      const labels = voice.labels || {};
      const language = labels.language || labels.accent || 'Other';

      if (!groupedVoices[language]) {
        groupedVoices[language] = [];
      }
      groupedVoices[language].push(voice);
    });

    Object.keys(groupedVoices).sort().forEach(language => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = language;

      groupedVoices[language].forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.voice_id;
        option.textContent = voice.name;
        optgroup.appendChild(option);
      });

      voiceSelect.appendChild(optgroup);
    });

    if (voices.length > 0) {
      voiceSelect.value = voices[0].voice_id;
      voiceSelect.dispatchEvent(new Event('change'));
    }

  } catch (error) {
    console.error('Error loading voices:', error);
    showStatus(`Error loading voices: ${error.message}`, 'error');
    voiceSelect.innerHTML = '<option value="">Error loading voices</option>';
  }
}

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
  const text = textInput.value.trim();
  const voiceId = voiceSelect.value;

  if (!text) {
    showStatus('Please enter some text to convert', 'error');
    return;
  }

  if (!voiceId) {
    showStatus('Please select a voice', 'error');
    return;
  }

  try {
    showLoading(true);
    showStatus('Generating speech...', 'info');

    const apiUrl = `${supabaseUrl}/functions/v1/text-to-speech`;

    const stability = parseFloat(stabilityControl.value);
    const clarity = parseFloat(clarityControl.value);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability,
          similarity_boost: clarity,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate speech');
    }

    const audioBlob = await response.blob();
    currentAudioBlob = audioBlob;

    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayer.src = audioUrl;
    audioPlayerSection.style.display = 'block';
    downloadBtn.disabled = false;

    showStatus('Speech generated successfully!', 'success');

    const selectedVoice = voices.find(v => v.voice_id === voiceId);
    await saveConversionHistory({
      text: text.substring(0, 500),
      voice_id: voiceId,
      voice_name: selectedVoice?.name || 'Unknown',
      language: selectedVoice?.labels?.language || 'Unknown',
      speed: parseFloat(speedControl.value),
      pitch: parseFloat(pitchControl.value),
    });

    loadHistory();

  } catch (error) {
    console.error('Error generating speech:', error);
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    showLoading(false);
  }
});

downloadBtn.addEventListener('click', () => {
  if (!currentAudioBlob) {
    showStatus('No audio to download', 'error');
    return;
  }

  const url = URL.createObjectURL(currentAudioBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `speech-${Date.now()}.mp3`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showStatus('Audio downloaded successfully!', 'success');
});

async function saveConversionHistory(data) {
  try {
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

loadVoices();
loadHistory();
