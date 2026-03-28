import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, Building2, Share2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCardBySlug, incrementViews } from '@/utils/cardStorage';
import SocialLinks from '@/components/SocialLinks';
import SaveContactButton from '@/components/SaveContactButton';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import ShareModal from '@/components/ShareModal';

export default function VirtualCardPage() {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const data = await getCardBySlug(slug);
      setCard(data);
      setLoading(false);
      if (data) await incrementViews(slug);
    };
    fetchCard();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[#00D4AA]/30 border-t-[#00D4AA] rounded-full"
        />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-[#090b10] flex flex-col items-center justify-center px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-full bg-[#141720] border border-white/[0.06] flex items-center justify-center mb-6 mx-auto">
            <QrCode className="w-8 h-8 text-[#8b929e]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Card Not Found</h1>
          <p className="text-[#8b929e] text-sm mb-6 max-w-sm">
            This virtual business card doesn't exist or has been removed.
          </p>
          <Link to="/" className="text-[#00D4AA] text-sm font-medium hover:underline">
            ← Create your own card
          </Link>
        </motion.div>
      </div>
    );
  }

  const { design = {} } = card;
  const { bg = '#0a0a0f', accent = '#00D4AA', textColor = '#ffffff' } = design;
  const initials = (card.name || 'U').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const cardUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg }}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]" style={{ background: `radial-gradient(ellipse, ${accent}15 0%, transparent 70%)` }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px]" style={{ background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)` }} />
        </div>

        <div className="relative max-w-lg mx-auto px-5 py-12 md:py-20">
          {/* Main card content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Avatar & Identity */}
            <div className="text-center">
              {card.company && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center justify-center gap-2 mb-5"
                >
                  <Building2 className="w-5 h-5" style={{ color: accent }} />
                  <span className="text-lg font-extrabold tracking-widest uppercase" style={{ color: accent }}>
                    {card.company}
                  </span>
                </motion.div>
              )}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl font-bold shadow-2xl"
                style={{
                  backgroundColor: accent,
                  color: bg,
                  boxShadow: `0 0 60px ${accent}30`,
                }}
              >
                {initials}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ color: textColor }}
              >
                {card.name || 'Your Name'}
              </motion.h1>

              {card.title && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-base mt-2 font-medium"
                  style={{ color: textColor, opacity: 0.6 }}
                >
                  {card.title}
                </motion.p>
              )}
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3"
            >
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: `${textColor}08`, border: `1px solid ${textColor}10` }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20` }}>
                    <Phone className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textColor, opacity: 0.4 }}>Phone</div>
                    <div className="text-sm font-semibold" style={{ color: textColor }}>{card.phone}</div>
                  </div>
                </a>
              )}

              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: `${textColor}08`, border: `1px solid ${textColor}10` }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20` }}>
                    <Mail className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textColor, opacity: 0.4 }}>Email</div>
                    <div className="text-sm font-semibold" style={{ color: textColor }}>{card.email}</div>
                  </div>
                </a>
              )}

              {card.web && (
                <a
                  href={card.web.startsWith('http') ? card.web : `https://${card.web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: `${textColor}08`, border: `1px solid ${textColor}10` }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20` }}>
                    <Globe className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textColor, opacity: 0.4 }}>Website</div>
                    <div className="text-sm font-semibold" style={{ color: textColor }}>{card.web}</div>
                  </div>
                </a>
              )}
            </motion.div>

            {/* Social Links */}
            {(card.linkedin || card.github || card.twitter || card.instagram) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex justify-center"
              >
                <SocialLinks person={card} size="lg" variant="glass" />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 pt-4"
            >
              {/* Save Contact */}
              <SaveContactButton person={card} variant="primary" className="w-full" />

              {/* Secondary actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowShare(true)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ borderColor: `${textColor}15`, color: textColor }}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ borderColor: `${textColor}15`, color: textColor }}
                >
                  <QrCode className="w-4 h-4" />
                  <span className="text-sm font-medium">QR Code</span>
                </button>
              </div>
            </motion.div>

            {/* QR Code (toggleable) */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center pt-2"
              >
                <QRCodeDisplay url={cardUrl} size={200} />
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center pt-8"
            >
              <div className="w-8 h-px mx-auto mb-4" style={{ backgroundColor: `${textColor}15` }} />
              <Link
                to="/"
                className="text-[11px] font-medium uppercase tracking-widest transition-colors hover:opacity-80"
                style={{ color: accent }}
              >
                Create Your Own Card →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        cardUrl={cardUrl}
        cardTitle={card.name}
      />
    </>
  );
}
