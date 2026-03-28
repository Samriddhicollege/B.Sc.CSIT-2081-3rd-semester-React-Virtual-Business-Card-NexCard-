import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPersonForTemplate, getCompanyForTemplate } from '@/data/templates';

const layoutStyles = {
  container: { width: '100%', height: '100%', fontFamily: "'Inter', sans-serif" },
};

function LayoutStandard({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ ...layoutStyles.container, backgroundColor: bg, position: 'relative', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', background: accent }} />
      <div>
        <div style={{ fontSize: '9px', fontWeight: 800, color: accent, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{company}</div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
        <div style={{ fontSize: '7px', color: textColor, opacity: 0.55, fontWeight: 500, marginTop: '1px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{person.title}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '6.5px', color: textColor, opacity: 0.4, lineHeight: 1.6 }}>
          <div>{person.phone}</div><div>{person.email}</div>
        </div>
        <div style={{ width: '26px', height: '26px', borderRadius: '5px', border: `1.5px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
    </div>
  );
}

function LayoutSplit({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ ...layoutStyles.container, display: 'flex' }}>
      <div style={{ width: '32%', backgroundColor: accent, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '9px', color: bg, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, lineHeight: 1.3 }}>{company}</div>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
      <div style={{ flex: 1, backgroundColor: bg, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: textColor, letterSpacing: '1px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '7px', color: textColor, opacity: 0.5, marginTop: '1px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '6px', color: textColor, opacity: 0.4, lineHeight: 1.6 }}>
          <div>{person.phone}</div><div>{person.email}</div>
        </div>
      </div>
    </div>
  );
}

function LayoutCentered({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ ...layoutStyles.container, backgroundColor: bg, padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: accent }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: accent }} />
      <div style={{ fontSize: '9px', color: accent, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '5px' }}>{company}</div>
      <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: `1.5px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: accent, marginBottom: '4px' }}>{person.initials}</div>
      <div style={{ fontSize: '10px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
      <div style={{ fontSize: '6px', color: textColor, opacity: 0.5, marginTop: '1px', textTransform: 'uppercase', letterSpacing: '1px' }}>{person.title}</div>
      <div style={{ width: '20px', height: '1px', backgroundColor: accent, margin: '5px 0', opacity: 0.3 }} />
      <div style={{ fontSize: '5.5px', color: textColor, opacity: 0.4 }}>{person.email}</div>
    </div>
  );
}

function LayoutSidebar({ person, company, bg, accent, textColor }) {
  return (
    <div style={{ ...layoutStyles.container, display: 'flex' }}>
      <div style={{ flex: 1, backgroundColor: bg, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, color: accent, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3px' }}>{company}</div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: textColor, letterSpacing: '1px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '7px', color: textColor, opacity: 0.5, marginTop: '1px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '6px', color: textColor, opacity: 0.4, lineHeight: 1.6 }}>
          <div>{person.phone}</div><div>{person.email}</div>
        </div>
      </div>
      <div style={{ width: '28%', backgroundColor: accent, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '5px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800, color: accent }}>{person.initials}</div>
      </div>
    </div>
  );
}

const CardPreview = memo(function CardPreview({ template, businessName }) {
  const person = useMemo(() => {
    const p = { ...getPersonForTemplate(template.id) };
    if (businessName) p.name = businessName;
    return p;
  }, [template.id, businessName]);

  const company = getCompanyForTemplate(template.id);
  const { bg, accent, textColor, layout } = template.preview;
  const props = { person, company, bg, accent, textColor };

  switch (layout) {
    case 'split': return <LayoutSplit {...props} />;
    case 'centered': return <LayoutCentered {...props} />;
    case 'sidebar': return <LayoutSidebar {...props} />;
    default: return <LayoutStandard {...props} />;
  }
});

const TemplateCard = memo(function TemplateCard({ template, businessName, isLiked, onToggleLike, onSelect }) {
  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '1.75 / 1', background: '#181b22' }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onSelect?.(template)}
    >
      <div className="w-full h-full"><CardPreview template={template} businessName={businessName} /></div>

      {template.isFree && (
        <div className="absolute top-2 left-2 bg-[#00D4AA] text-[#090b10] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">FREE</div>
      )}

      <button
        className="absolute top-2 right-2 p-1 rounded bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        onClick={(e) => { e.stopPropagation(); onToggleLike?.(template.id); }}
        aria-label={isLiked ? `Unlike ${template.title}` : `Like ${template.title}`}
      >
        <Heart className={`w-3 h-3 ${isLiked ? 'fill-[#00D4AA] text-[#00D4AA]' : 'text-white/40'}`} />
      </button>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150" onClick={(e) => e.stopPropagation()}>
        <Link to={`/customize/${template.id}`} className="bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold uppercase tracking-wider text-[11px] px-5 py-2 rounded-md transition-colors transform scale-95 group-hover:scale-100 transition-transform duration-150">
          Customize
        </Link>
      </div>

      <div className="absolute inset-0 rounded-lg pointer-events-none border border-white/[0.04] group-hover:border-[#00D4AA] transition-colors duration-150" />
    </motion.div>
  );
});

export default TemplateCard;
