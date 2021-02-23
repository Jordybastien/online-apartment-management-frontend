import api from './api';

export const fetchRequests = async () => {
  try {
    const res = await api.get('request/');
    return res.data.data;
  } catch (error) {
    throw Error(error);
  }
};

export const sendRequest = async (request) => {
  try {
    const res = await api.post('request/', request);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const alterRequest = async (requestId, request) => {
  try {
    const res = await api.patch(`request/${requestId}`, request);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};
export const deleteRequest = async (requestId) => {
  try {
    const res = await api.delete(`request/${requestId}`);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};
