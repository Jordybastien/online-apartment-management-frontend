import { FETCH_APARTMENTS } from './actionTypes';

export const getApartments = (apartments) => {
  return {
    type: FETCH_APARTMENTS,
    apartments,
  };
};
