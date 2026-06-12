import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Espace client — Eventia Signature" },
      { name: "description", content: "Accédez à votre espace client Eventia Signature pour retrouver vos commandes et vos compositions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/mes-commandes" });
  }, [loading, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/mes-commandes" },
        });
        if (error) throw error;
        toast.success("Compte créé. Vous êtes connecté·e.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bienvenue dans votre espace.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur d'authentification");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <Section className="max-w-md mx-auto">
        <div className="text-center">
          <div className="eyebrow text-primary">Eventia Signature</div>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{mode === "signin" ? "Votre espace" : "Créer un compte"}</h1>
          <p className="font-serif-soft italic text-muted-foreground mt-3">
            Retrouvez vos compositions, commandes et invitations dans un espace privé.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 bg-ivory border border-primary/15 p-8 shadow-soft space-y-4">
          <div>
            <label className="eyebrow text-xs">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-background border border-border text-sm"
            />
          </div>
          <div>
            <label className="eyebrow text-xs">Mot de passe</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-background border border-border text-sm"
            />
            {mode === "signup" && (
              <div className="text-[11px] text-muted-foreground mt-1">Min. 8 caractères. Les mots de passe compromis sont refusés.</div>
            )}
          </div>
          <GoldButton type="submit" disabled={busy} className="w-full">
            {busy ? "Patientez…" : mode === "signup" ? "Créer mon compte" : "Se connecter"}
          </GoldButton>
        </form>

        <div className="mt-6 text-center text-sm">
          {mode === "signin" ? (
            <button onClick={() => setMode("signup")} className="text-muted-foreground hover:text-primary underline underline-offset-4">
              Pas encore de compte ? Créer un compte
            </button>
          ) : (
            <button onClick={() => setMode("signin")} className="text-muted-foreground hover:text-primary underline underline-offset-4">
              Déjà un compte ? Se connecter
            </button>
          )}
          <div className="mt-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">Retour à l'accueil</Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
