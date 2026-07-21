export interface TimelineItem {
  date: string;
  text: string;
}

export interface TimelineTemplate {
  id: string;
  label: string;
  description: string;
  style: 'vertical' | 'alternating' | 'minimal' | 'roman' | 'circles';
  items: TimelineItem[];
}

export const TIMELINE_TEMPLATES: TimelineTemplate[] = [
  {
    id: 'vertical_classique',
    label: 'Vertical Classique',
    description: 'Dates à gauche · ligne dorée · texte à droite',
    style: 'vertical',
    items: [
      { date: '2019', text: 'Notre première rencontre, un soir de printemps' },
      { date: '2021', text: 'Notre premier voyage ensemble au Portugal' },
      { date: '2023', text: 'La demande en mariage au coucher du soleil' },
      { date: '2026', text: 'Le plus beau jour de notre vie' },
    ],
  },
  {
    id: 'alternant',
    label: 'Alternant',
    description: 'Éléments alternent gauche · droite',
    style: 'alternating',
    items: [
      { date: 'Printemps 2019', text: 'Un regard, une rencontre' },
      { date: 'Été 2020',       text: "Le premier « je t'aime »" },
      { date: 'Noël 2023',      text: 'Il a posé un genou à terre…' },
      { date: 'Automne 2026',   text: 'Nous disons « oui »' },
    ],
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Texte centré · sans ligne · tout en élégance',
    style: 'minimal',
    items: [
      { date: '2019', text: 'Rencontre' },
      { date: '2021', text: 'Aventures' },
      { date: '2023', text: 'Fiançailles' },
      { date: '2026', text: 'Mariage' },
    ],
  },
  {
    id: 'romain',
    label: 'Chiffres Romains',
    description: 'Dates en chiffres romains · style antique',
    style: 'roman',
    items: [
      { date: 'MMXIX', text: 'Premier regard, premier sourire' },
      { date: 'MMXXI', text: 'Premiers voyages, premiers souvenirs' },
      { date: 'MMXXIII', text: 'La demande, un moment suspendu' },
      { date: 'MMXXVI', text: "L'éternité commence aujourd'hui" },
    ],
  },
  {
    id: 'cercles',
    label: 'Cercles dorés',
    description: 'Points cerclés reliés par une ligne verticale',
    style: 'circles',
    items: [
      { date: '2019', text: 'Il était une fois une rencontre…' },
      { date: '2021', text: 'Nos premières aventures à deux' },
      { date: '2023', text: 'Une bague, une promesse' },
      { date: '2026', text: 'Pour toujours' },
    ],
  },
];
