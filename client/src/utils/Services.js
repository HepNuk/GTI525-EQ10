import axios from 'redaxios';


// Examples  Routes may or may not weork later Kappacino
export const getCompteurDetailsBetweenDates = (compteursId, startDate, endDate) => {
  return axios.get(`/gti525/v1/compteurs/${compteursId}?debut=${startDate}&fin=${endDate}`);
};

export const getAllCompteur = () => {
  return axios.get('/gti525/v1/compteurs');
};

// End of examples.