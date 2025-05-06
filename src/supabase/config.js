import { createClient } from '@supabase/supabase-js';

// Credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  // URL Supabase project
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;  // Supabase public key

// Create the client of Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
