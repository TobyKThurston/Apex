-- Create the waitlist table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for the waitlist form)
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Optional: Create a policy that allows authenticated users to read (if you want to view the list)
-- CREATE POLICY "Allow authenticated read" ON waitlist
--   FOR SELECT
--   TO authenticated
--   USING (true);

