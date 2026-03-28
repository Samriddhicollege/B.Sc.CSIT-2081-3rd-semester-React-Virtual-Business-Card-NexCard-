import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CreditCard, Eye, Trash2, ExternalLink, Share2, Plus, QrCode, Clock,
} from 'lucide-react';
import { getAllCards, deleteCard } from '@/utils/cardStorage';
import ShareModal from '@/components/ShareModal';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/ToastProvider';
import { CardSkeleton } from '@/components/Skeletons';

export default function MyCardsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [cards, setCards] = useState([]);
  const [shareCard, setShareCard] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const result = await getAllCards();
      setCards(result);
      setLoading(false);
    };
    fetchCards();
  }, [user]);

  const handleDelete = async (slug) => {
    if (deletingSlug === slug) {
      await deleteCard(slug);
      setCards((prev) => prev.filter((c) => c.slug !== slug));
      setDeletingSlug(null);
      toast?.success('Card deleted successfully');
    } else {
      setDeletingSlug(slug);
      setTimeout(() => setDeletingSlug(null), 3000);
    }
  };

  const getCardUrl = (slug) =>
    typeof window !== 'undefined' ? `${window.location.origin}/card/${slug}` : `/card/${slug}`;

  return (
    <div className="min-h-screen bg-[#090b10]">
      <div className="max-w-[1000px] mx-auto px-5 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">My Virtual Cards</h1>
            <p className="text-[#8b929e] text-sm mt-1">Manage and share your published digital business cards</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-colors shadow-lg shadow-[#00D4AA]/20"
          >
            <Plus className="w-4 h-4" />
            New Card
          </Link>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#111318] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-[#8b929e]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No cards yet</h2>
            <p className="text-[#8b929e] text-sm mb-6 max-w-sm mx-auto">
              Create your first virtual business card by choosing a template and clicking "Publish".
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-colors"
            >
              Browse Templates
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {cards.map((card, i) => (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#111318] rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.1] transition-colors group"
                >
                  {/* Card header with color bar */}
                  <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${card.design?.bg || '#0a0a0f'}, ${card.design?.accent || '#00D4AA'})` }} />

                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: card.design?.accent || '#00D4AA',
                          color: card.design?.bg || '#090b10',
                        }}
                      >
                        {(card.name || 'U').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base truncate">{card.name || 'Unnamed Card'}</h3>
                        <p className="text-[#8b929e] text-xs truncate">
                          {card.title || ''}{card.title && card.company ? ' · ' : ''}{card.company || ''}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-[#8b929e] text-[10px]">
                            <Eye className="w-3 h-3" />
                            <span>{card.views || 0} views</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#8b929e] text-[10px]">
                            <Clock className="w-3 h-3" />
                            <span>{card.createdAt ? new Date(card.createdAt).toLocaleDateString() : '—'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* URL slug */}
                    <div className="mt-4 px-3 py-2 bg-[#090b10] rounded-lg border border-white/[0.04] flex items-center gap-2">
                      <QrCode className="w-3 h-3 text-[#8b929e] shrink-0" />
                      <span className="text-[11px] text-[#8b929e] truncate font-mono">/card/{card.slug}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        to={`/card/${card.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#00D4AA]/10 text-[#00D4AA] text-xs font-bold hover:bg-[#00D4AA]/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> View
                      </Link>
                      <button
                        onClick={() => setShareCard(card)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-[#8b929e] text-xs font-bold hover:text-white hover:border-white/[0.12] transition-all"
                      >
                        <Share2 className="w-3 h-3" /> Share
                      </button>
                      <button
                        onClick={() => handleDelete(card.slug)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          deletingSlug === card.slug
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'border border-white/[0.08] text-[#8b929e] hover:text-red-400 hover:border-red-500/30'
                        }`}
                        aria-label="Delete card"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Share modal */}
      {shareCard && (
        <ShareModal
          isOpen={!!shareCard}
          onClose={() => setShareCard(null)}
          cardUrl={getCardUrl(shareCard.slug)}
          cardTitle={shareCard.name}
        />
      )}
    </div>
  );
}
