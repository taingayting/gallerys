/*
  # Text-to-Speech Conversion History

  1. New Tables
    - `tts_conversions`
      - `id` (uuid, primary key)
      - `text` (text) - The text that was converted
      - `voice_id` (text) - The ElevenLabs voice ID used
      - `voice_name` (text) - The name of the voice
      - `language` (text) - The language of the voice
      - `speed` (numeric) - The speed multiplier
      - `pitch` (numeric) - The pitch adjustment
      - `audio_url` (text) - URL to the generated audio file
      - `created_at` (timestamptz) - When the conversion was created
      - `user_id` (uuid) - Optional user tracking (nullable for now)

  2. Security
    - Enable RLS on `tts_conversions` table
    - Add policy for anyone to insert conversions (public access)
    - Add policy for anyone to view their recent conversions
*/

CREATE TABLE IF NOT EXISTS tts_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  voice_id text NOT NULL,
  voice_name text NOT NULL,
  language text NOT NULL,
  speed numeric DEFAULT 1.0,
  pitch numeric DEFAULT 1.0,
  audio_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE tts_conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert conversions"
  ON tts_conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view conversions"
  ON tts_conversions
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_tts_conversions_created_at ON tts_conversions(created_at DESC);
