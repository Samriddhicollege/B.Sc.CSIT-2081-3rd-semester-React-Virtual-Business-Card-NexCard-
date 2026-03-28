import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Palette, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPersonForTemplate, getCompanyForTemplate } from '@/data/templates';

function BigCardPreview({ template, businessName }) {
  const person = { ...getPersonForTemplate(template.id) };
  if (businessName) person.name = businessName;
  const company = getCompanyForTemplate(template.id);
  const { bg, accent, textColor } = template.preview;

  return (
    <div style={{
      backgroundColor: bg,
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: "'Inter', sans-serif",
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${accent}, ${accent}66)` }} />
      <div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>{company}</div>
        <div style={{ fontSize: '22px', fontWeight: 800, color: textColor, letterSpacing: '2px', textTransform: 'uppercase' }}>{person.name}</div>
        <div style={{ fontSize: '12px', color: textColor, opacity: 0.6, fontWeight: 500, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{person.title}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '11px', color: textColor, opacity: 0.5, lineHeight: 1.8 }}>
          <div>📱 {person.phone}</div>
          <div>✉ {person.email}</div>
          <div>🌐 {person.web}</div>
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '10px', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
    </div>
  );
}

export default function CardPreviewModal({ template, templates, businessName, onClose, onNavigate }) {
  const [liked, setLiked] = useState(false);
  const modalRef = useRef(null);

  if (!template) return null;

  const currentIndex = templates.findIndex(t => t.id === template.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < templates.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(templates[currentIndex - 1]);
  }, [hasPrev, currentIndex, templates, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(templates[currentIndex + 1]);
  }, [hasNext, currentIndex, templates, onNavigate]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goPrev, goNext]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }, [template]);

  // Download as PNG
  const handleDownload = async () => {
    const cardEl = document.getElementById('modal-card-preview');
    if (!cardEl) return;
    try {
      const canvas = document.createElement('canvas');
      const rect = cardEl.getBoundingClientRect();
      const scale = 2;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      // Use a simple approach: serialize to SVG foreignObject
      const data = new XMLSerializer().serializeToString(cardEl);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">${data}</div>
        </foreignObject>
      </svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const link = document.createElement('a');
        link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = url;
    } catch {
      // Fallback: just alert
      alert('Download requires a modern browser. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview of ${template.title} business card template`}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#12121a] rounded-2xl border border-white/[0.08] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-white font-bold text-lg">{template.title}</h3>
              <span className="text-[#8b929e] text-xs uppercase tracking-wider">{template.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label={liked ? 'Unlike this template' : 'Like this template'}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#00D4AA] text-[#00D4AA]' : 'text-[#8b929e]'}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-5 h-5 text-[#8b929e]" />
              </button>
            </div>
          </div>

          {/* Card preview */}
          <div className="p-6">
            <div id="modal-card-preview" className="aspect-[1.75/1] rounded-xl overflow-hidden shadow-xl shadow-black/30">
              <BigCardPreview template={template} businessName={businessName} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
            <div className="flex gap-2">
              <button
                disabled={!hasPrev}
                onClick={goPrev}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous template"
              >
                <ArrowLeft className="w-4 h-4 text-[#9999aa]" />
              </button>
              <button
                disabled={!hasNext}
                onClick={goNext}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next template"
              >
                <ArrowRight className="w-4 h-4 text-[#9999aa]" />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-[#9999aa] text-sm font-medium hover:bg-white/5 hover:text-white transition-all"
                aria-label="Download card as PNG"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <Link to={`/customize/${template.id}`} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00D4AA] hover:bg-[#00E8BC] text-[#0a0a0f] text-sm font-bold transition-colors shadow-lg shadow-[#00D4AA]/20">
                <Palette className="w-4 h-4" />
                CUSTOMIZE
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
