-- =======================================================
-- STUDYXP PRODUCTION SUPABASE DATABASE MIGRATION
-- Execute this script in your Supabase SQL Editor
-- Project Reference: auvrrmsrnrykvtvfkcdh
-- =======================================================

-- 1. Create Profiles Table Linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL DEFAULT 'PixelHero',
    avatar TEXT NOT NULL DEFAULT '🚀',
    level INT NOT NULL DEFAULT 1,
    rank_title TEXT NOT NULL DEFAULT 'Student',
    current_xp INT NOT NULL DEFAULT 0,
    next_level_xp INT NOT NULL DEFAULT 1000,
    coins INT NOT NULL DEFAULT 100,
    streak_days INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create User Adventures Table (Syllabus Driven Single Source of Truth)
CREATE TABLE IF NOT EXISTS public.user_adventures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    semester TEXT,
    difficulty TEXT NOT NULL DEFAULT 'Normal',
    total_xp INT NOT NULL DEFAULT 1000,
    estimated_hours NUMERIC NOT NULL DEFAULT 10,
    blueprint_json JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create User Daily Quests Table
CREATE TABLE IF NOT EXISTS public.user_daily_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quest_key TEXT NOT NULL,
    title TEXT NOT NULL,
    target INT NOT NULL DEFAULT 1,
    current INT NOT NULL DEFAULT 0,
    reward_xp INT NOT NULL DEFAULT 150,
    reward_coins INT NOT NULL DEFAULT 50,
    completed BOOLEAN DEFAULT FALSE,
    claimed BOOLEAN DEFAULT FALSE
);

-- 4. Create User Inventory Table
CREATE TABLE IF NOT EXISTS public.user_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    count INT NOT NULL DEFAULT 1,
    UNIQUE(user_id, item_id)
);

-- 5. Create User Skill Tree Nodes Table
CREATE TABLE IF NOT EXISTS public.user_skill_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    node_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'locked', -- 'unlocked', 'available', 'locked'
    UNIQUE(user_id, node_id)
);

-- 6. Create Party Chat Messages Table (Real-time Multi-user)
CREATE TABLE IF NOT EXISTS public.party_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =======================================================
-- AUTOMATED USER SIGNUP TRIGGER (PostgreSQL Function)
-- Automatically inserts a default profile row when user registers via auth.users
-- =======================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, username, avatar)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar', '🚀')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =======================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict auth.uid() = user_id checks
-- =======================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.party_messages ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Adventures Policies
DROP POLICY IF EXISTS "Users can manage own adventures" ON public.user_adventures;
CREATE POLICY "Users can manage own adventures" ON public.user_adventures FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Quests Policies
DROP POLICY IF EXISTS "Users can manage own quests" ON public.user_daily_quests;
CREATE POLICY "Users can manage own quests" ON public.user_daily_quests FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Inventory Policies
DROP POLICY IF EXISTS "Users can manage own inventory" ON public.user_inventory;
CREATE POLICY "Users can manage own inventory" ON public.user_inventory FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Skill Nodes Policies
DROP POLICY IF EXISTS "Users can manage own skill nodes" ON public.user_skill_nodes;
CREATE POLICY "Users can manage own skill nodes" ON public.user_skill_nodes FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Party Chat Policies (Public Read, Authenticated Insert)
DROP POLICY IF EXISTS "Anyone can read party messages" ON public.party_messages;
CREATE POLICY "Anyone can read party messages" ON public.party_messages FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert party messages" ON public.party_messages;
CREATE POLICY "Authenticated users can insert party messages" ON public.party_messages FOR INSERT TO authenticated WITH CHECK (true);

-- Enable Realtime WebSockets on party_messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.party_messages;

-- =======================================================
-- STORAGE BUCKETS SETUP (Syllabus Documents)
-- =======================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('syllabus_files', 'syllabus_files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users upload syllabus" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'syllabus_files' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Authenticated users read syllabus" ON storage.objects
FOR SELECT TO authenticated USING (bucket_id = 'syllabus_files' AND (storage.foldername(name))[1] = auth.uid()::text);