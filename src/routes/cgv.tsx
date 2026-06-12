import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions générales de vente — Eventia Signature" },
      { name: "description", content: "Conditions générales de vente d'Eventia Signature." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <article className="max-w-3xl mx-auto prose prose-stone">
        <h1 className="text-4xl font-serif mb-6">Conditions générales de vente</h1>
        <h2 className="font-serif text-2xl mt-8">Objet</h2>
        <p>Les présentes CGV régissent la vente d'invitations et expériences signature Eventia entre l'atelier et le client.</p>
        <h2 className="font-serif text-2xl mt-8">Commande</h2>
        <p>Toute commande passée via le configurateur emporte acceptation des présentes CGV. Un acompte ou paiement total est exigé à la commande.</p>
        <h2 className="font-serif text-2xl mt-8">Délais</h2>
        <p>Production : 2 à 4 semaines après validation de la maquette. Délais indicatifs, non contractuels en cas de personnalisation lourde.</p>
        <h2 className="font-serif text-2xl mt-8">Rétractation</h2>
        <p>Les invitations étant personnalisées, le droit de rétractation ne s'applique pas (art. L221-28 du Code de la consommation).</p>
        <h2 className="font-serif text-2xl mt-8">Litiges</h2>
        <p>Droit français applicable. Médiation préalable obligatoire avant toute saisine du tribunal compétent.</p>
      </article>
    </main>
  );
}
