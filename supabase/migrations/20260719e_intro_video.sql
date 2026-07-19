-- Splash d'entrée optionnel (phase 3, 2026-07-19) : une vidéo plein écran
-- cliquable avant de révéler l'invitation. Nullable — sans effet sur les
-- invitations existantes qui n'en ont pas.

alter table public.invitations
  add column if not exists intro_video_url text;

comment on column public.invitations.intro_video_url is 'URL vidéo Cloudinary pour le splash d''entrée (optionnel). NULL = pas de splash, comportement actuel inchangé.';
