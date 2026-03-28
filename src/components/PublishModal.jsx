import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Rocket, Sparkles, Link2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LinkedinIcon, GitHubIcon, TwitterIcon, InstagramIcon } from './SocialLinks';
import { generateSlug, saveCard } from '@/utils/cardStorage';

export default function PublishModal({
  isOpen,
  onClose,
  form,
  bg,
  accent,
  textColor,
  layout,
  templateId,
  templateTitle,
  onPublished,
}) {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
  });
  const [suggestedSlug, setSuggestedSlug] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [publishing, setPublishing] = useState(false);

  // Generate slug when modal opens
  useEffect(() => {
    if (isOpen) {
      generateSlug(form.name || 'my-card').then(setSuggestedSlug);
    }
  }, [isOpen, form.name]);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setPublishing(true);

    const slug = customSlug.trim()
      ? customSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
      : suggestedSlug || (await generateSlug(form.name || 'my-card'));

    const cardData = {
      slug,
      name: form.name,
      title: form.title,
      company: form.company,
      phone: form.phone,
      email: form.email,
      web: form.web,
      linkedin: socialLinks.linkedin,
      github: socialLinks.github,
      twitter: socialLinks.twitter,
      instagram: socialLinks.instagram,
      design: { bg, accent, textColor, layout },
      templateId,
      templateTitle,
    };

    try {
      const saved = await saveCard(cardData);
      setPublishing(false);
      
      // Trigger confetti!
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00D4AA', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00D4AA', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      onPublished?.(saved);
    } catch (err) {
      console.error('Publish error:', err);
      setPublishing(false);
    }
  };

  const socialFields = [
    { key: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn', placeholder: 'username or full URL', color: '#0A66C2' },
    { key: 'github', icon: GitHubIcon, label: 'GitHub', placeholder: 'username', color: '#ffffff' },
    { key: 'twitter', icon: TwitterIcon, label: 'Twitter / X', placeholder: '@handle', color: '#1DA1F2' },
    { key: 'instagram', icon: InstagramIcon, label: 'Instagram', placeholder: '@handle', color: '#E4405F' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#111318] rounded-2xl border border-white/[0.08] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00b894] flex items-center justify-center">
                <Rocket className="w-4 h-4 text-[#090b10]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Publish Virtual Card</h3>
                <p className="text-[#8b929e] text-[11px]">Create a shareable online business card</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Close">
              <X className="w-5 h-5 text-[#8b929e]" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Card Preview Mini */}
            <div className="bg-[#090b10] rounded-xl p-4 border border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: accent, color: bg }}
                >
                  {(form.name || 'YN').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-bold text-sm truncate">{form.name || 'Your Name'}</div>
                  <div className="text-[#8b929e] text-xs truncate">{form.title || 'Your Title'} {form.company ? `at ${form.company}` : ''}</div>
                </div>
              </div>
            </div>

            {/* Custom slug */}
            <div>
              <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3 h-3" /> Card URL Slug
              </label>
              <div className="flex items-stretch rounded-lg overflow-hidden bg-[#090b10] border border-white/[0.08] focus-within:border-[#00D4AA]/40 transition-colors">
                <span className="px-3 py-2.5 text-[#8b929e] text-xs bg-[#0d0f14] border-r border-white/[0.06] flex items-center whitespace-nowrap">
                  /card/
                </span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder={suggestedSlug}
                  className="flex-1 px-3 py-2.5 text-sm bg-transparent text-white outline-none placeholder-[#8b929e]/50"
                />
              </div>
            </div>

            {/* Social links */}
            <div>
              <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#00D4AA]" /> Social Links (Optional)
              </label>
              <div className="space-y-2.5">
                {socialFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.key} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#090b10] border border-white/[0.06] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" style={{ color: field.color }} />
                      </div>
                      <input
                        type="text"
                        value={socialLinks[field.key]}
                        onChange={(e) => setSocialLinks((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="flex-1 bg-[#090b10] border border-white/[0.08] text-sm text-white px-3 py-2 rounded-lg outline-none focus:border-[#00D4AA]/40 placeholder-[#8b929e]/50 transition-colors"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/[0.08] text-[#8b929e] text-xs font-medium hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4AA] to-[#00b894] hover:from-[#00E8BC] hover:to-[#00D4AA] text-[#090b10] font-bold text-sm transition-all shadow-lg shadow-[#00D4AA]/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {publishing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-[#090b10]/30 border-t-[#090b10] rounded-full"
                />
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Publish Card
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
