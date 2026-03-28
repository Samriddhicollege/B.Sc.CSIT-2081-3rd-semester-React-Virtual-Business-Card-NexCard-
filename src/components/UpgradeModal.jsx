import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Wand2, Crown, ArrowRight, Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRO_FEATURES = [
  'AI-powered logo generation',
  'Smart design suggestions',
  'Unlimited card designs',
  'Premium template library',
  'High-res export (PNG, PDF, SVG)',
  'No watermark',
];

export default function UpgradeModal({ isOpen, onClose, feature = 'AI Logo Maker' }) {
  if (!isOpen) return null;

  const isLogo = feature.includes('Logo');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#111318] rounded-2xl border border-white/[0.08] max-w-md w-full shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient top bar */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#00D4AA] via-[#9d80ff] to-[#00D4AA]" />

          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 transition-colors z-10" aria-label="Close">
            <X className="w-4 h-4 text-[#8b929e]" />
          </button>

          {/* Hero section */}
          <div className="relative px-8 pt-10 pb-6 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,212,170,0.08)_0%,_transparent_60%)] pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="relative w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(157,128,255,0.15))',
                border: '1px solid rgba(0,212,170,0.2)',
              }}
            >
              <Lock className="w-6 h-6 text-[#00D4AA]" />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#9d80ff] flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-extrabold text-white mb-2"
            >
              Unlock {feature}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[#8b929e] text-sm leading-relaxed max-w-xs mx-auto"
            >
              {isLogo
                ? 'Generate stunning AI-powered logos that match your brand identity in seconds.'
                : 'Let AI create beautiful, unique card designs tailored to your style and industry.'}
            </motion.p>
          </div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-8 pb-6"
          >
            <div className="bg-[#090b10] rounded-xl border border-white/[0.04] p-4">
              <p className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#00D4AA]" /> Pro features include
              </p>
              <div className="space-y-2.5">
                {PRO_FEATURES.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#00D4AA]/15 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#00D4AA]" />
                    </div>
                    <span className="text-xs text-[#c0c5ce]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="px-8 pb-8">
            <Link
              to="/pricing"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4AA] to-[#00b894] hover:from-[#00E8BC] hover:to-[#00D4AA] text-[#090b10] font-bold text-sm transition-all shadow-lg shadow-[#00D4AA]/25 hover:shadow-[#00D4AA]/40"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Pro — $8/mo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="w-full mt-2.5 py-2.5 text-xs text-[#8b929e] hover:text-white font-medium transition-colors"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
