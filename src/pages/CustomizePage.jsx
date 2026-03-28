import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, RotateCcw, Type, User, Phone, Mail, Globe, Building2,
  Palette, Layout, Rocket, Share2, ImagePlus, X, Upload, MapPin, RefreshCcw,
} from 'lucide-react';
import { TEMPLATES, getPersonForTemplate, getCompanyForTemplate } from '@/data/templates';
import PublishModal from '@/components/PublishModal';
import ShareModal from '@/components/ShareModal';

/* ─── Card Layout Renderers (large version) ─── */

function LogoBadge({ logoUrl, fallback, size = 52, borderRadius = '10px', border, bgColor, textColor, fontSize = '18px' }) {
  if (logoUrl) {
    return (
      <div style={{ width: `${size}px`, height: `${size}px`, borderRadius, border, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor || 'transparent' }}>
        <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    );
  }
  return (
    <div style={{ width: `${size}px`, height: `${size}px`, borderRadius, border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize, fontWeight: 800, color: textColor, backgroundColor: bgColor || 'transparent' }}>{fallback}</div>
  );
}

function LayoutStandard({ person, company, bg, accent, textColor, logoUrl }) {
  return (
    <div style={{ backgroundColor: bg, width: '100%', height: '100%', position: 'relative', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: accent }} />
      <div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', borderBottom: `2px solid ${accent}`, paddingBottom: '4px', display: 'inline-block' }}>{company}</div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '2px', textTransform: 'uppercase' }}>{person.name}</div>
        <div style={{ fontSize: '13px', color: textColor, opacity: 0.55, fontWeight: 500, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{person.title}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '12px', color: textColor, opacity: 0.45, lineHeight: 1.8 }}>
          <div>📱 {person.phone}</div>
          <div>✉ {person.email}</div>
          {person.web && <div>🌐 {person.web}</div>}
        </div>
        <LogoBadge logoUrl={logoUrl} fallback={person.initials} size={52} borderRadius="10px" border={`2px solid ${accent}`} textColor={accent} />
      </div>
    </div>
  );
}

function LayoutSplit({ person, company, bg, accent, textColor, logoUrl }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '32%', backgroundColor: accent, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '16px', color: bg, textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 800, lineHeight: 1.2 }}>{company}</div>
        <LogoBadge logoUrl={logoUrl} fallback={person.initials} size={44} borderRadius="50%" bgColor={bg} textColor={accent} fontSize="16px" />
      </div>
      <div style={{ flex: 1, backgroundColor: bg, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '12px', color: textColor, opacity: 0.5, marginTop: '3px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '11px', color: textColor, opacity: 0.4, lineHeight: 1.8 }}>
          <div>{person.phone}</div><div>{person.email}</div>
        </div>
      </div>
    </div>
  );
}

function LayoutCentered({ person, company, bg, accent, textColor, logoUrl }) {
  return (
    <div style={{ backgroundColor: bg, width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: accent }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: accent }} />
      <div style={{ fontSize: '16px', color: accent, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>{company}</div>
      <div style={{ marginBottom: '8px' }}>
        <LogoBadge logoUrl={logoUrl} fallback={person.initials} size={48} borderRadius="50%" border={`2px solid ${accent}`} textColor={accent} fontSize="16px" />
      </div>
      <div style={{ fontSize: '20px', fontWeight: 800, color: textColor, letterSpacing: '2px', textTransform: 'uppercase' }}>{person.name}</div>
      <div style={{ fontSize: '11px', color: textColor, opacity: 0.5, marginTop: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>{person.title}</div>
      <div style={{ width: '30px', height: '1px', backgroundColor: accent, margin: '10px 0', opacity: 0.3 }} />
      <div style={{ fontSize: '10px', color: textColor, opacity: 0.4 }}>{person.email}</div>
    </div>
  );
}

function LayoutSidebar({ person, company, bg, accent, textColor, logoUrl }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ flex: 1, backgroundColor: bg, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', borderBottom: `2px solid ${accent}`, paddingBottom: '4px', display: 'inline-block' }}>{company}</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: textColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{person.name}</div>
          <div style={{ fontSize: '12px', color: textColor, opacity: 0.5, marginTop: '3px', textTransform: 'uppercase' }}>{person.title}</div>
        </div>
        <div style={{ fontSize: '11px', color: textColor, opacity: 0.4, lineHeight: 1.8 }}>
          <div>{person.phone}</div><div>{person.email}</div>
        </div>
      </div>
      <div style={{ width: '28%', backgroundColor: accent, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LogoBadge logoUrl={logoUrl} fallback={person.initials} size={44} borderRadius="8px" bgColor={bg} textColor={accent} fontSize="16px" />
      </div>
    </div>
  );
}

/* ─── Color Presets ─── */
const COLOR_PRESETS = [
  { bg: '#1a1a2e', accent: '#e94560', text: '#ffffff' },
  { bg: '#0a0a0f', accent: '#00D4AA', text: '#ffffff' },
  { bg: '#ffffff', accent: '#1a1a2e', text: '#1a1a2e' },
  { bg: '#1a2744', accent: '#c8a96e', text: '#ffffff' },
  { bg: '#0a0a0a', accent: '#d4af37', text: '#ffffff' },
  { bg: '#4c1d95', accent: '#fbbf24', text: '#ffffff' },
  { bg: '#064e3b', accent: '#d1fae5', text: '#ffffff' },
  { bg: '#dc2626', accent: '#ffffff', text: '#ffffff' },
  { bg: '#f5f5f0', accent: '#1a1a2e', text: '#1a1a2e' },
  { bg: '#fdf2f8', accent: '#9d174d', text: '#9d174d' },
];

const LAYOUTS = [
  { id: 'standard', label: 'Standard' },
  { id: 'split', label: 'Split' },
  { id: 'centered', label: 'Centered' },
  { id: 'sidebar', label: 'Sidebar' },
];

/* ─── Input Field Component ─── */
function Field({ icon: Icon, label, value, onChange, placeholder, maxLength = 100 }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
        <Icon className="w-3 h-3" /> {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-[#141720] border border-white/[0.08] text-sm text-white px-3 py-2.5 rounded-lg outline-none focus:border-[#00D4AA]/40 placeholder-[#8b929e]/50 transition-colors"
      />
    </div>
  );
}

/* ─── Main Page ─── */
export default function CustomizePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cardRef = useRef(null);
  const logoInputRef = useRef(null);
  const templateId = Number(id);
  const template = TEMPLATES.find(t => t.id === templateId);

  // URL params from Hero
  const heroCompany = searchParams.get('company');
  const heroHasLogo = searchParams.get('logo') === '1';

  // Default person data from template
  const defaultPerson = template ? getPersonForTemplate(template.id) : {};
  const defaultCompany = template ? getCompanyForTemplate(template.id) : '';

  const [form, setForm] = useState({
    name: defaultPerson.name || '',
    title: defaultPerson.title || '',
    phone: defaultPerson.phone || '',
    email: defaultPerson.email || '',
    web: defaultPerson.web || '',
    company: heroCompany || defaultCompany,
  });
  const [bg, setBg] = useState(template?.preview.bg || '#0a0a0f');
  const [accent, setAccent] = useState(template?.preview.accent || '#00D4AA');
  const [textColor, setTextColor] = useState(template?.preview.textColor || '#ffffff');
  const [layout, setLayout] = useState(template?.preview.layout || 'standard');
  const [logoUrl, setLogoUrl] = useState(null);

  // UI state
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState('');
  const [showShare, setShowShare] = useState(false);

  const person = useMemo(() => ({
    name: form.name || 'Your Name',
    title: form.title || 'Your Title',
    phone: form.phone || '(555) 000-0000',
    email: form.email || 'you@example.com',
    web: form.web || 'yoursite.com',
    initials: (form.name || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
  }), [form]);

  const update = (field) => (val) => setForm(prev => ({ ...prev, [field]: val }));

  // Load logo from sessionStorage if redirected from Hero
  useEffect(() => {
    if (heroHasLogo) {
      try {
        const stored = sessionStorage.getItem('heroLogo');
        if (stored) {
          setLogoUrl(stored);
          sessionStorage.removeItem('heroLogo');
        }
      } catch {}
    }
  }, [heroHasLogo]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const resetToDefaults = () => {
    setForm({
      name: defaultPerson.name || '',
      title: defaultPerson.title || '',
      phone: defaultPerson.phone || '',
      email: defaultPerson.email || '',
      web: defaultPerson.web || '',
      company: defaultCompany,
    });
    setBg(template?.preview.bg || '#0a0a0f');
    setAccent(template?.preview.accent || '#00D4AA');
    setTextColor(template?.preview.textColor || '#ffffff');
    setLayout(template?.preview.layout || 'standard');
    setLogoUrl(null);
  };

  const handleDownload = () => {
    const el = cardRef.current;
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      const scale = 3;
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      const data = new XMLSerializer().serializeToString(el);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">${data}</div>
        </foreignObject>
      </svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const link = document.createElement('a');
        link.download = `${(form.name || 'card').replace(/\s+/g, '-').toLowerCase()}-business-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = url;
    } catch {
      alert('Unable to download. Please try again.');
    }
  };

  const handlePublished = (savedCard) => {
    setShowPublish(false);
    setPublishedSlug(savedCard.slug);
    setShowShare(true);
  };

  if (!template) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
        <p className="text-[#8b929e] text-sm mb-4">Template not found.</p>
        <Link to="/" className="text-[#00D4AA] text-sm font-medium hover:underline">← Back to templates</Link>
      </div>
    );
  }

  const previewProps = { person, company: form.company, bg, accent, textColor, logoUrl };
  const PreviewComponent = { standard: LayoutStandard, split: LayoutSplit, centered: LayoutCentered, sidebar: LayoutSidebar }[layout] || LayoutStandard;

  return (
    <>
    <div className="min-h-screen bg-[#090b10]">
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg border border-white/[0.08] hover:bg-white/5 transition-colors" aria-label="Go back">
              <ArrowLeft className="w-4 h-4 text-[#8b929e]" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Customize Card</h1>
              <p className="text-[#8b929e] text-xs mt-0.5">{template.title} • {template.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={resetToDefaults} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.08] text-[#8b929e] text-xs font-medium hover:bg-white/5 hover:text-white transition-all" aria-label="Reset to defaults">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={() => setShowPublish(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9d80ff] to-[#7c5ce0] hover:from-[#b09aff] hover:to-[#9d80ff] text-white text-xs font-bold transition-all shadow-lg shadow-[#9d80ff]/20">
              <Rocket className="w-3.5 h-3.5" /> Publish
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] text-xs font-bold transition-colors shadow-lg shadow-[#00D4AA]/20">
              <Download className="w-3.5 h-3.5" /> Download PNG
            </button>
          </div>
        </div>

        {/* Main grid: Editor + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          {/* Left: Editor Panel */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-[#111318] rounded-xl border border-white/[0.06] p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[#00D4AA]" /> Personal Info
              </h3>
              <div className="space-y-3">
                <Field icon={Type} label="Full Name" value={form.name} onChange={update('name')} placeholder="John Doe" />
                <Field icon={User} label="Job Title" value={form.title} onChange={update('title')} placeholder="Creative Director" />
                <Field icon={Building2} label="Company" value={form.company} onChange={update('company')} placeholder="Acme Inc." />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-[#111318] rounded-xl border border-white/[0.06] p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-[#00D4AA]" /> Logo
              </h3>
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              {logoUrl ? (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg border border-white/[0.1] overflow-hidden bg-[#141720] flex items-center justify-center">
                    <img src={logoUrl} alt="Logo preview" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#141720] border border-white/[0.08] text-[#8b929e] text-xs font-medium hover:text-white hover:border-white/[0.15] transition-all"
                    >
                      <Upload className="w-3 h-3" /> Change
                    </button>
                    <button
                      onClick={() => setLogoUrl(null)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/10 transition-all"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => logoInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleLogoDrop}
                  className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed border-white/[0.1] hover:border-[#00D4AA]/30 bg-[#141720]/50 cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center group-hover:bg-[#00D4AA]/20 transition-colors">
                    <Upload className="w-4 h-4 text-[#00D4AA]" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-[#8b929e] group-hover:text-white transition-colors">Click or drag & drop</p>
                    <p className="text-[10px] text-[#8b929e]/50 mt-0.5">PNG, JPG, SVG • Max 2MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="bg-[#111318] rounded-xl border border-white/[0.06] p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00D4AA]" /> Contact
              </h3>
              <div className="space-y-3">
                <Field icon={Phone} label="Phone" value={form.phone} onChange={update('phone')} placeholder="(555) 123-4567" />
                <Field icon={Mail} label="Email" value={form.email} onChange={update('email')} placeholder="you@company.com" />
                <Field icon={Globe} label="Website" value={form.web} onChange={update('web')} placeholder="yoursite.com" />
              </div>
            </div>

            {/* Colors */}
            <div className="bg-[#111318] rounded-xl border border-white/[0.06] p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#00D4AA]" /> Colors
              </h3>

              {/* Presets */}
              <p className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-2">Presets</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {COLOR_PRESETS.map((p, i) => (
                  <button key={i} onClick={() => { setBg(p.bg); setAccent(p.accent); setTextColor(p.text); }}
                    className="w-7 h-7 rounded-md border border-white/[0.1] hover:scale-110 transition-transform overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.accent} 50%)` }}
                    aria-label={`Color preset ${i + 1}`}
                  />
                ))}
              </div>

              {/* Custom pickers */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1 block">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-[10px] text-[#8b929e] font-mono">{bg}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1 block">Accent</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-[10px] text-[#8b929e] font-mono">{accent}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest mb-1 block">Text</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-[10px] text-[#8b929e] font-mono">{textColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout */}
            <div className="bg-[#111318] rounded-xl border border-white/[0.06] p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#00D4AA]" /> Layout
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUTS.map(l => (
                  <button key={l.id} onClick={() => setLayout(l.id)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      layout === l.id
                        ? 'bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30'
                        : 'bg-[#141720] text-[#8b929e] border border-white/[0.06] hover:text-white hover:border-white/[0.12]'
                    }`}
                    aria-pressed={layout === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div>
            <div className="sticky top-[80px]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#8b929e] uppercase tracking-widest">Live Preview</p>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141720] border border-white/[0.08] text-[#8b929e] text-[11px] font-bold uppercase tracking-wider hover:text-white hover:border-white/[0.15] hover:bg-white/5 transition-all"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Flip Card
                </button>
              </div>

              {/* 3D Card Container */}
              <div
                className="relative perspective-1000 w-full"
                style={{ aspectRatio: '1.75 / 1', maxWidth: '540px', margin: '0 auto' }}
              >
                <motion.div
                  className="w-full h-full preserve-3d"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 backface-hidden bg-[#111318] rounded-2xl border border-white/[0.06] p-8 shadow-2xl shadow-black/30"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div ref={cardRef} className="w-full h-full rounded-xl overflow-hidden shadow-xl shadow-black/40">
                      <PreviewComponent {...previewProps} />
                    </div>
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 backface-hidden bg-[#111318] rounded-2xl border border-white/[0.06] p-8 shadow-2xl shadow-black/30 flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden shadow-xl shadow-black/40" style={{ backgroundColor: accent }}>
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="max-w-[50%] max-h-[50%] object-contain" />
                        ) : (
                          <div className="text-4xl font-black tracking-[0.2em] uppercase" style={{ color: bg }}>
                            {person.initials}
                          </div>
                        )}
                        <div className="w-12 h-0.5 my-4 opacity-30" style={{ backgroundColor: bg }} />
                        <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-80" style={{ color: bg }}>
                          {form.company || 'Company'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Download */}
              <button onClick={handleDownload}
                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-colors shadow-lg shadow-[#00D4AA]/20"
              >
                <Download className="w-4 h-4" /> Download as PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Publish Modal */}
    <PublishModal
      isOpen={showPublish}
      onClose={() => setShowPublish(false)}
      form={form}
      bg={bg}
      accent={accent}
      textColor={textColor}
      layout={layout}
      templateId={template?.id}
      templateTitle={template?.title}
      onPublished={handlePublished}
    />

    {/* Share Modal (shown after publishing) */}
    <ShareModal
      isOpen={showShare}
      onClose={() => setShowShare(false)}
      cardUrl={publishedSlug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/card/${publishedSlug}` : ''}
      cardTitle={form.name}
    />
    </>
  );
}
