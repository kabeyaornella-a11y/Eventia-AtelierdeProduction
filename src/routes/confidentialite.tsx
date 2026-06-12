import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Eventia Signature" },
      { name: "description", content: "Comment Eventia Signature collecte, utilise et protège vos données personnelles." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <article className="max-w-3xl mx-auto prose prose-stone">
        <h1 className="text-4xl font-serif mb-6">Politique de confidentialité</h1>
        <p>Eventia Signature attache une importance particulière à la protection de vos données personnelles.</p>
        <h2 className="font-serif text-2xl mt-8">Données collectées</h2>
        <ul>
          <li>Identité & contact (nom, prénom, email, téléphone) — pour traiter les commandes et invitations.</li>
          <li>Informations événement (date, lieu, invités) — pour la production des invitations et le RSVP.</li>
          <li>Données de paiement — traitées par notre prestataire de paiement (jamais stockées en clair).</li>
        </ul>
        <h2 className="font-serif text-2xl mt-8">Finalités</h2>
        <p>Exécution de la commande, envoi des emails liés à votre événement (commande, paiement, validation, RSVP, souvenirs), amélioration du service.</p>
        <h2 className="font-serif text-2xl mt-8">Durée de conservation</h2>
        <p>Données conservées 3 ans après la fin de la relation commerciale, sauf obligations légales spécifiques (comptabilité : 10 ans).</p>
        <h2 className="font-serif text-2xl mt-8">Vos droits</h2>
        <p>Accès, rectification, suppression, opposition : contact@eventia-signature.com</p>
        <h2 className="font-serif text-2xl mt-8">Cookies</h2>
        <p>Cookies fonctionnels uniquement (session, panier). Aucun pistage publicitaire.</p>
      </article>
    </main>
  );
}
