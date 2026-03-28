import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00D4AA]/30 border-t-[#00D4AA] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return children;
}
