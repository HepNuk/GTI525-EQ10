const months = {
  jan: { 
    name: 'Janvier',
    days: 31,
  },
  feb: {
    name: 'Février',
    days: 28,
  },
  mar: {
    name: 'Mars',
    days: 31,
  },
  apr: {
    name: 'Avril',
    days: 30,
  },
  mai: {
    name: 'Mai',
    days: 31,
  },
  jun: {
    name: 'Juin',
    days: 30,
  },
  jul: {
    name: 'Juillet',
    days: 31,
  },
  aug: {
    name: 'Août',
    days: 31,
  },
  sep: {
    name: 'Septembre ',
    days: 30,
  },
  oct: {
    name: 'Octobre',
    days: 31,
  },
  nov: {
    name: 'Novembre',
    days: 30,
  },
  dec: {
    name: 'Décembre',
    days: 31,
  }
};

const days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i > 9 ? ''+i : '0'+i);
}

const years = [];
for(let i = 22; i >= 0; i--) {
  years.push(`20${(i > 9 ? i : `0${i}`)}`);
}

const hours = [];
for(let i = 0; i < 24; i++) {
  hours.push(`${((i > 9) ? `${i}` : `0${i}` )}:00`);
}

export { 
  years,
  months,
  days,
  hours,
};
