-- ============================================
-- NexCard Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Profiles table (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Published business cards
CREATE TABLE IF NOT EXISTS cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT,
  title TEXT,
  company TEXT,
  phone TEXT,
  email TEXT,
  web TEXT,
  linkedin TEXT,
  github TEXT,
  twitter TEXT,
  instagram TEXT,
  logo_url TEXT,
  design JSONB DEFAULT '{}',
  template_id INTEGER,
  template_title TEXT,
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Anyone can view published cards (for /card/[slug] page)
CREATE POLICY "Public can view published cards"
  ON cards FOR SELECT USING (is_published = true);

-- Authenticated users can insert their own cards
CREATE POLICY "Users can insert own cards"
  ON cards FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own cards
CREATE POLICY "Users can update own cards"
  ON cards FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own cards
CREATE POLICY "Users can delete own cards"
  ON cards FOR DELETE USING (auth.uid() = user_id);

-- Users can also view their own unpublished cards
CREATE POLICY "Users can view own cards"
  ON cards FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_slug ON cards(slug);
CREATE INDEX IF NOT EXISTS idx_cards_is_published ON cards(is_published);

-- ============================================
-- Auto-update updated_at on cards
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Atomic view increment (avoids race conditions)
-- ============================================
CREATE OR REPLACE FUNCTION increment_card_views(card_slug TEXT)
RETURNS void AS $$
  UPDATE cards SET views = views + 1 WHERE slug = card_slug AND is_published = true;
$$ LANGUAGE SQL SECURITY DEFINER;
