-- Moteur d'invitation v2 — RSVP enrichi
--
-- Référence : audit concurrentiel du 2026-07-19 (The Digital Yes, The Digital Invite)
-- porté sur des dizaines de démos réelles (invitations + save-the-date).
-- Ajoute au RSVP les champs standards du secteur qui manquaient : allergies
-- et besoin de transport. Colonnes nullable/à défaut sûr, sans rupture pour
-- les lignes existantes.
--
-- À appliquer une fois via l'éditeur SQL Supabase (ou `supabase db push`
-- si la CLI est configurée).

alter table public.rsvps
  add column if not exists allergies text,
  add column if not exists needs_transport boolean not null default false;

comment on column public.rsvps.allergies is 'Allergies ou régime alimentaire déclarés par l''invité (texte libre, optionnel).';
comment on column public.rsvps.needs_transport is 'L''invité a coché avoir besoin d''un transport vers le lieu.';
