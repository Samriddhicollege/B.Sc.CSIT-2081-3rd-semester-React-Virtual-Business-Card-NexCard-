import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check, X, Sparkles, Zap, Crown, ArrowRight, Star, Shield, Users, Infinity,
  Download, Palette, Layers, Globe, Headphones,
} from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Get started with the basics',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    accent: '#8b929e',
    popular: false,
    cta: 'Start Free',
    ctaHref: '/',
    features: [
      { text: '3 business card designs', included: true },
      { text: 'Basic templates', included: true },
      { text: 'PNG download', included: true },
      { text: '1 virtual card', included: true },
      { text: 'QR code sharing', included: true },
      { text: 'NexCard watermark', included: true, note: 'watermark' },
      { text: 'Custom colors & layouts', included: false },
      { text: 'Priority support', included: false },
      { text: 'Team collaboration', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For professionals & freelancers',
    icon: Sparkles,
    monthlyPrice: 12,
    yearlyPrice: 8,
    accent: '#00D4AA',
    popular: true,
    cta: 'Upgrade to Pro',
    ctaHref: '/login',
    features: [
      { text: 'Unlimited card designs', included: true },
      { text: 'All premium templates', included: true },
      { text: 'High-res PNG & PDF export', included: true },
      { text: 'Unlimited virtual cards', included: true },
      { text: 'QR code + vCard sharing', included: true },
      { text: 'No watermark', included: true },
      { text: 'Custom colors & layouts', included: true },
      { text: 'Priority support', included: true },
      { text: 'Team collaboration', included: false },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams & agencies',
    icon: Crown,
    monthlyPrice: 29,
    yearlyPrice: 19,
    accent: '#9d80ff',
    popular: false,
    cta: 'Contact Sales',
    ctaHref: '#',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Custom brand kit', included: true },
      { text: 'Bulk card generation', included: true },
      { text: 'Unlimited virtual cards', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'No watermark', included: true },
      { text: 'Custom domain for cards', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Team collaboration (5 seats)', included: true },
    ],
  },
];

const TRUST_STATS = [
  { icon: Users, value: '10,000+', label: 'Active users' },
  { icon: Layers, value: '1M+', label: 'Cards created' },
  { icon: Star, value: '4.9/5', label: 'User rating' },
  { icon: Globe, value: '50+', label: 'Countries' },
];

const FAQS = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Absolutely — you get 7 days of Pro features free when you sign up. No credit card required.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, and bank transfers for annual Business plans.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: "Yes, cancel anytime from your account settings. You'll keep Pro access until the end of your billing period.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#090b10]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,_rgba(0,212,170,0.06)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(157,128,255,0.04)_0%,_transparent_70%)]" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-5 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-full px-3.5 py-1 mb-5">
            <Sparkles className="w-3 h-3 text-[#00D4AA]" />
            <span className="text-[#00D4AA] text-[11px] font-semibold uppercase tracking-widest">Simple Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Choose Your <span className="bg-gradient-to-r from-[#00D4AA] to-[#00E8BC] bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-[#8b929e] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Start free, upgrade when you're ready. All plans include core features to create stunning business cards.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-[#111318] border border-white/[0.06] rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                !isYearly
                  ? 'bg-white text-[#090b10] shadow-lg'
                  : 'text-[#8b929e] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                isYearly
                  ? 'bg-white text-[#090b10] shadow-lg'
                  : 'text-[#8b929e] hover:text-white'
              }`}
            >
              Yearly
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isYearly ? 'bg-[#00D4AA] text-[#090b10]' : 'bg-[#00D4AA]/20 text-[#00D4AA]'
              }`}>
                -33%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular
                    ? 'border-2 border-[#00D4AA]/40 shadow-2xl shadow-[#00D4AA]/10'
                    : 'border border-white/[0.08]'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D4AA] to-[#00E8BC]" />
                )}

                <div className={`p-7 ${plan.popular ? 'bg-[#0f1218]' : 'bg-[#111318]'}`}>
                  {/* Plan header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${plan.accent}15`, border: `1px solid ${plan.accent}25` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: plan.accent }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">{plan.name}</h3>
                        <p className="text-[#8b929e] text-[11px]">{plan.tagline}</p>
                      </div>
                    </div>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/20 px-2.5 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        ${price}
                      </span>
                      {price > 0 && (
                        <span className="text-[#8b929e] text-sm font-medium mb-1">
                          /mo
                        </span>
                      )}
                    </div>
                    {price > 0 && isYearly && (
                      <p className="text-[#8b929e] text-[11px] mt-1">
                        Billed ${price * 12}/year · <span className="text-[#00D4AA] font-semibold">Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr</span>
                      </p>
                    )}
                    {price === 0 && (
                      <p className="text-[#8b929e] text-[11px] mt-1">Free forever, no credit card</p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    to={plan.ctaHref}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-7 ${
                      plan.popular
                        ? 'bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] shadow-lg shadow-[#00D4AA]/20'
                        : plan.id === 'business'
                          ? 'bg-[#9d80ff]/15 hover:bg-[#9d80ff]/25 text-[#9d80ff] border border-[#9d80ff]/25'
                          : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feat, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${plan.accent}20` }}>
                            <Check className="w-2.5 h-2.5" style={{ color: plan.accent }} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/[0.04]">
                            <X className="w-2.5 h-2.5 text-[#5c6370]" />
                          </div>
                        )}
                        <span className={`text-xs leading-relaxed ${feat.included ? 'text-[#c0c5ce]' : 'text-[#5c6370]'}`}>
                          {feat.text}
                          {feat.note && <span className="text-[10px] text-[#8b929e] ml-1">({feat.note})</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {TRUST_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#111318] border border-white/[0.06] rounded-xl p-5 text-center">
                <Icon className="w-5 h-5 text-[#00D4AA] mx-auto mb-2.5" />
                <div className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-[#8b929e] font-medium uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-extrabold text-white text-center mb-2">Why Go Pro?</h2>
          <p className="text-[#8b929e] text-sm text-center mb-8 max-w-md mx-auto">Unlock the full power of NexCard and stand out from the crowd.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Infinity, title: 'Unlimited Designs', desc: 'Create as many cards as you need, no limits.' },
              { icon: Download, title: 'High-Res Export', desc: 'Download in PNG, PDF, and SVG formats.' },
              { icon: Palette, title: 'Full Customization', desc: 'Custom colors, fonts, layouts, and more.' },
              { icon: Globe, title: 'Virtual Cards', desc: 'Shareable digital cards with QR codes.' },
              { icon: Shield, title: 'No Watermark', desc: 'Clean, professional output every time.' },
              { icon: Headphones, title: 'Priority Support', desc: '24/7 support from our design experts.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#111318] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors group">
                  <Icon className="w-5 h-5 text-[#00D4AA] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-[#8b929e] text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-2xl font-extrabold text-white text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-[#8b929e] text-sm text-center mb-8">Everything you need to know about our plans.</p>

          <div className="space-y-2.5">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-[#111318] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                    <span className="text-[#8b929e] text-sm font-bold leading-none">+</span>
                  </div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-[#8b929e] text-xs leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-gradient-to-br from-[#111318] to-[#0d0f14] border border-white/[0.08] rounded-2xl px-8 py-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,212,170,0.06)_0%,_transparent_60%)] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Create?</h2>
            <p className="text-[#8b929e] text-sm mb-6 max-w-md mx-auto">Join thousands of professionals who trust NexCard for their business identity.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-all shadow-lg shadow-[#00D4AA]/25 hover:shadow-[#00D4AA]/40"
            >
              Start Designing for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
