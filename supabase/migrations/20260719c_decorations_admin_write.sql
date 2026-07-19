-- Autorise l'écriture admin sur la table decorations existante, pour
-- l'écran admin self-serve (Phase 2, 2026-07-19). La lecture publique est
-- supposée déjà en place (utilisée par listDecorations) ; on ne la
-- retouche pas. Idempotent : recrée la policy si elle existe déjà.

drop policy if exists "decorations_admin_write" on public.decorations;

create policy "decorations_admin_write" on public.decorations
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
