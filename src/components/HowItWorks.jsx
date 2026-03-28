'use client';
import { motion } from 'framer-motion';
import { Search, Palette, Download } from 'lucide-react';

const STEPS = [
  { icon: Search, step: '01', title: 'Find a template', desc: 'Browse hundreds of professional templates. Filter by industry, style, and color.' },
  { icon: Palette, step: '02', title: 'Customize', desc: 'Add your name, logo, and details. Edit colors, fonts, and layout to match your brand.' },
  { icon: Download, step: '03', title: 'Download', desc: 'Download your card as a high-resolution, print-ready file.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#090b10] py-20 border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
          How it <span className="text-gradient-accent">works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#00D4AA]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#00D4AA] rounded text-[#090b10] text-[9px] font-bold flex items-center justify-center">{step.step}</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-[#a0a8b8] text-sm leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
