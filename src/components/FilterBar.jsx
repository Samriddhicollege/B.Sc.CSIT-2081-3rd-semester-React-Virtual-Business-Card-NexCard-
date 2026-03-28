import { useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X, Type, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterBar({ onSearch }) {
  const [businessName, setBusinessName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => onSearch({ businessName, keywords });
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div className="bg-[#090b10]/80 backdrop-blur-xl border-b border-white/[0.05] sticky top-[60px] z-40 supports-[backdrop-filter]:bg-[#090b10]/60">
      <div className="max-w-[1200px] mx-auto px-5 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          
          {/* Name Input Group */}
          <div className="flex-1 min-w-[200px] max-w-[280px]">
            <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest pl-1 mb-1.5 block">Name</label>
            <div className="relative group">
              <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c6370] group-focus-within:text-[#00D4AA] transition-colors" />
              <input
                type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="Business name"
                className="w-full bg-white/[0.02] border border-white/[0.05] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#00D4AA]/40 focus:bg-[#00D4AA]/[0.02] hover:bg-white/[0.04] placeholder-[#5c6370] transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Keywords Input Group */}
          <div className="flex-1 min-w-[200px] max-w-[280px]">
            <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest pl-1 mb-1.5 block">Keywords</label>
            <div className="relative group">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c6370] group-focus-within:text-[#9d80ff] transition-colors" />
              <input
                type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="e.g. modern, tech"
                className="w-full bg-white/[0.02] border border-white/[0.05] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#9d80ff]/40 focus:bg-[#9d80ff]/[0.02] hover:bg-white/[0.04] placeholder-[#5c6370] transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0 self-end">
            <button onClick={handleSearch}
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#141720] to-[#090b10] border border-white/10 hover:border-[#00D4AA]/50 shadow-lg shadow-black/50 hover:shadow-[#00D4AA]/10 transition-all overflow-hidden isolate"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/0 via-[#00D4AA]/15 to-[#00D4AA]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 -z-10" />
              <Search className="w-4 h-4 text-[#00D4AA] drop-shadow-[0_0_8px_rgba(0,212,170,0.8)]" />
              <span className="text-white text-xs font-bold tracking-wide uppercase">Search</span>
            </button>
          </div>

          {/* Filters Toggle Button */}
          <div className="flex-shrink-0 self-end ml-auto">
            <button onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] text-xs font-bold text-[#8b929e] hover:text-white transition-all uppercase tracking-widest"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showMore && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="pt-4 pb-2 flex flex-wrap gap-5 border-t border-white/[0.06] mt-4">
                {[{ label: 'Color', opts: ['Any', 'Dark', 'Light', 'Colorful'] }, { label: 'Style', opts: ['Any', 'Modern', 'Classic', 'Minimal'] }, { label: 'Industry', opts: ['Any', 'Tech', 'Finance', 'Creative'] }].map((g) => (
                  <div key={g.label} className="flex flex-col gap-1.5 min-w-[140px]">
                    <span className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest pl-1">{g.label}</span>
                    <select className="bg-white/[0.02] border border-white/[0.05] text-sm text-white px-3 py-2.5 rounded-xl outline-none hover:bg-white/[0.04] focus:border-white/[0.2] transition-colors appearance-none cursor-pointer">
                      {g.opts.map((o) => <option key={o} value={o} className="bg-[#141720]">{o}</option>)}
                    </select>
                  </div>
                ))}
                <div className="flex-shrink-0 self-end ml-auto">
                  <button onClick={() => setShowMore(false)} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[#8b929e] hover:text-white hover:bg-white/[0.08] transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
