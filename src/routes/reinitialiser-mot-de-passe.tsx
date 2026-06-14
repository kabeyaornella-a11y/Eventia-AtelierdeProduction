import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reinitialiser-mot-de-passe")({
  head: () => ({
    meta: [
      { title: "Réinitialiser le mot de passe — Eventia Signature" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const searchParams = new URLSearchParams(window.location.search);

    const tokenHash = hashParams.get("token_hash");
    const hashType = hashParams.get("type");
    const code = searchParams.get("code");
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    // Format 1 : notre flow custom (admin generateLink + Resend)
    // URL: /reinitialiser-mot-de-passe#token_hash=xxx&type=recovery
    if (tokenHash && hashType === "recovery") {
      supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" }).then(({ error }) => {
        if (!error) setReady(true);
        else toast.error("Lien invalide ou expiré. Demandez un nouveau lien.");
      });
      return;
    }

    // Format 2 : flow PKCE Supabase natif (resetPasswordForEmail)
    // URL: /reinitialiser-mot-de-passe?code=xxx
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (!error) setReady(true);
        else toast.error("Lien invalide ou expiré. Demandez un nouveau lien.");
      });
      return;
    }

    // Format 3 : flow implicite Supabase
    // URL: /reinitialiser-mot-de-passe#access_token=xxx&refresh_token=xxx&type=recovery
    if (accessToken && refreshToken && hashType === "recovery") {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (!error) setReady(true);
          else toast.error("Lien invalide ou expiré. Demandez un nouveau lien.");
        });
      return;
    }

    // Fallback : événement PASSWORD_RECOVERY (Supabase redirige avec session active)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Mot de passe mis à jour. Vous êtes connecté·e.");
      navigate({ to: "/mes-commandes" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erreur lors de la mise à jour du mot de passe.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <Section className="max-w-md mx-auto">
        <div className="text-center">
          <div className="eyebrow text-primary">Eventia Signature</div>
          <h1 className="font-display text-4xl md:text-5xl mt-3">Nouveau mot de passe</h1>
          <p className="font-serif-soft italic text-muted-foreground mt-3">
            Choisissez un nouveau mot de passe pour votre espace.
          </p>
        </div>

        {ready ? (
          <form
            onSubmit={submit}
            className="mt-10 bg-ivory border border-primary/15 p-8 shadow-soft space-y-4"
          >
            <div>
              <label htmlFor="new-password" className="eyebrow text-xs">
                Nouveau mot de passe
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-background border border-border text-sm"
              />
              <div className="text-[11px] text-muted-foreground mt-1">Min. 8 caractères.</div>
            </div>
            <GoldButton type="submit" disabled={busy} className="w-full">
              {busy ? "Patientez…" : "Définir ce mot de passe"}
            </GoldButton>
          </form>
        ) : (
          <div className="mt-10 text-center font-serif-soft italic text-muted-foreground space-y-4">
            <p>Lien invalide ou expiré. Demandez un nouveau lien depuis la page de connexion.</p>
            <Link
              to="/auth"
              className="inline-block text-sm not-italic text-primary underline underline-offset-4"
            >
              Retour à la connexion
            </Link>
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
