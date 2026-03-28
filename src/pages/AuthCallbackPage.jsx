import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        navigate('/', { replace: true });
        return;
      }

      // Try code exchange (PKCE flow)
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('Auth callback error:', error.message);
          navigate('/login?error=auth_failed', { replace: true });
          return;
        }
        navigate(params.get('next') || '/', { replace: true });
        return;
      }

      // Implicit flow — tokens are in the hash fragment.
      // Supabase client auto-detects hash tokens via onAuthStateChange,
      // so just wait briefly for the session to be picked up.
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/', { replace: true });
        return;
      }

      // If no code and no session yet, listen for auth state change
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            subscription.unsubscribe();
            navigate('/', { replace: true });
          }
        }
      );

      // Timeout fallback — if nothing happens in 5s, redirect to login
      setTimeout(() => {
        subscription.unsubscribe();
        navigate('/login?error=auth_failed', { replace: true });
      }, 5000);
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00D4AA]/30 border-t-[#00D4AA] rounded-full animate-spin" />
    </div>
  );
}
