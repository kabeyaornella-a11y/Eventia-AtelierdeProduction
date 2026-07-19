-- Tableau de bord marié (2026-07-19, phase 4).
--
-- Introduit une vraie liste d'invités (distincte des RSVP, qui ne sont créés
-- que quand quelqu'un répond) pour pouvoir suivre : envoyé / ouvert / pas
-- ouvert / ouvert-mais-pas-répondu, générer des liens personnalisés, et
-- construire un plan de table. Ajoute aussi les messages vocaux (guestbook
-- audio) et relie les RSVP aux invités pré-chargés quand c'est possible.

create table if not exists public.invitation_guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  group_label text,
  expected_adults integer not null default 1,
  expected_children integer not null default 0,
  guest_token text not null unique default encode(gen_random_bytes(9), 'base64'),
  opened_at timestamptz,
  rsvp_id uuid references public.rsvps(id) on delete set null,
  table_number text,
  created_at timestamptz not null default now()
);

comment on table public.invitation_guests is 'Liste d''invités pré-chargée par le couple : suivi ouverture, lien personnalisé, plan de table.';
comment on column public.invitation_guests.guest_token is 'Identifiant utilisé dans le lien personnalisé ?g=... pour suivre l''ouverture individuelle.';

create index if not exists invitation_guests_invitation_id_idx on public.invitation_guests (invitation_id);
create unique index if not exists invitation_guests_guest_token_idx on public.invitation_guests (guest_token);

alter table public.invitation_guests enable row level security;

create policy "invitation_guests_owner_all" on public.invitation_guests
  for all using (
    exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid())
  );

-- Volontairement AUCUNE policy publique ici : contrairement à "rsvps" ou
-- "gallery_uploads", cette table contient les coordonnées (email/téléphone)
-- de tous les invités. Le suivi d'ouverture et le pré-remplissage du prénom
-- passent uniquement par des server functions utilisant supabaseAdmin
-- (service role, jamais exposé au navigateur), qui filtrent explicitement
-- par guest_token + token de l'invitation. Voir guest-list.functions.ts.

-- Lien RSVP -> invité pré-chargé (nullable : un invité peut répondre sans
-- avoir été pré-chargé dans la liste).
alter table public.rsvps
  add column if not exists guest_id uuid references public.invitation_guests(id) on delete set null;

create table if not exists public.audio_messages (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text,
  audio_url text not null,
  duration_seconds integer,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.audio_messages is 'Messages vocaux laissés par les invités (guestbook audio), modérés comme la galerie photo.';

create index if not exists audio_messages_invitation_id_idx on public.audio_messages (invitation_id);

alter table public.audio_messages enable row level security;

create policy "audio_messages_public_insert" on public.audio_messages
  for insert with check (true);

create policy "audio_messages_public_read_approved" on public.audio_messages
  for select using (approved = true);

create policy "audio_messages_owner_all" on public.audio_messages
  for all using (
    exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid())
  );

-- Bucket de stockage pour les fichiers audio (même logique que le bucket
-- "gallery" existant). À vérifier/ajuster dans Supabase Storage si un bucket
-- "audio-messages" n'existe pas déjà — cette ligne échoue silencieusement
-- sans droits suffisants, dans ce cas créer le bucket manuellement (privé,
-- avec upload anonyme via URL signée comme pour "gallery").
insert into storage.buckets (id, name, public)
  values ('audio-messages', 'audio-messages', false)
  on conflict (id) do nothing;
