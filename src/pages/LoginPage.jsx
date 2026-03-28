import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Flame } from 'lucide-react';
import { signIn, signUp, signInWithOAuth } from '@/lib/auth';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const redirect = searchParams.get('redirect') || '/';

  // Show auth error from OAuth callback
  useEffect(() => {
    if (searchParams.get('error') === 'auth_failed') {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate(redirect, { replace: true });
    }
  }, [user, authLoading, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error: authError } = await signIn({ email, password });
        if (authError) {
          setError(authError.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }
        navigate(redirect, { replace: true });
      } else {
        const { data, error: authError } = await signUp({ email, password, name });
        if (authError) {
          setError(authError.message || 'Failed to create account.');
          setLoading(false);
          return;
        }
        // Check if email confirmation is required
        if (data?.user && !data.session) {
          setSuccess('Account created! Check your email to confirm your account.');
          setLoading(false);
          return;
        }
        navigate(redirect, { replace: true });
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await signInWithOAuth(provider.toLowerCase());
      if (authError) {
        setError(authError.message || `Failed to sign in with ${provider}.`);
        setLoading(false);
      }
      // OAuth will redirect the browser — no need to navigate
    } catch {
      setError(`Failed to sign in with ${provider}.`);
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 20 : -20 }
  };

  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center p-5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,212,170,0.08)_0%,_transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(0,184,148,0.05)_0%,_transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4AA] to-[#00b894] flex items-center justify-center shadow-lg shadow-[#00D4AA]/20 group-hover:shadow-[#00D4AA]/40 transition-shadow">
              <Flame className="w-5 h-5 text-[#090b10]" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">
              Nex<span className="text-[#00D4AA]">Card</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#111318]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden p-8 relative">

          {/* Tabs */}
          <div className="flex relative mb-8 bg-[#090b10] rounded-xl p-1 border border-white/[0.04]">
            <button
              onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors relative z-10 ${isLogin ? 'text-white' : 'text-[#8b929e] hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors relative z-10 ${!isLogin ? 'text-white' : 'text-[#8b929e] hover:text-white'}`}
            >
              Sign Up
            </button>
            {/* Sliding Pill */}
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1a1d26] rounded-lg shadow-md border border-white/[0.05] z-0"
              initial={false}
              animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-[#8b929e] text-sm">
                  {isLogin
                    ? 'Enter your details to access your designs.'
                    : 'Start building your brand identity today.'}
                </p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-3 rounded-lg bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-xs font-medium">
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-[#8b929e]" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Johnson"
                        className="w-full bg-[#090b10] border border-white/[0.08] text-sm text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-[#00D4AA]/50 focus:ring-1 focus:ring-[#00D4AA]/50 placeholder-[#8b929e]/50 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-[#8b929e]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#090b10] border border-white/[0.08] text-sm text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-[#00D4AA]/50 focus:ring-1 focus:ring-[#00D4AA]/50 placeholder-[#8b929e]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest">Password</label>
                    {isLogin && (
                      <a href="#" className="text-[10px] font-medium text-[#00D4AA] hover:text-[#00E8BC] transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-[#8b929e]" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#090b10] border border-white/[0.08] text-sm text-white pl-10 pr-10 py-3 rounded-xl outline-none focus:border-[#00D4AA]/50 focus:ring-1 focus:ring-[#00D4AA]/50 placeholder-[#8b929e]/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8b929e] hover:text-white transition-colors outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 mt-2 px-5 py-3.5 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-all shadow-lg shadow-[#00D4AA]/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-[#090b10]/30 border-t-[#090b10] rounded-full"
                    />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Separator */}
              <div className="mt-8 mb-6 flex items-center">
                <div className="flex-1 h-px bg-white/[0.06]"></div>
                <span className="px-3 text-[10px] uppercase tracking-widest text-[#8b929e] font-bold">Or continue with</span>
                <div className="flex-1 h-px bg-white/[0.06]"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] bg-[#141720] hover:bg-white/5 hover:border-white/10 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  <span className="text-[14px]">G</span> Google
                </button>
                <button
                  onClick={() => handleSocialLogin('GitHub')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] bg-[#141720] hover:bg-white/5 hover:border-white/10 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  <span className="text-[14px]">GH</span> GitHub
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-[11px] text-[#8b929e]">
          By continuing, you agree to NexCard's <br />
          <a href="#" className="text-white hover:text-[#00D4AA] transition-colors">Terms of Service</a> and <a href="#" className="text-white hover:text-[#00D4AA] transition-colors">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
