import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://bkjvbnquwedagjqbfkuj.supabase.co';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJranZibnF1d2VkYWdqcWJma3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzOTMwNzgsImV4cCI6MjEwOTk2OTA3OH0.72maEiUIvOGkGGmLKGYVSdQ4DEu6z58KItnDa_uoKUY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
