import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  { q: 'How do I make a business card?', a: 'Simply enter your business name, choose a template, customize colors and fonts, and download your high-resolution card. The entire process takes less than 5 minutes.' },
  { q: 'Is NexCard free to use?', a: 'You can browse and customize all templates for free. Download options are available with our affordable plans, and we offer several free templates to get you started.' },
  { q: 'Can I edit after downloading?', a: 'Yes! Your designs are saved to your account. You can return anytime to make changes, update information, or try a completely new design.' },
  { q: 'What file formats are provided?', a: 'We provide high-resolution PNG, PDF, and SVG files. All formats are print-ready at 300 DPI, perfect for professional printing.' },
  { q: 'Can I add my own logo?', a: 'Absolutely! Upload your logo in PNG, SVG, or JPG format. Our editor will automatically place it on your card, and you can adjust the size and position.' },
  { q: 'Is printing available?', a: 'We partner with premium print services to deliver high-quality cards to your door. Choose from matte, glossy, or textured finishes with fast shipping.' },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-1 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-[#00D4AA]' : 'text-white group-hover:text-[#00D4AA]'}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-[#00D4AA]' : 'text-[#8b929e]'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#8b929e] text-sm leading-relaxed pb-4 px-1">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#090b10] py-20 border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-2xl font-bold text-center mb-10 text-white">
          Frequently Asked <span className="text-gradient-accent">Questions</span>
        </h2>
        <div className="bg-[#111318] rounded-xl border border-white/[0.06] divide-y divide-white/[0.06] px-5">
          {FAQ_DATA.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
