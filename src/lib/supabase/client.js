import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function isSupabaseReady() {
  const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && url !== 'your-project-url-here' && key !== 'your-anon-key-here';
}

export function getSupabaseBrowserClient() {
  if (!isSupabaseReady()) return null;
  if (supabase) return supabase;

  supabase = createClient(
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return supabase;
}
