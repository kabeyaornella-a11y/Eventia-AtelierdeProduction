import { createServerFn } from "@tanstack/react-start";

const SITE_URL = "https://www.eventiasignature.com";
const _FALLBACK_URL = "https://nxqbihotrcfbknydxpny.supabase.co";
const _FALLBACK_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cWJpaG90cmNmYmtueWR4cG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NTM2OTQsImV4cCI6MjA5NjUyOTY5NH0.9wE0rQNPGbzuK56dTtAqspvty-vL7puzzJJvXHv0VRA";

function translateResetError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("invalid api key") || lower.includes("invalid_api_key"))
    return "Service non configuré. Veuillez contacter le support Eventia.";
  if (lower.includes("user not found") || lower.includes("no user found"))
    return "Aucun compte n'est associé à cette adresse e-mail.";
  if (lower.includes("email rate limit") || lower.includes("rate limit"))
    return "Trop de tentatives. Veuillez réessayer dans quelques minutes.";
  if (lower.includes("email address not authorized"))
    return "Cette adresse e-mail n'est pas autorisée.";
  return "Impossible d'envoyer l'email. Veuillez réessayer.";
}

export const sendPasswordResetEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { email: string };
    if (!d.email) throw new Error("Email requis");
    return d;
  })
  .handler(async ({ data }) => {
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const supabaseUrl = (
      process.env.SUPABASE_URL ??
      (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
      _FALLBACK_URL
    ).replace(/\/$/, "");
    const anonKey =
      (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
      (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
      _FALLBACK_ANON;
    const redirectTo = `${SITE_URL}/reinitialiser-mot-de-passe`;
    const WS = (await import("ws")).default;
    const { createClient } = await import("@supabase/supabase-js");

    // ── Chemin 1 : admin generateLink + Resend (email brandé en français) ──
    if (SERVICE_KEY && RESEND_KEY) {
      try {
        const admin = createClient(supabaseUrl, SERVICE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
          realtime: { transport: WS as unknown as typeof WebSocket },
        });
        const { data: linkData, error: linkErr } = await (
          admin.auth.admin as {
            generateLink: (
              opts: unknown,
            ) => Promise<{ data: unknown; error: { message: string } | null }>;
          }
        ).generateLink({ type: "recovery", email: data.email });

        if (!linkErr) {
          const props = (linkData as { properties?: { hashed_token?: string; token?: string } })
            ?.properties;
          const hashedToken = props?.hashed_token ?? props?.token;
          if (hashedToken) {
            const resetUrl = `${redirectTo}#token_hash=${encodeURIComponent(hashedToken)}&type=recovery`;
            const res = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_KEY}`,
              },
              body: JSON.stringify({
                from: "Eventia Signature <onboarding@resend.dev>",
                to: [data.email],
                subject: "Réinitialisation de votre mot de passe — Eventia Signature",
                html: buildResetEmailHtml(resetUrl),
              }),
            });
            if (res.ok) return { success: true };
          }
        }
      } catch {
        // fall through to native Supabase
      }
    }

    // ── Chemin 2 : resetPasswordForEmail natif Supabase (fallback garanti) ──
    const client = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { transport: WS as unknown as typeof WebSocket },
    });
    const { error } = await client.auth.resetPasswordForEmail(data.email, { redirectTo });
    if (error) return { success: false, error: translateResetError(error.message) };
    return { success: true };
  });

function buildResetEmailHtml(resetUrl: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F8EFE1;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8EFE1;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#F8EFE1;border:1px solid #D8AE67;padding:48px 40px;text-align:center;">
        <tr><td>
          <div style="color:#8A5B1E;letter-spacing:0.2em;font-size:11px;text-transform:uppercase;margin-bottom:6px;">Eventia Signature</div>
          <h1 style="color:#211914;font-size:26px;margin:0 0 8px;">Réinitialisation<br>de votre mot de passe</h1>
          <div style="width:48px;height:1px;background:#D8AE67;margin:16px auto 24px;"></div>
          <p style="color:#211914;font-size:15px;line-height:1.6;margin:0 0 32px;">
            Vous avez demandé à réinitialiser le mot de passe de votre espace Eventia Signature.<br>
            Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#211914;color:#F8EFE1;padding:14px 36px;text-decoration:none;font-size:14px;letter-spacing:0.1em;border:1px solid #D8AE67;">
            Réinitialiser mon mot de passe
          </a>
          <p style="color:#8A5B1E;font-size:12px;margin:32px 0 0;line-height:1.6;">
            Ce lien est valable <strong>24 heures</strong>.<br>
            Si vous n'avez pas fait cette demande, ignorez simplement cet email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
