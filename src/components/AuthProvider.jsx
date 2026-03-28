import { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const AuthContext = createContext({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    // If Supabase isn't configured, skip auth entirely
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser ? formatUser(currentUser) : null);
      setLoading(false);
    };

    getInitialUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser ? formatUser(currentUser) : null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Format Supabase user into a simpler object used by the app
 */
function formatUser(supabaseUser) {
  const name =
    supabaseUser.user_metadata?.full_name ||
    supabaseUser.user_metadata?.name ||
    supabaseUser.email?.split('@')[0] ||
    'User';

  return {
    id: supabaseUser.id,
    name,
    email: supabaseUser.email,
    avatar:
      supabaseUser.user_metadata?.avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00D4AA&color=fff`,
  };
}
