import { createServerFn } from "@tanstack/react-start";

/** ─── Réinitialisation de mot de passe bypass-Supabase ─────────────────────
 *  Génère un token de recovery côté serveur (service role) et envoie
 *  un email branded via Resend — sans dépendre du Site URL Supabase.
 */
export const sendPasswordResetEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { email: string };
    if (!d.email) throw new Error("Email requis");
    return d;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1. Générer le lien de recovery (token_hash côté admin)
    const { data: linkData, error: linkErr } = await (supabaseAdmin.auth.admin as any).generateLink({
      type: "recovery",
      email: data.email,
    });
    if (linkErr) return { success: false, error: linkErr.message };

    const hashedToken =
      linkData?.properties?.hashed_token ?? linkData?.properties?.token;
    if (!hashedToken) return { success: false, error: "Impossible de générer le lien de réinitialisation." };

    // 2. Construire l'URL sur notre domaine
    const SITE = "https://www.eventiasignature.com";
    const resetUrl = `${SITE}/reinitialiser-mot-de-passe#token_hash=${encodeURIComponent(hashedToken)}&type=recovery`;

    // 3. Envoyer via Resend
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_KEY) return { success: false, error: "Service email non configuré." };

    const html = `
<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
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
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: (err as any)?.message ?? "Erreur envoi email." };
    }

    return { success: true };
  });
