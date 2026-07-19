-- Accompagnants détaillés par invité RSVP.
--
-- Décision produit (2026-07-19, phase 2) : remplace le simple compteur
-- numérique par une liste nominative (nom + type adulte/enfant + allergies
-- propres à chaque accompagnant). Meilleure donnée opérationnelle pour le
-- couple (traiteur, plan de table) et cohérent avec la mécanique observée
-- chez les meilleurs concurrents lors de l'audit du 2026-07-19.
--
-- guests_count reste en base (utile pour les stats admin / dashboard) mais
-- est désormais dérivé côté serveur de la taille de `companions` + 1,
-- jamais fait confiance côté client.

alter table public.rsvps
  add column if not exists companions jsonb not null default '[]';

comment on column public.rsvps.companions is 'Liste des accompagnants: [{ name, type: "adult"|"child", allergies? }]. guests_count = 1 + length(companions).';
