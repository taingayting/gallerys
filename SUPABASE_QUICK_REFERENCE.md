# Quick Visual Reference

## Dashboard Navigation Path

```
https://app.supabase.com
    ↓
Select Project: kuhvadvenszchegnotes
    ↓
Left Sidebar → Edge Functions (under "Development")
    ↓
Click on "text-to-speech" function
    ↓
Top Right: Click ⚙️ or ... menu
    ↓
Select "Manage Environment Variables" or "Settings"
    ↓
Click "New Variable" or "Add Environment Variable"
    ↓
Enter:
  Name: ELEVENLABS_API_KEY
  Value: sk_your_actual_api_key_from_elevenlabs
    ↓
Click "Save" or "Confirm"
    ↓
Wait for deployment (status should change to "Active")
    ↓
Done! ✅
```

## What You'll See

### Before (Error):
```
Select Voice dropdown shows: "Error loading voices"
Console error: {"error":"ElevenLabs API error: Unauthorized"}
```

### After (Success):
```
Select Voice dropdown populated with:
  - English
    - Adam
    - Antoni
    - Arnold
    etc...
```

## Troubleshooting

If it still doesn't work after setting the key:

1. **Check the key format** — Copy from https://elevenlabs.io/app/settings/api-keys
   - Should look like: `sk_1234567890abcdefghijklmnopqrst`
   - NOT like: `sk_92644c5sk_...` (double sk_)

2. **Clear browser cache and reload**
   - Press Ctrl+Shift+Delete (open cache clear)
   - Clear "All time"
   - Then reload the page

3. **Restart your dev server**
   ```powershell
   # Stop: Ctrl+C in the terminal
   npm run dev
   ```

4. **Check Supabase deployment status**
   - Make sure the function shows as "Active" (green status)
   - If it shows "Building" or "Error", wait or check logs
