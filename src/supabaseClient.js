// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 🔹 Replace these with your own values from Supabase Settings → API
const SUPABASE_URL = 'https://wmqndczbojkntkhfvxkf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcW5kY3pib2prbnRraGZ2eGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3Njc0ODksImV4cCI6MjA3OTM0MzQ4OX0.asxwFAh7pOVo8P9Z_ejtQOabGp8FPV6dkazsTTJBTBI';

// Create a single Supabase client instance for the whole app to use
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
