import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const STORAGE_KEY = 'nexcard-published-cards';

/* ─── Helpers: check if Supabase is configured ─── */
function isSupabaseConfigured() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url-here' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here'
  );
}

/* ─── localStorage fallback (for offline / no-Supabase mode) ─── */

function getAllCardsLocal() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getCardBySlugLocal(slug) {
  return getAllCardsLocal().find((c) => c.slug === slug) || null;
}

function saveCardLocal(cardData) {
  const cards = getAllCardsLocal();
  const existingIdx = cards.findIndex((c) => c.slug === cardData.slug);
  const card = { ...cardData, updatedAt: new Date().toISOString() };
  if (existingIdx >= 0) {
    cards[existingIdx] = { ...cards[existingIdx], ...card };
  } else {
    card.createdAt = card.updatedAt;
    card.views = 0;
    cards.push(card);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  return card;
}

function deleteCardLocal(slug) {
  const cards = getAllCardsLocal().filter((c) => c.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function incrementViewsLocal(slug) {
  const cards = getAllCardsLocal();
  const card = cards.find((c) => c.slug === slug);
  if (card) {
    card.views = (card.views || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
}

/* ─── Supabase-powered functions ─── */

/**
 * Get all published cards for the current user
 */
export async function getAllCards() {
  if (!isSupabaseConfigured()) return getAllCardsLocal();

  const supabase = getSupabaseBrowserClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return getAllCardsLocal(); // Fallback for unauthenticated

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cards:', error);
    return getAllCardsLocal();
  }

  return (data || []).map(mapSupabaseCard);
}

/**
 * Get a single card by slug (public — no auth required)
 */
export async function getCardBySlug(slug) {
  if (!isSupabaseConfigured()) return getCardBySlugLocal(slug);

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return getCardBySlugLocal(slug);

  return mapSupabaseCard(data);
}

/**
 * Generate a URL-safe slug from a name
 */
export async function generateSlug(name) {
  const base = (name || 'my-card')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!isSupabaseConfigured()) {
    // localStorage fallback
    const cards = getAllCardsLocal();
    let slug = base;
    let counter = 1;
    while (cards.some((c) => c.slug === slug)) {
      slug = `${base}-${counter}`;
      counter++;
    }
    return slug;
  }

  const supabase = getSupabaseBrowserClient();
  let slug = base;
  let counter = 1;

  // Check uniqueness on Supabase
  while (true) {
    const { data } = await supabase
      .from('cards')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (!data) break; // Slug is unique
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Save (create or update) a published card
 */
export async function saveCard(cardData) {
  if (!isSupabaseConfigured()) return saveCardLocal(cardData);

  const supabase = getSupabaseBrowserClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return saveCardLocal(cardData);

  const row = {
    user_id: user.id,
    slug: cardData.slug,
    name: cardData.name || null,
    title: cardData.title || null,
    company: cardData.company || null,
    phone: cardData.phone || null,
    email: cardData.email || null,
    web: cardData.web || null,
    linkedin: cardData.linkedin || null,
    github: cardData.github || null,
    twitter: cardData.twitter || null,
    instagram: cardData.instagram || null,
    logo_url: cardData.logoUrl || null,
    design: cardData.design || {},
    template_id: cardData.templateId || null,
    template_title: cardData.templateTitle || null,
    is_published: true,
    updated_at: new Date().toISOString(),
  };

  // Upsert by slug
  const { data, error } = await supabase
    .from('cards')
    .upsert(row, { onConflict: 'slug' })
    .select()
    .single();

  if (error) {
    console.error('Error saving card:', error);
    return saveCardLocal(cardData);
  }

  return mapSupabaseCard(data);
}

/**
 * Delete a card by slug
 */
export async function deleteCard(slug) {
  if (!isSupabaseConfigured()) {
    deleteCardLocal(slug);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting card:', error);
    deleteCardLocal(slug);
  }
}

/**
 * Increment view count for a card
 */
export async function incrementViews(slug) {
  if (!isSupabaseConfigured()) {
    incrementViewsLocal(slug);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { data: card } = await supabase
    .from('cards')
    .select('views')
    .eq('slug', slug)
    .single();

  if (card) {
    await supabase
      .from('cards')
      .update({ views: (card.views || 0) + 1 })
      .eq('slug', slug);
  }
}

/* ─── Map Supabase row → app object ─── */
function mapSupabaseCard(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.title,
    company: row.company,
    phone: row.phone,
    email: row.email,
    web: row.web,
    linkedin: row.linkedin,
    github: row.github,
    twitter: row.twitter,
    instagram: row.instagram,
    logoUrl: row.logo_url,
    design: row.design || {},
    templateId: row.template_id,
    templateTitle: row.template_title,
    views: row.views || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
