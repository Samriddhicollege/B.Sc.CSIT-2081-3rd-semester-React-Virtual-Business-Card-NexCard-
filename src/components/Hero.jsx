'use client';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, Sparkles, Check, Wand2, Layers, Star, Zap, Globe, Printer } from 'lucide-react';
import CardMarquee from './CardMarquee';

const TYPING_EXAMPLES = ['Coffee Shop', 'Photography Studio', 'Tech Startup', 'Law Firm', 'Bakery'];

export default function Hero() {
  const navigate = useNavigate();
  const logoFileRef = useRef(null);
  const [businessName, setBusinessName] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter your business name');

  useEffect(() => {
    let idx = 0, charIdx = 0, deleting = false, timeout;
    const type = () => {
      const word = TYPING_EXAMPLES[idx];
      if (!deleting) {
        charIdx++;
        setPlaceholder(`Try "${word.slice(0, charIdx)}"`);
        if (charIdx === word.length) { deleting = true; timeout = setTimeout(type, 1800); return; }
      } else {
        charIdx--;
        setPlaceholder(charIdx > 0 ? `Try "${word.slice(0, charIdx)}"` : 'Enter your business name');
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % TYPING_EXAMPLES.length; }
      }
      timeout = setTimeout(type, deleting ? 35 : 70);
    };
    timeout = setTimeout(type, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => setBusinessName(e.target.value);

  const [hasLogo, setHasLogo] = useState(false);

  const handleStart = () => {
    const params = new URLSearchParams();
    if (businessName.trim()) params.set('company', businessName.trim());
    if (hasLogo) params.set('logo', '1');
    const query = params.toString();
    navigate(`/customize/1${query ? `?${query}` : ''}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try { sessionStorage.setItem('heroLogo', ev.target.result); } catch {}
      setHasLogo(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#090b10]" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_rgba(0,212,170,0.06)_0%,_transparent_70%)]" />

      <div className="relative max-w-[1200px] mx-auto px-5 pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left — Text content */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/25 rounded-full px-3.5 py-1 mb-5"
            >
              <Sparkles className="w-3 h-3 text-[#00D4AA]" />
              <span className="text-[#00D4AA] text-[11px] font-semibold uppercase tracking-widest">Free to Try</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4"
            >
              <span className="text-white">Business Card</span>{' '}
              <span className="text-gradient-accent">Maker</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="text-[#a0a8b8] text-sm sm:text-base mb-6 max-w-md leading-relaxed"
            >
              Create stunning business cards in seconds. Professional templates, unlimited customization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="max-w-md"
            >
              <div className="flex items-stretch rounded-xl overflow-hidden bg-[#141720] border border-white/10 shadow-xl shadow-black/40 focus-within:border-[#00D4AA]/40 transition-colors">
                <input
                  type="text" value={businessName} onChange={handleChange} onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 px-4 py-3 text-sm bg-transparent text-white outline-none placeholder-[#8b929e]"
                />
                <button onClick={handleStart} className="bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold uppercase tracking-wider px-5 py-3 text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  START <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <input ref={logoFileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFileChange} />
              <button onClick={() => logoFileRef.current?.click()} className={`mt-4 group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-dashed transition-all duration-200 ${hasLogo ? 'border-[#00D4AA]/40 bg-[#00D4AA]/[0.06]' : 'border-white/[0.12] hover:border-[#00D4AA]/40 bg-white/[0.02] hover:bg-[#00D4AA]/[0.04]'}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${hasLogo ? 'bg-[#00D4AA]/20' : 'bg-[#00D4AA]/10 group-hover:bg-[#00D4AA]/20'}`}>
                  {hasLogo ? <Check className="w-3 h-3 text-[#00D4AA]" /> : <Upload className="w-3 h-3 text-[#00D4AA]" />}
                </div>
                <span className={`text-[11px] uppercase tracking-widest font-semibold transition-colors ${hasLogo ? 'text-[#00D4AA]' : 'text-[#a0a8b8] group-hover:text-white'}`}>
                  {hasLogo ? 'Logo Uploaded ✓' : 'Upload Your Logo'}
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="mt-8 flex items-center gap-5 flex-wrap"
            >
              {['1000+ Templates', '100+ Users', 'Premium Quality', 'Unlimited Customization', 'Premium Designs', 'High-res Files'].map((s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#00D4AA]" />
                  <span className="text-[#a0a8b8] text-[11px] font-medium">{s}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Auto-scrolling card marquee */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden sm:block"
          >
            <CardMarquee />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
