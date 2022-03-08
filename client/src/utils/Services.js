import axios from 'redaxios';

export const getCompteurDetailsBetweenDates = (compteursId, startDate, endDate) => {
  return axios.get(`/gti525/v1/compteurs/${compteursId}?debut=${startDate}&fin=${endDate}`);
};

export const getAllCompteur = () => {
  return axios.get('/gti525/v1/compteurs');
};
