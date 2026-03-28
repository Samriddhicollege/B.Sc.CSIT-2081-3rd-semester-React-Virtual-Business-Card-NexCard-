import { getPersonForTemplate, getCompanyForTemplate, TEMPLATES } from '@/data/templates';

// Miniature card renderers for the marquee
function MiniCardStandard({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ backgroundColor: bg, width: '100%', height: '100%', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent }} />
      <div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
        <div style={{ fontSize: '9px', color: textColor, opacity: 0.5, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{person.title}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '8px', color: textColor, opacity: 0.4, lineHeight: 1.7 }}>
          <div>{person.phone}</div>
          <div>{person.email}</div>
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '6px', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
      <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '6px', color: accent, opacity: 0.45, textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>{company}</div>
    </div>
  );
}

function MiniCardSplit({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '32%', backgroundColor: accent, padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '6px', color: bg, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{company}</div>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
      <div style={{ flex: 1, backgroundColor: bg, padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: textColor, letterSpacing: '1px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '8px', color: textColor, opacity: 0.5, marginTop: '2px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '7px', color: textColor, opacity: 0.4, lineHeight: 1.6 }}>
          <div>{person.phone}</div>
          <div>{person.email}</div>
        </div>
      </div>
    </div>
  );
}

function MiniCardCentered({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ backgroundColor: bg, width: '100%', height: '100%', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: accent }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: accent }} />
      <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: accent, marginBottom: '5px' }}>{person.initials}</div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
      <div style={{ fontSize: '7px', color: textColor, opacity: 0.5, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>{person.title}</div>
      <div style={{ width: '20px', height: '1px', backgroundColor: accent, margin: '6px 0', opacity: 0.3 }} />
      <div style={{ fontSize: '6.5px', color: textColor, opacity: 0.4 }}>{person.email}</div>
      <div style={{ position: 'absolute', bottom: '8px', fontSize: '5px', color: accent, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>{company}</div>
    </div>
  );
}

function MiniCardSidebar({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ flex: 1, backgroundColor: bg, padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: textColor, letterSpacing: '1px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '8px', color: textColor, opacity: 0.5, marginTop: '2px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '7px', color: textColor, opacity: 0.4, lineHeight: 1.6 }}>
          <div>{person.phone}</div>
          <div>{person.email}</div>
        </div>
      </div>
      <div style={{ width: '28%', backgroundColor: accent, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '5px', color: bg, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, textAlign: 'center' }}>{company}</div>
        <div style={{ width: '26px', height: '26px', borderRadius: '5px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
    </div>
  );
}

function MarqueeCard({ template }) {
  const person = getPersonForTemplate(template.id);
  const company = getCompanyForTemplate(template.id);
  const { bg, accent, textColor, layout } = template.preview;
  const props = { person, company, bg, accent, textColor };

  return (
    <div className="w-[300px] shrink-0 rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.06]"
      style={{ aspectRatio: '1.75 / 1' }}>
      {layout === 'split' ? <MiniCardSplit {...props} /> :
       layout === 'centered' ? <MiniCardCentered {...props} /> :
       layout === 'sidebar' ? <MiniCardSidebar {...props} /> :
       <MiniCardStandard {...props} />}
    </div>
  );
}

export default function CardMarquee() {
  // Split templates into two columns
  const col1Templates = TEMPLATES.filter((_, i) => i % 2 === 0);
  const col2Templates = TEMPLATES.filter((_, i) => i % 2 === 1);

  return (
    <div className="relative h-[500px] w-[640px] overflow-hidden shrink-0">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#090b10] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#090b10] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3 h-full" style={{ perspective: '1200px' }}>
        {/* Column 1 — scrolls UP */}
        <div className="flex-1 overflow-hidden" style={{ transform: 'rotateY(-8deg)', transformOrigin: 'center center' }}>
          <div className="flex flex-col gap-3 animate-scroll-up">
            {[...col1Templates, ...col1Templates].map((t, i) => (
              <MarqueeCard key={`c1-${i}`} template={t} />
            ))}
          </div>
        </div>

        {/* Column 2 — scrolls DOWN */}
        <div className="flex-1 overflow-hidden" style={{ transform: 'rotateY(-8deg)', transformOrigin: 'center center' }}>
          <div className="flex flex-col gap-3 animate-scroll-down">
            {[...col2Templates, ...col2Templates].map((t, i) => (
              <MarqueeCard key={`c2-${i}`} template={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
