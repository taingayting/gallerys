# Debug Script - Run in Browser Console (F12)

When you open your app in the browser and it's not working:

1. Press **F12** to open DevTools
2. Click the **Console** tab
3. Paste this code and press Enter:

```javascript
// Check environment variables
console.log('=== ENVIRONMENT ===');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_ELEVENLABS_API_KEY:', import.meta.env.VITE_ELEVENLABS_API_KEY ? 'SET' : 'NOT SET');
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

// Check if voices are loaded
console.log('\n=== VOICES ===');
console.log('Number of voices loaded:', voices.length);
if (voices.length > 0) {
  console.log('First voice:', voices[0]);
  console.log('Voice properties:', Object.keys(voices[0]));
}

// Check the dropdown
console.log('\n=== DROPDOWN ===');
console.log('Dropdown element:', document.getElementById('voiceSelect'));
console.log('Dropdown value:', document.getElementById('voiceSelect').value);
console.log('Dropdown options count:', document.getElementById('voiceSelect').options.length);
```

4. Copy all the output and send it to me

---

## Alternative: Check Network Tab

1. Open DevTools (F12)
2. Click **Network** tab
3. Reload the page (Ctrl+R)
4. Look for a request to `api.elevenlabs.io` or similar
5. Click on it and check:
   - **Status**: Should be `200`
   - **Response**: Should show voices data

---

## Quick Test in PowerShell

```powershell
# Test if your API key works directly
$headers = @{
    "xi-api-key" = "sk_84f548926c109a00c7fabcce915aed167386b25448761a33"
    "Content-Type" = "application/json"
}
$response = Invoke-RestMethod -Method Get -Uri "https://api.elevenlabs.io/v1/voices" -Headers $headers
$response.voices | Select-Object -First 3
```

This will show if your API key works and what voices are available.
