'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { TEMPLATES, CATEGORIES } from '@/data/templates';
import TemplateCard from './TemplateCard';
import CardPreviewModal from './CardPreviewModal';
import ErrorBoundary from './ErrorBoundary';
import { ArrowDown } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '1.75 / 1', background: '#181b22' }}>
      <div className="w-full h-full animate-pulse">
        <div className="p-3 flex flex-col justify-between h-full">
          <div>
            <div className="h-2.5 bg-white/[0.06] rounded w-24 mb-1.5" />
            <div className="h-1.5 bg-white/[0.04] rounded w-16" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="h-1.5 bg-white/[0.04] rounded w-20 mb-1" />
              <div className="h-1.5 bg-white/[0.04] rounded w-24" />
            </div>
            <div className="w-6 h-6 rounded bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// localStorage helpers for liked templates
function getLikedFromStorage() {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem('liked-templates');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch { return new Set(); }
}

function saveLikedToStorage(liked) {
  try {
    localStorage.setItem('liked-templates', JSON.stringify([...liked]));
  } catch { /* ignore */ }
}

export default function TemplateGrid({ businessName = '', keywords = '' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [likedSet, setLikedSet] = useState(new Set());
  const gridRef = useRef(null);

  // Load likes from localStorage on mount
  useEffect(() => {
    setLikedSet(getLikedFromStorage());
    // Simulate brief loading for skeleton effect
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const toggleLike = useCallback((id) => {
    setLikedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveLikedToStorage(next);
      return next;
    });
  }, []);

  // Tag-based fuzzy search + category filter
  const filtered = useMemo(() => {
    let result = TEMPLATES;

    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (keywords.trim()) {
      const terms = keywords.toLowerCase().split(/[\s,]+/).filter(Boolean);
      result = result.filter(t =>
        terms.some(term =>
          t.tags.some(tag => tag.includes(term)) ||
          t.title.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
        )
      );
    }

    if (sortBy === 'free') {
      result = [...result].sort((a, b) => (b.isFree ? 1 : 0) - (a.isFree ? 1 : 0));
    } else if (sortBy === 'liked') {
      result = [...result].sort((a, b) => (likedSet.has(b.id) ? 1 : 0) - (likedSet.has(a.id) ? 1 : 0));
    }

    return result;
  }, [activeCategory, keywords, sortBy, likedSet]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, keywords, sortBy]);

  const visibleTemplates = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filtered.length));
  }, [filtered.length]);

  return (
    <div className="bg-[#090b10] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        {/* Category + Sort row */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <div className="flex gap-1.5 flex-wrap flex-1">
            {CATEGORIES.map(c => (
              <button key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#00D4AA] text-[#090b10] shadow-md shadow-[#00D4AA]/20'
                    : 'text-[#8b929e] hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={activeCategory === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8b929e] text-[10px] uppercase tracking-widest font-bold">Showing {filtered.length} templates</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141720] text-[#8b929e] text-xs px-2.5 py-1.5 rounded-md border border-white/[0.06] outline-none cursor-pointer"
              aria-label="Sort templates"
            >
              <option value="default">Default</option>
              <option value="free">Free First</option>
              <option value="liked">Liked First</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <ErrorBoundary>
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              visibleTemplates.map(t => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  businessName={businessName}
                  isLiked={likedSet.has(t.id)}
                  onToggleLike={toggleLike}
                  onSelect={setSelectedTemplate}
                />
              ))
            )}
          </div>
        </ErrorBoundary>

        {/* Load More */}
        {!isLoading && hasMore && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={loadMore}
              className="flex items-center gap-2 text-white/60 hover:text-[#00D4AA] uppercase tracking-wider text-xs font-bold py-3 px-6 rounded-lg border border-white/[0.06] hover:border-[#00D4AA]/30 transition-all"
            >
              Load More <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8b929e] text-sm">No templates match your filters. Try a different category or search term.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTemplate && (
        <CardPreviewModal
          template={selectedTemplate}
          templates={filtered}
          businessName={businessName}
          onClose={() => setSelectedTemplate(null)}
          onNavigate={setSelectedTemplate}
        />
      )}
    </div>
  );
}
