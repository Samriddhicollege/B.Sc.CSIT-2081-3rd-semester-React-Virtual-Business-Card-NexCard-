'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, MessageCircle, Mail, Link2 } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';

export default function ShareModal({ isOpen, onClose, cardUrl, cardTitle }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = cardUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      href: `https://wa.me/?text=${encodeURIComponent(`Check out my digital business card: ${cardUrl}`)}`,
    },
    {
      label: 'Email',
      icon: Mail,
      color: '#EA4335',
      href: `mailto:?subject=${encodeURIComponent(`${cardTitle || 'My'} Business Card`)}&body=${encodeURIComponent(`Here's my digital business card:\n\n${cardUrl}`)}`,
    },
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#111318] rounded-2xl border border-white/[0.08] max-w-md w-full shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#00D4AA]" />
              <h3 className="text-white font-bold text-lg">Share Your Card</h3>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Close">
              <X className="w-5 h-5 text-[#8b929e]" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <QRCodeDisplay url={cardUrl} size={180} />
            </div>

            {/* Copy Link */}
            <div>
              <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-2 block">Card Link</label>
              <div className="flex items-stretch rounded-xl overflow-hidden bg-[#090b10] border border-white/[0.08]">
                <div className="flex-1 flex items-center px-3 min-w-0">
                  <Link2 className="w-3.5 h-3.5 text-[#8b929e] shrink-0 mr-2" />
                  <span className="text-sm text-[#8b929e] truncate">{cardUrl}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div>
              <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-2 block">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                {shareLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.08] bg-[#141720] hover:bg-white/5 hover:border-white/[0.12] text-white text-xs font-bold transition-all"
                    >
                      <Icon className="w-4 h-4" style={{ color: link.color }} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
