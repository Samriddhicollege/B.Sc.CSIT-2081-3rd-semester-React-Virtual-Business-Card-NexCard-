// Varied sample people for realistic previews
const PEOPLE = [
  { name: 'Sarah Mitchell', title: 'CEO & Founder', phone: '(555) 012-3456', email: 'sarah@mitchellco.com', web: 'mitchellco.com', initials: 'SM' },
  { name: 'James Park', title: 'Lead Designer', phone: '(555) 234-5678', email: 'james@parkdesign.co', web: 'parkdesign.co', initials: 'JP' },
  { name: 'Maya Chen', title: 'Creative Director', phone: '(555) 345-6789', email: 'maya@chenarts.io', web: 'chenarts.io', initials: 'MC' },
  { name: 'Alex Rivera', title: 'Marketing Manager', phone: '(555) 456-7890', email: 'alex@riveramkt.com', web: 'riveramkt.com', initials: 'AR' },
  { name: 'David Kim', title: 'Software Engineer', phone: '(555) 567-8901', email: 'david@kimtech.dev', web: 'kimtech.dev', initials: 'DK' },
  { name: 'Lisa Wang', title: 'Product Manager', phone: '(555) 678-9012', email: 'lisa@wangpm.co', web: 'wangpm.co', initials: 'LW' },
  { name: 'Omar Hassan', title: 'Photographer', phone: '(555) 789-0123', email: 'omar@hassanlens.com', web: 'hassanlens.com', initials: 'OH' },
  { name: 'Emily Brooks', title: 'Architect', phone: '(555) 890-1234', email: 'emily@brooksarch.com', web: 'brooksarch.com', initials: 'EB' },
  { name: 'Ryan Foster', title: 'Financial Advisor', phone: '(555) 901-2345', email: 'ryan@fosterfa.com', web: 'fosterfa.com', initials: 'RF' },
  { name: 'Natalie Cruz', title: 'Interior Designer', phone: '(555) 321-6540', email: 'nat@cruzinteriors.co', web: 'cruzinteriors.co', initials: 'NC' },
  { name: 'Tom Bradley', title: 'Real Estate Agent', phone: '(555) 432-7651', email: 'tom@bradleyrealty.com', web: 'bradleyrealty.com', initials: 'TB' },
  { name: 'Zara Patel', title: 'UX Researcher', phone: '(555) 543-8762', email: 'zara@patelux.io', web: 'patelux.io', initials: 'ZP' },
  { name: 'Chris Morgan', title: 'Fitness Coach', phone: '(555) 654-9873', email: 'chris@morganfit.com', web: 'morganfit.com', initials: 'CM' },
  { name: 'Isabella Torres', title: 'Chef & Owner', phone: '(555) 765-0984', email: 'bella@torrescuisine.com', web: 'torrescuisine.com', initials: 'IT' },
  { name: 'Kevin Zhang', title: 'Data Scientist', phone: '(555) 876-1095', email: 'kevin@zhangdata.ai', web: 'zhangdata.ai', initials: 'KZ' },
];

// Logo company names for variety
const COMPANIES = [
  'NEXUS STUDIO', 'APEX GROUP', 'VORTEX MEDIA', 'PINNACLE INC.', 'EMBER DESIGN',
  'FLUX CREATIVE', 'ZENITH CO.', 'PRISM LABS', 'CIPHER TECH', 'ATLAS VENTURES',
  'SOLARIS DIGITAL', 'ONYX BRAND', 'COBALT SYSTEMS', 'NOVA INTERACTIVE', 'DRIFT AGENCY',
];

// Mock dataset with 30 business card templates
export const TEMPLATES = [
  {
    id: 1, title: 'Classic Professional', category: 'professional',
    colors: ['#1a1a2e', '#ffffff'], tags: ['minimal', 'professional', 'corporate'], isFree: false,
    preview: { bg: '#f5f5f0', accent: '#1a1a2e', textColor: '#1a1a2e', style: 'classic-left', layout: 'standard' },
  },
  {
    id: 2, title: 'Modern Minimal', category: 'modern',
    colors: ['#ffffff', '#2d3748'], tags: ['modern', 'minimal', 'clean'], isFree: false,
    preview: { bg: '#ffffff', accent: '#4a5568', textColor: '#1a1a2e', style: 'modern-split', layout: 'split' },
  },
  {
    id: 3, title: 'Dark Navy', category: 'luxury',
    colors: ['#1a2744', '#c8a96e'], tags: ['luxury', 'navy', 'dark'], isFree: false,
    preview: { bg: '#1a2744', accent: '#c8a96e', textColor: '#ffffff', style: 'dark-elegant', layout: 'centered' },
  },
  {
    id: 4, title: 'Dark Stylish', category: 'modern',
    colors: ['#2d2d2d', '#e0e0e0'], tags: ['dark', 'stylish', 'bold'], isFree: false,
    preview: { bg: '#2d2d2d', accent: '#e0e0e0', textColor: '#ffffff', style: 'dark-wave', layout: 'sidebar' },
  },
  {
    id: 5, title: 'Blue Geometric', category: 'creative',
    colors: ['#2b4590', '#ffffff'], tags: ['blue', 'geometric', 'bold'], isFree: false,
    preview: { bg: '#2b4590', accent: '#ffffff', textColor: '#ffffff', style: 'blue-geo', layout: 'standard' },
  },
  {
    id: 6, title: 'Clean Corporate', category: 'professional',
    colors: ['#ffffff', '#1e3a8a'], tags: ['corporate', 'clean', 'blue'], isFree: true,
    preview: { bg: '#f8fafc', accent: '#1e3a8a', textColor: '#1e293b', style: 'clean-right', layout: 'split' },
  },
  {
    id: 7, title: 'Vintage Classic', category: 'vintage',
    colors: ['#f5e6c8', '#5c3d11'], tags: ['vintage', 'retro', 'classic'], isFree: false,
    preview: { bg: '#f5e6c8', accent: '#5c3d11', textColor: '#5c3d11', style: 'vintage', layout: 'centered' },
  },
  {
    id: 8, title: 'Bold Red', category: 'bold',
    colors: ['#dc2626', '#ffffff'], tags: ['bold', 'red', 'impactful'], isFree: false,
    preview: { bg: '#dc2626', accent: '#ffffff', textColor: '#ffffff', style: 'bold-red', layout: 'sidebar' },
  },
  {
    id: 9, title: 'Minimal White', category: 'minimal',
    colors: ['#ffffff', '#111827'], tags: ['minimal', 'white', 'clean'], isFree: true,
    preview: { bg: '#ffffff', accent: '#111827', textColor: '#111827', style: 'minimal-white', layout: 'standard' },
  },
  {
    id: 10, title: 'Purple Luxury', category: 'luxury',
    colors: ['#4c1d95', '#fbbf24'], tags: ['luxury', 'purple', 'gold'], isFree: false,
    preview: { bg: '#4c1d95', accent: '#fbbf24', textColor: '#ffffff', style: 'purple-luxury', layout: 'centered' },
  },
  {
    id: 11, title: 'Green Nature', category: 'creative',
    colors: ['#064e3b', '#d1fae5'], tags: ['green', 'nature', 'organic'], isFree: false,
    preview: { bg: '#064e3b', accent: '#d1fae5', textColor: '#ffffff', style: 'green-nature', layout: 'split' },
  },
  {
    id: 12, title: 'Teal Modern', category: 'modern',
    colors: ['#0f766e', '#ffffff'], tags: ['teal', 'modern', 'fresh'], isFree: false,
    preview: { bg: '#0f766e', accent: '#ffffff', textColor: '#ffffff', style: 'teal-modern', layout: 'sidebar' },
  },
  {
    id: 13, title: 'Rose Gold', category: 'luxury',
    colors: ['#fef2f2', '#9f1239'], tags: ['rose', 'gold', 'elegant'], isFree: false,
    preview: { bg: '#fff1f2', accent: '#9f1239', textColor: '#9f1239', style: 'rose-gold', layout: 'standard' },
  },
  {
    id: 14, title: 'Black Gold', category: 'luxury',
    colors: ['#000000', '#d4af37'], tags: ['black', 'gold', 'premium'], isFree: false,
    preview: { bg: '#0a0a0a', accent: '#d4af37', textColor: '#ffffff', style: 'black-gold', layout: 'centered' },
  },
  {
    id: 15, title: 'Slate Gray', category: 'professional',
    colors: ['#475569', '#f1f5f9'], tags: ['gray', 'professional', 'neutral'], isFree: false,
    preview: { bg: '#475569', accent: '#f1f5f9', textColor: '#ffffff', style: 'slate-gray', layout: 'split' },
  },
  {
    id: 16, title: 'Ocean Blue', category: 'creative',
    colors: ['#0369a1', '#e0f2fe'], tags: ['ocean', 'blue', 'fresh'], isFree: false,
    preview: { bg: '#0369a1', accent: '#e0f2fe', textColor: '#ffffff', style: 'ocean-blue', layout: 'sidebar' },
  },
  {
    id: 17, title: 'Warm Orange', category: 'bold',
    colors: ['#ea580c', '#ffffff'], tags: ['orange', 'warm', 'energetic'], isFree: false,
    preview: { bg: '#ea580c', accent: '#ffffff', textColor: '#ffffff', style: 'warm-orange', layout: 'standard' },
  },
  {
    id: 18, title: 'Indigo Split', category: 'modern',
    colors: ['#4338ca', '#ffffff'], tags: ['indigo', 'split', 'modern'], isFree: false,
    preview: { bg: '#4338ca', accent: '#ffffff', textColor: '#ffffff', style: 'indigo-split', layout: 'split' },
  },
  {
    id: 19, title: 'Beige Earthy', category: 'minimal',
    colors: ['#d4c5a9', '#5c4a2a'], tags: ['beige', 'earth', 'natural'], isFree: false,
    preview: { bg: '#d4c5a9', accent: '#5c4a2a', textColor: '#5c4a2a', style: 'beige-earthy', layout: 'centered' },
  },
  {
    id: 20, title: 'Sky Fresh', category: 'creative',
    colors: ['#bae6fd', '#0c4a6e'], tags: ['sky', 'light', 'airy'], isFree: true,
    preview: { bg: '#e0f2fe', accent: '#0c4a6e', textColor: '#0c4a6e', style: 'sky-fresh', layout: 'standard' },
  },
  {
    id: 21, title: 'Charcoal Bold', category: 'bold',
    colors: ['#1c1917', '#fafaf9'], tags: ['charcoal', 'bold', 'strong'], isFree: false,
    preview: { bg: '#1c1917', accent: '#fafaf9', textColor: '#ffffff', style: 'charcoal-bold', layout: 'sidebar' },
  },
  {
    id: 22, title: 'Coral Fun', category: 'creative',
    colors: ['#f43f5e', '#ffffff'], tags: ['coral', 'fun', 'vibrant'], isFree: false,
    preview: { bg: '#f43f5e', accent: '#ffffff', textColor: '#ffffff', style: 'coral-fun', layout: 'split' },
  },
  {
    id: 23, title: 'Mint Fresh', category: 'minimal',
    colors: ['#d1fae5', '#065f46'], tags: ['mint', 'fresh', 'clean'], isFree: false,
    preview: { bg: '#ecfdf5', accent: '#065f46', textColor: '#065f46', style: 'mint-fresh', layout: 'centered' },
  },
  {
    id: 24, title: 'Deep Violet', category: 'luxury',
    colors: ['#2e1065', '#e9d5ff'], tags: ['violet', 'deep', 'luxurious'], isFree: false,
    preview: { bg: '#2e1065', accent: '#e9d5ff', textColor: '#ffffff', style: 'deep-violet', layout: 'standard' },
  },
  {
    id: 25, title: 'Warm Cream', category: 'vintage',
    colors: ['#fef9ef', '#78350f'], tags: ['cream', 'warm', 'vintage'], isFree: false,
    preview: { bg: '#fef9ef', accent: '#78350f', textColor: '#78350f', style: 'warm-cream', layout: 'split' },
  },
  {
    id: 26, title: 'Bright Yellow', category: 'bold',
    colors: ['#facc15', '#1c1917'], tags: ['yellow', 'bright', 'bold'], isFree: false,
    preview: { bg: '#fefce8', accent: '#1c1917', textColor: '#1c1917', style: 'bright-yellow', layout: 'sidebar' },
  },
  {
    id: 27, title: 'Frosted Glass', category: 'modern',
    colors: ['#e2e8f0', '#3b82f6'], tags: ['frosted', 'glass', 'modern'], isFree: false,
    preview: { bg: '#f8fafc', accent: '#3b82f6', textColor: '#1e293b', style: 'frosted-glass', layout: 'centered' },
  },
  {
    id: 28, title: 'Dark Forest', category: 'vintage',
    colors: ['#14532d', '#f0fdf4'], tags: ['forest', 'dark', 'green'], isFree: false,
    preview: { bg: '#14532d', accent: '#f0fdf4', textColor: '#ffffff', style: 'dark-forest', layout: 'standard' },
  },
  {
    id: 29, title: 'Pink Blossom', category: 'creative',
    colors: ['#fce7f3', '#9d174d'], tags: ['pink', 'blossom', 'feminine'], isFree: false,
    preview: { bg: '#fdf2f8', accent: '#9d174d', textColor: '#9d174d', style: 'pink-blossom', layout: 'split' },
  },
  {
    id: 30, title: 'Gray Gradient', category: 'professional',
    colors: ['#9ca3af', '#111827'], tags: ['gradient', 'gray', 'professional'], isFree: false,
    preview: { bg: '#f9fafb', accent: '#374151', textColor: '#111827', style: 'gray-gradient', layout: 'sidebar' },
  },
];

// Helper to get varied person data for a template
export function getPersonForTemplate(templateId) {
  return PEOPLE[templateId % PEOPLE.length];
}

export function getCompanyForTemplate(templateId) {
  return COMPANIES[templateId % COMPANIES.length];
}

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'creative', label: 'Creative' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'bold', label: 'Bold' },
  { id: 'vintage', label: 'Vintage' },
];
