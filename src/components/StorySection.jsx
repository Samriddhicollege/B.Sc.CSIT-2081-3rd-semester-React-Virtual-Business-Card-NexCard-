'use client';
import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section className="bg-[#111318] py-20 border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Not just a business card <span className="text-gradient-accent">maker</span>
            </h2>
            <p className="text-[#a0a8b8] leading-relaxed text-sm mb-6">
              Complete your brand identity with a personalized business card design. A great business
              card helps you create a recognizable brand and grow your network.
            </p>
            <button className="bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-lg transition-colors">
              Find Your Card
            </button>
          </motion.div>

          <motion.div className="relative flex items-center justify-center h-56"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <motion.div className="absolute w-48 h-28 rounded-lg shadow-2xl shadow-black/40 overflow-hidden border border-white/[0.08]"
              style={{ top: '8%', right: '8%', transform: 'rotate(3deg)' }}
              whileHover={{ rotate: 0, scale: 1.04 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="h-full p-4 bg-[#181b22] flex flex-col justify-between">
                <div><div className="text-[10px] font-bold text-white uppercase tracking-widest">ALEX RIVERA</div>
                <div className="text-[8px] text-[#5c6370] mt-0.5">Creative Director</div></div>
                <div className="w-6 h-6 rounded border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA] text-[8px] font-bold">AR</div>
              </div>
            </motion.div>

            <motion.div className="absolute w-48 h-28 rounded-lg shadow-2xl shadow-[#00D4AA]/10 overflow-hidden"
              style={{ bottom: '8%', left: '8%', transform: 'rotate(-3deg)' }}
              whileHover={{ rotate: 0, scale: 1.04 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className="h-full p-4 bg-gradient-to-br from-[#00D4AA] to-[#00b894] flex flex-col justify-between">
                <div className="text-[7px] text-[#090b10]/50 font-bold uppercase tracking-widest text-right">STUDIO</div>
                <div><div className="text-[11px] font-bold text-[#090b10] uppercase tracking-wide">MAYA CHEN</div>
                <div className="text-[8px] text-[#090b10]/60">Founder & CEO</div></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
