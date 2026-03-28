import { getSupabaseBrowserClient } from './supabase/client';

const NOT_CONFIGURED_ERROR = { message: 'Supabase is not configured. Please add your credentials to the .env file.' };

/**
 * Sign up with email and password
 */
export async function signUp({ email, password, name }) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });
  return { data, error };
}

/**
 * Sign in with email and password
 */
export async function signIn({ email, password }) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Sign in with OAuth provider (Google, GitHub)
 */
export async function signInWithOAuth(provider) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

/**
 * Sign out
 */
export async function signOut() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { error: NOT_CONFIGURED_ERROR };
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = getSupabaseBrowserClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

/**
 * Get current user
 */
export async function getUser() {
  const supabase = getSupabaseBrowserClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}
