import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Eventia Signature" },
      { name: "description", content: "Mentions légales d'Eventia Signature, atelier d'invitations et expériences premium." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <article className="max-w-3xl mx-auto prose prose-stone">
        <h1 className="text-4xl font-serif mb-6">Mentions légales</h1>
        <h2 className="font-serif text-2xl mt-8">Éditeur</h2>
        <p>Eventia Signature — Atelier d'invitations et expériences pour mariages et événements premium.<br />
        Contact : contact@eventia-signature.com</p>
        <h2 className="font-serif text-2xl mt-8">Hébergement</h2>
        <p>Site hébergé par Lovable / Cloudflare Workers, infrastructure base de données Supabase.</p>
        <h2 className="font-serif text-2xl mt-8">Propriété intellectuelle</h2>
        <p>L'ensemble des contenus (textes, images, vidéos, animations) est la propriété exclusive d'Eventia Signature, sauf mention contraire. Toute reproduction est interdite sans autorisation écrite.</p>
        <h2 className="font-serif text-2xl mt-8">Crédits</h2>
        <p>Animations vidéos : production studio Eventia. Photographies modèles : crédits indiqués sur chaque modèle.</p>
      </article>
    </main>
  );
}
