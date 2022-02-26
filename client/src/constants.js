const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre ',
  'Octobre',
  'Novembre',
  'Décembre',
];


const years = [];
for(let i = 22; i >= 0; i--) {
  years.push(`20${(i > 9 ? i : `0${i}`)}`);
}

const hours = [];
for(let i = 0; i < 24; i++) {
  hours.push(`${((i > 9) ? i : `0${i}` )}:00`);
}

export { 
  years,
  months,
  hours,
};
