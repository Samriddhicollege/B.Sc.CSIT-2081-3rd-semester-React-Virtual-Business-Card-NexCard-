import { motion } from 'framer-motion';
import { Layers, Star, Zap, Shield, Globe, Printer } from 'lucide-react';

const FEATURES = [
  { icon: Layers, title: 'Unlimited customization' },
  { icon: Star, title: 'Premium designs' },
  { icon: Zap, title: 'Instant results' },
  { icon: Shield, title: '24/7 Support' },
  { icon: Globe, title: 'Royalty-free' },
  { icon: Printer, title: 'High-res files' },
];

export default function Features() {
  return (
    <section className="bg-[#090b10] border-y border-white/[0.05]">
      <div className="max-w-[1080px] mx-auto px-5 py-6">
        <div className="flex items-center justify-between gap-6 overflow-x-auto">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 shrink-0 px-2"
              >
                <Icon className="w-4 h-4 text-[#00D4AA]" />
                <span className="text-[#a0a8b8] text-xs font-medium whitespace-nowrap">{f.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
