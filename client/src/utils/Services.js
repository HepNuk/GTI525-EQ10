import axios from 'redaxios';
import { pointOfIntrestTypes } from 'src/constants';

function deleteUndefinedKeys(obj) {
  Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
}
// Compteur Services
export const getAllCompteur = (sort, limit = 0) => {
  const params = {
    sort_by: sort.key,
    sort_dir: sort.direction,
    limit,
  };
  deleteUndefinedKeys(params);

  return axios.get('/gti525/v1/compteurs', { params });
};

export const getCompteurDetailsBetweenDates = (compteursId, startDate, endDate, limit = 0) => {
  const params = {
    debut: startDate,
    fin: endDate,
    limit,
  };
  deleteUndefinedKeys(params);

  return axios.get(`/gti525/v1/compteurs/${compteursId}/passages`, { params });
};

export const getCompteur = (compteursId) => {
  return axios.get(`/gti525/v1/compteurs/${compteursId}`);
};


// Point of Interest Services
export const getAllPointOfInterests = (limit = 0) => {
  const params = {
    limit,
  };
  deleteUndefinedKeys(params);

  return axios.get('/gti525/v1/pointsdinteret', { params });
};

export const getAllPointOfInterestsFountain = (nom, limit = 0) => {
  const params = {
    type: 'fontaine',
    nom,
    limit,
  };
  deleteUndefinedKeys(params);

  return axios.get('/gti525/v1/pointsdinteret', { params });
};

export const getAllPointOfInterestsAtelier = (nom, limit = 0) => {
  const params = {
    type: 'atelier',
    nom,
    limit,
  };
  deleteUndefinedKeys(params);

  return axios.get('/gti525/v1/pointsdinteret', { params });
};

export const getPointOfInterest = (pointOfIntrestId) => {
  return axios.get(`/gti525/v1/pointsdinteret/${pointOfIntrestId}`);
};

export const createNewPointOfInterest = (data) => {
  deleteUndefinedKeys(data);
  return axios.post('/gti525/v1/pointsdinteret/new', data);
};
