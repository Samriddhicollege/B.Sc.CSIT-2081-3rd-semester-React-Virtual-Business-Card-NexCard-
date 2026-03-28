import { getPersonForTemplate, getCompanyForTemplate, TEMPLATES } from '@/data/templates';

// Phone mockup card — simulating a digital vCard in a phone frame
function PhoneCard({ template }) {
  const person = getPersonForTemplate(template.id);
  const company = getCompanyForTemplate(template.id);
  const { bg, accent, textColor } = template.preview;

  // Generate a cover gradient based on the accent color
  const coverGradient = `linear-gradient(135deg, ${accent}dd, ${accent}88)`;

  return (
    <div className="w-[220px] shrink-0 mx-3">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-[#111318]"
        style={{
          height: '380px',
          transform: 'perspective(1200px) rotateY(-5deg)',
          transition: 'transform 0.4s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg) scale(1.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(1200px) rotateY(-5deg)'; }}
      >
        {/* Phone status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-black/30">
          <span className="text-[8px] text-white/50 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-1.5 rounded-sm border border-white/40" />
          </div>
        </div>

        {/* Cover image area */}
        <div className="h-[90px] relative overflow-hidden" style={{ background: coverGradient }}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
          }} />
          {/* Language badge like vcardline */}
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded px-1.5 py-0.5">
            <span className="text-[7px] text-white font-bold">EN ▾</span>
          </div>
        </div>

        {/* Profile area */}
        <div className="relative px-4 pb-3">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full -mt-7 border-3 border-[#111318] mx-auto flex items-center justify-center text-lg font-bold shadow-lg"
            style={{ backgroundColor: accent, color: bg, borderWidth: '3px', borderColor: '#111318' }}>
            {person.initials}
          </div>

          <div className="text-center mt-2">
            <h3 className="text-white font-bold text-sm leading-tight">{person.name}</h3>
            <p className="text-[10px] font-medium mt-0.5" style={{ color: accent }}>{person.title}</p>
          </div>

          <p className="text-[8px] text-[#a0a8b8] text-center mt-2 leading-relaxed px-2">
            {person.name.split(' ')[0]} is a skilled {person.title.toLowerCase()}, dedicated to delivering exceptional results.
          </p>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {['f', 'in', '@', '✆'].map((icon, i) => (
              <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: `${accent}22`, color: accent, border: `1px solid ${accent}33` }}>
                {icon}
              </div>
            ))}
          </div>

          {/* Address card */}
          <div className="mt-3 rounded-lg p-2.5 border border-white/[0.06]" style={{ backgroundColor: `${accent}10` }}>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: accent }}>
                <span className="text-[8px] font-bold" style={{ color: bg }}>📍</span>
              </div>
              <div>
                <div className="text-[8px] font-bold text-white">Address</div>
                <div className="text-[7px] text-[#a0a8b8] leading-relaxed mt-0.5">{person.web}</div>
              </div>
            </div>
          </div>

          {/* Company footer */}
          <div className="mt-3 pt-2 border-t border-white/[0.06] text-center">
            <span className="text-[7px] text-[#5c6370] uppercase tracking-widest font-bold">{company}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeShowcase() {
  // Use first 10 templates for the showcase
  const showcaseTemplates = TEMPLATES.slice(0, 10);
  const cards = [...showcaseTemplates, ...showcaseTemplates]; // duplicate for seamless loop

  return (
    <section className="bg-[#090b10] py-20 border-t border-white/[0.05] overflow-hidden">
      <div className="text-center mb-12 max-w-[1200px] mx-auto px-5">
        <span className="text-[#00D4AA] text-xs font-semibold uppercase tracking-widest">Themes</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
          Find Your Perfect <span className="text-gradient-accent">Theme</span>
        </h2>
        <p className="text-[#5c6370] text-xs uppercase tracking-[3px] font-medium max-w-lg mx-auto">
          Personalize your digital identity with our stunning collection
        </p>
      </div>

      {/* Horizontal auto-scroll marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090b10] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090b10] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-horizontal hover:[animation-play-state:paused]">
          {cards.map((template, i) => (
            <PhoneCard key={`theme-${i}`} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
