import axios from 'redaxios';

// Compteur Services
export const getAllCompteur = (limite) => {
  let query = '/gti525/v1/compteurs';
  if (limite) query += `?limite=${limite}`;

  return axios.get(query);
};

export const getCompteurDetailsBetweenDates = (compteursId, startDate, endDate, limite) => {
  let query = `/gti525/v1/compteurs/${compteursId}/passages?debut=${startDate}&fin=${endDate}`;
  if (limite) query += `?limite=${limite}`;

  return axios.get(query);
};

export const getCompteur = (compteursId) => {
  return axios.get(`/gti525/v1/compteurs/${compteursId}`);
};


// Point of Interest Services
export const getAllPointOfInterests = (limite) => {
  let query = '/gti525/v1/pointsdinteret';
  if (limite) query += `?limite=${limite}`;

  return axios.get(query);
};

export const getAllPointOfInterestsFountain = (nom, limite) => {
  let query = '/gti525/v1/pointsdinteret?type=fontaine';
  if (nom) query += `&nom=${nom}`;
  if (limite) query += `&limite=${limite}`;

  return axios.get(query);
};

export const getAllPointOfInterestsAtelier = (nom, limite) => {
  let query = '/gti525/v1/pointsdinteret?type=atelier';
  if (nom) query += `&nom=${nom}`;
  if (limite) query += `&limite=${limite}`;

  return axios.get(query);
};

export const getPointOfInterest = (pointOfIntrestId) => {
  return axios.get(`/gti525/v1/pointsdinteret/${pointOfIntrestId}`);
};

export const createNewPointOfInterest = (data) => {
  return axios.post('/gti525/v1/pointsdinteret/new', data);
};