-- Bibliothèque de vidéos animées — écran admin self-serve
--
-- Phase 2 (2026-07-19) : permet d'ajouter un nouveau modèle vidéo animé
-- (collection Écrins / Union / Voiles / Seuils / Save the Date) sans passer
-- par un déploiement de code. Vient compléter le catalogue statique
-- src/lib/cloudinary-models.ts (laissé tel quel, non cassé par cette table).
--
-- À appliquer une fois via l'éditeur SQL Supabase (ou `supabase db push`).

create table if not exists public.video_models (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('ecrins', 'union', 'voiles', 'seuils', 'save-the-date')),
  slug text not null,
  name text not null,
  video_url text not null,
  poster_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (collection, slug)
);

comment on table public.video_models is 'Modèles vidéo animés ajoutés depuis l''écran admin (complète cloudinary-models.ts).';

alter table public.video_models enable row level security;

-- Lecture publique (catalogue affiché sur le site).
create policy "video_models_public_read" on public.video_models
  for select using (true);

-- Écriture réservée aux admins (même fonction has_role utilisée ailleurs
-- dans le projet — adapter le nom si votre fonction diffère).
create policy "video_models_admin_write" on public.video_models
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
