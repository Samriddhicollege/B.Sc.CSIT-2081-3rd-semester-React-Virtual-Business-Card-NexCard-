'use client';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';

const LINKS = {
  NexCard: ['About Us', 'Careers', 'Blog', 'Press'],
  Company: ['Pricing', 'Terms', 'Privacy', 'Contact'],
  Templates: ['Business Cards', 'Logos', 'Social Media', 'Flyers'],
  'Find a Logo': ['Restaurant', 'Beauty', 'Tech', 'Real Estate'],
};

export default function Footer() {
  return (
    <footer className="bg-[#090b10] border-t border-white/[0.06]">
      <div className="border-b border-white/[0.06] py-8">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Enter your business name"
            className="flex-1 bg-[#141720] border border-white/[0.08] text-white text-sm px-4 py-2.5 rounded-lg outline-none placeholder-[#5c6370]" />
          <input type="text" placeholder="Keywords (e.g. restaurant)"
            className="flex-1 bg-[#141720] border border-white/[0.08] text-white text-sm px-4 py-2.5 rounded-lg outline-none placeholder-[#5c6370]" />
          <button className="bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap">
            Start Designing <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <Link to="/" className="flex items-center gap-1.5 mb-8">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00D4AA] to-[#00b894] flex items-center justify-center">
              <Flame className="w-3 h-3 text-[#090b10]" />
            </div>
            <span className="font-bold text-base text-white">Nex<span className="text-[#00D4AA]">Card</span></span>
          </Link>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(LINKS).map(([cat, links]) => (
              <div key={cat}>
                <h4 className="text-[#a0a8b8] font-bold text-[10px] mb-3 uppercase tracking-widest">{cat}</h4>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}><Link to="#" className="text-[#5c6370] text-xs hover:text-[#00D4AA] transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-4">
        <p className="text-[#5c6370] text-[10px] text-center">© {new Date().getFullYear()} NexCard. All rights reserved.</p>
      </div>
    </footer>
  );
}
