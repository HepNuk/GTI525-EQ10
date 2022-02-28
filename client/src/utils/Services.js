import axios from 'redaxios';


// Examples  Routes may or may not weork later Kappacino
export const getCompteur = (compteursId, startDate = undefined, endDate = undefined) => {
  let url = `/gti525/v1/compteurs/${compteursId}`;
  if (startDate) url + '?startDate=' + startDate;

  return axios.get(url);
};

export const testAxios = () => {
  return axios.post('/gti525/compteur', { testload: '123123' });
};

export const getAllCompteur = () => {
  return axios.get(`/gti525/v1/compteurs`);
};

// End of examples.