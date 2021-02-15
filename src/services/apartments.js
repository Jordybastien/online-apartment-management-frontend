import api from './api';

export const fetchApartments = async () => {
  try {
    const res = await api.get('apartment/');
    return res.data.data;
  } catch (error) {
    throw Error(error);
  }
};
